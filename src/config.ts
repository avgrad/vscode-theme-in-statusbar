import * as vscode from "vscode";
import { SHOW_CURRENT_THEME_EXTENSION } from "./showCurrentThemeExtensionCommand";

export type ClickBehavior = "openThemeSwitcher" | "showThemeExtension";
export type ItemAlignment = "left" | "right";

export function getStatusBarItemTemplate() {
    const statusBarFormat = vscode.workspace
        .getConfiguration("themeInStatusBar")
        .get("format") as string;
    return statusBarFormat;
}

export function getStatusBarItemCommand() {
    const clickBehavior = vscode.workspace
        .getConfiguration("themeInStatusBar")
        .get("clickBehavior") as ClickBehavior;
    switch (clickBehavior) {
        case "openThemeSwitcher":
            return "workbench.action.selectTheme";
        case "showThemeExtension":
            return SHOW_CURRENT_THEME_EXTENSION;
        default:
            ((n: never) => void n)(clickBehavior);
            return "workbench.action.selectTheme";
    }
}

export function getStatusBarItemPriority() {
    const itemPriority = vscode.workspace
        .getConfiguration("themeInStatusBar")
        .get("itemPriority") as number;
    return itemPriority;
}

export function getStatusBarItemAlignment() {
    const itemAlignment = vscode.workspace
        .getConfiguration("themeInStatusBar")
        .get("itemAlignment") as ItemAlignment;
    switch (itemAlignment) {
        case "left":
            return vscode.StatusBarAlignment.Left;
        case "right":
            return vscode.StatusBarAlignment.Right;
        default:
            ((n: never) => void n)(itemAlignment);
            return vscode.StatusBarAlignment.Right;
    }
}
