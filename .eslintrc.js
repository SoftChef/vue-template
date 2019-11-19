module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    extends: [
        'standard',
        'plugin:vue/essential'
    ],
    rules: {
        indent: 0,
        'no-undef': [0, { 'typeof': true }],
        'space-before-function-paren': ['error', 'never']
    }
}