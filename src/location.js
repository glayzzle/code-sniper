/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-snipper/graphs/contributors
 * @url http://glayzzle.com
 */

var Location = function(filename, lineStart, colStart, offsetStart, lineEnd, colEnd, offsetEnd) {
  this.filename = filename;
  this.start = {
    line: lineStart,
    col: colStart,
    offset: offsetStart
  };
  this.end = {
    line: typeof lineEnd === 'undefined' ? lineStart : lineEnd,
    col: typeof colEnd === 'undefined' ? colStart : colEnd,
    offset: typeof offsetEnd === 'undefined' ? offsetEnd : offsetStart
  };
};

module.exports = Location;
