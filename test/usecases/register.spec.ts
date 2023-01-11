import Register from "../../src/usecases/register";

describe('Name of the group', () => {
  it('should return foobar', () => {
    const register = new Register();
    expect(register.exec()).toBe('foobar');
  });
});