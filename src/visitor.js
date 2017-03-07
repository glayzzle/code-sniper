/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

var defaultRules = [
  
];

var Visitor = function(sniper) {
  this.sniper = sniper;
  this.rules = [];
};

Visitor.prototype.addRule = function() {

};

Visitor.prototype.getSession = function() {
  return this.sniper.session;
};

Visitor.prototype.getReport = function() {
  return this.sniper.report;
};

Visitor.prototype.getParser = function() {
  return this.sniper.parser;
};


module.exports = Visitor;
