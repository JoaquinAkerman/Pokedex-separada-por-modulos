module.exports = {
  verbose: true,
  roots: ['<rootDir>/modules'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '.*fixture.js', '/fixtures/'],
  coveragePathIgnorePatterns: ['/node_modules/', '.*fixture.js', '/fixtures/'],
};
