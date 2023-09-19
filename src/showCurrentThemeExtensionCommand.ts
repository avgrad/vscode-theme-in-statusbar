import * as vscode from "vscode";
import { getCurrentThemeData } from "./themeHelper";

export const SHOW_CURRENT_THEME_EXTENSION =
    "themeInStatusBar.showCurrentThemeExtension";

export default function registerCommand(context: vscode.ExtensionContext) {
    const commandDispose = vscode.commands.registerCommand(
        SHOW_CURRENT_THEME_EXTENSION,
        commandHandler
    );
    context.subscriptions.push(commandDispose);
}

function commandHandler() {
    const { extensionIdentifier } = getCurrentThemeData();
    vscode.commands.executeCommand("extension.open", extensionIdentifier);
}
