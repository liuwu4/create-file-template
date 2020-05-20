const path = require('path');
const fs = require('fs');

const inquirer = require('inquirer');

const dirname = (dir) => path.resolve('./', dir);
const argv0 = process.argv.slice(2);
const defaultValue = ['react', 'react-native'];
const defaultComponent = ['class', 'function'];
const defaultFileType = ['js', 'jsx', 'ts', 'tsx'];
const questions = [
  {
      type: 'list',
      name: 'template',
      message: '请选择需要生成的模板文件',
      default: 'react',
      choices: defaultValue
  },
  {
      type: 'list',
      name: 'component',
      message: '请选择组件类型',
      default: 'class',
      choices: defaultComponent,
     
  },
  {
    type: 'list',
    name: 'suffix',
    message: '请选择文件类型',
    default: 'js',
    choices: defaultFileType,
  }
];


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
function startTemplate() {
  if(argv0.length === 0){
    throw new Error('没有文件名');
  }
  inquirer.prompt(questions).then(response => {
    const { template, component, suffix } = response;
    const inputFileName = `${template}/${component}`;
    const generateFomat = path.format({
      dir: argv0.join('/'),
      name: `index.${suffix}`
    });
    const templateFormat = path.format({
      dir: path.resolve(__dirname, `../${inputFileName}`),
      name: 'index.js'
    });
    isExists(generateFomat, templateFormat);
  });
}
module.exports = {
  startTemplate
} 