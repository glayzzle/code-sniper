/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com/code-sniper
 */
import Location from './location';
import Message from './message';
import Rule from './rule';

/**
 * Creates a new visitor (intercepts parsing calls)
 */
export default class Visitor {
  
  constructor(sniper) {
    this.sniper = sniper;
    this.rules = [];
    this.element = null;
    this.filename = null;
    var self = this;
    // injecting token scanner
    this.protoLexerNext = sniper.parser.lexer.next.bind(
      sniper.parser.lexer
    );
    sniper.parser.lexer.next = function() {
      self.element = self.protoLexerNext();
      try {
        self.triggerToken(self.element);
      } catch(e) {
        console.error(e.stack);
      }
      return self.element;
    };

    // inject ast error interception
    this.protoParserError = sniper.parser.parser.raiseError.bind(
      sniper.parser.parser
    );
    var parseErrorRule = new Rule();
    parseErrorRule.namespace = 'parser';
    parseErrorRule.visitor = this;
    sniper.parser.parser.raiseError = function(message, msgExpect, expect, token) {
      var err = self.protoParserError(message, msgExpect, expect, token);
      if (!self.hasError) {
        // raise only the first error
        self.hasError = true;
        self.getReport().addMessage(
          self.filename,
          new Message(
            parseErrorRule,
            Message.LEVEL_CRITICAL,
            self.getPosition(),
            err.message
          )
        );
      }
      return err;
    };

    // inject ast scanner
    this.protoParserParse = sniper.parser.parser.parse.bind(
      sniper.parser.parser
    );
    sniper.parser.parser.parse = function(source, filename) {
      self.filename = filename;
      self.hasError = false;
      self.getReport().clear(filename);
      var ast = self.protoParserParse(source, filename);
      self.triggerNode(ast);
      return ast;
    };
  }

  /**
   * Reads the next token without breaking the parsing flow
   */
  scanNextToken() {
    if (!this.tokenBackup) {
      this.tokenBackup = this.sniper.parser.lexer.getState();
    }
    return this.protoLexerNext();
  }

  /**
   * Raise a new token
   */
  triggerToken(token) {
    for(var i = 0, l = this.rules.length; i < l; i++) {
      try {
        // todo this.rules[i].
        if (this.tokenBackup) {
          this.sniper.parser.lexer.setState(
            this.tokenBackup
          );
          this.tokenBackup = null;
        }
      } catch(e) {
        console.error(e.stack);
      }
    }
  }

  triggerNode(node) {
    // todo
  }

  /**
   * Gets the current position
   */
  getPosition() {
    if (this.element && this.filename) {
      if (this.element.kind && this.element.loc) {
        // from a node
        return new Location(
          this.filename,
          // start
          this.element.loc.start.line,
          this.element.loc.start.column,
          this.element.loc.start.offset,
          // end
          this.element.loc.end.line,
          this.element.loc.end.column,
          this.element.loc.end.offset
        );
      } else {
        // from a token
        return new Location(
          this.filename,
          // start
          this.sniper.parser.lexer.yylloc.first_line,
          this.sniper.parser.lexer.yylloc.first_column,
          this.sniper.parser.lexer.yylloc.first_offset,
          // end
          this.sniper.parser.lexer.yylloc.last_line,
          this.sniper.parser.lexer.yylloc.last_column,
          this.sniper.parser.lexer.offset
        );
      }
    }
    return null;
  }

  addRule() {

  }

  getSession() {
    return this.sniper.session;
  }

  getReport() {
    return this.sniper.report;
  }

  getParser() {
    return this.sniper.parser;
  }
}

