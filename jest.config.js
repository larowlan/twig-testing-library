module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testMatch: ['<rootDir>/tests/*.js'],
  transform: {
    '^.+\\.js?$': `<rootDir>/jest-preprocess.js`,
  },
};
