module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    plugins: ['react-refresh'],
    rules: {
        // React specific
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'react/prop-types': 'off',
        'react/no-unknown-property': ['error', {
            ignore: [
                // Three.js / React Three Fiber props
                'attach', 'args', 'position', 'rotation', 'scale',
                'intensity', 'castShadow', 'receiveShadow', 'shadow-mapSize',
                'shadow-bias', 'angle', 'penumbra', 'object', 'dispose'
            ]
        }],

        // General
        'no-unused-vars': ['warn', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
        }],
        'no-console': 'warn',

        // Accessibility
        'jsx-a11y/alt-text': 'off', // Using aria-hidden for 3D canvas
    },
}
