/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

import Report from './src/report';
import Session from './src/session';
import Visitor from './src/visitor';
import phpParser from 'php-parser';

/**
 * Main class for handling parsing
 */

export default class Sniper {

  constructor(options) {
    this.setOptions(options ? options : {});
  }

  /**
   *
   */
  setOptions(options) {
    this.options = options;
    this.clear();
    return this;
  }

  /**
   * Clean up current report informations
   */
  clear() {
    this.parser = new phpParser(
      'parser' in this.options ? this.options.parser : null
    );
    this.report = new Report();
    this.session = new Session();
    this.visitor = new Visitor(this);
    return this;
  }


  /**
   * Gets the php-parser instance in order to manually parse things
   */
  getParser() {
    return this.parser;
  }

  /**
   * Parses the current file and returns its AST
   */
  parseFile(filename, buffer) {
    return this.parser.parseCode(buffer, filename);
  }
}

