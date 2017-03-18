/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/code-sniper/graphs/contributors
 * @url http://glayzzle.com
 */

declare module "code-sniper" {

    class Location {
        public filename:string;
        public start: {
            line: number,
            col: number,
            offset: number
        };
        public end: {
            line: number,
            col: number,
            offset: number
        };
    }

    class Rule {
        public namespace:string;
    }

    class Message {
        public static LEVEL_CRITICAL:string;
        public static LEVEL_IMPORTANT:string;
        public static LEVEL_WARNING:string;
        public static LEVEL_NOTICE:string;
        public rule:Rule;
        public level:string;
        public location:Location;
        public text:string;
    }

    class Report {
        public clear(): Report;
        public addMessage(filename:string, message:Message): Report;
        public getMessages(): Message[];
        public getMessageCount(level:string): number;
    }

    /**
     * Initialise a new code sniper instance
     */
    export default class Sniper {
        public report:Report;
        constructor(options?: any);
        public setOptions(options: any): Sniper;
        public clear(): Sniper;
        public getParser(): any;
        public parseFile(filename:String, buffer: String): any;
    }
}
