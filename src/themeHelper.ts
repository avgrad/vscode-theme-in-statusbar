import * as vscode from "vscode";

export function getCurrentThemeData() {
    const currentTheme = vscode.workspace
        .getConfiguration("workbench")
        .get("colorTheme") as string;

    // get theme extension data
    const allThemeExtensions = vscode.extensions.all.filter(
        (e) => !!e.packageJSON?.contributes?.themes
    );
    const themeExtension = allThemeExtensions.find(
        (e) =>
            findTheme(e.packageJSON.contributes.themes, currentTheme) !== null
    );

    if (!themeExtension) {
        throw new Error(
            `Extension containing current theme "${currentTheme}" was not found.`
        );
    }

    const extensionIdentifier = (themeExtension.packageJSON.id ??
        themeExtension.packageJSON.identifier._lower) as string;
    const extensionName = themeExtension.packageJSON.displayName as string;
    const themeAuthor = themeExtension.packageJSON.publisher as string;
    const themeContrib = findTheme(
        themeExtension.packageJSON.contributes.themes,
        currentTheme
    );
    const themeName = getThemeLabel(themeContrib);

    return {
        extensionIdentifier,
        extensionName,
        themeAuthor,
        themeName,
    };
}

function findTheme(themes: ThemeContrib[], currentTheme: string) {
    const index = themes.findIndex(
        (t) => t.id === currentTheme || t.label === currentTheme
    );
    if (index === -1) {
        return null;
    }
    return themes[index];
}

function getThemeLabel(theme: ThemeContrib | null) {
    if (theme?.label) {
        return theme.label;
    }

    if (theme?.id) {
        return theme.id;
    }

    throw new Error(
        "Could not determine id/label of theme. " + JSON.stringify(theme)
    );
}

interface ThemeContrib {
    id?: string;
    label?: string;
}
