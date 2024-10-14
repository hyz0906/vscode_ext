import * as vscode from 'vscode';

export class UrlViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'url-viewer.urlView';

    private _view?: vscode.WebviewView;

    constructor(
        private readonly _extensionUri: vscode.Uri,
    ) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        this.loadUrl(webviewView.webview, 'https://www.baidu.com'); // Replace with your desired URL
    }

    private loadUrl(webview: vscode.Webview, url: string) {
        webview.html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${url};">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>URL Viewer</title>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    iframe {
                        border: none;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                </style>
            </head>
            <body>
                <iframe src="${url}" sandbox="allow-scripts allow-same-origin allow-forms" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>
            </body>
            </html>
        `;
    }
}
