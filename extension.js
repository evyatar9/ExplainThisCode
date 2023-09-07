const vscode = require('vscode');
const path = require('path');
const https = require('https');


function setLanguageConfigMap() {
	let languageConfigFiles = new Map();

	// Set language configuration path on Map
	vscode.extensions.all.forEach(extension => {
		let packageJSON = extension.packageJSON;

		if (packageJSON.contributes && packageJSON.contributes.languages) {
			packageJSON.contributes.languages.forEach(language => {
				if (typeof language.configuration === 'string' && typeof language.id === 'string') {
					let configPath = path.join(extension.extensionPath, language.configuration);
					if (!languageConfigFiles.has(language.id)) {
						languageConfigFiles.set(language.id, configPath);
					}
				}
			});
		}
	});

	return languageConfigFiles;
}


async function GetCommentConfiguration(languageConfigFiles, commentConfig, languageCode) {
	// Return undefined if the language is not supported
	if (!languageConfigFiles.has(languageCode)) {
		return undefined;
	}

	// Return the language configuration if it is already in the map
	if (commentConfig.has(languageCode)) {
		return commentConfig.get(languageCode);
	}

	try {
		// Get the language configuration file path
		const filePath = languageConfigFiles.get(languageCode);
		const rawContent = await vscode.workspace.fs.readFile(vscode.Uri.file(filePath));
		const content = new TextDecoder().decode(rawContent);
		const config = JSON.parse(content);

		// Set the default value for the comments field
		config.comments = config.comments || {};

		// Set the language configuration in the map
		commentConfig.set(languageCode, config.comments);

		return config.comments;
	} catch (error) {
		commentConfig.set(languageCode, undefined);
		return undefined;
	}
}

async function explainCode(code, api_key) {

	const MODEL = 'gpt-4';
	const prompt = "Explain this code:\n" + code;
	const options = {
		hostname: 'api.openai.com',
		port: 443,
		path: '/v1/chat/completions',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${api_key}`
		}
	};
	let responseData = '';
	let statusCode = 0;

	const req = https.request(options, res => {
		statusCode = res.statusCode;

		res.on('data', d => {
			responseData += d;
		});
	});

	req.on('error', error => {
		console.error(error);
	});

	req.write(JSON.stringify({
		model: MODEL,
		messages: [{"role": "user","content":prompt}]
	}));
	req.end();

	await new Promise(resolve => req.on('close', resolve));

	if (statusCode == 401) {
		throw new Error('The API key provided is not valid. Please check the key and try again.');
	}

	return JSON.parse(responseData);

}
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	let commentConfig = new Map();
	let api_key = vscode.workspace.getConfiguration().get('explainThisCode.apiKey');
	let languageConfigFiles = setLanguageConfigMap();
	

	let disposable = vscode.commands.registerCommand('explain-this-code.explainCode', async function () {
		try {
			const editor = vscode.window.activeTextEditor;
			if (!api_key) {
				throw new Error('API key is required and cannot be empty');
			}

			if (!editor) {
				throw new Error('An unexpected error has occurred.');
				return;
			}

			const selectedText = editor.document.getText(editor.selection);
			if (!selectedText) {
				vscode.window.showErrorMessage('An explanation can only be provided for selected code. Please select the code you want to have explained.');
				return;
			}
			vscode.window.showInformationMessage('An explanation of the selected code will be shown in the form of comments above it.');
			const explain = await explainCode(selectedText, api_key);
			if (explain['error']) {
				vscode.window.showErrorMessage(explain['error']['message']);
				return;
			}

			const comments = commentConfig.get(editor.document.languageId) || await GetCommentConfiguration(languageConfigFiles, commentConfig, editor.document.languageId);
			const blockCommentStart = comments?.blockComment?.[0] ??  '/*';
			const blockCommentEnd = comments?.blockComment?.[1] ?? '*/';
			
			if (!comments) {
				vscode.window.showInformationMessage('Unable to identify the programming language. Using default block comment delimiters: /* and */');
			}

			const editRange = editor.document.lineAt(editor.selection.start.line).range.start;

			editor.edit(editBuilder => {
				if (editor !== undefined) {
					editBuilder.insert(editRange, blockCommentStart + explain["choices"][0]["message"]["content"] + "\n" + blockCommentEnd + "\n");
				}
			});
		} catch (error) {
			vscode.window.showErrorMessage('An error occurred while activating the extension: ' + error.message);
			disposable.dispose();
			disposable = undefined;
			activate(context);
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
