/*!
 * Copyright (C) 2018 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com/code-sniper
 */

export default class Node {
  constructor(document, parent, node) {
    this.ownerDocument = document;
    this.parentNode = parent;
    this.nodeName = node.kind;
    this.children = [];
    this.attributes = {};
    this.classList = [];
    this.ast = node;
    if (node.hasOwnProperty('name')) {
      this.id = node.name;
    }
    for(var k in node) {
      let value = node[k];
      if (value === null) continue;
      if (value === true) {
        this.classList.push(k);
      } else if (typeof value === 'string' || typeof value === 'number') {
        this.attributes[k] = value;
      } else {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            this.children.push(
              new Node(document, this, item)
            );
          });
        } else if (value.hasOwnProperty('kind')) {
          // @fixme : lost attribute ?
          this.children.push(
            new Node(document, this, value)
          );
        }
      }
    }
  }
}

