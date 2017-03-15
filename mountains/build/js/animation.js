(function() {
  var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in defaults) {
        value = defaults[key];
        if (custom[key] == null) {
          custom[key] = value;
        }
      }
      return custom;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    Util.prototype.createEvent = function(event, bubble, cancel, detail) {
      var customEvent;
      if (bubble == null) {
        bubble = false;
      }
      if (cancel == null) {
        cancel = false;
      }
      if (detail == null) {
        detail = null;
      }
      if (document.createEvent != null) {
        customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(event, bubble, cancel, detail);
      } else if (document.createEventObject != null) {
        customEvent = document.createEventObject();
        customEvent.eventType = event;
      } else {
        customEvent.eventName = event;
      }
      return customEvent;
    };

    Util.prototype.emitEvent = function(elem, event) {
      if (elem.dispatchEvent != null) {
        return elem.dispatchEvent(event);
      } else if (event in (elem != null)) {
        return elem[event]();
      } else if (("on" + event) in (elem != null)) {
        return elem["on" + event]();
      }
    };

    Util.prototype.addEvent = function(elem, event, fn) {
      if (elem.addEventListener != null) {
        return elem.addEventListener(event, fn, false);
      } else if (elem.attachEvent != null) {
        return elem.attachEvent("on" + event, fn);
      } else {
        return elem[event] = fn;
      }
    };

    Util.prototype.removeEvent = function(elem, event, fn) {
      if (elem.removeEventListener != null) {
        return elem.removeEventListener(event, fn, false);
      } else if (elem.detachEvent != null) {
        return elem.detachEvent("on" + event, fn);
      } else {
        return delete elem[event];
      }
    };

    Util.prototype.innerHeight = function() {
      if ('innerHeight' in window) {
        return window.innerHeight;
      } else {
        return document.documentElement.clientHeight;
      }
    };

    return Util;

  })();

  WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
    function WeakMap() {
      this.keys = [];
      this.values = [];
    }

    WeakMap.prototype.get = function(key) {
      var i, item, j, len, ref;
      ref = this.keys;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (item === key) {
          return this.values[i];
        }
      }
    };

    WeakMap.prototype.set = function(key, value) {
      var i, item, j, len, ref;
      ref = this.keys;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (item === key) {
          this.values[i] = value;
          return;
        }
      }
      this.keys.push(key);
      return this.values.push(value);
    };

    return WeakMap;

  })());

  MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
    function MutationObserver() {
      if (typeof console !== "undefined" && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
      }
      if (typeof console !== "undefined" && console !== null) {
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    MutationObserver.notSupported = true;

    MutationObserver.prototype.observe = function() {};

    return MutationObserver;

  })());

  getComputedStyle = this.getComputedStyle || function(el, pseudo) {
    this.getPropertyValue = function(prop) {
      var ref;
      if (prop === 'float') {
        prop = 'styleFloat';
      }
      if (getComputedStyleRX.test(prop)) {
        prop.replace(getComputedStyleRX, function(_, _char) {
          return _char.toUpperCase();
        });
      }
      return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
    };
    return this;
  };

  getComputedStyleRX = /(\-([a-z]){1})/g;

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
      callback: null,
      scrollContainer: null
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = bind(this.scrollCallback, this);
      this.scrollHandler = bind(this.scrollHandler, this);
      this.resetAnimation = bind(this.resetAnimation, this);
      this.start = bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
      if (options.scrollContainer != null) {
        this.config.scrollContainer = document.querySelector(options.scrollContainer);
      }
      this.animationNameCache = new WeakMap();
      this.wowEvent = this.util().createEvent(this.config.boxClass);
    }

    WOW.prototype.init = function() {
      var ref;
      this.element = window.document.documentElement;
      if ((ref = document.readyState) === "interactive" || ref === "complete") {
        this.start();
      } else {
        this.util().addEvent(document, 'DOMContentLoaded', this.start);
      }
      return this.finished = [];
    };

    WOW.prototype.start = function() {
      var box, j, len, ref;
      this.stopped = false;
      this.boxes = (function() {
        var j, len, ref, results;
        ref = this.element.querySelectorAll("." + this.config.boxClass);
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          box = ref[j];
          results.push(box);
        }
        return results;
      }).call(this);
      this.all = (function() {
        var j, len, ref, results;
        ref = this.boxes;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          box = ref[j];
          results.push(box);
        }
        return results;
      }).call(this);
      if (this.boxes.length) {
        if (this.disabled()) {
          this.resetStyle();
        } else {
          ref = this.boxes;
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            this.applyStyle(box, true);
          }
        }
      }
      if (!this.disabled()) {
        this.util().addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
        this.util().addEvent(window, 'resize', this.scrollHandler);
        this.interval = setInterval(this.scrollCallback, 50);
      }
      if (this.config.live) {
        return new MutationObserver((function(_this) {
          return function(records) {
            var k, len1, node, record, results;
            results = [];
            for (k = 0, len1 = records.length; k < len1; k++) {
              record = records[k];
              results.push((function() {
                var l, len2, ref1, results1;
                ref1 = record.addedNodes || [];
                results1 = [];
                for (l = 0, len2 = ref1.length; l < len2; l++) {
                  node = ref1[l];
                  results1.push(this.doSync(node));
                }
                return results1;
              }).call(_this));
            }
            return results;
          };
        })(this)).observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    };

    WOW.prototype.stop = function() {
      this.stopped = true;
      this.util().removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
      this.util().removeEvent(window, 'resize', this.scrollHandler);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.sync = function(element) {
      if (MutationObserver.notSupported) {
        return this.doSync(this.element);
      }
    };

    WOW.prototype.doSync = function(element) {
      var box, j, len, ref, results;
      if (element == null) {
        element = this.element;
      }
      if (element.nodeType !== 1) {
        return;
      }
      element = element.parentNode || element;
      ref = element.querySelectorAll("." + this.config.boxClass);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        if (indexOf.call(this.all, box) < 0) {
          this.boxes.push(box);
          this.all.push(box);
          if (this.stopped || this.disabled()) {
            this.resetStyle();
          } else {
            this.applyStyle(box, true);
          }
          results.push(this.scrolled = true);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      box.className = box.className + " " + this.config.animateClass;
      if (this.config.callback != null) {
        this.config.callback(box);
      }
      this.util().emitEvent(box, this.wowEvent);
      this.util().addEvent(box, 'animationend', this.resetAnimation);
      this.util().addEvent(box, 'oanimationend', this.resetAnimation);
      this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
      this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
      return box;
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return this.animate((function(_this) {
        return function() {
          return _this.customStyle(box, hidden, duration, delay, iteration);
        };
      })(this));
    };

    WOW.prototype.animate = (function() {
      if ('requestAnimationFrame' in window) {
        return function(callback) {
          return window.requestAnimationFrame(callback);
        };
      } else {
        return function(callback) {
          return callback();
        };
      }
    })();

    WOW.prototype.resetStyle = function() {
      var box, j, len, ref, results;
      ref = this.boxes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        results.push(box.style.visibility = 'visible');
      }
      return results;
    };

    WOW.prototype.resetAnimation = function(event) {
      var target;
      if (event.type.toLowerCase().indexOf('animationend') >= 0) {
        target = event.target || event.srcElement;
        return target.className = target.className.replace(this.config.animateClass, '').trim();
      }
    };

    WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
      if (hidden) {
        this.cacheAnimationName(box);
      }
      box.style.visibility = hidden ? 'hidden' : 'visible';
      if (duration) {
        this.vendorSet(box.style, {
          animationDuration: duration
        });
      }
      if (delay) {
        this.vendorSet(box.style, {
          animationDelay: delay
        });
      }
      if (iteration) {
        this.vendorSet(box.style, {
          animationIterationCount: iteration
        });
      }
      this.vendorSet(box.style, {
        animationName: hidden ? 'none' : this.cachedAnimationName(box)
      });
      return box;
    };

    WOW.prototype.vendors = ["moz", "webkit"];

    WOW.prototype.vendorSet = function(elem, properties) {
      var name, results, value, vendor;
      results = [];
      for (name in properties) {
        value = properties[name];
        elem["" + name] = value;
        results.push((function() {
          var j, len, ref, results1;
          ref = this.vendors;
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            vendor = ref[j];
            results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    WOW.prototype.vendorCSS = function(elem, property) {
      var j, len, ref, result, style, vendor;
      style = getComputedStyle(elem);
      result = style.getPropertyCSSValue(property);
      ref = this.vendors;
      for (j = 0, len = ref.length; j < len; j++) {
        vendor = ref[j];
        result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
      }
      return result;
    };

    WOW.prototype.animationName = function(box) {
      var animationName, error;
      try {
        animationName = this.vendorCSS(box, 'animation-name').cssText;
      } catch (error) {
        animationName = getComputedStyle(box).getPropertyValue('animation-name');
      }
      if (animationName === 'none') {
        return '';
      } else {
        return animationName;
      }
    };

    WOW.prototype.cacheAnimationName = function(box) {
      return this.animationNameCache.set(box, this.animationName(box));
    };

    WOW.prototype.cachedAnimationName = function(box) {
      return this.animationNameCache.get(box);
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var j, len, ref, results;
          ref = this.boxes;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            results.push(box);
          }
          return results;
        }).call(this);
        if (!(this.boxes.length || this.config.live)) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      while (element.offsetTop === void 0) {
        element = element.parentNode;
      }
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset;
      viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util != null ? this._util : this._util = new Util();
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

}).call(this);
new WOW().init();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhbmltYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG4gIHZhciBNdXRhdGlvbk9ic2VydmVyLCBVdGlsLCBXZWFrTWFwLCBnZXRDb21wdXRlZFN0eWxlLCBnZXRDb21wdXRlZFN0eWxlUlgsXHJcbiAgICBiaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfSxcclxuICAgIGluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcclxuXHJcbiAgVXRpbCA9IChmdW5jdGlvbigpIHtcclxuICAgIGZ1bmN0aW9uIFV0aWwoKSB7fVxyXG5cclxuICAgIFV0aWwucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uKGN1c3RvbSwgZGVmYXVsdHMpIHtcclxuICAgICAgdmFyIGtleSwgdmFsdWU7XHJcbiAgICAgIGZvciAoa2V5IGluIGRlZmF1bHRzKSB7XHJcbiAgICAgICAgdmFsdWUgPSBkZWZhdWx0c1trZXldO1xyXG4gICAgICAgIGlmIChjdXN0b21ba2V5XSA9PSBudWxsKSB7XHJcbiAgICAgICAgICBjdXN0b21ba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY3VzdG9tO1xyXG4gICAgfTtcclxuXHJcbiAgICBVdGlsLnByb3RvdHlwZS5pc01vYmlsZSA9IGZ1bmN0aW9uKGFnZW50KSB7XHJcbiAgICAgIHJldHVybiAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QoYWdlbnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBVdGlsLnByb3RvdHlwZS5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBidWJibGUsIGNhbmNlbCwgZGV0YWlsKSB7XHJcbiAgICAgIHZhciBjdXN0b21FdmVudDtcclxuICAgICAgaWYgKGJ1YmJsZSA9PSBudWxsKSB7XHJcbiAgICAgICAgYnViYmxlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNhbmNlbCA9PSBudWxsKSB7XHJcbiAgICAgICAgY2FuY2VsID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRldGFpbCA9PSBudWxsKSB7XHJcbiAgICAgICAgZGV0YWlsID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgIGN1c3RvbUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcbiAgICAgICAgY3VzdG9tRXZlbnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBidWJibGUsIGNhbmNlbCwgZGV0YWlsKTtcclxuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCAhPSBudWxsKSB7XHJcbiAgICAgICAgY3VzdG9tRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpO1xyXG4gICAgICAgIGN1c3RvbUV2ZW50LmV2ZW50VHlwZSA9IGV2ZW50O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGN1c3RvbUV2ZW50LmV2ZW50TmFtZSA9IGV2ZW50O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjdXN0b21FdmVudDtcclxuICAgIH07XHJcblxyXG4gICAgVXRpbC5wcm90b3R5cGUuZW1pdEV2ZW50ID0gZnVuY3Rpb24oZWxlbSwgZXZlbnQpIHtcclxuICAgICAgaWYgKGVsZW0uZGlzcGF0Y2hFdmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW0uZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW4gKGVsZW0gIT0gbnVsbCkpIHtcclxuICAgICAgICByZXR1cm4gZWxlbVtldmVudF0oKTtcclxuICAgICAgfSBlbHNlIGlmICgoXCJvblwiICsgZXZlbnQpIGluIChlbGVtICE9IG51bGwpKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1bXCJvblwiICsgZXZlbnRdKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgVXRpbC5wcm90b3R5cGUuYWRkRXZlbnQgPSBmdW5jdGlvbihlbGVtLCBldmVudCwgZm4pIHtcclxuICAgICAgaWYgKGVsZW0uYWRkRXZlbnRMaXN0ZW5lciAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZm4sIGZhbHNlKTtcclxuICAgICAgfSBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50ICE9IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZWxlbS5hdHRhY2hFdmVudChcIm9uXCIgKyBldmVudCwgZm4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBlbGVtW2V2ZW50XSA9IGZuO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIFV0aWwucHJvdG90eXBlLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZWxlbSwgZXZlbnQsIGZuKSB7XHJcbiAgICAgIGlmIChlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIgIT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuLCBmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZWxlbS5kZXRhY2hFdmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW0uZGV0YWNoRXZlbnQoXCJvblwiICsgZXZlbnQsIGZuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZGVsZXRlIGVsZW1bZXZlbnRdO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIFV0aWwucHJvdG90eXBlLmlubmVySGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICgnaW5uZXJIZWlnaHQnIGluIHdpbmRvdykge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIFV0aWw7XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIFdlYWtNYXAgPSB0aGlzLldlYWtNYXAgfHwgdGhpcy5Nb3pXZWFrTWFwIHx8IChXZWFrTWFwID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgZnVuY3Rpb24gV2Vha01hcCgpIHtcclxuICAgICAgdGhpcy5rZXlzID0gW107XHJcbiAgICAgIHRoaXMudmFsdWVzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgV2Vha01hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgIHZhciBpLCBpdGVtLCBqLCBsZW4sIHJlZjtcclxuICAgICAgcmVmID0gdGhpcy5rZXlzO1xyXG4gICAgICBmb3IgKGkgPSBqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaSA9ICsraikge1xyXG4gICAgICAgIGl0ZW0gPSByZWZbaV07XHJcbiAgICAgICAgaWYgKGl0ZW0gPT09IGtleSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBXZWFrTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XHJcbiAgICAgIHZhciBpLCBpdGVtLCBqLCBsZW4sIHJlZjtcclxuICAgICAgcmVmID0gdGhpcy5rZXlzO1xyXG4gICAgICBmb3IgKGkgPSBqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaSA9ICsraikge1xyXG4gICAgICAgIGl0ZW0gPSByZWZbaV07XHJcbiAgICAgICAgaWYgKGl0ZW0gPT09IGtleSkge1xyXG4gICAgICAgICAgdGhpcy52YWx1ZXNbaV0gPSB2YWx1ZTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5rZXlzLnB1c2goa2V5KTtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLnB1c2godmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gV2Vha01hcDtcclxuXHJcbiAgfSkoKSk7XHJcblxyXG4gIE11dGF0aW9uT2JzZXJ2ZXIgPSB0aGlzLk11dGF0aW9uT2JzZXJ2ZXIgfHwgdGhpcy5XZWJraXRNdXRhdGlvbk9ic2VydmVyIHx8IHRoaXMuTW96TXV0YXRpb25PYnNlcnZlciB8fCAoTXV0YXRpb25PYnNlcnZlciA9IChmdW5jdGlvbigpIHtcclxuICAgIGZ1bmN0aW9uIE11dGF0aW9uT2JzZXJ2ZXIoKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdNdXRhdGlvbk9ic2VydmVyIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyLicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdXT1cuanMgY2Fubm90IGRldGVjdCBkb20gbXV0YXRpb25zLCBwbGVhc2UgY2FsbCAuc3luYygpIGFmdGVyIGxvYWRpbmcgbmV3IGNvbnRlbnQuJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBNdXRhdGlvbk9ic2VydmVyLm5vdFN1cHBvcnRlZCA9IHRydWU7XHJcblxyXG4gICAgTXV0YXRpb25PYnNlcnZlci5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uKCkge307XHJcblxyXG4gICAgcmV0dXJuIE11dGF0aW9uT2JzZXJ2ZXI7XHJcblxyXG4gIH0pKCkpO1xyXG5cclxuICBnZXRDb21wdXRlZFN0eWxlID0gdGhpcy5nZXRDb21wdXRlZFN0eWxlIHx8IGZ1bmN0aW9uKGVsLCBwc2V1ZG8pIHtcclxuICAgIHRoaXMuZ2V0UHJvcGVydHlWYWx1ZSA9IGZ1bmN0aW9uKHByb3ApIHtcclxuICAgICAgdmFyIHJlZjtcclxuICAgICAgaWYgKHByb3AgPT09ICdmbG9hdCcpIHtcclxuICAgICAgICBwcm9wID0gJ3N0eWxlRmxvYXQnO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlUlgudGVzdChwcm9wKSkge1xyXG4gICAgICAgIHByb3AucmVwbGFjZShnZXRDb21wdXRlZFN0eWxlUlgsIGZ1bmN0aW9uKF8sIF9jaGFyKSB7XHJcbiAgICAgICAgICByZXR1cm4gX2NoYXIudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gKChyZWYgPSBlbC5jdXJyZW50U3R5bGUpICE9IG51bGwgPyByZWZbcHJvcF0gOiB2b2lkIDApIHx8IG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgZ2V0Q29tcHV0ZWRTdHlsZVJYID0gLyhcXC0oW2Etel0pezF9KS9nO1xyXG5cclxuICB0aGlzLldPVyA9IChmdW5jdGlvbigpIHtcclxuICAgIFdPVy5wcm90b3R5cGUuZGVmYXVsdHMgPSB7XHJcbiAgICAgIGJveENsYXNzOiAnd293JyxcclxuICAgICAgYW5pbWF0ZUNsYXNzOiAnYW5pbWF0ZWQnLFxyXG4gICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgIG1vYmlsZTogdHJ1ZSxcclxuICAgICAgbGl2ZTogdHJ1ZSxcclxuICAgICAgY2FsbGJhY2s6IG51bGwsXHJcbiAgICAgIHNjcm9sbENvbnRhaW5lcjogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBXT1cob3B0aW9ucykge1xyXG4gICAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2Nyb2xsQ2FsbGJhY2sgPSBiaW5kKHRoaXMuc2Nyb2xsQ2FsbGJhY2ssIHRoaXMpO1xyXG4gICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBiaW5kKHRoaXMuc2Nyb2xsSGFuZGxlciwgdGhpcyk7XHJcbiAgICAgIHRoaXMucmVzZXRBbmltYXRpb24gPSBiaW5kKHRoaXMucmVzZXRBbmltYXRpb24sIHRoaXMpO1xyXG4gICAgICB0aGlzLnN0YXJ0ID0gYmluZCh0aGlzLnN0YXJ0LCB0aGlzKTtcclxuICAgICAgdGhpcy5zY3JvbGxlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuY29uZmlnID0gdGhpcy51dGlsKCkuZXh0ZW5kKG9wdGlvbnMsIHRoaXMuZGVmYXVsdHMpO1xyXG4gICAgICBpZiAob3B0aW9ucy5zY3JvbGxDb250YWluZXIgIT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnLnNjcm9sbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5zY3JvbGxDb250YWluZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9uTmFtZUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcclxuICAgICAgdGhpcy53b3dFdmVudCA9IHRoaXMudXRpbCgpLmNyZWF0ZUV2ZW50KHRoaXMuY29uZmlnLmJveENsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBXT1cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHJlZjtcclxuICAgICAgdGhpcy5lbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgaWYgKChyZWYgPSBkb2N1bWVudC5yZWFkeVN0YXRlKSA9PT0gXCJpbnRlcmFjdGl2ZVwiIHx8IHJlZiA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMudXRpbCgpLmFkZEV2ZW50KGRvY3VtZW50LCAnRE9NQ29udGVudExvYWRlZCcsIHRoaXMuc3RhcnQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLmZpbmlzaGVkID0gW107XHJcbiAgICB9O1xyXG5cclxuICAgIFdPVy5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGJveCwgaiwgbGVuLCByZWY7XHJcbiAgICAgIHRoaXMuc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmJveGVzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBqLCBsZW4sIHJlZiwgcmVzdWx0cztcclxuICAgICAgICByZWYgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIHRoaXMuY29uZmlnLmJveENsYXNzKTtcclxuICAgICAgICByZXN1bHRzID0gW107XHJcbiAgICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XHJcbiAgICAgICAgICBib3ggPSByZWZbal07XHJcbiAgICAgICAgICByZXN1bHRzLnB1c2goYm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgIH0pLmNhbGwodGhpcyk7XHJcbiAgICAgIHRoaXMuYWxsID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBqLCBsZW4sIHJlZiwgcmVzdWx0cztcclxuICAgICAgICByZWYgPSB0aGlzLmJveGVzO1xyXG4gICAgICAgIHJlc3VsdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICAgIGJveCA9IHJlZltqXTtcclxuICAgICAgICAgIHJlc3VsdHMucHVzaChib3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgfSkuY2FsbCh0aGlzKTtcclxuICAgICAgaWYgKHRoaXMuYm94ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQoKSkge1xyXG4gICAgICAgICAgdGhpcy5yZXNldFN0eWxlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlZiA9IHRoaXMuYm94ZXM7XHJcbiAgICAgICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICAgICAgYm94ID0gcmVmW2pdO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3R5bGUoYm94LCB0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKCkpIHtcclxuICAgICAgICB0aGlzLnV0aWwoKS5hZGRFdmVudCh0aGlzLmNvbmZpZy5zY3JvbGxDb250YWluZXIgfHwgd2luZG93LCAnc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLnV0aWwoKS5hZGRFdmVudCh3aW5kb3csICdyZXNpemUnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnNjcm9sbENhbGxiYWNrLCA1MCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuY29uZmlnLmxpdmUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKGZ1bmN0aW9uKF90aGlzKSB7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24ocmVjb3Jkcykge1xyXG4gICAgICAgICAgICB2YXIgaywgbGVuMSwgbm9kZSwgcmVjb3JkLCByZXN1bHRzO1xyXG4gICAgICAgICAgICByZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgIGZvciAoayA9IDAsIGxlbjEgPSByZWNvcmRzLmxlbmd0aDsgayA8IGxlbjE7IGsrKykge1xyXG4gICAgICAgICAgICAgIHJlY29yZCA9IHJlY29yZHNba107XHJcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsLCBsZW4yLCByZWYxLCByZXN1bHRzMTtcclxuICAgICAgICAgICAgICAgIHJlZjEgPSByZWNvcmQuYWRkZWROb2RlcyB8fCBbXTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMxID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGwgPSAwLCBsZW4yID0gcmVmMS5sZW5ndGg7IGwgPCBsZW4yOyBsKyspIHtcclxuICAgICAgICAgICAgICAgICAgbm9kZSA9IHJlZjFbbF07XHJcbiAgICAgICAgICAgICAgICAgIHJlc3VsdHMxLnB1c2godGhpcy5kb1N5bmMobm9kZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHMxO1xyXG4gICAgICAgICAgICAgIH0pLmNhbGwoX3RoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSkodGhpcykpLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xyXG4gICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIFdPVy5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLnN0b3BwZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnV0aWwoKS5yZW1vdmVFdmVudCh0aGlzLmNvbmZpZy5zY3JvbGxDb250YWluZXIgfHwgd2luZG93LCAnc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcclxuICAgICAgdGhpcy51dGlsKCkucmVtb3ZlRXZlbnQod2luZG93LCAncmVzaXplJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcclxuICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwgIT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIFdPVy5wcm90b3R5cGUuc3luYyA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgaWYgKE11dGF0aW9uT2JzZXJ2ZXIubm90U3VwcG9ydGVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9TeW5jKHRoaXMuZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgV09XLnByb3RvdHlwZS5kb1N5bmMgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIHZhciBib3gsIGosIGxlbiwgcmVmLCByZXN1bHRzO1xyXG4gICAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XHJcbiAgICAgICAgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZWxlbWVudC5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlIHx8IGVsZW1lbnQ7XHJcbiAgICAgIHJlZiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIHRoaXMuY29uZmlnLmJveENsYXNzKTtcclxuICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICBib3ggPSByZWZbal07XHJcbiAgICAgICAgaWYgKGluZGV4T2YuY2FsbCh0aGlzLmFsbCwgYm94KSA8IDApIHtcclxuICAgICAgICAgIHRoaXMuYm94ZXMucHVzaChib3gpO1xyXG4gICAgICAgICAgdGhpcy5hbGwucHVzaChib3gpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc3RvcHBlZCB8fCB0aGlzLmRpc2FibGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFN0eWxlKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U3R5bGUoYm94LCB0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLnNjcm9sbGVkID0gdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc3VsdHMucHVzaCh2b2lkIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH07XHJcblxyXG4gICAgV09XLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oYm94KSB7XHJcbiAgICAgIHRoaXMuYXBwbHlTdHlsZShib3gpO1xyXG4gICAgICBib3guY2xhc3NOYW1lID0gYm94LmNsYXNzTmFtZSArIFwiIFwiICsgdGhpcy5jb25maWcuYW5pbWF0ZUNsYXNzO1xyXG4gICAgICBpZiAodGhpcy5jb25maWcuY2FsbGJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmNhbGxiYWNrKGJveCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy51dGlsKCkuZW1pdEV2ZW50KGJveCwgdGhpcy53b3dFdmVudCk7XHJcbiAgICAgIHRoaXMudXRpbCgpLmFkZEV2ZW50KGJveCwgJ2FuaW1hdGlvbmVuZCcsIHRoaXMucmVzZXRBbmltYXRpb24pO1xyXG4gICAgICB0aGlzLnV0aWwoKS5hZGRFdmVudChib3gsICdvYW5pbWF0aW9uZW5kJywgdGhpcy5yZXNldEFuaW1hdGlvbik7XHJcbiAgICAgIHRoaXMudXRpbCgpLmFkZEV2ZW50KGJveCwgJ3dlYmtpdEFuaW1hdGlvbkVuZCcsIHRoaXMucmVzZXRBbmltYXRpb24pO1xyXG4gICAgICB0aGlzLnV0aWwoKS5hZGRFdmVudChib3gsICdNU0FuaW1hdGlvbkVuZCcsIHRoaXMucmVzZXRBbmltYXRpb24pO1xyXG4gICAgICByZXR1cm4gYm94O1xyXG4gICAgfTtcclxuXHJcbiAgICBXT1cucHJvdG90eXBlLmFwcGx5U3R5bGUgPSBmdW5jdGlvbihib3gsIGhpZGRlbikge1xyXG4gICAgICB2YXIgZGVsYXksIGR1cmF0aW9uLCBpdGVyYXRpb247XHJcbiAgICAgIGR1cmF0aW9uID0gYm94LmdldEF0dHJpYnV0ZSgnZGF0YS13b3ctZHVyYXRpb24nKTtcclxuICAgICAgZGVsYXkgPSBib3guZ2V0QXR0cmlidXRlKCdkYXRhLXdvdy1kZWxheScpO1xyXG4gICAgICBpdGVyYXRpb24gPSBib3guZ2V0QXR0cmlidXRlKCdkYXRhLXdvdy1pdGVyYXRpb24nKTtcclxuICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0ZSgoZnVuY3Rpb24oX3RoaXMpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gX3RoaXMuY3VzdG9tU3R5bGUoYm94LCBoaWRkZW4sIGR1cmF0aW9uLCBkZWxheSwgaXRlcmF0aW9uKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9KSh0aGlzKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIFdPVy5wcm90b3R5cGUuYW5pbWF0ZSA9IChmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCdyZXF1ZXN0QW5pbWF0aW9uRnJhbWUnIGluIHdpbmRvdykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIFdPVy5wcm90b3R5cGUucmVzZXRTdHlsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgYm94LCBqLCBsZW4sIHJlZiwgcmVzdWx0cztcclxuICAgICAgcmVmID0gdGhpcy5ib3hlcztcclxuICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICBib3ggPSByZWZbal07XHJcbiAgICAgICAgcmVzdWx0cy5wdXNoKGJveC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH07XHJcblxyXG4gICAgV09XLnByb3RvdHlwZS5yZXNldEFuaW1hdGlvbiA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHZhciB0YXJnZXQ7XHJcbiAgICAgIGlmIChldmVudC50eXBlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYW5pbWF0aW9uZW5kJykgPj0gMCkge1xyXG4gICAgICAgIHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xyXG4gICAgICAgIHJldHVybiB0YXJnZXQuY2xhc3NOYW1lID0gdGFyZ2V0LmNsYXNzTmFtZS5yZXBsYWNlKHRoaXMuY29uZmlnLmFuaW1hdGVDbGFzcywgJycpLnRyaW0oKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBXT1cucHJvdG90eXBlLmN1c3RvbVN0eWxlID0gZnVuY3Rpb24oYm94LCBoaWRkZW4sIGR1cmF0aW9uLCBkZWxheSwgaXRlcmF0aW9uKSB7XHJcbiAgICAgIGlmIChoaWRkZW4pIHtcclxuICAgICAgICB0aGlzLmNhY2hlQW5pbWF0aW9uTmFtZShib3gpO1xyXG4gICAgICB9XHJcbiAgICAgIGJveC5zdHlsZS52aXNpYmlsaXR5ID0gaGlkZGVuID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XHJcbiAgICAgIGlmIChkdXJhdGlvbikge1xyXG4gICAgICAgIHRoaXMudmVuZG9yU2V0KGJveC5zdHlsZSwge1xyXG4gICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IGR1cmF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRlbGF5KSB7XHJcbiAgICAgICAgdGhpcy52ZW5kb3JTZXQoYm94LnN0eWxlLCB7XHJcbiAgICAgICAgICBhbmltYXRpb25EZWxheTogZGVsYXlcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlcmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy52ZW5kb3JTZXQoYm94LnN0eWxlLCB7XHJcbiAgICAgICAgICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogaXRlcmF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy52ZW5kb3JTZXQoYm94LnN0eWxlLCB7XHJcbiAgICAgICAgYW5pbWF0aW9uTmFtZTogaGlkZGVuID8gJ25vbmUnIDogdGhpcy5jYWNoZWRBbmltYXRpb25OYW1lKGJveClcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBib3g7XHJcbiAgICB9O1xyXG5cclxuICAgIFdPVy5wcm90b3R5cGUudmVuZG9ycyA9IFtcIm1velwiLCBcIndlYmtpdFwiXTtcclxuXHJcbiAgICBXT1cucHJvdG90eXBlLnZlbmRvclNldCA9IGZ1bmN0aW9uKGVsZW0sIHByb3BlcnRpZXMpIHtcclxuICAgICAgdmFyIG5hbWUsIHJlc3VsdHMsIHZhbHVlLCB2ZW5kb3I7XHJcbiAgICAgIHJlc3VsdHMgPSBbXTtcclxuICAgICAgZm9yIChuYW1lIGluIHByb3BlcnRpZXMpIHtcclxuICAgICAgICB2YWx1ZSA9IHByb3BlcnRpZXNbbmFtZV07XHJcbiAgICAgICAgZWxlbVtcIlwiICsgbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICByZXN1bHRzLnB1c2goKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIGosIGxlbiwgcmVmLCByZXN1bHRzMTtcclxuICAgICAgICAgIHJlZiA9IHRoaXMudmVuZG9ycztcclxuICAgICAgICAgIHJlc3VsdHMxID0gW107XHJcbiAgICAgICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcclxuICAgICAgICAgICAgdmVuZG9yID0gcmVmW2pdO1xyXG4gICAgICAgICAgICByZXN1bHRzMS5wdXNoKGVsZW1bXCJcIiArIHZlbmRvciArIChuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpKSArIChuYW1lLnN1YnN0cigxKSldID0gdmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHMxO1xyXG4gICAgICAgIH0pLmNhbGwodGhpcykpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfTtcclxuXHJcbiAgICBXT1cucHJvdG90eXBlLnZlbmRvckNTUyA9IGZ1bmN0aW9uKGVsZW0sIHByb3BlcnR5KSB7XHJcbiAgICAgIHZhciBqLCBsZW4sIHJlZiwgcmVzdWx0LCBzdHlsZSwgdmVuZG9yO1xyXG4gICAgICBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XHJcbiAgICAgIHJlc3VsdCA9IHN0eWxlLmdldFByb3BlcnR5Q1NTVmFsdWUocHJvcGVydHkpO1xyXG4gICAgICByZWYgPSB0aGlzLnZlbmRvcnM7XHJcbiAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xyXG4gICAgICAgIHZlbmRvciA9IHJlZltqXTtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgc3R5bGUuZ2V0UHJvcGVydHlDU1NWYWx1ZShcIi1cIiArIHZlbmRvciArIFwiLVwiICsgcHJvcGVydHkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIFdPVy5wcm90b3R5cGUuYW5pbWF0aW9uTmFtZSA9IGZ1bmN0aW9uKGJveCkge1xyXG4gICAgICB2YXIgYW5pbWF0aW9uTmFtZSwgZXJyb3I7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYW5pbWF0aW9uTmFtZSA9IHRoaXMudmVuZG9yQ1NTKGJveCwgJ2FuaW1hdGlvbi1uYW1lJykuY3NzVGV4dDtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBhbmltYXRpb25OYW1lID0gZ2V0Q29tcHV0ZWRTdHlsZShib3gpLmdldFByb3BlcnR5VmFsdWUoJ2FuaW1hdGlvbi1uYW1lJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGFuaW1hdGlvbk5hbWUgPT09ICdub25lJykge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uTmFtZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBXT1cucHJvdG90eXBlLmNhY2hlQW5pbWF0aW9uTmFtZSA9IGZ1bmN0aW9uKGJveCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5hbmltYXRpb25OYW1lQ2FjaGUuc2V0KGJveCwgdGhpcy5hbmltYXRpb25OYW1lKGJveCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBXT1cucHJvdG90eXBlLmNhY2hlZEFuaW1hdGlvbk5hbWUgPSBmdW5jdGlvbihib3gpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uTmFtZUNhY2hlLmdldChib3gpO1xyXG4gICAgfTtcclxuXHJcbiAgICBXT1cucHJvdG90eXBlLnNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICBXT1cucHJvdG90eXBlLnNjcm9sbENhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBib3g7XHJcbiAgICAgIGlmICh0aGlzLnNjcm9sbGVkKSB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYm94ZXMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgaiwgbGVuLCByZWYsIHJlc3VsdHM7XHJcbiAgICAgICAgICByZWYgPSB0aGlzLmJveGVzO1xyXG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XHJcbiAgICAgICAgICAgIGJveCA9IHJlZltqXTtcclxuICAgICAgICAgICAgaWYgKCEoYm94KSkge1xyXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZShib3gpKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zaG93KGJveCk7XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGJveCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgICB9KS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIGlmICghKHRoaXMuYm94ZXMubGVuZ3RoIHx8IHRoaXMuY29uZmlnLmxpdmUpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIFdPVy5wcm90b3R5cGUub2Zmc2V0VG9wID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICB2YXIgdG9wO1xyXG4gICAgICB3aGlsZSAoZWxlbWVudC5vZmZzZXRUb3AgPT09IHZvaWQgMCkge1xyXG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICAgIH1cclxuICAgICAgdG9wID0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgIHdoaWxlIChlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgICB0b3AgKz0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRvcDtcclxuICAgIH07XHJcblxyXG4gICAgV09XLnByb3RvdHlwZS5pc1Zpc2libGUgPSBmdW5jdGlvbihib3gpIHtcclxuICAgICAgdmFyIGJvdHRvbSwgb2Zmc2V0LCB0b3AsIHZpZXdCb3R0b20sIHZpZXdUb3A7XHJcbiAgICAgIG9mZnNldCA9IGJveC5nZXRBdHRyaWJ1dGUoJ2RhdGEtd293LW9mZnNldCcpIHx8IHRoaXMuY29uZmlnLm9mZnNldDtcclxuICAgICAgdmlld1RvcCA9ICh0aGlzLmNvbmZpZy5zY3JvbGxDb250YWluZXIgJiYgdGhpcy5jb25maWcuc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICB2aWV3Qm90dG9tID0gdmlld1RvcCArIE1hdGgubWluKHRoaXMuZWxlbWVudC5jbGllbnRIZWlnaHQsIHRoaXMudXRpbCgpLmlubmVySGVpZ2h0KCkpIC0gb2Zmc2V0O1xyXG4gICAgICB0b3AgPSB0aGlzLm9mZnNldFRvcChib3gpO1xyXG4gICAgICBib3R0b20gPSB0b3AgKyBib3guY2xpZW50SGVpZ2h0O1xyXG4gICAgICByZXR1cm4gdG9wIDw9IHZpZXdCb3R0b20gJiYgYm90dG9tID49IHZpZXdUb3A7XHJcbiAgICB9O1xyXG5cclxuICAgIFdPVy5wcm90b3R5cGUudXRpbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdXRpbCAhPSBudWxsID8gdGhpcy5fdXRpbCA6IHRoaXMuX3V0aWwgPSBuZXcgVXRpbCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBXT1cucHJvdG90eXBlLmRpc2FibGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiAhdGhpcy5jb25maWcubW9iaWxlICYmIHRoaXMudXRpbCgpLmlzTW9iaWxlKG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gV09XO1xyXG5cclxuICB9KSgpO1xyXG5cclxufSkuY2FsbCh0aGlzKTtcclxubmV3IFdPVygpLmluaXQoKTsiXSwiZmlsZSI6ImFuaW1hdGlvbi5qcyJ9
