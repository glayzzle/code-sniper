# code-sniper

A clone of code sniffer (PHPCS) written in nodejs.

## CLI Usage

Installation :
```sh
npm install php-sniper -g
```

Command line :
```sh
php-sniper -o txt ./**/*.php
```

> Note : If the working directory contains a ̀`.php-sniper.json` file, the cli will try to load it and use it as a ruleset configuration file

## Integrate the library into your project

The API is open, so you can use this library in your own project, without
needing to run it from a CLI process for example.

```sh
npm install php-sniper --save
```

And from your code :

```js
var fs = require('fs');
var Sniper = require('php-sniper');
var scan = new Sniper({
  ruleset: 'phpcs' // defines a default ruleset (see src/rulesets/*.json)
});
var file = __dirname + '/foo.php';
var ast = scan.parseFile(file, fs.readFileSync(file, 'utf8'));
console.log(scan.report);
```

## Writing your own Rule

Writing a rule is quite simple, this library is specially designed for that :

* Register a rule from the instance
* CSS syntax based node/token filtering
* Session for storing data/criterias between files
* Namespace resolution helper
* Automatic multiple passes optimisation (with parsing cache)
* PHP-Parser decorator (a drop-in replacement)

Here a sample code :

```js
var Sniper = require('php-sniper');
var scan = new Sniper();

scan.setRule('domain.category.WarnDeprecated', function() {
  // first pass : extract deprecated
  this.on('ast: doc[isDoc,lines~@deprecated]', function(node) {
    var next = this.nextNode();
    if (next && (next.kind === 'function' || next.kind === 'method')) {
      this.sessionSet(
        'deprecated:' + this.getFQN(next), true
      );
    }
  });
  // second pass : warn them
  .after('ast: call > identifier', function(node) {
    var name = this.getFQN(node);
    if (this.sessionGet('deprecated:' + name)) {
      this.warningMessage('Deprecated "'+name+'"');
    }
  });
});

scan.setRule('domain.category.MyOwnRule', function() {
  this.customProperty = 10;
  // can make the parsing dependent on other modules passes
  this.after(
    ['domain.category.WarnDeprecated'],
    // or ['domain.category.WarnDeprecated:1'] saying that will run after it first pass
    'ast: call > identifier[name=DoNotCall]', function(node) {
    this.warningMessage('Should not call this function !');
  });
  // note : if WarnDeprecated is disabled, this pass will not be
  // triggered, and a warning into the '*' filename will be added
});


// loads a customized ruleset
scan.useRuleSet('./my-custom-phpcs.json');

// ... write here the parsing of your files ...
var filename = __dirname + '/foo.php';

// php-parser drop-in replacement
var ast = scan.getParser().getCode(
  fs.readFileSync(filename, 'utf8'), filename
);

// important call in order to say to the system the first pass is finished
// so other passes will automatically run after the first one
scan.finished();
```

## Configure a customized ruleset

Rulesets are similar to PHPCS, but json based instead of xml based. A ruleset is
just a way to define a list of rules, with options if needed.

A ruleset can inherit configuration from a list of parent rulesets, and the
rules property will overwrite their configuration.

An example of ruleset configuration `my-custom-phpcs.json`

```json
{
  "description": "A sample configuration file.",
  "includes": ["phpcs"],
  "rules": {
    "zend": {
      "files": {
        "ClosingTag": false
      }
    },
    "domain": {
      "category": {
        "WarnDeprecated": true,
        "MyOwnRule": {
          "customProperty": 5
        }
      }
    }
  }
}
```

Read further from the [API documentation](docs/API.md).

# Roadmap

* 0.1.x : First alpha prototype (soon)
  * run some rules
  * implement the selector
  * pass some tests
  * benchmarks & early optimisations
* 1.0.x : Release a stable version of API
  * framework of automated tests
  * clean documentation
  * all API classes implemented
* 1.1.0 : handle all PHPCS options
* 1.2.0 : Integrate all generic rules
* 1.3.0 : Integrate all PHPCS rules
* 1.4.0 : Integrate all PEAR rules
* 1.5.0 : Integrate all PSR1/2 rules
* 1.6.0 : Integrate all Squiz rules
* 1.7.0 : Integrate all Zend rules
* 1.8.0 : Integrate all Squiz rules

# Contributions

Any contribution is welcomed; after the alpha release, I'll be able to merge any PR about a rule definition.

# Misc

This library is released under BSD-3 license clause.

---

This Library is Under Development - no BETA release available
