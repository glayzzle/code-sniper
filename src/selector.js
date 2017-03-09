/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */


var SELECTOR_TYPE_NODE    = 1;
var SELECTOR_TYPE_TOKEN   = 2;
var SELECTOR_TYPE_PARSER  = 3;

/**
 * Selector syntaxes :
 *
 * selector_type ::= 'AST' | 'TOKEN' | 'PARSER'
 * property_name ::= IDENTIFIER STRING
 * verifier ::= (
 *  '='    // equals to
 *  | '>'  // greater than
 *  | '<'  // lower than
 *  | '~'  // like (use * for pattern matching)
 *  | '!'  // not equals
 * ) VALUE
 * node ::= NODE_KIND | TOKEN_KIND
 * node_with_property ::= node '[' property_name verifier? ']'
 * node_hierarchy ::= ' ' | '>'
 * main ::= selector_type ':' node_with_property (node_hierarchy node_with_property)*
 */
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
};

Selector.prototype.isMatch = function(item) {

};

module.exports = Selector;
