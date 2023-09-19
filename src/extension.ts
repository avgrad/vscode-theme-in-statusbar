import * as vscode from "vscode";
import registerShowCurrentThemeExtensionCommand from "./showCurrentThemeExtensionCommand";
import registerSetStatusBarFormatCommand from "./setStatusBarFormatCommand";
import registerStatusBarItem from "./statusBar";

export function activate(context: vscode.ExtensionContext) {
    registerSetStatusBarFormatCommand(context);
    registerShowCurrentThemeExtensionCommand(context);
    registerStatusBarItem(context);
}
