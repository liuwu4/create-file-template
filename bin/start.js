#!/usr/bin/env node
const figlet = require('figlet');
const path = require('path');
const clear = require('clear');
const inquirer = require('inquirer');
const fs = require('fs');
const dirname = path.resolve('./');
const argv0 = process.argv.slice(2);
const defaultValue = ['react', 'react-native'];
const defaultComponent = ['class', 'function'];
clear();
figlet('create-file-template', (error, _data) => {
    if (error) {
        console.error('显示错误');
        return;
    }
});

const questions = [
    {
        type: 'list',
        name: '请选择',
        default: 'react',
        choices: defaultValue,
        messag: '请选择需要生成的模板文件',
        validate: function (value) {
            console.log('selected type', value);
            return true;
        }
    },
    {
        name: '组件类型',
        type: 'list',
        default: 'class',
        choices: defaultComponent,
        validate: function (value) {
            console.log(`It is component type ${value}`);
            return true;
        }
    }];
inquirer.prompt(questions).then(response => {
    isExists(argv0, Object.values(response).join('\\'));
});

function isExists(filename = [], sourcePath) {
    let mergePath = dirname;
    filename.forEach(item => {
        mergePath = `${mergePath}\\${item}`;
        console.log("mergePath", mergePath);
        fs.exists(mergePath, function (exists) {
            if (!exists) {
                fs.mkdirSync(mergePath, function (success) {
                    if (success) {
                        console.error(`error:${success}`);
                    }
                });
            }
            fs.copyFile(`${sourcePath}\\index.js`, `${mergePath}\\index.js`, function (error) {
                console.log('error:', error);
                if (error) {
                    console.error(`errops:${error}`);
                }
            });
        })
    });
}


