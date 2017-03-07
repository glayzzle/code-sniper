/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-snipper/graphs/contributors
 * @url http://glayzzle.com
 */

var Report = require('./src/report');
var Session = require('./src/session');
var Visitor = require('./src/visitor');
var phpParser = require('php-parser');

/**
 * Main class for handling parsing
 */
var Snipper = function(options) {
  this.setOptions(options);
};

/**
 *
 */
Snipper.prototype.setOptions = function(options) {
  this.options = options;
  this.clear();
  return this;
};

/**
 * Clean up current report informations
 */
Snipper.prototype.clear = function() {
  this.parser = new phpParser(
    'parser' in this.options ? this.options.parser : null
  );
  this.report = new Report();
  this.session = new Session();
  this.visitor = new Visitor(this);
  return this;
};


/**
 * Gets the php-parser instance in order to manually parse things
 */
Snipper.prototype.getParser = function() {
  return this.parser;
};

/**
 * Parses the current file and returns its AST
 */
Snipper.prototype.parseFile = function(filename, buffer) {
  return this.parser.parseCode(buffer, filename);
};


module.exports = Snipper;
