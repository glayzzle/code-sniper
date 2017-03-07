/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

var Fixer = function(rule, location, action, description) {
  this.rule = rule;
  this.location = location;
  this.action = action;
  this.description = description;
};

Fixer.prototype.process = function() {
  this.action.process(this);
  return this;
};

module.exports = Fixer;
