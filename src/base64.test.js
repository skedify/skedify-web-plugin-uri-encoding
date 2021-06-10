describe('native', () => {
  const { btoa, atob } = require('./base64');

  it('should use the native btoa when available', () => {
    expect(btoa('Hello World')).toEqual('SGVsbG8gV29ybGQ=');
  });

  it('should use the native atob when available', () => {
    expect(atob('SGVsbG8gV29ybGQ=')).toEqual('Hello World');
  });
});
