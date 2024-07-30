import globals from 'globals';
import pluginJs from '@eslint/js';
import jest from 'eslint-plugin-jest';

export default [
  {files: ['**/*.js'], languageOptions: {sourceType: 'script'}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,

  {
      rules: {
        'no-trailing-spaces': 1,
        'semi': 1,
        'use-isnan': 1,
        'valid-typeof': 1,
        'arrow-spacing': [1, {'before':true, 'after':true}],
        'func-call-spacing': [1, 'never'],
        'semi-spacing': [1, {'before': false, 'after': true}],
        'space-before-function-paren': [1, {'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always'}],
        'brace-style': [1, '1tbs', {'allowSingleLine': true}],
        'quotes': [1, 'single', { 'avoidEscape': true }]
      }
  },
  {
    ...jest.configs['flat/recommended'],
    files: ['test/**.js', 'test/**.mjs'],
    rules: {
        'no-conditional-expect': 0
    }
  }
];

