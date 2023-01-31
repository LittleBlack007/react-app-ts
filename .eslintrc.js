module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "6",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
      // 'linebreak-style': ['error', 'unix'],
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn',
      // 'react/jsx-uses-react': 'error',
      // 'react/jsx-uses-vars': 'error',
      // 'react/react-in-jsx-scope': 'error',
      // 'valid-typeof': [
      //   'error',
      //   {
      //     requireStringLiterals: false
      //   }
      // ]
      '@typescript-eslint/no-var-requires': 'off'
    }
}
