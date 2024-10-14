const vscode = require('vscode');

function activate(context) {
    const provider = new UrlViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(UrlViewProvider.viewType, provider)
    );

    let disposable = vscode.commands.registerCommand('url-viewer.openSidebar', () => {
        vscode.commands.executeCommand('workbench.view.extension.url-viewer');
    });

    context.subscriptions.push(disposable);
}

class UrlViewProvider {
    static viewType = 'url-viewer.urlView';

    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }

    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }

    _getHtmlForWebview(webview) {
        const url = 'https://example.com'; // Replace with your desired URL

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>URL Viewer</title>
            </head>
            <body>
                <iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>
            </body>
            </html>
        `;
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
