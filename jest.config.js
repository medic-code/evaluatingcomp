module.exports = {
    testEnvironment: 'node',
    clearMocks:true,
    coverageProvider: 'v8',
    testMatch: [
        '**/tests/**/*.js',
        '**/?(*.)+(test).js'
    ],
    testPathIgnorePatterns: ['node_modules']

}