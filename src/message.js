/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

var Message = function(rule, level, location, text) {
  this.rule = rule;
  this.level = level;
  this.location = location;
  this.text = message;
};

Message.LEVEL_CRITICAL    = 'critical';
Message.LEVEL_IMPORTANT   = 'important';
Message.LEVEL_WARNING     = 'warning';
Message.LEVEL_NOTICE      = 'notice';

module.exports = Message;
