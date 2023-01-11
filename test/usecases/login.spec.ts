import Login from "../../src/usecases/login";

describe('Name of the group', () => {
  it('should return foobar', () => {
    const login = new Login();
    expect(login.exec()).toBe('foobar');
  });
});