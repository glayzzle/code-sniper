/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */
var Rule = require('../../../rule');

/**
 * PHP Syntax Linter
 */
module.exports = Rule.register('generic.php.Lint', function() {
  // shows only the first error
  this.onlyFirst = true;

  // Registers
  this.onNode('error: ast', function(err) {
    var hasError = this.getSession('error');
    if (this.onlyFirst && hasError) {
      return;
    }
    if (!hasError) {
      // stores the first found error
      this.setSession('error', err.message)
    }
    this.criticalMessage(err.message);

  }.bind(this));
});
