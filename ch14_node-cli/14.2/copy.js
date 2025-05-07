#!/usr/bin/env node
const {program} = require('commander');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer').default;
const chalk = require('chalk');

const exist = (dir) => {
    try {
      fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch (e) {
      return false;
    }
  };

  const copyFile = (nameOrigin, nameCopy) => {
        fs.writeFileSync(nameCopy,fs.readFileSync(nameOrigin));
  };

   program
      .version('0.0.1', '-v, --version')
      .name('cli');
  
  
      program
          .action((options, command) => {
              if(command.args.length !==0 ){
                  console.log(chalk.bold.red('해당 명령어를 찾을 수 없습니다.'));
                  program.help();
              } else {
                inquirer.prompt([{
                      type:'input',
                      name:'nameOrigin',
                      message:'복사할 파일을 입력하세요.',
                  },{
                      type:'input',
                      name:'nameCopy',
                      message:'새로운 파일의 이름을 입력하세요.',
                      default:'index',
                  },{
                      type:'confirm',
                      name:'confirm',
                      message:'생성하시겠습니까?',
                  }])
                  .then((answers)=>{
                      if(answers.confirm) {
                          copyFile(answers.nameOrigin, answers.nameCopy);
                          console.log(chalk.rgb(128,128,128)('터미널을 종료합니다.'));
                      }
                  });
              }
          })
          .parse(process.argv);