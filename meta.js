module.exports = {
    helpers: {
        if_or: function(v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this);
            }

            return options.inverse(this);
        },
    },
    prompts: {
        name: {
            type: 'string',
            required: true,
            message: 'Project name',
        },
        description: {
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'my-project',
        },
        author: {
            type: 'string',
            message: 'Author',
        },
        host: {
            type: 'string',
            message: 'Host',
            default: 'localhost',
        },
        port: {
            type: 'string',
            message: 'Port',
            default: '8080',
        }
    },
    // 如果某些选项匹配上的话才会自动加入下面文件
    // filters: {
    //     '.eslintrc.js': 'lint',
    //     '.eslintignore': 'lint',
    //     'config/test.env.js': 'unit || e2e',
    //     'test/unit/**/*': 'unit',
    //     'build/webpack.test.conf.js': 'unit',
    //     'test/e2e/**/*': 'e2e',
    //     'src/router/**/*': 'router',
    // },
    completeMessage: 'To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack',
};