/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

var Action = function(type, action) {
  this.type = type;
  this.action = action;
};

Action.prototype.process = function(fixer) {
  // @todo here change data
};

module.exports = Fixer;
