/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */
var Rule = require('../../../rule');

var CyclomaticComplexity = Rule.register(
  'generic.metrics.CyclomaticComplexity', function() {
  /**
   * A complexity higher than this value will throw a warning.
   *
   * @var int
   */
  this.complexity = 10;
  /**
   * A complexity higher than this value will throw an error.
   *
   * @var int
   */
  this.absoluteComplexity = 20;

  // defines a list of nodes that increase the cyclomatic
  this.cyclomaticNodes = [
    'if', 'while', 'do',
    'for', 'foreach', 'switch',
    'case', 'catch'
  ];

  // Registers
  this.onNode('method, function, closure', this.onVisitMethod);
});

/**
 * Calculate the ciclomatic of the node
 * @see https://github.com/squizlabs/PHP_CodeSniffer/blob/master/CodeSniffer/Standards/Generic/Sniffs/Metrics/CyclomaticComplexitySniff.php#L71
 */
CyclomaticComplexity.prototype.onVisitMethod = function(node) {
  var complexity = 0;
  this.scanChilds(node, function(child) {
    if (this.cyclomaticNodes.indexOf(child.kind) !== -1) {
      complexity++;
    }
  }.bind(this));
  if (complexity > this.absoluteComplexity) {
    return this.importantMessage(
      'MaxExceeded',
      'Function\'s cyclomatic complexity (' +
      complexity + ') exceeds allowed maximum of ' +
      this.absoluteComplexity
    );
  } else if (complexity > this.complexity) {
    return this.warningMessage(
      'TooHigh',
      'Function\'s cyclomatic complexity (' +
      complexity + ') exceeds ' + this.absoluteComplexity +
      ', consider refactoring the function'
    );
  }
};

module.exports = CyclomaticComplexity;
