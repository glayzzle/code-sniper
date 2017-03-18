var should = require("should");
var Sniper = require('../index');

describe('Test the Sniper API', function() {
  var scan;
  it('should construct without options', function() {
    scan = new Sniper();
    (typeof scan.report).should.be.exactly('object');
    (typeof scan.session).should.be.exactly('object');
    (typeof scan.visitor).should.be.exactly('object');
    (typeof scan.getParser()).should.be.exactly('object');
  });
  it('should construct with options', function() {
    scan = new Sniper({});
    scan = new Sniper({
      parser: {}
    });
    (typeof scan.report).should.be.exactly('object');
    (typeof scan.session).should.be.exactly('object');
    (typeof scan.visitor).should.be.exactly('object');
    (typeof scan.getParser()).should.be.exactly('object');
  });
  it('should parse a file', function() {
    var ast = scan.parseFile('foo.php', '<?php echo $wuut;');
    (typeof ast).should.be.exactly('object');
    ast.kind.should.be.exactly('program');
    ast.children.length.should.be.exactly(1);
  });
});
