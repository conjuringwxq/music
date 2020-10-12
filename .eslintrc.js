module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', // <--- THIS IS THE NEW RULE
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    'no-new': 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'import/export': 'off',
    'react/no-array-index-key': 'off',
  },
};
