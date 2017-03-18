/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

/**
 * The message class
 */
var Message = require('./message');

/**
 * List of all registered rules
 */
var rules = {};


/**
 * Creates a new rule instance
 */
var Rule = function() {
  this.visitor = null;
  this.namespace = null;
};

/**
 * Declares a new rule
 */
Rule.extends = function(namespace, ctor) {
  if (typeof ctor !== 'function') {
    ctor = function() {};
  }
  ctor.prototype = Object.create(this.prototype);
  ctor.extends = this.extends.bind(ctor);
  ctor.prototype.constructor = ctor;
  rules[namespace] = ctor;
  return ctor;
};

/**
 * Retrieves a rule
 */
Rule.create = function(visitor, namespace) {
  if (namespace in rules) {
    var rule = new rules[namespace]();
    rule.visitor = visitor;
    rule.namespace = namespace;
  }
  return null;
};

/**
 * Helper in order to iterate over each child
 */
Rule.prototype.scanChilds = function(ast, cb) {
  if (Array.isArray(ast)) {
    for(var i = 0; i < ast.length; i++) {
      this.scanChilds(ast[i], cb);
    }
  } else {
    if (ast && ast.kind) {
      cb.apply(this, [ast]);
    }
    if (typeof ast === 'object') {
      for(var k in ast) {
        var obj = ast[k];
        if (Array.isArray(obj)) {
          this.scanChilds(obj, cb);
        } else if (obj && obj.kind) {
          this.scanChilds(obj, cb);
        }
      }
    }
  }
  return this;
};

/**
 * Scans the next token
 */
Rule.prototype.nextToken = function() {
  return this.visitor.scanNextToken();
}:


Rule.prototype.on = function(selector) {
  return this;
};

Rule.prototype.onFileReady = function(cb) {
  return this;
};

Rule.prototype.onScanReady = function(cb) {
  return this;
};

Rule.prototype.addFix = function() {
  // TODO
};


Rule.prototype.addMessage = function(level, key, message, position) {
  if (!position) {
    position = this.visitor.getPosition();
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
