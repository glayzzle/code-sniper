/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

/**
 * Cross files in-memory data storage
 */
export default class Session {
  constructor() {
    this.data = {};
    this.keys = {};
  }

  /**
   * Clear all informations attached to the specified filename
   */
  clear(filename) {
    if (filename in this.data) {
      var obj = this.data[filename];
      for(var k in obj) {
        if (obj.hasOwnProperty(k) && this.keys.hasOwnProperty(k)) {
          var f = this.keys[k].indexOf(filename);
          if (f !== -1) {
            this.keys[k].splice(f, 1);
            if (this.keys[k].length === 0) {
              delete this.keys[k];
            }
          }
        }
      }
      delete this.data[filename];
    }
    return this;
  }

  /**
   * Sets a key attached into a value for the specified file
   */
  set(filename, key, value) {
    if (!(filename in this.data)) {
      this.data[filename] = {};
    }
    if (!(key in this.keys)) {
      this.keys[key] = [];
    }
    if (this.keys[key].indexOf(filename) === -1) {
      this.keys[key].push(filename);
    }
    this.data[filename][key] = value;
    return this;
  }

  /**
   * Gets a value attached to the specified filename and key
   */
  getValue(filename, key) {
    if (filename in this.data && key in this.data[filename]) {
      return this.data[filename][key];
    }
    return null;
  }

  /**
   * Get all values attaches to the specified jet
   */
  getValues(key) {
    var result = [];
    if (key in this.keys) {
      var files = this.keys[key];
      for(var i = 0; i < files.length; i++) {
        var filename = files[i];
        result.push({
          filename: filename,
          value: this.data[filename][key]
        });
      }
    }
    return result;
  }
}
