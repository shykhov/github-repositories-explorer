module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-curly-newline': 0,
    '@typescript-eslint/unbound-method': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    'eslintreact/prop-types': 0,
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['draft'] }],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'comma-dangle': [2, 'always-multiline'],
    'import/imports-first': 2,
    'import/newline-after-import': 2,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'import/order': [
      2,
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index'],
      },
    ],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
        ignoredNodes: [
          'ConditionalExpression',
          'CallExpression',
          'LogicalExpression',
          'ObjectExpression',
          'MemberExpression',
          'ArrayExpression',
        ],
      },
    ],
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-for': 2,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': [
      2,
      {
        components: [],
      },
    ],
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/no-array-index-key': 0,
    'react/destructuring-assignment': [2, 'always', { ignoreClassFields: true }],
    'require-yield': 0,
    'prefer-destructuring': 0,
    'react-hooks/exhaustive-deps': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
