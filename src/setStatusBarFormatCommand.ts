import * as vscode from "vscode";

export const SET_STATUSBAR_FORMAT = "themeInStatusBar.setFormat";

export default function registerCommand(context: vscode.ExtensionContext) {
    const commandDispose = vscode.commands.registerCommand(
        SET_STATUSBAR_FORMAT,
        commandHandler
    );
    context.subscriptions.push(commandDispose);
}

function commandHandler(format: string | undefined) {
    const defaultValue = vscode.workspace
        .getConfiguration("themeInStatusBar")
        .inspect("format")?.defaultValue;

    if (defaultValue === format) {
        // if the default value is set, we want to unset the config item. else it will show up as changed from default
        format = undefined;
    }

    vscode.workspace
        .getConfiguration("themeInStatusBar")
        .update("format", format, vscode.ConfigurationTarget.Global);
}
