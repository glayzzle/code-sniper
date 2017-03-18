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
    var messages = scan.report.getMessages('foo.php');
    messages.length.should.be.exactly(1);
    messages[0].level.should.be.exactly('critical');
    messages[0].text.should.be.exactly('Parse Error : syntax error, unexpected \'?\' on line 1');
    messages[0].location.start.line.should.be.exactly(1);
    messages[0].location.end.line.should.be.exactly(1);
    messages[0].rule.namespace.should.be.exactly('parser');
  });
});
