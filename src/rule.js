/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

var Message = require('./message');

/**
 * Creates a new rule instance
 */
var Rule = function(visitor, type) {
  this.visitor = visitor;
};

Rule.extends = function(namespace, ctor) {

};

Rule.prototype.scanChilds = function(ast, cb) {

};

Rule.prototype.nextToken = function() {

}:


Rule.prototype.onToken = function(selector, cb) {

};

Rule.prototype.onNode = function(selector, cb) {

};

Rule.prototype.onFileReady = function(cb) {

};

Rule.prototype.onScanReady = function(cb) {

};

Rule.prototype.addFix = function() {
  // TODO
};


Rule.prototype.addMessage = function(level, key, message, position) {
  if (!position) {
    // TODO retrieve the position of current node / token from the parser
  }
  var message = new Message(this, level, key, message, position);
  this.visitor.getReport().addMessage(
    this.visitor.filename,
    message
  );
  return message;
};

/**
 * Sends a critical message
 */
Rule.prototype.criticalMessage = function(key, message, position) {
  return this.addMessage(Message.LEVEL_CRITICAL, key, message, position);
};

/**
 * Sends an important message
 */
Rule.prototype.importantMessage = function(key, message, position) {
  return this.addMessage(Message.LEVEL_IMPORTANT, key, message, position);
};

/**
 * Sends a warning
 */
Rule.prototype.warningMessage = function(key, message, position) {
  return this.addMessage(Message.LEVEL_WARNING, key, message, position);
};

/**
 * Appends a notice message
 */
Rule.prototype.noticeMessage = function(key, message, position) {
  return this.addMessage(Message.LEVEL_NOTICE, key, message, position);
};

// Exports the rule
module.exports = Rule;
