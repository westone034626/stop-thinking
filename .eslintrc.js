module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'airbnb',
        'airbnb/hooks',
        'plugin:prettier/recommended',
        'prettier',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'react/jsx-filename-extension': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-else-return': 'off',
        'no-lonely-if': 'off',
        'react/prop-types': 'off',
        'consistent-return': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
