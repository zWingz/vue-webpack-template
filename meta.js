const path = require('path')
const fs = require('fs')
const {
  sortDependencies,
  installDependencies,
  runLintFix,
  runGitInit,
  printMessage
} = require('./utils')

module.exports = {
  helpers: {
    if_or: function(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    }
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'my-project'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    host: {
      type: 'string',
      message: 'Host',
      default: 'localhost'
    },
    port: {
      type: 'string',
      message: 'Port',
      default: '8080'
    },
    sass: {
      type: 'confirm',
      message: 'use sass?'
    },
    multipage: {
      type: 'confirm',
      message: 'is multipage?',
      default: false
    },
    frame: {
      type: 'list',
      message: 'Pick an frame',
      choices: [
        {
          name: 'Vue (https://github.com/vuejs)',
          value: 'vue',
          short: 'vue'
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none'
        }
      ],
      default: 'none'
    },
    indent: {
      type: 'list',
      choices: [
        {
          name: '2 space',
          value: '2',
          short: '2'
        },
        {
          name: '4 space',
          value: '4',
          short: '4'
        }
      ],
      defalut: '2'
    },
    docker: {
      type: 'confirm',
      message: 'use docker?'
    }
  },
  // 如果某些选项匹配上的话才会自动加入下面文件
  filters: {
    'src/js/createApp.js': 'frame === "vue"',
    'src/js/createRouter.js': 'frame === "vue"',
    'src/js/registerComponent.js': 'frame === "vue"',
    'src/router/*': 'frame === "vue"',
    'src/sass/*': 'sass',
    'src/sass/markdown.scss': 'frame !== "vue"',
    'src/css/*': '!sass',
    'src/css/markdown.css': 'frame !== "vue"',
    'src/store/*': 'frame === "vue"',
    'src/components/HelloWorld.vue': 'frame === "vue"',
    'src/assets/vue-logo.png': 'frame === "vue"',
    'src/view/*': 'multipage',
    'src/view/App.vue': 'multipage&&frame === "vue"',
    'src/main.js': '!multipage',
    'src/App.vue': '!multipage&&frame === "vue"',
    'docker-compose.yml': 'docker',
    'depoly.sh': 'docker'
  },
  // completeMessage: 'To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/zWingz/webpack-template',
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.destDirName)
    installDependencies(cwd, green)
      .then(() => {
        return runLintFix(cwd, data, green)
      })
      .then(() => {
        return runGitInit(cwd, data, green)
      })
      .then(() => {
        printMessage(data, green)
      })
      .catch(e => {
        console.log(chalk.red('Error:'), e)
      })
  }
}
