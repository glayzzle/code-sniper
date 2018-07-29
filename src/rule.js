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
 * Retrieves a Rule from the specified namespace
 */
Rule.get = function(namespace) {
  // Loads the specified rule
  if (!(namespace in rules)) {
    require('./rules/' + namespace.replace(/\./g, '/'));
    if (!(namespace in rules)) {
      throw new Error('Undefined rule "' + namespace + '"');
    }
  }
  return rules[namespace];
}

/**
 * Retrieves a rule
 */
Rule.create = function(visitor, namespace) {
  var ctor = Rule.get(namespace);
  var rule = new ctor();
  rule.visitor = visitor;
  rule.namespace = namespace;
  return rule;
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
};


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

/**
 * Stores a value into the session
 */
Rule.prototype.setSession = function(key, value) {
  return this.visitor.getSession().setValue(
    this.visitor.filename, key, value
  );
  return this;
};

/**
 * Gets a value from the session
 */
Rule.prototype.getSession = function(key) {
  return this.visitor.getSession().getValue(
    this.visitor.filename, key
  );
};

/**
 * Creates a new message
 */
Rule.prototype.addMessage = function(level, message, position) {
  if (!position) {
    position = this.visitor.getPosition();
  }
  var message = new Message(this, level, position, message);
  this.visitor.getReport().addMessage(
    this.visitor.filename,
    message
  );
  return message;
};

/**
 * Sends a critical message
 */
Rule.prototype.criticalMessage = function(message, position) {
  return this.addMessage(Message.LEVEL_CRITICAL, message, position);
};

/**
 * Sends an important message
 */
Rule.prototype.importantMessage = function(message, position) {
  return this.addMessage(Message.LEVEL_IMPORTANT, message, position);
};

/**
 * Sends a warning
 */
Rule.prototype.warningMessage = function(message, position) {
  return this.addMessage(Message.LEVEL_WARNING, message, position);
};

/**
 * Appends a notice message
 */
Rule.prototype.noticeMessage = function(message, position) {
  return this.addMessage(Message.LEVEL_NOTICE, message, position);
};

// Exports the rule
module.exports = Rule;
