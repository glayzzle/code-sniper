var should = require("should");
var Sniper = require('../index');

describe('Test the visitor API', function() {
  var scan = new Sniper({
    parser: {
      parser: {
        suppressErrors: true,
        extractDoc: true
      },
      ast: {
        withPositions: true
      }
    }
  });
  it('test parser AST', function() {
    var ast = scan.parser.parseCode('<?php echo true;', 'foo.php');
    ast.kind.should.be.exactly('program');
  });
  it('test errors', function() {
    var ast = scan.parser.parseCode('<?php echo ?!?', 'foo.php');
    ast.kind.should.be.exactly('program');
    scan.report.getMessages('foo.php').length.should.be.exactly(1);
  });
});
