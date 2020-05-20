#!/usr/bin/env node
const figlet = require('figlet');
const path = require('path');
const clear = require('clear');
const inquirer = require('inquirer');
const fs = require('fs');
const dirname = (dir) => path.resolve('./', dir);
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
  const inputFileName =Object.values(response).join('/');
  const generateFomat = path.format({
    dir: argv0.join('/'),
    name: 'index.js'
  });
  const templateFormat = path.format({
    dir: path.resolve(__dirname, `../${inputFileName}`),
    name: 'index.js'
  });
  isExists(generateFomat, templateFormat);
});

function isExists(generate = {}, template = {}) {
    const parsePath  = path.parse(generate);
    const { dir } = parsePath;
    fs.exists(dirname(dir), function(exists){
      if(!exists){
        fs.mkdir(dirname(dir), function(success){
          if(success){
            throw success;
          }
        });
      }
      fs.copyFile(template, dirname(path.format(parsePath)), function(error){
          if(error){
            throw error;
          }
        });
    });
}


