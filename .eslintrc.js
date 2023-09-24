const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
    // 解决 defineProps and defineEmits generate no-undef warnings
    'vue/setup-compiler-macros': true,
  },
  plugins: ['vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // typescript: {
      // },
      // alias: true,
    },
  },
  // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-globals
  globals: {
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    // '@antfu/eslint-config',
  ],
  rules: {
    // 禁用语句分号
    semi: [2, 'never'],
    // 使用单引号
    quotes: ['error', 'single'],
    'linebreak-style': [0, 'error', 'window'],
    // 禁止使用多余的包
    'import/no-extraneous-dependencies': 0,
    // 确保在导入路径内一致使用文件扩展名
    'import/extensions': 0,
    // 确保导入指向可以解析的文件/模块
    'import/no-unresolved': 0,
    // 首选默认导出导入/首选默认导出
    'import/prefer-default-export': 0,
    // 要求使用 let 或 const 而不是 var
    'no-var': 'error',
    // 禁止使用 new 以避免产生副作用
    'no-new': 0,
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 0,
    // 禁止标识符中有悬空下划线
    'no-underscore-dangle': 0,
    // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-confusing-arrow': 0,
    // 禁用一元操作符 ++ 和 --
    'no-plusplus': 0,
    // 禁止对 function 的参数进行重新赋值
    'no-param-reassign': 0,
    // 禁用特定的语法
    'no-restricted-syntax': 0,
    // 禁止在变量定义之前使用它们
    'no-use-before-define': 0,
    // 禁止直接调用 Object.prototypes 的内置属性
    'no-prototype-builtins': 0,
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': 'error',
    // 禁止重复模块导入
    'no-duplicate-imports': 0,
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 'error',
    // 禁止不必要的转义字符
    'no-useless-escape': 0,
    // 禁用 continue 语句
    'no-continue': 0,
    // 允许未使用的变量
    'no-unused-vars': 0,
    // 禁止未使用的表达式，单行表达式除外
    'no-unused-expressions': ['error', {
      allowShortCircuit: true,
    }],
    // 强制使用一致的缩进
    indent: ['error', 2, {
      SwitchCase: 1,
    }],
    // 强制使用骆驼拼写法命名约定
    camelcase: ['error', {
      properties: 'always',
    }],
    // 强制类方法使用 this
    'class-methods-use-this': 0,
    // 要求构造函数首字母大写
    'new-cap': 0,
    // 强制一致地使用 function 声明或表达式
    'func-style': 0,
    // 强制一行的最大长度
    'max-len': 0,
    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 0,
    // 强制switch要有default分支
    'default-case': 2,
    // 强制剩余和扩展运算符及其表达式之间有空格
    'rest-spread-spacing': 'error',
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': 'error',
    // 箭头函数参数期望有小括号()包围。
    'arrow-parens': 'off',
    // 只强制对象解构，不强制数组解构
    'prefer-destructuring': ['error', {
      object: true, array: false,
    }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'no-multiple-empty-lines': 2,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-trailing-spaces': 1, // 一行结束后面不要有空格
    'consistent-this': [2, 'that'], // this别名
    'no-dupe-args': [2],
    // 文件的最大行数
    'max-lines': ['error', {
      max: 600,
      skipBlankLines: true, // 忽略空白行
      skipComments: true, // 忽略只包含注释的行
    }],
    // 遇见对象花括号换行
    'object-curly-newline': ['error', {
      ObjectExpression: 'always',
      ObjectPattern: {
        multiline: true,
      },
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true,
        minProperties: 3,
      },
    }],
    'vue/attribute-hyphenation': 0,
    // 自定义组件名称 - 驼峰和连字符
    'vue/component-definition-name-casing': 0,
    // html 闭括号-换行
    'vue/html-closing-bracket-newline': [2, {
      singleline: 'never',
      multiline: 'always',
    }],
    // html 闭括号之前无空格
    'vue/html-closing-bracket-spacing': 2,
    // html 需要有结束标签，除了自闭合标签
    'vue/html-end-tags': 2,
    // 缩进html
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }],
    'vue/max-attributes-per-line': [2, {
      singleline: 4,
      multiline: 4,
    }],
    // 禁止组件已注册但未使用的情况
    'vue/no-unused-components': [2],
    'vue/multi-word-component-names': 0,
    'vue/no-setup-props-destructure': 'off',
    // 优先使用驼峰，element 组件除外
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: ['/^el-/', '/^a-/', '/^router-/'],
        registeredComponentsOnly: false,
      },
    ],
    // 优先使用 const
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
  },
})
