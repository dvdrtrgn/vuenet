module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['vue'],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'vue/comment-directive': 'off',
    'no-irregular-whitespace': 'off',
    'max-len': ['error', { code: 120 }],
  },
};
