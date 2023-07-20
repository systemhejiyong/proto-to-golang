const vscode = require('vscode');

function getFileName(filePath) {
    const lastIndex = filePath.lastIndexOf('\\');
    return filePath.substring(lastIndex + 1);
}

function getDirectoryPath(filePath) {
    const lastIndex = filePath.lastIndexOf('\\');
    return filePath.substring(0, lastIndex + 1);
}

function getPathLevel(filePath, level) {
    const parts = filePath.split('\\');
    if (level >= 0 && level < parts.length - 1) {
        return parts.slice(0, level + 1).join('\\') + '\\';
    } else {
        return filePath;
    }
}

// 获取文件后缀的函数
function getFileExtension(fileName) {
    const lastIndex = fileName.lastIndexOf('.');
    if (lastIndex !== -1 && lastIndex < fileName.length - 1) {
      return fileName.substring(lastIndex + 1);
    } else {
      return '';
    }
}
  
// 获取除去后缀的文件名的函数
function getFileNameWithoutExtension(fileName) {
    const lastIndex = fileName.lastIndexOf('.');
    if (lastIndex !== -1) {
      return fileName.substring(0, lastIndex);
    } else {
      return fileName;
    }
}


// function mentuActivate(context) {
//     context.subscriptions.push(vscode.commands.registerCommand("GeoJsonViewer.askQuestion", async () => {
//         let answer = await vscode.window.showInformationMessage("How was your day ?", "good", "bad",)
//         if (answer === "bad") {
//             vscode.window.showInformationMessage("sorry to hear it")
//         } else {
//             console.log({ answer })
//         }
//     }))
// }


module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.prototool', function () {
		vscode.window.showInformationMessage('将Protobuf文件生成goland代码');
        let editor = vscode.window.activeTextEditor;
        console.log("====>文件地址 ", editor.document.uri.fsPath);
        console.log("====>文件地址 ", editor.document.uri);
        var path = editor.document.uri.fsPath;
        vscode.window.showInformationMessage("地址为：" + path);

        var fileDirs=  path.split('\\');
        var nameIndex = fileDirs.length
        var fileName = getFileName(path)
        var fileDir = getDirectoryPath(path)
        var fileDir2 = ''
        if (path.indexOf('/ext/') != -1) {
            fileDir2 = getPathLevel(path, fileDirs.length - 3)
        } else {
            fileDir2 = getPathLevel(path, fileDirs.length - 4)
        }
        console.log("-----> ", fileDir2)
        console.log(fileName, fileDir, fileDir2)

        var prefix = getFileExtension(fileName)
        var prefixName = fileName
    
        if (prefix != "proto") {
            console.log("---->[error] proto file: ", "params error: not proto file")
            vscode.window.showErrorMessage("[error] proto file: params error: not proto file");
            return
        }

        var cmdprotoc = [
            "protoc",
            `--proto_path=${fileDir}`,
            `--micro_out=${fileDir2}protosService`,
            `--go_out=${fileDir2}protosService`,
            fileName
        ]
        
        var cmdProtocGoInjectTag = [
            "protoc-go-inject-tag",
            `-input`,
            `${fileDir2}protosService/${prefixName}.pb.go`,
        ]

        var cmdprotoc2 = [
            "protoc",
            `--proto_path=${fileDir}`,
            `--go_out=${fileDir2}protosService`,
            `--micro_out=${fileDir2}protosService`,
            fileName
        ]

        console.log(cmdprotoc.join(' '))
        console.log(cmdProtocGoInjectTag.join(' '))
        console.log(cmdprotoc2.join(' '))
        
        const terminal = vscode.window.createTerminal(); // 创建终端
        const disposable = vscode.window.onDidCloseTerminal((closedTerminal) => {
            if (terminal === closedTerminal) {
                disposable.dispose(); // 关闭终端时释放资源
            }
        });

        // 在终端中执行命令
        terminal.sendText(cmdprotoc.join(' '));
        terminal.sendText(cmdProtocGoInjectTag.join(' '));
        terminal.sendText(cmdprotoc2.join(' '));
        terminal.show();

        vscode.window.showInformationMessage("已推送生成，详情请看日志");
	}));
};
