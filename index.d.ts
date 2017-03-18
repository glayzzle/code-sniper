/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

declare module "code-sniper" {

  /**
   * Initialise a new code sniper instance
   */
  export default class Sniper {
    constructor(options?: any);
    setOptions(options: any): Sniper;
    clear(): Sniper;
    getParser(): any;
    parseFile(filename:String, buffer: String): any;
  }
}
