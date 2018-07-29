/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

var cssParser = require('unist-util-select');
var parser = new cssParser();
parser.registerNestingOperators('>', '+', '~');
parser.registerAttrEqualityMods('^', '$', '*', '~');

var Selector = function(selector) {
  this.state = {};
  var idxBody = selector.indexOf(':');
  var type = '';
  if (idxBody > -1) {
    type = selector.substring(0, idxBody).trim().toLowerCase();
    this.selector = selector.substring(idxBody).trim();
  } else {
    this.selector = selector;
  }
  if (type === 'token') {
    this.type = SELECTOR_TYPE_TOKEN;
  } else if (type === 'parser') {
    this.type = SELECTOR_TYPE_PARSER;
  } else {
    this.type = SELECTOR_TYPE_NODE;
  }
  this.rules = parser.parse(this.selector);

};

Selector.TYPE_NODE    = 1;
Selector.TYPE_TOKEN   = 2;
Selector.TYPE_PARSER  = 3;


Selector.prototype.isMatch = function(item) {
  
};

module.exports = Selector;
