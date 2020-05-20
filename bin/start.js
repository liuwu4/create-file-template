#!/usr/bin/env node
const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');
const { startTemplate } = require('../src/SelectedConfig');
clear();
figlet.textSync(chalk.red('create-file-template'), (error, _data) => {
    if (error) {
        console.error('显示错误');
        return;
    }
});
startTemplate();
