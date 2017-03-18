var should = require("should");
var Session = require('../src/session');

describe('Test the session API', function() {
  it('should set/get', function() {
    var instance = new Session();
    instance.set('foo.php', 'foo', 'bar');
    instance.getValue('foo.php', 'foo').should.be.exactly('bar');
    instance.set('foo.php', 'foo', 'baz');
    instance.getValue('foo.php', 'foo').should.be.exactly('baz');
    instance.set('bar.php', 'foo', 'bar');
    instance.getValue('bar.php', 'foo').should.be.exactly('bar');
    instance.getValues('foo').length.should.be.exactly(2);
  });
  it('should clear', function() {
    var instance = new Session();
    instance.set('foo.php', 'foo', 'bar');
    instance.getValue('foo.php', 'foo').should.be.exactly('bar');
    instance.clear('foo.php');
    (instance.getValue('foo.php', 'foo') === null).should.be.exactly(true);
  });
});
