import Whoami from "../../src/usecases/whoami";

describe('Name of the group', () => {
  it('should return foobar', () => {
    const whoami = new Whoami();
    expect(whoami.exec()).toBe('foobar');
  });
});