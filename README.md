# ETC (Explain This Code)

[**E**xplain**T**his**C**ode](https://marketplace.visualstudio.com/items?itemName=evyatar9.etc) is A VSCode extension that uses the ChatGPT API to provide explanations for selected code.

![explain-this-code.gif](https://github.com/evyatar9/ExplainThisCode/raw/master/images/explain-this-code.gif?raw=true)


## Features

- The extension will explain the selected code in your VSCode editor and insert the explanation as a block comment above the code.

- Run this extension using one of the following methods:

  - Keyboard shortcut:
    1. **Windows and Linux:** Ctrl + Alt + E
    2. **macOS:** Ctrl + Cmd + E

  - `ETC` command in the command palette.

## Requirements

- [A ChatGPT API key](https://beta.openai.com/account/api-keys) is required to use this extension.

## Installation

There are two ways to install this extension:

- **From the Extension Marketplace**: To install this extension from the Extension Marketplace in Visual Studio Code, search for [**E**xplain**T**his**C**ode](https://marketplace.visualstudio.com/items?itemName=evyatar9.etc) and click the Install button.

- **Manually using a .vsix file**: To install this extension manually using a .vsix file, follow these steps:
  1. Download the .vsix file from the releases page on GitHub [Releases](https://github.com/evyatar9/ExplainThisCode/releases)

  2. In Visual Studio Code, open the Command Palette (Ctrl+Shift+P)

  3. Select "Extensions: Install from VSIX..." and select the .vsix file you just downloaded.

## Extension Settings

- `explainThisCode.apiKey`: ChatGPT API key to use with the extension.

To set the value of the `explainThisCode.apiKey` extension setting:

1. Open the settings editor by selecting the `File` menu, then `Preferences` and then `Settings`, or by using the keyboard shortcut `Ctrl + ,` (Windows) or `Command + ,` (Mac).

2. In the search bar at the top of the editor, search for `explainThisCode.apiKey`.

3. Click on the `explainThisCode.apiKey` setting and enter your ChatGPT API key in the input field provided.

4. Click the `Save` button to save your changes.

Alternatively, you can also set the value of the `explainThisCode.apiKey` setting using the `set()` function of the `ConfigurationChangeEvent` class. For example:

```javascript
vscode.workspace.getConfiguration().update('explainThisCode.apiKey', 'my-api-key', vscode.ConfigurationTarget.Global);
```

This will set the value of the `explainThisCode.apiKey` setting to `'my-api-key'` for all workspaces.

## Release Notes

### 2.0.0

- **GPT-4 Integration**: Benefit from the latest advancements in natural language processing, providing even more insightful and accurate code explanations.

### 1.0.0

- Initial release of the ETC extension.

## Credits

- ChatGPT API: [https://openai.com/docs/api-reference/overview/](https://openai.com/docs/api-reference/overview/)

## License

This extension is licensed under the [MIT License](https://chat.openai.com/LICENSE).

## Contact

Telegram: [@evyatar9](https://t.me/evyatar9)

Discord: [evyatar9](https://discord.com/users/812805349815091251)

## Support
You can support my work buying me a coffee:

[<img width=250 alt="buymeacoffe" src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png">](https://www.buymeacoffee.com/evyatar9)

## Contributing

If you would like to contribute to the ETC extension, feel free to submit a pull request or report any issues you encounter on the [**E**xplain**T**his**C**ode repository](https://github.com/evyatar9/ExplainThisCode).


## Stargazers over time

[![Stargazers over time](https://starchart.cc/evyatar9/ExplainThisCode.svg)](https://starchart.cc/evyatar9/ExplainThisCode)