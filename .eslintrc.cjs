module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['react-refresh'],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/consistent-type-definitions': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
    settings: {
        react: { version: 'detect' },
    },
};
