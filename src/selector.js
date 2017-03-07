/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

var Selector = function(rule) {
  this.rule = rule;
  this.tokens = {};
  this.nodes = {};
};

Selector.prototype.onToken = function(selector, cb) {

};

Selector.prototype.onNode = function(selector, cb) {

};

Selector.prototype.onAstReady = function(cb) {

};

Selector.prototype.onParseError = function(cb) {

};

Selector.prototype.clearState = function() {
  // clears the current state
};


Selector.prototype.appendToken = function(token) {

};

Selector.prototype.startNode = function(type) {

};

Selector.prototype.endNode = function(node) {

};

module.exports = Selector;
