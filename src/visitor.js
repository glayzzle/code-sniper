/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-snipper/graphs/contributors
 * @url http://glayzzle.com
 */

var defaultRules = [
  
];

var Visitor = function(snipper) {
  this.snipper = snipper;
  this.rules = [];
};

Visitor.prototype.addRule = function() {

};

Visitor.prototype.getSession = function() {
  return this.snipper.session;
};

Visitor.prototype.getReport = function() {
  return this.snipper.report;
};

Visitor.prototype.getParser = function() {
  return this.snipper.parser;
};


module.exports = Visitor;
