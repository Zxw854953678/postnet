const app = require('../src/main');

describe('main', () => {
  it('can work', () => {
    expect(app.main()).toBe('Hello!');
  });
});