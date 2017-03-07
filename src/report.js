/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

var Report = function() {
  this.messages = {};
  this.fixes = {};
  this.stats = {
    messages: {
      severe: 0,
      warning: 0,
      important: 0,
      notice: 0
    },
    fixes: 0
  };
};

Report.prototype.clear = function(filename) {
  if (filename in this.messages) {
    for(var i = 0; i < this.messages[filename].length; i++) {
      this.stats.messages[this.messages[filename].level] --;
    }
    delete this.messages[filename];
  }
  if (filename in this.fixes) {
    this.stats.fixes -= this.fixes[filename].length;
    delete this.fixes[filename];
  }
  return this;
};

Report.prototype.getMessages = function(filename) {
  if (filename in this.messages) {
    return this.messages[filename];
  }
  return [];
};

Report.prototype.getFixes = function(filename) {
  if (filename in this.fixes) {
    return this.fixes[filename];
  }
  return [];
};

Report.prototype.addFix = function(filename, fix) {
  if (!(filename in this.fixes)) {
    this.fixes[filename] = [];
  }
  this.fixes[filename].push(fix);
  this.stats.fixes++;
};

Report.prototype.addMessage = function(filename, message) {
  if (!(filename in this.messages)) {
    this.messages[filename] = [];
  }
  this.messages[filename].push(message);
  this.stats.messages[message.level]++;
};

Report.prototype.getFixCount = function() {
  return this.stats.fixes;
};

Report.prototype.getMessageCount = function(level) {
  if (level in this.stats.messages) {
    return this.stats.messages[level];
  }
  return 0;
};

module.exports = Report;
