/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */
var Rule = require('../../../rule');

var ClosingTag = Rule.extends(
  'zend.file.ClosingTag', function() {
  this.onToken('T_CLOSE_TAG', this.onCloseTag);
});

ClosingTag.prototype.onCloseTag = function(token) {
  var next = this.nextToken();
  while(!next.isEOF()) {
    if (!next.is('T_WHITESPACE')) return;
    next = this.nextToken();
  }
  // REACH THE END
  this.addFix(
    'remove', token
  );
  this.warningMessage(
    'zend',
    'PHP closing tag at EOF',
    token.location()
  );
};
