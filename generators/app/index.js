'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the delightful ${chalk.red(
          'generator-simple-playground-tester'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Please write your project name: ',
        default: this.appname
      }
    ];

    return this.prompt(prompts).then(answer => {
      // To access props later use this.props.someAnswer;
      this.props = answer;
      this.destinationRoot(answer.name);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name
      }
    );
    this.fs.copy(this.templatePath('index.html'), this.destinationPath('index.html'));
    this.fs.copy(this.templatePath('style.css'), this.destinationPath('style.css'));
    this.fs.copy(this.templatePath('scripts.js'), this.destinationPath('scripts.js'));
  }

  install() {
    this.npmInstall();
  }
};
