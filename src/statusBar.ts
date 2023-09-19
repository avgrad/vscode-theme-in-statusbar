import * as vscode from "vscode";
import { getCurrentThemeData } from "./themeHelper";
import * as config from "./config";

let themeStatusBarItem: vscode.StatusBarItem;
let extContext: vscode.ExtensionContext;

export default function registerStatusBarItem(
    context: vscode.ExtensionContext
) {
    extContext = context;
    // create status bar item
    createStatusBarItem();
    updateStatusBarItem();

    // register config change listener
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(updateStatusBarItem)
    );
}

function createStatusBarItem() {
    themeStatusBarItem?.hide();
    themeStatusBarItem?.dispose();
    themeStatusBarItem = vscode.window.createStatusBarItem(
        config.getStatusBarItemAlignment(),
        config.getStatusBarItemPriority()
    );
    themeStatusBarItem.name = "Current Color Theme";
    extContext.subscriptions.push(themeStatusBarItem);
    themeStatusBarItem.show();
}

function updateStatusBarItem(e?: vscode.ConfigurationChangeEvent): void {
    if (
        e?.affectsConfiguration("themeInStatusBar.itemAlignment") ||
        e?.affectsConfiguration("themeInStatusBar.itemPriority")
    ) {
        // must recreate, because priority and alignment are readonly properties
        createStatusBarItem();
    }

    const { themeName, themeAuthor, extensionName, extensionIdentifier } =
        getCurrentThemeData();

    // update status bar item
    themeStatusBarItem.text = formatStatusBarText(
        themeName,
        themeAuthor,
        extensionName,
        extensionIdentifier
    );
    themeStatusBarItem.tooltip = formatTooltipText(
        themeName,
        themeAuthor,
        extensionName,
        extensionIdentifier
    );

    // update click action
    themeStatusBarItem.command = config.getStatusBarItemCommand();
}

function formatStatusBarText(
    themeName: string,
    themeAuthor: string,
    extensionName: string,
    extensionIdentifier: string
): string {
    const statusBarTemplate = config.getStatusBarItemTemplate();
    const statusBarText = statusBarTemplate
        .replace("${name}", themeName)
        .replace("${author}", themeAuthor)
        .replace("${extensionName}", extensionName)
        .replace("${extensionId}", extensionIdentifier);

    return `$(symbol-color) ${statusBarText}`.trim();
}

function formatTooltipText(
    themeName: string,
    themeAuthor: string,
    extensionName: string,
    extensionIdentifier: string
): vscode.MarkdownString {
    let commandUri = vscode.Uri.parse(
        `command:extension.open?${encodeURIComponent(
            JSON.stringify([extensionIdentifier])
        )}`
    );

    const tooltipRaw =
        `Current theme is **${themeName}**\n\n` +
        `From **${extensionName}** by **${themeAuthor}**\n\n` +
        `(Install [\`${extensionIdentifier}\`](${commandUri}))`;

    const tooltipMarkdown = new vscode.MarkdownString(tooltipRaw);
    tooltipMarkdown.isTrusted = true;
    tooltipMarkdown.supportHtml = true;
    return tooltipMarkdown;
}
