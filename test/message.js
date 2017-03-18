var should = require("should");
var Message = require('../src/message');

describe('Test the message API', function() {
  it('constructor', function() {
    var msg = new Message(
      null,
      Message.LEVEL_CRITICAL,
      null,
      'Hello world'
    );
    msg.text.should.be.exactly('Hello world');
    msg.level.should.be.exactly(Message.LEVEL_CRITICAL);
  });
});
