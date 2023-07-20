/*
 * @Author: hejiyong@tech-now.com hejy@tech-now.com
 * @Date: 2023-07-19 13:41:46
 * @LastEditors: hejiyong@tech-now.com hejy@tech-now.com
 * @LastEditTime: 2023-07-20 16:12:08
 * @FilePath: \protobuf tools\src\extension.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const vscode = require('vscode');

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
exports.activate = function(context) {
    console.log('恭喜，您的扩展“protobuf tools”已被激活！');
    require('./protobuf')(context); // protobuf
};

/**
 * 插件被释放时触发
 */
exports.deactivate = function() {
    console.log('您的扩展“protobuf tools”已被释放！')
};

