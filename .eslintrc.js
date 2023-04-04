// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        // 防止使用 console 输出，当使用时发出警告
        'no-console': 'error',

        // 防止未使用的变量声明，当出现未使用的变量时发出警告
        'no-unused-vars': 'warn',

        // 防止使用未声明的变量，当使用未声明的变量时发出错误
        'no-undef': 'error',

        // 防止在变量定义之前使用变量，当使用未定义的变量时发出错误
        'no-use-before-define': 'error',

        // 强制使用分号结束语句，当省略分号时发出错误
        semi: ['error', 'always'],

        // 强制使用单引号，当使用双引号时发出错误
        quotes: ['error', 'single'],

        // 强制使用 2 个空格缩进，当使用其他缩进方式时发出错误
        indent: 'off',

        // 强制对象和数组的结尾必须有逗号，除非在同一行结尾
        'comma-dangle': ['error', 'always-multiline'],

        // 禁止行末出现空格
        'no-trailing-spaces': 'error',
        // 强制 getter 和 setter 在对象中成对出现
        'accessor-pairs': 'error',

        // 强制箭头函数体使用大括号
        'arrow-body-style': ['error', 'as-needed'],

        // 强制箭头函数的参数使用圆括号
        'arrow-parens': ['error', 'always'],

        // 强制箭头函数的箭头前后有空格
        'arrow-spacing': 'error',

        // 禁止在条件语句中使用赋值操作符
        'no-cond-assign': 'error',

        // 禁止在条件语句中使用常量表达式
        'no-constant-condition': 'error',

        // 禁止对 const 声明重新赋值
        'no-const-assign': 'error',

        // 禁止在正则表达式中使用控制字符
        'no-control-regex': 'error',

        // 禁止使用 eval 函数
        'no-eval': 'error',

        // 禁止使用不必要的函数绑定
        'no-extra-bind': 'error',

        // 禁止不必要的布尔类型转换
        'no-extra-boolean-cast': 'error',

        // 禁止对函数声明重新赋值
        'no-func-assign': 'error',

        // 禁止在嵌套的代码块中出现函数声明
        'no-inner-declarations': 'error',

        // 禁止在 RegExp 构造函数中出现无效的正则表达式
        'no-invalid-regexp': 'error',

        // 禁止在类成员中出现重复的名称
        'no-dupe-class-members': 'error',

        // 禁止在对象字面量中出现重复的属性名称
        'no-dupe-keys': 'error',

        // 禁止在 switch 语句中出现重复的 case 标签
        'no-duplicate-case': 'error',

        // 禁止出现空代码块
        'no-empty': 'error',

        // 禁止在正则表达式中出现空字符集
        'no-empty-character-class': 'error',

        // 禁止在 try-catch 语句中出现空代码块
        'no-empty-pattern': 'error',

        // 禁止在函数参数中出现重复命名的参数
        'no-dupe-args': 'error',

        // 禁止使用多个空格来缩进代码
        'no-multi-spaces': 'error',

        // 禁止出现多行空行
        'no-multiple-empty-lines': 'error',

        // 禁止出现没有意义的分号
        'no-extra-semi': 'error',

        // 禁止在对象字面量中使用不必要的计算属性名称
        'no-useless-computed-key': 'error',

        // 禁止在函数中出现不必要的 return 语句
        'no-useless-return': 'error',
        // 禁止使用 var 声明变量
        'no-var': 'error',

        // 禁止将变量初始化为 undefined
        'no-undef-init': 'error',

        // 禁止在 finally 语句块中出现控制流语句
        'no-unsafe-finally': 'error',

        // 强制在对象字面量中键和值之间使用一致的空格
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],

        // 强制一行的最大长度
        'max-len': ['error', { code: 120 }],

        // 强制函数中的最大参数数量
        'max-params': ['error', { max: 3 }],

        // 强制操作符周围有空格
        'space-infix-ops': 'error',

        // 强制模板字符串中的空格
        'template-curly-spacing': ['error', 'always'],

        // 强制在注释中使用一致的空格
        'spaced-comment': ['error', 'always'],

        // 强制在逗号前后使用一致的空格
        'comma-spacing': ['error', { before: false, after: true }],

        // 强制在花括号内使用一致的空格
        'object-curly-spacing': ['error', 'always'],

        // 强制函数括号前空格的一致性
        'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],

        // 强制在块级作用域开头或结尾使用空行
        'padded-blocks': ['error', 'never'],

        // 强制使用一致的换行符风格
        'linebreak-style': ['error', 'unix'],

        // 禁止使用 debugger
        'no-debugger': 'warn',

        // 禁止空函数
        'no-empty-function': 'warn',

        // 禁止对 undefined 重新赋值
        'no-undefined': 'warn',
    },
};
