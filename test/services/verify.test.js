const app = require('../../src/app');

describe('\'verify\' service', () => {
  it('registered the service', () => {
    const service = app.service('verify');
    expect(service).toBeTruthy();
  });
});
