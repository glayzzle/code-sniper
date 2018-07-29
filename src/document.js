/*!
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com/code-sniper
 */

import Node from './node.js'; 

export default class Document extends Node {
  constructor(filename, buffer, ast) {
    super(null, null, ast);
    this.filename = filename;
    this.buffer = buffer;
  }
}
