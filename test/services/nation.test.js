const assert = require('assert');
const app = require('../../src/app');

describe('\'nation\' service', () => {
  it('registered the service', () => {
    const service = app.service('nation');

    assert.ok(service, 'Registered the service');
  });
});
