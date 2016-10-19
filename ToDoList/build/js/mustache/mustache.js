/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache (global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    factory(exports); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    global.Mustache = {};
    factory(global.Mustache); // script, wsh, asp
  }
}(this, function mustacheFactory (mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.2.1';
  mustache.tags = [ '{{', '}}' ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render (template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html (template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtdXN0YWNoZS9tdXN0YWNoZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcclxuICogbXVzdGFjaGUuanMgLSBMb2dpYy1sZXNzIHt7bXVzdGFjaGV9fSB0ZW1wbGF0ZXMgd2l0aCBKYXZhU2NyaXB0XHJcbiAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcclxuICovXHJcblxyXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlIE11c3RhY2hlOiB0cnVlKi9cclxuXHJcbihmdW5jdGlvbiBkZWZpbmVNdXN0YWNoZSAoZ2xvYmFsLCBmYWN0b3J5KSB7XHJcbiAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmIHR5cGVvZiBleHBvcnRzLm5vZGVOYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgZmFjdG9yeShleHBvcnRzKTsgLy8gQ29tbW9uSlNcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KTsgLy8gQU1EXHJcbiAgfSBlbHNlIHtcclxuICAgIGdsb2JhbC5NdXN0YWNoZSA9IHt9O1xyXG4gICAgZmFjdG9yeShnbG9iYWwuTXVzdGFjaGUpOyAvLyBzY3JpcHQsIHdzaCwgYXNwXHJcbiAgfVxyXG59KHRoaXMsIGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeSAobXVzdGFjaGUpIHtcclxuXHJcbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcclxuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheVBvbHlmaWxsIChvYmplY3QpIHtcclxuICAgIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gaXNGdW5jdGlvbiAob2JqZWN0KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XHJcbiAgICogd2hpY2ggbm9ybWFsbHkgcmV0dXJucyB0eXBlb2YgJ29iamVjdCdcclxuICAgKi9cclxuICBmdW5jdGlvbiB0eXBlU3RyIChvYmopIHtcclxuICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnYXJyYXknIDogdHlwZW9mIG9iajtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cCAoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOdWxsIHNhZmUgd2F5IG9mIGNoZWNraW5nIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCxcclxuICAgKiBpbmNsdWRpbmcgaXRzIHByb3RvdHlwZSwgaGFzIGEgZ2l2ZW4gcHJvcGVydHlcclxuICAgKi9cclxuICBmdW5jdGlvbiBoYXNQcm9wZXJ0eSAob2JqLCBwcm9wTmFtZSkge1xyXG4gICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIChwcm9wTmFtZSBpbiBvYmopO1xyXG4gIH1cclxuXHJcbiAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9pc3N1ZXMuYXBhY2hlLm9yZy9qaXJhL2Jyb3dzZS9DT1VDSERCLTU3N1xyXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg5XHJcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XHJcbiAgZnVuY3Rpb24gdGVzdFJlZ0V4cCAocmUsIHN0cmluZykge1xyXG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcclxuICB9XHJcblxyXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XHJcbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChzdHJpbmcpIHtcclxuICAgIHJldHVybiAhdGVzdFJlZ0V4cChub25TcGFjZVJlLCBzdHJpbmcpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGVudGl0eU1hcCA9IHtcclxuICAgICcmJzogJyZhbXA7JyxcclxuICAgICc8JzogJyZsdDsnLFxyXG4gICAgJz4nOiAnJmd0OycsXHJcbiAgICAnXCInOiAnJnF1b3Q7JyxcclxuICAgIFwiJ1wiOiAnJiMzOTsnLFxyXG4gICAgJy8nOiAnJiN4MkY7JyxcclxuICAgICdgJzogJyYjeDYwOycsXHJcbiAgICAnPSc6ICcmI3gzRDsnXHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gZXNjYXBlSHRtbCAoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvWyY8PlwiJ2A9XFwvXS9nLCBmdW5jdGlvbiBmcm9tRW50aXR5TWFwIChzKSB7XHJcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHZhciB3aGl0ZVJlID0gL1xccyovO1xyXG4gIHZhciBzcGFjZVJlID0gL1xccysvO1xyXG4gIHZhciBlcXVhbHNSZSA9IC9cXHMqPS87XHJcbiAgdmFyIGN1cmx5UmUgPSAvXFxzKlxcfS87XHJcbiAgdmFyIHRhZ1JlID0gLyN8XFxefFxcL3w+fFxce3wmfD18IS87XHJcblxyXG4gIC8qKlxyXG4gICAqIEJyZWFrcyB1cCB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBzdHJpbmcgaW50byBhIHRyZWUgb2YgdG9rZW5zLiBJZiB0aGUgYHRhZ3NgXHJcbiAgICogYXJndW1lbnQgaXMgZ2l2ZW4gaGVyZSBpdCBtdXN0IGJlIGFuIGFycmF5IHdpdGggdHdvIHN0cmluZyB2YWx1ZXM6IHRoZVxyXG4gICAqIG9wZW5pbmcgYW5kIGNsb3NpbmcgdGFncyB1c2VkIGluIHRoZSB0ZW1wbGF0ZSAoZS5nLiBbIFwiPCVcIiwgXCIlPlwiIF0pLiBPZlxyXG4gICAqIGNvdXJzZSwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlIG11c3RhY2hlcyAoaS5lLiBtdXN0YWNoZS50YWdzKS5cclxuICAgKlxyXG4gICAqIEEgdG9rZW4gaXMgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCA0IGVsZW1lbnRzLiBUaGUgZmlyc3QgZWxlbWVudCBpcyB0aGVcclxuICAgKiBtdXN0YWNoZSBzeW1ib2wgdGhhdCB3YXMgdXNlZCBpbnNpZGUgdGhlIHRhZywgZS5nLiBcIiNcIiBvciBcIiZcIi4gSWYgdGhlIHRhZ1xyXG4gICAqIGRpZCBub3QgY29udGFpbiBhIHN5bWJvbCAoaS5lLiB7e215VmFsdWV9fSkgdGhpcyBlbGVtZW50IGlzIFwibmFtZVwiLiBGb3JcclxuICAgKiBhbGwgdGV4dCB0aGF0IGFwcGVhcnMgb3V0c2lkZSBhIHN5bWJvbCB0aGlzIGVsZW1lbnQgaXMgXCJ0ZXh0XCIuXHJcbiAgICpcclxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgb2YgYSB0b2tlbiBpcyBpdHMgXCJ2YWx1ZVwiLiBGb3IgbXVzdGFjaGUgdGFncyB0aGlzIGlzXHJcbiAgICogd2hhdGV2ZXIgZWxzZSB3YXMgaW5zaWRlIHRoZSB0YWcgYmVzaWRlcyB0aGUgb3BlbmluZyBzeW1ib2wuIEZvciB0ZXh0IHRva2Vuc1xyXG4gICAqIHRoaXMgaXMgdGhlIHRleHQgaXRzZWxmLlxyXG4gICAqXHJcbiAgICogVGhlIHRoaXJkIGFuZCBmb3VydGggZWxlbWVudHMgb2YgdGhlIHRva2VuIGFyZSB0aGUgc3RhcnQgYW5kIGVuZCBpbmRpY2VzLFxyXG4gICAqIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRva2VuIGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cclxuICAgKlxyXG4gICAqIFRva2VucyB0aGF0IGFyZSB0aGUgcm9vdCBub2RlIG9mIGEgc3VidHJlZSBjb250YWluIHR3byBtb3JlIGVsZW1lbnRzOiAxKSBhblxyXG4gICAqIGFycmF5IG9mIHRva2VucyBpbiB0aGUgc3VidHJlZSBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBhdFxyXG4gICAqIHdoaWNoIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhhdCBzZWN0aW9uIGJlZ2lucy5cclxuICAgKi9cclxuICBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlICh0ZW1wbGF0ZSwgdGFncykge1xyXG4gICAgaWYgKCF0ZW1wbGF0ZSlcclxuICAgICAgcmV0dXJuIFtdO1xyXG5cclxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xyXG4gICAgdmFyIHRva2VucyA9IFtdOyAgICAgICAvLyBCdWZmZXIgdG8gaG9sZCB0aGUgdG9rZW5zXHJcbiAgICB2YXIgc3BhY2VzID0gW107ICAgICAgIC8vIEluZGljZXMgb2Ygd2hpdGVzcGFjZSB0b2tlbnMgb24gdGhlIGN1cnJlbnQgbGluZVxyXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cclxuICAgIHZhciBub25TcGFjZSA9IGZhbHNlOyAgLy8gSXMgdGhlcmUgYSBub24tc3BhY2UgY2hhciBvbiB0aGUgY3VycmVudCBsaW5lP1xyXG5cclxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcclxuICAgIC8vIGlmIHRoZXJlIHdhcyBhIHt7I3RhZ319IG9uIGl0IGFuZCBvdGhlcndpc2Ugb25seSBzcGFjZS5cclxuICAgIGZ1bmN0aW9uIHN0cmlwU3BhY2UgKCkge1xyXG4gICAgICBpZiAoaGFzVGFnICYmICFub25TcGFjZSkge1xyXG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxyXG4gICAgICAgICAgZGVsZXRlIHRva2Vuc1tzcGFjZXMucG9wKCldO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNwYWNlcyA9IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBoYXNUYWcgPSBmYWxzZTtcclxuICAgICAgbm9uU3BhY2UgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgb3BlbmluZ1RhZ1JlLCBjbG9zaW5nVGFnUmUsIGNsb3NpbmdDdXJseVJlO1xyXG4gICAgZnVuY3Rpb24gY29tcGlsZVRhZ3MgKHRhZ3NUb0NvbXBpbGUpIHtcclxuICAgICAgaWYgKHR5cGVvZiB0YWdzVG9Db21waWxlID09PSAnc3RyaW5nJylcclxuICAgICAgICB0YWdzVG9Db21waWxlID0gdGFnc1RvQ29tcGlsZS5zcGxpdChzcGFjZVJlLCAyKTtcclxuXHJcbiAgICAgIGlmICghaXNBcnJheSh0YWdzVG9Db21waWxlKSB8fCB0YWdzVG9Db21waWxlLmxlbmd0aCAhPT0gMilcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFnczogJyArIHRhZ3NUb0NvbXBpbGUpO1xyXG5cclxuICAgICAgb3BlbmluZ1RhZ1JlID0gbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVswXSkgKyAnXFxcXHMqJyk7XHJcbiAgICAgIGNsb3NpbmdUYWdSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVsxXSkpO1xyXG4gICAgICBjbG9zaW5nQ3VybHlSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAoJ30nICsgdGFnc1RvQ29tcGlsZVsxXSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBpbGVUYWdzKHRhZ3MgfHwgbXVzdGFjaGUudGFncyk7XHJcblxyXG4gICAgdmFyIHNjYW5uZXIgPSBuZXcgU2Nhbm5lcih0ZW1wbGF0ZSk7XHJcblxyXG4gICAgdmFyIHN0YXJ0LCB0eXBlLCB2YWx1ZSwgY2hyLCB0b2tlbiwgb3BlblNlY3Rpb247XHJcbiAgICB3aGlsZSAoIXNjYW5uZXIuZW9zKCkpIHtcclxuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcclxuXHJcbiAgICAgIC8vIE1hdGNoIGFueSB0ZXh0IGJldHdlZW4gdGFncy5cclxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChvcGVuaW5nVGFnUmUpO1xyXG5cclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgdmFsdWVMZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgY2hyID0gdmFsdWUuY2hhckF0KGkpO1xyXG5cclxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xyXG4gICAgICAgICAgICBzcGFjZXMucHVzaCh0b2tlbnMubGVuZ3RoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0b2tlbnMucHVzaChbICd0ZXh0JywgY2hyLCBzdGFydCwgc3RhcnQgKyAxIF0pO1xyXG4gICAgICAgICAgc3RhcnQgKz0gMTtcclxuXHJcbiAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxyXG4gICAgICAgICAgaWYgKGNociA9PT0gJ1xcbicpXHJcbiAgICAgICAgICAgIHN0cmlwU3BhY2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cclxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4ob3BlbmluZ1RhZ1JlKSlcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGhhc1RhZyA9IHRydWU7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxyXG4gICAgICB0eXBlID0gc2Nhbm5lci5zY2FuKHRhZ1JlKSB8fCAnbmFtZSc7XHJcbiAgICAgIHNjYW5uZXIuc2Nhbih3aGl0ZVJlKTtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgdGFnIHZhbHVlLlxyXG4gICAgICBpZiAodHlwZSA9PT0gJz0nKSB7XHJcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7XHJcbiAgICAgICAgc2Nhbm5lci5zY2FuKGVxdWFsc1JlKTtcclxuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xyXG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ0N1cmx5UmUpO1xyXG4gICAgICAgIHNjYW5uZXIuc2NhbihjdXJseVJlKTtcclxuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xyXG4gICAgICAgIHR5cGUgPSAnJic7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXHJcbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKGNsb3NpbmdUYWdSZSkpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCB0YWcgYXQgJyArIHNjYW5uZXIucG9zKTtcclxuXHJcbiAgICAgIHRva2VuID0gWyB0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zIF07XHJcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcclxuXHJcbiAgICAgIGlmICh0eXBlID09PSAnIycgfHwgdHlwZSA9PT0gJ14nKSB7XHJcbiAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJy8nKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxyXG4gICAgICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XHJcblxyXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vub3BlbmVkIHNlY3Rpb24gXCInICsgdmFsdWUgKyAnXCIgYXQgJyArIHN0YXJ0KTtcclxuXHJcbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc3RhcnQpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XHJcbiAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICc9Jykge1xyXG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXHJcbiAgICAgICAgY29tcGlsZVRhZ3ModmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cclxuICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XHJcblxyXG4gICAgaWYgKG9wZW5TZWN0aW9uKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHNjYW5uZXIucG9zKTtcclxuXHJcbiAgICByZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21iaW5lcyB0aGUgdmFsdWVzIG9mIGNvbnNlY3V0aXZlIHRleHQgdG9rZW5zIGluIHRoZSBnaXZlbiBgdG9rZW5zYCBhcnJheVxyXG4gICAqIHRvIGEgc2luZ2xlIHRva2VuLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHNxdWFzaFRva2VucyAodG9rZW5zKSB7XHJcbiAgICB2YXIgc3F1YXNoZWRUb2tlbnMgPSBbXTtcclxuXHJcbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcclxuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcclxuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XHJcblxyXG4gICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICBpZiAodG9rZW5bMF0gPT09ICd0ZXh0JyAmJiBsYXN0VG9rZW4gJiYgbGFzdFRva2VuWzBdID09PSAndGV4dCcpIHtcclxuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcclxuICAgICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcclxuICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm1zIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCBpbnRvIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlIHdoZXJlXHJcbiAgICogdG9rZW5zIHRoYXQgcmVwcmVzZW50IGEgc2VjdGlvbiBoYXZlIHR3byBhZGRpdGlvbmFsIGl0ZW1zOiAxKSBhbiBhcnJheSBvZlxyXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXHJcbiAgICogdGVtcGxhdGUgdGhhdCByZXByZXNlbnRzIHRoZSBlbmQgb2YgdGhhdCBzZWN0aW9uLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnMgKHRva2Vucykge1xyXG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xyXG4gICAgdmFyIGNvbGxlY3RvciA9IG5lc3RlZFRva2VucztcclxuICAgIHZhciBzZWN0aW9ucyA9IFtdO1xyXG5cclxuICAgIHZhciB0b2tlbiwgc2VjdGlvbjtcclxuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcclxuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XHJcblxyXG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XHJcbiAgICAgICAgY2FzZSAnIyc6XHJcbiAgICAgICAgY2FzZSAnXic6XHJcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XHJcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcclxuICAgICAgICAgIGNvbGxlY3RvciA9IHRva2VuWzRdID0gW107XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICcvJzpcclxuICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcclxuICAgICAgICAgIHNlY3Rpb25bNV0gPSB0b2tlblsyXTtcclxuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmVzdGVkVG9rZW5zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBzaW1wbGUgc3RyaW5nIHNjYW5uZXIgdGhhdCBpcyB1c2VkIGJ5IHRoZSB0ZW1wbGF0ZSBwYXJzZXIgdG8gZmluZFxyXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIFNjYW5uZXIgKHN0cmluZykge1xyXG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XHJcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XHJcbiAgICB0aGlzLnBvcyA9IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdGFpbCBpcyBlbXB0eSAoZW5kIG9mIHN0cmluZykuXHJcbiAgICovXHJcbiAgU2Nhbm5lci5wcm90b3R5cGUuZW9zID0gZnVuY3Rpb24gZW9zICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRhaWwgPT09ICcnO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWVzIHRvIG1hdGNoIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXHJcbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIHNjYW4gKHJlKSB7XHJcbiAgICB2YXIgbWF0Y2ggPSB0aGlzLnRhaWwubWF0Y2gocmUpO1xyXG5cclxuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggIT09IDApXHJcbiAgICAgIHJldHVybiAnJztcclxuXHJcbiAgICB2YXIgc3RyaW5nID0gbWF0Y2hbMF07XHJcblxyXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcclxuICAgIHRoaXMucG9zICs9IHN0cmluZy5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIHN0cmluZztcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBTa2lwcyBhbGwgdGV4dCB1bnRpbCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGNhbiBiZSBtYXRjaGVkLiBSZXR1cm5zXHJcbiAgICogdGhlIHNraXBwZWQgc3RyaW5nLCB3aGljaCBpcyB0aGUgZW50aXJlIHRhaWwgaWYgbm8gbWF0Y2ggY2FuIGJlIG1hZGUuXHJcbiAgICovXHJcbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblVudGlsID0gZnVuY3Rpb24gc2NhblVudGlsIChyZSkge1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy50YWlsLnNlYXJjaChyZSksIG1hdGNoO1xyXG5cclxuICAgIHN3aXRjaCAoaW5kZXgpIHtcclxuICAgICAgY2FzZSAtMTpcclxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbDtcclxuICAgICAgICB0aGlzLnRhaWwgPSAnJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIG1hdGNoID0gJyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcclxuICAgICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBvcyArPSBtYXRjaC5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIG1hdGNoO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcHJlc2VudHMgYSByZW5kZXJpbmcgY29udGV4dCBieSB3cmFwcGluZyBhIHZpZXcgb2JqZWN0IGFuZFxyXG4gICAqIG1haW50YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGV4dC5cclxuICAgKi9cclxuICBmdW5jdGlvbiBDb250ZXh0ICh2aWV3LCBwYXJlbnRDb250ZXh0KSB7XHJcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG4gICAgdGhpcy5jYWNoZSA9IHsgJy4nOiB0aGlzLnZpZXcgfTtcclxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Q29udGV4dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxyXG4gICAqIGFzIHRoZSBwYXJlbnQuXHJcbiAgICovXHJcbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2ggKHZpZXcpIHtcclxuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbmFtZSBpbiB0aGlzIGNvbnRleHQsIHRyYXZlcnNpbmdcclxuICAgKiB1cCB0aGUgY29udGV4dCBoaWVyYXJjaHkgaWYgdGhlIHZhbHVlIGlzIGFic2VudCBpbiB0aGlzIGNvbnRleHQncyB2aWV3LlxyXG4gICAqL1xyXG4gIENvbnRleHQucHJvdG90eXBlLmxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cCAobmFtZSkge1xyXG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcclxuXHJcbiAgICB2YXIgdmFsdWU7XHJcbiAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgdmFsdWUgPSBjYWNoZVtuYW1lXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHdoaWxlIChjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xyXG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXc7XHJcbiAgICAgICAgICBuYW1lcyA9IG5hbWUuc3BsaXQoJy4nKTtcclxuICAgICAgICAgIGluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXHJcbiAgICAgICAgICAgKiBuZXN0ZWQgb2JqZWN0cy5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXHJcbiAgICAgICAgICAgKiBjaGVjayBpZiB0aGUgbGFzdCBvYmplY3QgaW4gdGhlIHBhdGggYWN0dWFsbHkgaGFzIHRoZSBwcm9wZXJ0eVxyXG4gICAgICAgICAgICogd2UgYXJlIGxvb2tpbmcgZm9yLiBXZSBzdG9yZSB0aGUgcmVzdWx0IGluIGBsb29rdXBIaXRgLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIFRoaXMgaXMgc3BlY2lhbGx5IG5lY2Vzc2FyeSBmb3Igd2hlbiB0aGUgdmFsdWUgaGFzIGJlZW4gc2V0IHRvXHJcbiAgICAgICAgICAgKiBgdW5kZWZpbmVkYCBhbmQgd2Ugd2FudCB0byBhdm9pZCBsb29raW5nIHVwIHBhcmVudCBjb250ZXh0cy5cclxuICAgICAgICAgICAqKi9cclxuICAgICAgICAgIHdoaWxlICh2YWx1ZSAhPSBudWxsICYmIGluZGV4IDwgbmFtZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gbmFtZXMubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbbmFtZXNbaW5kZXgrK11dO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlld1tuYW1lXTtcclxuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobG9va3VwSGl0KVxyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXHJcbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbCh0aGlzLnZpZXcpO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBBIFdyaXRlciBrbm93cyBob3cgdG8gdGFrZSBhIHN0cmVhbSBvZiB0b2tlbnMgYW5kIHJlbmRlciB0aGVtIHRvIGFcclxuICAgKiBzdHJpbmcsIGdpdmVuIGEgY29udGV4dC4gSXQgYWxzbyBtYWludGFpbnMgYSBjYWNoZSBvZiB0ZW1wbGF0ZXMgdG9cclxuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cclxuICAgKi9cclxuICBmdW5jdGlvbiBXcml0ZXIgKCkge1xyXG4gICAgdGhpcy5jYWNoZSA9IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoaXMgd3JpdGVyLlxyXG4gICAqL1xyXG4gIFdyaXRlci5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUgKCkge1xyXG4gICAgdGhpcy5jYWNoZSA9IHt9O1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0b2tlbnNcclxuICAgKiB0aGF0IGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBwYXJzZS5cclxuICAgKi9cclxuICBXcml0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UgKHRlbXBsYXRlLCB0YWdzKSB7XHJcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xyXG4gICAgdmFyIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXTtcclxuXHJcbiAgICBpZiAodG9rZW5zID09IG51bGwpXHJcbiAgICAgIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXSA9IHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpO1xyXG5cclxuICAgIHJldHVybiB0b2tlbnM7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogSGlnaC1sZXZlbCBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIHJlbmRlciB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCB3aXRoXHJcbiAgICogdGhlIGdpdmVuIGB2aWV3YC5cclxuICAgKlxyXG4gICAqIFRoZSBvcHRpb25hbCBgcGFydGlhbHNgIGFyZ3VtZW50IG1heSBiZSBhbiBvYmplY3QgdGhhdCBjb250YWlucyB0aGVcclxuICAgKiBuYW1lcyBhbmQgdGVtcGxhdGVzIG9mIHBhcnRpYWxzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHRlbXBsYXRlLiBJdCBtYXlcclxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxyXG4gICAqIHRoYXQgdGFrZXMgYSBzaW5nbGUgYXJndW1lbnQ6IHRoZSBuYW1lIG9mIHRoZSBwYXJ0aWFsLlxyXG4gICAqL1xyXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyICh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcclxuICAgIHZhciB0b2tlbnMgPSB0aGlzLnBhcnNlKHRlbXBsYXRlKTtcclxuICAgIHZhciBjb250ZXh0ID0gKHZpZXcgaW5zdGFuY2VvZiBDb250ZXh0KSA/IHZpZXcgOiBuZXcgQ29udGV4dCh2aWV3KTtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCB0ZW1wbGF0ZSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogTG93LWxldmVsIG1ldGhvZCB0aGF0IHJlbmRlcnMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIHVzaW5nXHJcbiAgICogdGhlIGdpdmVuIGBjb250ZXh0YCBhbmQgYHBhcnRpYWxzYC5cclxuICAgKlxyXG4gICAqIE5vdGU6IFRoZSBgb3JpZ2luYWxUZW1wbGF0ZWAgaXMgb25seSBldmVyIHVzZWQgdG8gZXh0cmFjdCB0aGUgcG9ydGlvblxyXG4gICAqIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHdhcyBjb250YWluZWQgaW4gYSBoaWdoZXItb3JkZXIgc2VjdGlvbi5cclxuICAgKiBJZiB0aGUgdGVtcGxhdGUgZG9lc24ndCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLCB0aGlzIGFyZ3VtZW50IG1heVxyXG4gICAqIGJlIG9taXR0ZWQuXHJcbiAgICovXHJcbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJUb2tlbnMgPSBmdW5jdGlvbiByZW5kZXJUb2tlbnMgKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcclxuICAgIHZhciBidWZmZXIgPSAnJztcclxuXHJcbiAgICB2YXIgdG9rZW4sIHN5bWJvbCwgdmFsdWU7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XHJcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcclxuICAgICAgc3ltYm9sID0gdG9rZW5bMF07XHJcblxyXG4gICAgICBpZiAoc3ltYm9sID09PSAnIycpIHZhbHVlID0gdGhpcy5yZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XHJcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ14nKSB2YWx1ZSA9IHRoaXMucmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcclxuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnPicpIHZhbHVlID0gdGhpcy5yZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XHJcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJyYnKSB2YWx1ZSA9IHRoaXMudW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xyXG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICduYW1lJykgdmFsdWUgPSB0aGlzLmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XHJcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ3RleHQnKSB2YWx1ZSA9IHRoaXMucmF3VmFsdWUodG9rZW4pO1xyXG5cclxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBidWZmZXI7XHJcbiAgfTtcclxuXHJcbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24gcmVuZGVyU2VjdGlvbiAodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgYnVmZmVyID0gJyc7XHJcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlbmRlciBhbiBhcmJpdHJhcnkgdGVtcGxhdGVcclxuICAgIC8vIGluIHRoZSBjdXJyZW50IGNvbnRleHQgYnkgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLlxyXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyICh0ZW1wbGF0ZSkge1xyXG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXIodGVtcGxhdGUsIGNvbnRleHQsIHBhcnRpYWxzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgIGZvciAodmFyIGogPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaiA8IHZhbHVlTGVuZ3RoOyArK2opIHtcclxuICAgICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcclxuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcclxuICAgICAgaWYgKHR5cGVvZiBvcmlnaW5hbFRlbXBsYXRlICE9PSAnc3RyaW5nJylcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XHJcblxyXG4gICAgICAvLyBFeHRyYWN0IHRoZSBwb3J0aW9uIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHRoZSBzZWN0aW9uIGNvbnRhaW5zLlxyXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XHJcblxyXG4gICAgICBpZiAodmFsdWUgIT0gbnVsbClcclxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBidWZmZXI7XHJcbiAgfTtcclxuXHJcbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkICh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcclxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcclxuXHJcbiAgICAvLyBVc2UgSmF2YVNjcmlwdCdzIGRlZmluaXRpb24gb2YgZmFsc3kuIEluY2x1ZGUgZW1wdHkgYXJyYXlzLlxyXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcclxuICAgIGlmICghdmFsdWUgfHwgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkpXHJcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xyXG4gIH07XHJcblxyXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyUGFydGlhbCA9IGZ1bmN0aW9uIHJlbmRlclBhcnRpYWwgKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscykge1xyXG4gICAgaWYgKCFwYXJ0aWFscykgcmV0dXJuO1xyXG5cclxuICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24ocGFydGlhbHMpID8gcGFydGlhbHModG9rZW5bMV0pIDogcGFydGlhbHNbdG9rZW5bMV1dO1xyXG4gICAgaWYgKHZhbHVlICE9IG51bGwpXHJcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0aGlzLnBhcnNlKHZhbHVlKSwgY29udGV4dCwgcGFydGlhbHMsIHZhbHVlKTtcclxuICB9O1xyXG5cclxuICBXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gdW5lc2NhcGVkVmFsdWUgKHRva2VuLCBjb250ZXh0KSB7XHJcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XHJcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gIH07XHJcblxyXG4gIFdyaXRlci5wcm90b3R5cGUuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gZXNjYXBlZFZhbHVlICh0b2tlbiwgY29udGV4dCkge1xyXG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xyXG4gICAgaWYgKHZhbHVlICE9IG51bGwpXHJcbiAgICAgIHJldHVybiBtdXN0YWNoZS5lc2NhcGUodmFsdWUpO1xyXG4gIH07XHJcblxyXG4gIFdyaXRlci5wcm90b3R5cGUucmF3VmFsdWUgPSBmdW5jdGlvbiByYXdWYWx1ZSAodG9rZW4pIHtcclxuICAgIHJldHVybiB0b2tlblsxXTtcclxuICB9O1xyXG5cclxuICBtdXN0YWNoZS5uYW1lID0gJ211c3RhY2hlLmpzJztcclxuICBtdXN0YWNoZS52ZXJzaW9uID0gJzIuMi4xJztcclxuICBtdXN0YWNoZS50YWdzID0gWyAne3snLCAnfX0nIF07XHJcblxyXG4gIC8vIEFsbCBoaWdoLWxldmVsIG11c3RhY2hlLiogZnVuY3Rpb25zIHVzZSB0aGlzIHdyaXRlci5cclxuICB2YXIgZGVmYXVsdFdyaXRlciA9IG5ldyBXcml0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoZSBkZWZhdWx0IHdyaXRlci5cclxuICAgKi9cclxuICBtdXN0YWNoZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSAoKSB7XHJcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIHRlbXBsYXRlIGluIHRoZSBkZWZhdWx0IHdyaXRlciBhbmQgcmV0dXJucyB0aGVcclxuICAgKiBhcnJheSBvZiB0b2tlbnMgaXQgY29udGFpbnMuIERvaW5nIHRoaXMgYWhlYWQgb2YgdGltZSBhdm9pZHMgdGhlIG5lZWQgdG9cclxuICAgKiBwYXJzZSB0ZW1wbGF0ZXMgb24gdGhlIGZseSBhcyB0aGV5IGFyZSByZW5kZXJlZC5cclxuICAgKi9cclxuICBtdXN0YWNoZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlICh0ZW1wbGF0ZSwgdGFncykge1xyXG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucGFyc2UodGVtcGxhdGUsIHRhZ3MpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxyXG4gICAqIGRlZmF1bHQgd3JpdGVyLlxyXG4gICAqL1xyXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlciAodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XHJcbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRlbXBsYXRlISBUZW1wbGF0ZSBzaG91bGQgYmUgYSBcInN0cmluZ1wiICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdidXQgXCInICsgdHlwZVN0cih0ZW1wbGF0ZSkgKyAnXCIgd2FzIGdpdmVuIGFzIHRoZSBmaXJzdCAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAnYXJndW1lbnQgZm9yIG11c3RhY2hlI3JlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XHJcbiAgfTtcclxuXHJcbiAgLy8gVGhpcyBpcyBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIDAuNC54LixcclxuICAvKmVzbGludC1kaXNhYmxlICovIC8vIGVzbGludCB3YW50cyBjYW1lbCBjYXNlZCBmdW5jdGlvbiBuYW1lXHJcbiAgbXVzdGFjaGUudG9faHRtbCA9IGZ1bmN0aW9uIHRvX2h0bWwgKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgc2VuZCkge1xyXG4gICAgLyplc2xpbnQtZW5hYmxlKi9cclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gbXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XHJcblxyXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcclxuICAgICAgc2VuZChyZXN1bHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxyXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMjQ0XHJcbiAgbXVzdGFjaGUuZXNjYXBlID0gZXNjYXBlSHRtbDtcclxuXHJcbiAgLy8gRXhwb3J0IHRoZXNlIG1haW5seSBmb3IgdGVzdGluZywgYnV0IGFsc28gZm9yIGFkdmFuY2VkIHVzYWdlLlxyXG4gIG11c3RhY2hlLlNjYW5uZXIgPSBTY2FubmVyO1xyXG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xyXG4gIG11c3RhY2hlLldyaXRlciA9IFdyaXRlcjtcclxuXHJcbn0pKTsiXSwiZmlsZSI6Im11c3RhY2hlL211c3RhY2hlLmpzIn0=
