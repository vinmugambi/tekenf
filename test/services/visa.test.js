const app = require('../../src/app');

describe('\'visa\' service', () => {
  it('registered the service', () => {
    const service = app.service('visa');
    expect(service).toBeTruthy();
  });
});
