module.exports = {
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ['../src/__tests__/appendSignature.test.js'],
    testTimeout: 30000,
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"]
}

