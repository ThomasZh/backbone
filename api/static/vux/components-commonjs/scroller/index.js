/*!
 * Vux v0.1.3 (https://vux.li)
 * Licensed under the MIT license
 */
module.exports = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "";
    return __webpack_require__(0);
}([ function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(48);
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g, EMPTY = "";
        var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g, trim = String.prototype.trim;
        var _trim = trim ? function(str) {
            return str == null ? EMPTY : trim.call(str);
        } : function(str) {
            return str == null ? EMPTY : (str + "").replace(RE_TRIM, EMPTY);
        };
        function upperCase() {
            return arguments[1].toUpperCase();
        }
        function Empty() {}
        function createObject(proto, constructor) {
            var newProto;
            if (Object.create) {
                newProto = Object.create(proto);
            } else {
                Empty.prototype = proto;
                newProto = new Empty();
            }
            newProto.constructor = constructor;
            return newProto;
        }
        function getNodes(node, rootNode) {
            if (!node) return;
            if (node.nodeType) return [ node ];
            var rootNode = rootNode && rootNode.nodeType ? rootNode : document;
            if (node && typeof node === "string") {
                return rootNode.querySelectorAll(node);
            }
            return;
        }
        var idCounter = 0;
        var getOffsetTop = function(el) {
            var offset = el.offsetTop;
            if (el.offsetParent != null) offset += getOffsetTop(el.offsetParent);
            return offset;
        };
        var getOffsetLeft = function(el) {
            var offset = el.offsetLeft;
            if (el.offsetParent != null) offset += getOffsetLeft(el.offsetParent);
            return offset;
        };
        var Util = {
            isObject: function(obj) {
                return obj === Object(obj);
            },
            isArray: Array.isArray || function(obj) {
                return toString.call(obj) == "[object Array]";
            },
            isEmpty: function(obj) {
                if (obj == null) return true;
                if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
                for (var key in obj) if (this.has(obj, key)) return false;
                return true;
            },
            mix: function(to, from, deep) {
                for (var i in from) {
                    to[i] = from[i];
                }
                return to;
            },
            extend: function(r, s, px, sx) {
                if (!s || !r) {
                    return r;
                }
                var sp = s.prototype, rp;
                rp = createObject(sp, r);
                r.prototype = this.mix(rp, r.prototype);
                r.superclass = createObject(sp, s);
                if (px) {
                    this.mix(rp, px);
                }
                if (sx) {
                    this.mix(r, sx);
                }
                return r;
            },
            startsWith: function(str, prefix) {
                return str.lastIndexOf(prefix, 0) === 0;
            },
            endsWith: function(str, suffix) {
                var ind = str.length - suffix.length;
                return ind >= 0 && str.indexOf(suffix, ind) === ind;
            },
            trim: _trim,
            substitute: function(str, o, regexp) {
                if (typeof str !== "string" || !o) {
                    return str;
                }
                return str.replace(regexp || SUBSTITUTE_REG, function(match, name) {
                    if (match.charAt(0) === "\\") {
                        return match.slice(1);
                    }
                    return o[name] === undefined ? EMPTY : o[name];
                });
            },
            vendor: function() {
                var el = document.createElement("div").style;
                var vendors = [ "t", "webkitT", "MozT", "msT", "OT" ], transform, i = 0, l = vendors.length;
                for (;i < l; i++) {
                    transform = vendors[i] + "ransform";
                    if (transform in el) return vendors[i].substr(0, vendors[i].length - 1);
                }
                return false;
            }(),
            prefixStyle: function(attrName) {
                if (this.vendor === false) return false;
                if (this.vendor === "") return attrName;
                return this.vendor + attrName.charAt(0).toUpperCase() + attrName.substr(1);
            },
            hasClass: function(el, className) {
                return el && el.className && className && el.className.indexOf(className) != -1;
            },
            addClass: function(el, className) {
                if (el && className && !this.hasClass(el, className)) {
                    el.className += " " + className;
                }
            },
            removeClass: function(el, className) {
                if (el && el.className && className) {
                    el.className = el.className.replace(className, "");
                }
            },
            remove: function(el) {
                if (!el || !el.parentNode) return;
                el.parentNode.removeChild(el);
            },
            getOffsetTop: getOffsetTop,
            getOffsetLeft: getOffsetLeft,
            findParentEl: function(el, selector, rootNode) {
                var rs = null, parent = null;
                var type = /^#/.test(selector) ? "id" : /^\./.test(selector) ? "class" : "tag";
                var sel = selector.replace(/\.|#/g, "");
                if (rootNode && typeof rootNode === "string") {
                    rootNode = document.querySelector(rootNode);
                }
                rootNode = rootNode || document.body;
                if (!el || !selector) return;
                if (type == "class" && el.className && el.className.match(sel)) {
                    return el;
                } else if (type == "id" && el.id && _trim(el.id) == sel) {
                    return el;
                } else if (type == "tag" && el.tagName.toLowerCase() == sel) {
                    return el;
                }
                while (!rs) {
                    if (parent == rootNode) break;
                    parent = el.parentNode;
                    if (!parent) break;
                    if (type == "class" && parent.className && parent.className.match(sel) || type == "id" && parent.id && _trim(parent.id) == sel || type == "tag" && parent.tagName && parent.tagName.toLowerCase() == sel) {
                        rs = parent;
                        return rs;
                        break;
                    } else {
                        el = parent;
                    }
                }
                return null;
            },
            guid: function(prefix) {
                var id = ++idCounter + "";
                return prefix ? prefix + id : id;
            },
            isAndroid: function() {
                return /Android /.test(window.navigator.appVersion);
            },
            isBadAndroid: function() {
                return /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion);
            },
            px2Num: function(px) {
                return Number(px.replace(/px/, ""));
            },
            getNodes: getNodes,
            getNode: function(node, rootNode) {
                var nodes = getNodes(node, rootNode);
                return nodes && nodes[0];
            },
            stringifyStyle: function(style) {
                var styleStr = "";
                for (var i in style) {
                    styleStr += [ i, ":", style[i], ";" ].join("");
                }
                return styleStr;
            }
        };
        var names = [ "Arguments", "Function", "String", "Number", "Date", "RegExp" ];
        for (var i = 0; i < names.length; i++) {
            Util["is" + names[i]] = function(obj) {
                return toString.call(obj) == "[object " + names[i] + "]";
            };
        }
        if (typeof module == "object" && module.exports) {
            module.exports = Util;
        } else {
            return Util;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1);
        var Events = __webpack_require__(54);
        var Base = function() {};
        Util.mix(Base.prototype, Events);
        Util.mix(Base.prototype, {
            plug: function(plugin) {
                var self = this;
                if (!plugin || !plugin.pluginId) return;
                if (!self.__plugins) {
                    self.__plugins = [];
                }
                var __plugin = self.getPlugin(plugin.pluginId);
                __plugin && self.unplug(plugin.pluginId);
                plugin.pluginInitializer(self);
                self.__plugins.push(plugin);
                return self;
            },
            unplug: function(plugin) {
                var self = this;
                if (!plugin || !self.__plugins) return;
                var _plugin = typeof plugin == "string" ? self.getPlugin(plugin) : plugin;
                _plugin.pluginDestructor(self);
                for (var i = 0, l = self.__plugins.length; i < l; i++) {
                    if (self.__plugins[i] == _plugin) {
                        return self.__plugins.splice(i, 1);
                    }
                }
            },
            getPlugin: function(pluginId) {
                var self = this;
                var plugins = [];
                if (!self.__plugins) return;
                for (var i = 0, l = self.__plugins.length; i < l; i++) {
                    if (self.__plugins[i] && self.__plugins[i].pluginId == pluginId) {
                        plugins.push(self.__plugins[i]);
                    }
                }
                return plugins.length > 1 ? plugins : plugins[0] || null;
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = Base;
        } else {
            return Base;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1);
        var Timer = __webpack_require__(16);
        var Easing = __webpack_require__(15);
        var Base = __webpack_require__(2);
        var vendorTransform = Util.prefixStyle("transform");
        var vendorTransition = Util.prefixStyle("transition");
        var vendorTransitionDuration = Util.prefixStyle("transitionDuration");
        var vendorTransformOrigin = Util.prefixStyle("transformOrigin");
        var vendorTransitionEnd = Util.vendor ? Util.prefixStyle("transitionEnd") : "transitionend";
        var vendorTransformStr = Util.vendor ? [ "-", Util.vendor, "-transform" ].join("") : "transform";
        var translateTpl = "translateX({translateX}px) translateY({translateY}px) translateZ(0)";
        var animAttrs = {
            transform: true,
            opacity: true,
            scrollTop: true,
            scrollLeft: true
        };
        function myParse(v) {
            return Math.round(parseFloat(v) * 1e5) / 1e5;
        }
        function defaultDecompose() {
            return {
                translateX: 0,
                translateY: 0,
                rotate: 0,
                skewX: 0,
                skewY: 0,
                scaleX: 1,
                scaleY: 1
            };
        }
        function toMatrixArray(matrix) {
            matrix = matrix.split(/,/);
            matrix = Array.prototype.map.call(matrix, function(v) {
                return myParse(v);
            });
            return matrix;
        }
        function decomposeMatrix(matrix) {
            matrix = toMatrixArray(matrix);
            var scaleX, scaleY, skew, A = matrix[0], B = matrix[1], C = matrix[2], D = matrix[3];
            if (A * D - B * C) {
                scaleX = Math.sqrt(A * A + B * B);
                skew = (A * C + B * D) / (A * D - C * B);
                scaleY = (A * D - B * C) / scaleX;
                if (A * D < B * C) {
                    skew = -skew;
                    scaleX = -scaleX;
                }
            } else {
                scaleX = scaleY = skew = 0;
            }
            return {
                translateX: myParse(matrix[4]),
                translateY: myParse(matrix[5]),
                rotate: myParse(Math.atan2(B, A) * 180 / Math.PI),
                skewX: myParse(Math.atan(skew) * 180 / Math.PI),
                skewY: 0,
                scaleX: myParse(scaleX),
                scaleY: myParse(scaleY)
            };
        }
        function getTransformInfo(transform) {
            transform = transform.split(")");
            var trim = Util.trim, i = -1, l = transform.length - 1, split, prop, val, ret = defaultDecompose();
            while (++i < l) {
                split = transform[i].split("(");
                prop = trim(split[0]);
                val = split[1];
                switch (prop) {
                  case "translateX":
                  case "translateY":
                  case "scaleX":
                  case "scaleY":
                    ret[prop] = myParse(val);
                    break;

                  case "translate":
                  case "translate3d":
                    val = val.split(",");
                    ret.translateX = myParse(val[0]);
                    ret.translateY = myParse(val[1] || 0);
                    break;

                  case "scale":
                    val = val.split(",");
                    ret.scaleX = myParse(val[0]);
                    ret.scaleY = myParse(val[1] || val[0]);
                    break;

                  case "matrix":
                    return decomposeMatrix(val);
                }
            }
            return ret;
        }
        function Animate(el, cfg) {
            if (!el || !cfg || !cfg.css) return;
            var self = this;
            self.cfg = cfg;
            self.el = el;
            var duration = cfg.duration || 0, easing = cfg.easing || "ease", delay = cfg.delay || 0;
            if (cfg.run) {
                self.timer = self.timer || new Timer({
                    duration: Math.round(duration),
                    easing: easing
                });
                self.timer.on("run", cfg.run);
            }
            self._bindEvt();
            return self;
        }
        function computeTransform(prevTransform, destTransform) {
            var transform = getTransformInfo(prevTransform);
            var dest = getTransformInfo(destTransform);
            var trans = {};
            for (var i in dest) {
                trans[i] = {
                    prevVal: transform[i],
                    newVal: dest[i]
                };
            }
            return trans;
        }
        function setStyle(el, styleName, prevVal, newVal, percent) {
            prevVal = isNaN(Number(prevVal)) ? 0 : Number(prevVal);
            var curVal = (newVal - prevVal) * percent + prevVal;
            css(el, styleName, curVal);
        }
        function css(el, styleName, val) {
            switch (styleName) {
              case "scrollTop":
              case "scrollLeft":
                el[styleName] = val;
                break;

              case "transform":
                el.style[vendorTransform] = val;

              case "opacity":
                el.style[styleName] = val;
                break;
            }
        }
        Util.extend(Animate, Base, {
            run: function() {
                var self = this;
                var cfg = self.cfg, el = self.el, duration = cfg.duration || 0, easing = cfg.easing || "ease", delay = cfg.delay || 0;
                self.__isTransitionEnd = false;
                clearTimeout(self.__itv);
                self.timer && self.timer.run();
                if (duration <= Timer.MIN_DURATION) {
                    for (var i in cfg.css) {
                        css(el, i, cfg.css[i]);
                    }
                    self.stop();
                    self.__handlers.stop.call(self);
                    return;
                }
                if (Util.isBadAndroid()) {
                    cfg.useTransition = false;
                }
                if (cfg.useTransition) {
                    el.style[vendorTransition] = Util.substitute("all {duration}ms {easing} {delay}ms", {
                        duration: Math.round(duration),
                        easing: Easing.format(easing),
                        delay: delay
                    });
                    for (var i in cfg.css) {
                        css(el, i, cfg.css[i]);
                    }
                    self.__itv = setTimeout(function() {
                        if (!self.__isTransitionEnd) {
                            self.__isTransitionEnd = true;
                            self.trigger("transitionend");
                        }
                    }, Number(duration) + 60);
                } else {
                    self.computeStyle = self.computeStyle || window.getComputedStyle(el);
                    if (cfg.css.transform && self.timer) {
                        var transmap = self.transmap = computeTransform(self.computeStyle[vendorTransform], cfg.css.transform);
                        self.timer.off("run", self.__handlers.transRun);
                        self.timer.on("run", self.__handlers.transRun, self);
                        self.timer.off("end", self.__handlers.transRun);
                        self.timer.on("end", self.__handlers.transRun, self);
                    }
                }
                return self;
            },
            _transitionEndHandler: function(e) {
                var self = this;
                self.stop();
                self.__handlers.stop.call(self);
            },
            __handlers: {
                transRun: function(e) {
                    var self = this;
                    var transmap = self.transmap;
                    var el = self.el;
                    var newTrans = {};
                    for (var i in transmap) {
                        newTrans[i] = (transmap[i].newVal - transmap[i].prevVal) * e.percent + transmap[i].prevVal;
                    }
                    var ret = Util.substitute(translateTpl + " " + "scale({scaleX},{scaleY})", newTrans);
                    el.style[vendorTransform] = ret;
                },
                stop: function(e) {
                    var self = this;
                    var cfg = self.cfg;
                    cfg.end && cfg.end({
                        percent: 1
                    });
                }
            },
            _bindEvt: function() {
                var self = this;
                var cfg = self.cfg;
                var el = self.el;
                self.el.addEventListener(vendorTransitionEnd, function(e) {
                    self.__isTransitionEnd = true;
                    if (e.target !== e.currentTarget) return;
                    self.trigger("transitionend", e);
                });
                self.on("transitionend", self._transitionEndHandler, self);
                var cssRun = function(e) {
                    self.computeStyle = self.computeStyle || window.getComputedStyle(el);
                    for (var i in cfg.css) {
                        if (!/transform/.test(i)) {
                            setStyle(self.el, i, self.computeStyle[i], cfg.css[i], e.percent);
                        }
                    }
                };
                self.timer && self.timer.on("run", cssRun);
                self.timer && self.timer.on("stop", self.__handlers.stop, self);
            },
            stop: function() {
                var self = this;
                if (self.cfg.useTransition && self.cfg.duration > Timer.MIN_DURATION) {
                    var computeStyle = window.getComputedStyle(this.el);
                    for (var i in self.cfg.css) {
                        if (animAttrs[i]) {
                            var value = /transform/.test(i) ? computeStyle[vendorTransform] : computeStyle[i];
                            css(self.el, i, Util.substitute(translateTpl + " " + "scale({scaleX},{scaleY})", getTransformInfo(value)));
                        }
                    }
                    self.el.style[vendorTransition] = "none";
                }
                self.timer && self.timer.stop() && self.timer.reset();
                self.computeStyle = null;
                return self;
            },
            reset: function(cfg) {
                var self = this;
                self.computeStyle = null;
                Util.mix(self.cfg, cfg);
                this.timer && self.timer.reset({
                    duration: Math.round(self.cfg.duration),
                    easing: self.cfg.easing
                });
                return self;
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = Animate;
        } else {
            return Animate;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(5)(function() {
        return Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports) {
    module.exports = function(exec) {
        try {
            return !!exec();
        } catch (e) {
            return true;
        }
    };
}, function(module, exports) {
    var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
    if (typeof __g == "number") __g = global;
}, function(module, exports) {
    module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
    };
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        /*! Hammer.JS - v2.0.4 - 2014-09-28
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2014 Jorik Tangelder;
	 * Licensed under the MIT license */
        "use strict";
        var VENDOR_PREFIXES = [ "", "webkit", "moz", "MS", "ms", "o" ];
        var TEST_ELEMENT = document.createElement("div");
        var TYPE_FUNCTION = "function";
        var round = Math.round;
        var abs = Math.abs;
        var now = Date.now;
        function setTimeoutContext(fn, timeout, context) {
            return setTimeout(bindFn(fn, context), timeout);
        }
        function invokeArrayArg(arg, fn, context) {
            if (Array.isArray(arg)) {
                each(arg, context[fn], context);
                return true;
            }
            return false;
        }
        function each(obj, iterator, context) {
            var i;
            if (!obj) {
                return;
            }
            if (obj.forEach) {
                obj.forEach(iterator, context);
            } else if (obj.length !== undefined) {
                i = 0;
                while (i < obj.length) {
                    iterator.call(context, obj[i], i, obj);
                    i++;
                }
            } else {
                for (i in obj) {
                    obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
                }
            }
        }
        function extend(dest, src, merge) {
            var keys = Object.keys(src);
            var i = 0;
            while (i < keys.length) {
                if (!merge || merge && dest[keys[i]] === undefined) {
                    dest[keys[i]] = src[keys[i]];
                }
                i++;
            }
            return dest;
        }
        function merge(dest, src) {
            return extend(dest, src, true);
        }
        function inherit(child, base, properties) {
            var baseP = base.prototype, childP;
            childP = child.prototype = Object.create(baseP);
            childP.constructor = child;
            childP._super = baseP;
            if (properties) {
                extend(childP, properties);
            }
        }
        function bindFn(fn, context) {
            return function boundFn() {
                return fn.apply(context, arguments);
            };
        }
        function boolOrFn(val, args) {
            if (typeof val == TYPE_FUNCTION) {
                return val.apply(args ? args[0] || undefined : undefined, args);
            }
            return val;
        }
        function ifUndefined(val1, val2) {
            return val1 === undefined ? val2 : val1;
        }
        function addEventListeners(target, types, handler) {
            each(splitStr(types), function(type) {
                target.addEventListener(type, handler, false);
            });
        }
        function removeEventListeners(target, types, handler) {
            each(splitStr(types), function(type) {
                target.removeEventListener(type, handler, false);
            });
        }
        function hasParent(node, parent) {
            while (node) {
                if (node == parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }
        function inStr(str, find) {
            return str.indexOf(find) > -1;
        }
        function splitStr(str) {
            return str.trim().split(/\s+/g);
        }
        function inArray(src, find, findByKey) {
            if (src.indexOf && !findByKey) {
                return src.indexOf(find);
            } else {
                var i = 0;
                while (i < src.length) {
                    if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
                        return i;
                    }
                    i++;
                }
                return -1;
            }
        }
        function toArray(obj) {
            return Array.prototype.slice.call(obj, 0);
        }
        function uniqueArray(src, key, sort) {
            var results = [];
            var values = [];
            var i = 0;
            while (i < src.length) {
                var val = key ? src[i][key] : src[i];
                if (inArray(values, val) < 0) {
                    results.push(src[i]);
                }
                values[i] = val;
                i++;
            }
            if (sort) {
                if (!key) {
                    results = results.sort();
                } else {
                    results = results.sort(function sortUniqueArray(a, b) {
                        return a[key] > b[key];
                    });
                }
            }
            return results;
        }
        function prefixed(obj, property) {
            var prefix, prop;
            var camelProp = property[0].toUpperCase() + property.slice(1);
            var i = 0;
            while (i < VENDOR_PREFIXES.length) {
                prefix = VENDOR_PREFIXES[i];
                prop = prefix ? prefix + camelProp : property;
                if (prop in obj) {
                    return prop;
                }
                i++;
            }
            return undefined;
        }
        var _uniqueId = 1;
        function uniqueId() {
            return _uniqueId++;
        }
        function getWindowForElement(element) {
            var doc = element.ownerDocument;
            return doc.defaultView || doc.parentWindow;
        }
        var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
        var SUPPORT_TOUCH = "ontouchstart" in window;
        var SUPPORT_POINTER_EVENTS = prefixed(window, "PointerEvent") !== undefined;
        var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
        var INPUT_TYPE_TOUCH = "touch";
        var INPUT_TYPE_PEN = "pen";
        var INPUT_TYPE_MOUSE = "mouse";
        var INPUT_TYPE_KINECT = "kinect";
        var COMPUTE_INTERVAL = 25;
        var INPUT_START = 1;
        var INPUT_MOVE = 2;
        var INPUT_END = 4;
        var INPUT_CANCEL = 8;
        var DIRECTION_NONE = 1;
        var DIRECTION_LEFT = 2;
        var DIRECTION_RIGHT = 4;
        var DIRECTION_UP = 8;
        var DIRECTION_DOWN = 16;
        var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
        var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
        var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
        var PROPS_XY = [ "x", "y" ];
        var PROPS_CLIENT_XY = [ "clientX", "clientY" ];
        function Input(manager, callback) {
            var self = this;
            this.manager = manager;
            this.callback = callback;
            this.element = manager.element;
            this.target = manager.options.inputTarget;
            this.domHandler = function(ev) {
                if (boolOrFn(manager.options.enable, [ manager ])) {
                    self.handler(ev);
                }
            };
            this.init();
        }
        Input.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
                this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
                this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
            },
            destroy: function() {
                this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
                this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
                this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
            }
        };
        function createInputInstance(manager) {
            var Type;
            var inputClass = manager.options.inputClass;
            if (inputClass) {
                Type = inputClass;
            } else if (SUPPORT_POINTER_EVENTS) {
                Type = PointerEventInput;
            } else if (SUPPORT_ONLY_TOUCH) {
                Type = TouchInput;
            } else if (!SUPPORT_TOUCH) {
                Type = MouseInput;
            } else {
                Type = TouchMouseInput;
            }
            return new Type(manager, inputHandler);
        }
        function inputHandler(manager, eventType, input) {
            var pointersLen = input.pointers.length;
            var changedPointersLen = input.changedPointers.length;
            var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
            var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
            input.isFirst = !!isFirst;
            input.isFinal = !!isFinal;
            if (isFirst) {
                manager.session = {};
            }
            input.eventType = eventType;
            computeInputData(manager, input);
            manager.emit("hammer.input", input);
            manager.recognize(input);
            manager.session.prevInput = input;
        }
        function computeInputData(manager, input) {
            var session = manager.session;
            var pointers = input.pointers;
            var pointersLength = pointers.length;
            if (!session.firstInput) {
                session.firstInput = simpleCloneInputData(input);
            }
            if (pointersLength > 1 && !session.firstMultiple) {
                session.firstMultiple = simpleCloneInputData(input);
            } else if (pointersLength === 1) {
                session.firstMultiple = false;
            }
            var firstInput = session.firstInput;
            var firstMultiple = session.firstMultiple;
            var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
            var center = input.center = getCenter(pointers);
            input.timeStamp = now();
            input.deltaTime = input.timeStamp - firstInput.timeStamp;
            input.angle = getAngle(offsetCenter, center);
            input.distance = getDistance(offsetCenter, center);
            computeDeltaXY(session, input);
            input.offsetDirection = getDirection(input.deltaX, input.deltaY);
            input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
            input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
            computeIntervalInputData(session, input);
            var target = manager.element;
            if (hasParent(input.srcEvent.target, target)) {
                target = input.srcEvent.target;
            }
            input.target = target;
        }
        function computeDeltaXY(session, input) {
            var center = input.center;
            var offset = session.offsetDelta || {};
            var prevDelta = session.prevDelta || {};
            var prevInput = session.prevInput || {};
            if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
                prevDelta = session.prevDelta = {
                    x: prevInput.deltaX || 0,
                    y: prevInput.deltaY || 0
                };
                offset = session.offsetDelta = {
                    x: center.x,
                    y: center.y
                };
            }
            input.deltaX = prevDelta.x + (center.x - offset.x);
            input.deltaY = prevDelta.y + (center.y - offset.y);
        }
        function computeIntervalInputData(session, input) {
            var last = session.lastInterval || input, deltaTime = input.timeStamp - last.timeStamp, velocity, velocityX, velocityY, direction;
            if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
                var deltaX = last.deltaX - input.deltaX;
                var deltaY = last.deltaY - input.deltaY;
                var v = getVelocity(deltaTime, deltaX, deltaY);
                velocityX = v.x;
                velocityY = v.y;
                velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
                direction = getDirection(deltaX, deltaY);
                session.lastInterval = input;
            } else {
                velocity = last.velocity;
                velocityX = last.velocityX;
                velocityY = last.velocityY;
                direction = last.direction;
            }
            input.velocity = velocity;
            input.velocityX = velocityX;
            input.velocityY = velocityY;
            input.direction = direction;
        }
        function simpleCloneInputData(input) {
            var pointers = [];
            var i = 0;
            while (i < input.pointers.length) {
                pointers[i] = {
                    clientX: round(input.pointers[i].clientX),
                    clientY: round(input.pointers[i].clientY)
                };
                i++;
            }
            return {
                timeStamp: now(),
                pointers: pointers,
                center: getCenter(pointers),
                deltaX: input.deltaX,
                deltaY: input.deltaY
            };
        }
        function getCenter(pointers) {
            var pointersLength = pointers.length;
            if (pointersLength === 1) {
                return {
                    x: round(pointers[0].clientX),
                    y: round(pointers[0].clientY)
                };
            }
            var x = 0, y = 0, i = 0;
            while (i < pointersLength) {
                x += pointers[i].clientX;
                y += pointers[i].clientY;
                i++;
            }
            return {
                x: round(x / pointersLength),
                y: round(y / pointersLength)
            };
        }
        function getVelocity(deltaTime, x, y) {
            return {
                x: x / deltaTime || 0,
                y: y / deltaTime || 0
            };
        }
        function getDirection(x, y) {
            if (x === y) {
                return DIRECTION_NONE;
            }
            if (abs(x) >= abs(y)) {
                return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
            }
            return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
        }
        function getDistance(p1, p2, props) {
            if (!props) {
                props = PROPS_XY;
            }
            var x = p2[props[0]] - p1[props[0]], y = p2[props[1]] - p1[props[1]];
            return Math.sqrt(x * x + y * y);
        }
        function getAngle(p1, p2, props) {
            if (!props) {
                props = PROPS_XY;
            }
            var x = p2[props[0]] - p1[props[0]], y = p2[props[1]] - p1[props[1]];
            return Math.atan2(y, x) * 180 / Math.PI;
        }
        function getRotation(start, end) {
            return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
        }
        function getScale(start, end) {
            return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
        }
        var MOUSE_INPUT_MAP = {
            mousedown: INPUT_START,
            mousemove: INPUT_MOVE,
            mouseup: INPUT_END
        };
        var MOUSE_ELEMENT_EVENTS = "mousedown";
        var MOUSE_WINDOW_EVENTS = "mousemove mouseup";
        function MouseInput() {
            this.evEl = MOUSE_ELEMENT_EVENTS;
            this.evWin = MOUSE_WINDOW_EVENTS;
            this.allow = true;
            this.pressed = false;
            Input.apply(this, arguments);
        }
        inherit(MouseInput, Input, {
            handler: function MEhandler(ev) {
                var eventType = MOUSE_INPUT_MAP[ev.type];
                if (eventType & INPUT_START && ev.button === 0) {
                    this.pressed = true;
                }
                if (eventType & INPUT_MOVE && ev.which !== 1) {
                    eventType = INPUT_END;
                }
                if (!this.pressed || !this.allow) {
                    return;
                }
                if (eventType & INPUT_END) {
                    this.pressed = false;
                }
                this.callback(this.manager, eventType, {
                    pointers: [ ev ],
                    changedPointers: [ ev ],
                    pointerType: INPUT_TYPE_MOUSE,
                    srcEvent: ev
                });
            }
        });
        var POINTER_INPUT_MAP = {
            pointerdown: INPUT_START,
            pointermove: INPUT_MOVE,
            pointerup: INPUT_END,
            pointercancel: INPUT_CANCEL,
            pointerout: INPUT_CANCEL
        };
        var IE10_POINTER_TYPE_ENUM = {
            2: INPUT_TYPE_TOUCH,
            3: INPUT_TYPE_PEN,
            4: INPUT_TYPE_MOUSE,
            5: INPUT_TYPE_KINECT
        };
        var POINTER_ELEMENT_EVENTS = "pointerdown";
        var POINTER_WINDOW_EVENTS = "pointermove pointerup pointercancel";
        if (window.MSPointerEvent) {
            POINTER_ELEMENT_EVENTS = "MSPointerDown";
            POINTER_WINDOW_EVENTS = "MSPointerMove MSPointerUp MSPointerCancel";
        }
        function PointerEventInput() {
            this.evEl = POINTER_ELEMENT_EVENTS;
            this.evWin = POINTER_WINDOW_EVENTS;
            Input.apply(this, arguments);
            this.store = this.manager.session.pointerEvents = [];
        }
        inherit(PointerEventInput, Input, {
            handler: function PEhandler(ev) {
                var store = this.store;
                var removePointer = false;
                var eventTypeNormalized = ev.type.toLowerCase().replace("ms", "");
                var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
                var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
                var isTouch = pointerType == INPUT_TYPE_TOUCH;
                var storeIndex = inArray(store, ev.pointerId, "pointerId");
                if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
                    if (storeIndex < 0) {
                        store.push(ev);
                        storeIndex = store.length - 1;
                    }
                } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                    removePointer = true;
                }
                if (storeIndex < 0) {
                    return;
                }
                store[storeIndex] = ev;
                this.callback(this.manager, eventType, {
                    pointers: store,
                    changedPointers: [ ev ],
                    pointerType: pointerType,
                    srcEvent: ev
                });
                if (removePointer) {
                    store.splice(storeIndex, 1);
                }
            }
        });
        var SINGLE_TOUCH_INPUT_MAP = {
            touchstart: INPUT_START,
            touchmove: INPUT_MOVE,
            touchend: INPUT_END,
            touchcancel: INPUT_CANCEL
        };
        var SINGLE_TOUCH_TARGET_EVENTS = "touchstart";
        var SINGLE_TOUCH_WINDOW_EVENTS = "touchstart touchmove touchend touchcancel";
        function SingleTouchInput() {
            this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
            this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
            this.started = false;
            Input.apply(this, arguments);
        }
        inherit(SingleTouchInput, Input, {
            handler: function TEhandler(ev) {
                var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
                if (type === INPUT_START) {
                    this.started = true;
                }
                if (!this.started) {
                    return;
                }
                var touches = normalizeSingleTouches.call(this, ev, type);
                if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
                    this.started = false;
                }
                this.callback(this.manager, type, {
                    pointers: touches[0],
                    changedPointers: touches[1],
                    pointerType: INPUT_TYPE_TOUCH,
                    srcEvent: ev
                });
            }
        });
        function normalizeSingleTouches(ev, type) {
            var all = toArray(ev.touches);
            var changed = toArray(ev.changedTouches);
            if (type & (INPUT_END | INPUT_CANCEL)) {
                all = uniqueArray(all.concat(changed), "identifier", true);
            }
            return [ all, changed ];
        }
        var TOUCH_INPUT_MAP = {
            touchstart: INPUT_START,
            touchmove: INPUT_MOVE,
            touchend: INPUT_END,
            touchcancel: INPUT_CANCEL
        };
        var TOUCH_TARGET_EVENTS = "touchstart touchmove touchend touchcancel";
        function TouchInput() {
            this.evTarget = TOUCH_TARGET_EVENTS;
            this.targetIds = {};
            Input.apply(this, arguments);
        }
        inherit(TouchInput, Input, {
            handler: function MTEhandler(ev) {
                var type = TOUCH_INPUT_MAP[ev.type];
                var touches = getTouches.call(this, ev, type);
                if (!touches) {
                    return;
                }
                this.callback(this.manager, type, {
                    pointers: touches[0],
                    changedPointers: touches[1],
                    pointerType: INPUT_TYPE_TOUCH,
                    srcEvent: ev
                });
            }
        });
        function getTouches(ev, type) {
            var allTouches = toArray(ev.touches);
            var targetIds = this.targetIds;
            if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
                targetIds[allTouches[0].identifier] = true;
                return [ allTouches, allTouches ];
            }
            var i, targetTouches, changedTouches = toArray(ev.changedTouches), changedTargetTouches = [], target = this.target;
            targetTouches = allTouches.filter(function(touch) {
                return hasParent(touch.target, target);
            });
            if (type === INPUT_START) {
                i = 0;
                while (i < targetTouches.length) {
                    targetIds[targetTouches[i].identifier] = true;
                    i++;
                }
            }
            i = 0;
            while (i < changedTouches.length) {
                if (targetIds[changedTouches[i].identifier]) {
                    changedTargetTouches.push(changedTouches[i]);
                }
                if (type & (INPUT_END | INPUT_CANCEL)) {
                    delete targetIds[changedTouches[i].identifier];
                }
                i++;
            }
            if (!changedTargetTouches.length) {
                return;
            }
            return [ uniqueArray(targetTouches.concat(changedTargetTouches), "identifier", true), changedTargetTouches ];
        }
        function TouchMouseInput() {
            Input.apply(this, arguments);
            var handler = bindFn(this.handler, this);
            this.touch = new TouchInput(this.manager, handler);
            this.mouse = new MouseInput(this.manager, handler);
        }
        inherit(TouchMouseInput, Input, {
            handler: function TMEhandler(manager, inputEvent, inputData) {
                var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH, isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;
                if (isTouch) {
                    this.mouse.allow = false;
                } else if (isMouse && !this.mouse.allow) {
                    return;
                }
                if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
                    this.mouse.allow = true;
                }
                this.callback(manager, inputEvent, inputData);
            },
            destroy: function destroy() {
                this.touch.destroy();
                this.mouse.destroy();
            }
        });
        var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, "touchAction");
        var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
        var TOUCH_ACTION_COMPUTE = "compute";
        var TOUCH_ACTION_AUTO = "auto";
        var TOUCH_ACTION_MANIPULATION = "manipulation";
        var TOUCH_ACTION_NONE = "none";
        var TOUCH_ACTION_PAN_X = "pan-x";
        var TOUCH_ACTION_PAN_Y = "pan-y";
        function TouchAction(manager, value) {
            this.manager = manager;
            this.set(value);
        }
        TouchAction.prototype = {
            set: function(value) {
                if (value == TOUCH_ACTION_COMPUTE) {
                    value = this.compute();
                }
                if (NATIVE_TOUCH_ACTION) {
                    this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
                }
                this.actions = value.toLowerCase().trim();
            },
            update: function() {
                this.set(this.manager.options.touchAction);
            },
            compute: function() {
                var actions = [];
                each(this.manager.recognizers, function(recognizer) {
                    if (boolOrFn(recognizer.options.enable, [ recognizer ])) {
                        actions = actions.concat(recognizer.getTouchAction());
                    }
                });
                return cleanTouchActions(actions.join(" "));
            },
            preventDefaults: function(input) {
                if (NATIVE_TOUCH_ACTION) {
                    return;
                }
                var srcEvent = input.srcEvent;
                var direction = input.offsetDirection;
                if (this.manager.session.prevented) {
                    srcEvent.preventDefault();
                    return;
                }
                var actions = this.actions;
                var hasNone = inStr(actions, TOUCH_ACTION_NONE);
                var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
                var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
                if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
                    return this.preventSrc(srcEvent);
                }
            },
            preventSrc: function(srcEvent) {
                this.manager.session.prevented = true;
                srcEvent.preventDefault();
            }
        };
        function cleanTouchActions(actions) {
            if (inStr(actions, TOUCH_ACTION_NONE)) {
                return TOUCH_ACTION_NONE;
            }
            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
            if (hasPanX && hasPanY) {
                return TOUCH_ACTION_PAN_X + " " + TOUCH_ACTION_PAN_Y;
            }
            if (hasPanX || hasPanY) {
                return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
            }
            if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
                return TOUCH_ACTION_MANIPULATION;
            }
            return TOUCH_ACTION_AUTO;
        }
        var STATE_POSSIBLE = 1;
        var STATE_BEGAN = 2;
        var STATE_CHANGED = 4;
        var STATE_ENDED = 8;
        var STATE_RECOGNIZED = STATE_ENDED;
        var STATE_CANCELLED = 16;
        var STATE_FAILED = 32;
        function Recognizer(options) {
            this.id = uniqueId();
            this.manager = null;
            this.options = merge(options || {}, this.defaults);
            this.options.enable = ifUndefined(this.options.enable, true);
            this.state = STATE_POSSIBLE;
            this.simultaneous = {};
            this.requireFail = [];
        }
        Recognizer.prototype = {
            defaults: {},
            set: function(options) {
                extend(this.options, options);
                this.manager && this.manager.touchAction.update();
                return this;
            },
            recognizeWith: function(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, "recognizeWith", this)) {
                    return this;
                }
                var simultaneous = this.simultaneous;
                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                if (!simultaneous[otherRecognizer.id]) {
                    simultaneous[otherRecognizer.id] = otherRecognizer;
                    otherRecognizer.recognizeWith(this);
                }
                return this;
            },
            dropRecognizeWith: function(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, "dropRecognizeWith", this)) {
                    return this;
                }
                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                delete this.simultaneous[otherRecognizer.id];
                return this;
            },
            requireFailure: function(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, "requireFailure", this)) {
                    return this;
                }
                var requireFail = this.requireFail;
                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                if (inArray(requireFail, otherRecognizer) === -1) {
                    requireFail.push(otherRecognizer);
                    otherRecognizer.requireFailure(this);
                }
                return this;
            },
            dropRequireFailure: function(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, "dropRequireFailure", this)) {
                    return this;
                }
                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                var index = inArray(this.requireFail, otherRecognizer);
                if (index > -1) {
                    this.requireFail.splice(index, 1);
                }
                return this;
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0;
            },
            canRecognizeWith: function(otherRecognizer) {
                return !!this.simultaneous[otherRecognizer.id];
            },
            emit: function(input) {
                var self = this;
                var state = this.state;
                function emit(withState) {
                    self.manager.emit(self.options.event + (withState ? stateStr(state) : ""), input);
                }
                if (state < STATE_ENDED) {
                    emit(true);
                }
                emit();
                if (state >= STATE_ENDED) {
                    emit(true);
                }
            },
            tryEmit: function(input) {
                if (this.canEmit()) {
                    return this.emit(input);
                }
                this.state = STATE_FAILED;
            },
            canEmit: function() {
                var i = 0;
                while (i < this.requireFail.length) {
                    if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                        return false;
                    }
                    i++;
                }
                return true;
            },
            recognize: function(inputData) {
                var inputDataClone = extend({}, inputData);
                if (!boolOrFn(this.options.enable, [ this, inputDataClone ])) {
                    this.reset();
                    this.state = STATE_FAILED;
                    return;
                }
                if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
                    this.state = STATE_POSSIBLE;
                }
                this.state = this.process(inputDataClone);
                if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
                    this.tryEmit(inputDataClone);
                }
            },
            process: function(inputData) {},
            getTouchAction: function() {},
            reset: function() {}
        };
        function stateStr(state) {
            if (state & STATE_CANCELLED) {
                return "cancel";
            } else if (state & STATE_ENDED) {
                return "end";
            } else if (state & STATE_CHANGED) {
                return "move";
            } else if (state & STATE_BEGAN) {
                return "start";
            }
            return "";
        }
        function directionStr(direction) {
            if (direction == DIRECTION_DOWN) {
                return "down";
            } else if (direction == DIRECTION_UP) {
                return "up";
            } else if (direction == DIRECTION_LEFT) {
                return "left";
            } else if (direction == DIRECTION_RIGHT) {
                return "right";
            }
            return "";
        }
        function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
            var manager = recognizer.manager;
            if (manager) {
                return manager.get(otherRecognizer);
            }
            return otherRecognizer;
        }
        function AttrRecognizer() {
            Recognizer.apply(this, arguments);
        }
        inherit(AttrRecognizer, Recognizer, {
            defaults: {
                pointers: 1
            },
            attrTest: function(input) {
                var optionPointers = this.options.pointers;
                return optionPointers === 0 || input.pointers.length === optionPointers;
            },
            process: function(input) {
                var state = this.state;
                var eventType = input.eventType;
                var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
                var isValid = this.attrTest(input);
                if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
                    return state | STATE_CANCELLED;
                } else if (isRecognized || isValid) {
                    if (eventType & INPUT_END) {
                        return state | STATE_ENDED;
                    } else if (!(state & STATE_BEGAN)) {
                        return STATE_BEGAN;
                    }
                    return state | STATE_CHANGED;
                }
                return STATE_FAILED;
            }
        });
        function PanRecognizer() {
            AttrRecognizer.apply(this, arguments);
            this.pX = null;
            this.pY = null;
        }
        inherit(PanRecognizer, AttrRecognizer, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: DIRECTION_ALL
            },
            getTouchAction: function() {
                var direction = this.options.direction;
                var actions = [];
                if (direction & DIRECTION_HORIZONTAL) {
                    actions.push(TOUCH_ACTION_PAN_Y);
                }
                if (direction & DIRECTION_VERTICAL) {
                    actions.push(TOUCH_ACTION_PAN_X);
                }
                return actions;
            },
            directionTest: function(input) {
                var options = this.options;
                var hasMoved = true;
                var distance = input.distance;
                var direction = input.direction;
                var x = input.deltaX;
                var y = input.deltaY;
                if (!(direction & options.direction)) {
                    if (options.direction & DIRECTION_HORIZONTAL) {
                        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
                        hasMoved = x != this.pX;
                        distance = Math.abs(input.deltaX);
                    } else {
                        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
                        hasMoved = y != this.pY;
                        distance = Math.abs(input.deltaY);
                    }
                }
                input.direction = direction;
                return hasMoved && distance > options.threshold && direction & options.direction;
            },
            attrTest: function(input) {
                return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
            },
            emit: function(input) {
                this.pX = input.deltaX;
                this.pY = input.deltaY;
                var direction = directionStr(input.direction);
                if (direction) {
                    this.manager.emit(this.options.event + direction, input);
                }
                this._super.emit.call(this, input);
            },
            reset: function() {}
        });
        function PinchRecognizer() {
            AttrRecognizer.apply(this, arguments);
        }
        inherit(PinchRecognizer, AttrRecognizer, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [ TOUCH_ACTION_NONE ];
            },
            attrTest: function(input) {
                return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
            },
            emit: function(input) {
                this._super.emit.call(this, input);
                if (input.scale !== 1) {
                    var inOut = input.scale < 1 ? "in" : "out";
                    this.manager.emit(this.options.event + inOut, input);
                }
            }
        });
        function PressRecognizer() {
            Recognizer.apply(this, arguments);
            this._timer = null;
            this._input = null;
        }
        inherit(PressRecognizer, Recognizer, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 500,
                threshold: 5
            },
            getTouchAction: function() {
                return [ TOUCH_ACTION_AUTO ];
            },
            process: function(input) {
                var options = this.options;
                var validPointers = input.pointers.length === options.pointers;
                var validMovement = input.distance < options.threshold;
                var validTime = input.deltaTime > options.time;
                this._input = input;
                if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
                    this.reset();
                } else if (input.eventType & INPUT_START) {
                    this.reset();
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.time, this);
                } else if (input.eventType & INPUT_END) {
                    return STATE_RECOGNIZED;
                }
                return STATE_FAILED;
            },
            reset: function() {
                clearTimeout(this._timer);
            },
            emit: function(input) {
                if (this.state !== STATE_RECOGNIZED) {
                    return;
                }
                if (input && input.eventType & INPUT_END) {
                    this.manager.emit(this.options.event + "up", input);
                } else {
                    this._input.timeStamp = now();
                    this.manager.emit(this.options.event, this._input);
                }
            }
        });
        function RotateRecognizer() {
            AttrRecognizer.apply(this, arguments);
        }
        inherit(RotateRecognizer, AttrRecognizer, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [ TOUCH_ACTION_NONE ];
            },
            attrTest: function(input) {
                return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
            }
        });
        function SwipeRecognizer() {
            AttrRecognizer.apply(this, arguments);
        }
        inherit(SwipeRecognizer, AttrRecognizer, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .65,
                direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
                pointers: 1
            },
            getTouchAction: function() {
                return PanRecognizer.prototype.getTouchAction.call(this);
            },
            attrTest: function(input) {
                var direction = this.options.direction;
                var velocity;
                if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
                    velocity = input.velocity;
                } else if (direction & DIRECTION_HORIZONTAL) {
                    velocity = input.velocityX;
                } else if (direction & DIRECTION_VERTICAL) {
                    velocity = input.velocityY;
                }
                return this._super.attrTest.call(this, input) && direction & input.direction && input.distance > this.options.threshold && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
            },
            emit: function(input) {
                var direction = directionStr(input.direction);
                if (direction) {
                    this.manager.emit(this.options.event + direction, input);
                }
                this.manager.emit(this.options.event, input);
            }
        });
        function TapRecognizer() {
            Recognizer.apply(this, arguments);
            this.pTime = false;
            this.pCenter = false;
            this._timer = null;
            this._input = null;
            this.count = 0;
        }
        inherit(TapRecognizer, Recognizer, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 10,
                posThreshold: 10
            },
            getTouchAction: function() {
                return [ TOUCH_ACTION_MANIPULATION ];
            },
            process: function(input) {
                var options = this.options;
                var validPointers = input.pointers.length === options.pointers;
                var validMovement = input.distance < options.threshold;
                var validTouchTime = input.deltaTime < options.time;
                this.reset();
                if (input.eventType & INPUT_START && this.count === 0) {
                    return this.failTimeout();
                }
                if (validMovement && validTouchTime && validPointers) {
                    if (input.eventType != INPUT_END) {
                        return this.failTimeout();
                    }
                    var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
                    var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
                    this.pTime = input.timeStamp;
                    this.pCenter = input.center;
                    if (!validMultiTap || !validInterval) {
                        this.count = 1;
                    } else {
                        this.count += 1;
                    }
                    this._input = input;
                    var tapCount = this.count % options.taps;
                    if (tapCount === 0) {
                        if (!this.hasRequireFailures()) {
                            return STATE_RECOGNIZED;
                        } else {
                            this._timer = setTimeoutContext(function() {
                                this.state = STATE_RECOGNIZED;
                                this.tryEmit();
                            }, options.interval, this);
                            return STATE_BEGAN;
                        }
                    }
                }
                return STATE_FAILED;
            },
            failTimeout: function() {
                this._timer = setTimeoutContext(function() {
                    this.state = STATE_FAILED;
                }, this.options.interval, this);
                return STATE_FAILED;
            },
            reset: function() {
                clearTimeout(this._timer);
            },
            emit: function() {
                if (this.state == STATE_RECOGNIZED) {
                    this._input.tapCount = this.count;
                    this.manager.emit(this.options.event, this._input);
                }
            }
        });
        function Hammer(element, options) {
            options = options || {};
            options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
            return new Manager(element, options);
        }
        Hammer.VERSION = "2.0.4";
        Hammer.defaults = {
            domEvents: false,
            touchAction: TOUCH_ACTION_COMPUTE,
            enable: true,
            inputTarget: null,
            inputClass: null,
            preset: [ [ RotateRecognizer, {
                enable: false
            } ], [ PinchRecognizer, {
                enable: false
            }, [ "rotate" ] ], [ SwipeRecognizer, {
                direction: DIRECTION_HORIZONTAL
            } ], [ PanRecognizer, {
                direction: DIRECTION_HORIZONTAL
            }, [ "swipe" ] ], [ TapRecognizer ], [ TapRecognizer, {
                event: "doubletap",
                taps: 2
            }, [ "tap" ] ], [ PressRecognizer ] ],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var STOP = 1;
        var FORCED_STOP = 2;
        function Manager(element, options) {
            options = options || {};
            this.options = merge(options, Hammer.defaults);
            this.options.inputTarget = this.options.inputTarget || element;
            this.handlers = {};
            this.session = {};
            this.recognizers = [];
            this.element = element;
            this.input = createInputInstance(this);
            this.touchAction = new TouchAction(this, this.options.touchAction);
            toggleCssProps(this, true);
            each(options.recognizers, function(item) {
                var recognizer = this.add(new item[0](item[1]));
                item[2] && recognizer.recognizeWith(item[2]);
                item[3] && recognizer.requireFailure(item[3]);
            }, this);
        }
        Manager.prototype = {
            set: function(options) {
                extend(this.options, options);
                if (options.touchAction) {
                    this.touchAction.update();
                }
                if (options.inputTarget) {
                    this.input.destroy();
                    this.input.target = options.inputTarget;
                    this.input.init();
                }
                return this;
            },
            stop: function(force) {
                this.session.stopped = force ? FORCED_STOP : STOP;
            },
            recognize: function(inputData) {
                var session = this.session;
                if (session.stopped) {
                    return;
                }
                this.touchAction.preventDefaults(inputData);
                var recognizer;
                var recognizers = this.recognizers;
                var curRecognizer = session.curRecognizer;
                if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
                    curRecognizer = session.curRecognizer = null;
                }
                var i = 0;
                while (i < recognizers.length) {
                    recognizer = recognizers[i];
                    if (session.stopped !== FORCED_STOP && (!curRecognizer || recognizer == curRecognizer || recognizer.canRecognizeWith(curRecognizer))) {
                        recognizer.recognize(inputData);
                    } else {
                        recognizer.reset();
                    }
                    if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                        curRecognizer = session.curRecognizer = recognizer;
                    }
                    i++;
                }
            },
            get: function(recognizer) {
                if (recognizer instanceof Recognizer) {
                    return recognizer;
                }
                var recognizers = this.recognizers;
                for (var i = 0; i < recognizers.length; i++) {
                    if (recognizers[i].options.event == recognizer) {
                        return recognizers[i];
                    }
                }
                return null;
            },
            add: function(recognizer) {
                if (invokeArrayArg(recognizer, "add", this)) {
                    return this;
                }
                var existing = this.get(recognizer.options.event);
                if (existing) {
                    this.remove(existing);
                }
                this.recognizers.push(recognizer);
                recognizer.manager = this;
                this.touchAction.update();
                return recognizer;
            },
            remove: function(recognizer) {
                if (invokeArrayArg(recognizer, "remove", this)) {
                    return this;
                }
                var recognizers = this.recognizers;
                recognizer = this.get(recognizer);
                recognizers.splice(inArray(recognizers, recognizer), 1);
                this.touchAction.update();
                return this;
            },
            on: function(events, handler) {
                var handlers = this.handlers;
                each(splitStr(events), function(event) {
                    handlers[event] = handlers[event] || [];
                    handlers[event].push(handler);
                });
                return this;
            },
            off: function(events, handler) {
                var handlers = this.handlers;
                each(splitStr(events), function(event) {
                    if (!handler) {
                        delete handlers[event];
                    } else {
                        handlers[event].splice(inArray(handlers[event], handler), 1);
                    }
                });
                return this;
            },
            emit: function(event, data) {
                if (this.options.domEvents) {
                    triggerDomEvent(event, data);
                }
                var handlers = this.handlers[event] && this.handlers[event].slice();
                if (!handlers || !handlers.length) {
                    return;
                }
                data.type = event;
                data.preventDefault = function() {
                    data.srcEvent.preventDefault();
                };
                var i = 0;
                while (i < handlers.length) {
                    handlers[i](data);
                    i++;
                }
            },
            destroy: function() {
                this.element && toggleCssProps(this, false);
                this.handlers = {};
                this.session = {};
                this.input.destroy();
                this.element = null;
            }
        };
        function toggleCssProps(manager, add) {
            var element = manager.element;
            each(manager.options.cssProps, function(value, name) {
                element.style[prefixed(element.style, name)] = add ? value : "";
            });
        }
        function triggerDomEvent(event, data) {
            var gestureEvent = document.createEvent("Event");
            gestureEvent.initEvent(event, true, true);
            gestureEvent.gesture = data;
            data.target.dispatchEvent(gestureEvent);
        }
        extend(Hammer, {
            INPUT_START: INPUT_START,
            INPUT_MOVE: INPUT_MOVE,
            INPUT_END: INPUT_END,
            INPUT_CANCEL: INPUT_CANCEL,
            STATE_POSSIBLE: STATE_POSSIBLE,
            STATE_BEGAN: STATE_BEGAN,
            STATE_CHANGED: STATE_CHANGED,
            STATE_ENDED: STATE_ENDED,
            STATE_RECOGNIZED: STATE_RECOGNIZED,
            STATE_CANCELLED: STATE_CANCELLED,
            STATE_FAILED: STATE_FAILED,
            DIRECTION_NONE: DIRECTION_NONE,
            DIRECTION_LEFT: DIRECTION_LEFT,
            DIRECTION_RIGHT: DIRECTION_RIGHT,
            DIRECTION_UP: DIRECTION_UP,
            DIRECTION_DOWN: DIRECTION_DOWN,
            DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
            DIRECTION_VERTICAL: DIRECTION_VERTICAL,
            DIRECTION_ALL: DIRECTION_ALL,
            Manager: Manager,
            Input: Input,
            TouchAction: TouchAction,
            TouchInput: TouchInput,
            MouseInput: MouseInput,
            PointerEventInput: PointerEventInput,
            TouchMouseInput: TouchMouseInput,
            SingleTouchInput: SingleTouchInput,
            Recognizer: Recognizer,
            AttrRecognizer: AttrRecognizer,
            Tap: TapRecognizer,
            Pan: PanRecognizer,
            Swipe: SwipeRecognizer,
            Pinch: PinchRecognizer,
            Rotate: RotateRecognizer,
            Press: PressRecognizer,
            on: addEventListeners,
            off: removeEventListeners,
            each: each,
            merge: merge,
            extend: extend,
            inherit: inherit,
            bindFn: bindFn,
            prefixed: prefixed
        });
        if (typeof module == "object" && module.exports) {
            module.exports = Hammer;
        } else {
            return Hammer;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
}, function(module, exports) {
    module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(23);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports) {
    var ceil = Math.ceil, floor = Math.floor;
    module.exports = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
}, function(module, exports, __webpack_require__) {
    var IObject = __webpack_require__(11), defined = __webpack_require__(10);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1), Base = __webpack_require__(2), Animate = __webpack_require__(3), Boundry = __webpack_require__(49), Hammer = __webpack_require__(8), Sticky = __webpack_require__(53), Fixed = __webpack_require__(51);
        var BOUNDRY_CHECK_DURATION = 500;
        var BOUNDRY_CHECK_EASING = "ease";
        var BOUNDRY_CHECK_ACCELERATION = .1;
        function XScroll(cfg) {
            XScroll.superclass.constructor.call(this);
            this.userConfig = cfg;
            this.init();
        }
        Util.extend(XScroll, Base, {
            version: "3.0.13",
            init: function() {
                var self = this;
                var defaultCfg = {
                    preventDefault: true,
                    bounce: true,
                    boundryCheck: true,
                    useTransition: true,
                    gpuAcceleration: true,
                    BOUNDRY_CHECK_EASING: BOUNDRY_CHECK_EASING,
                    BOUNDRY_CHECK_DURATION: BOUNDRY_CHECK_DURATION,
                    BOUNDRY_CHECK_ACCELERATION: BOUNDRY_CHECK_ACCELERATION,
                    useOriginScroll: false,
                    zoomType: "y",
                    indicatorInsets: {
                        top: 3,
                        bottom: 3,
                        left: 3,
                        right: 3,
                        width: 3,
                        spacing: 5
                    },
                    container: ".xs-container",
                    content: ".xs-content",
                    stickyElements: ".xs-sticky",
                    fixedElements: ".xs-fixed",
                    touchAction: "auto"
                };
                self.guid = Util.guid();
                self.renderTo = Util.getNode(self.userConfig.renderTo);
                self.__timers = {};
                var elCfg = JSON.parse(self.renderTo.getAttribute("xs-cfg"));
                var userConfig = self.userConfig = Util.mix(Util.mix(defaultCfg, elCfg), self.userConfig);
                self.container = Util.getNode(userConfig.container, self.renderTo);
                self.content = Util.getNode(userConfig.content, self.renderTo);
                self.boundry = new Boundry();
                self.boundry.refresh();
                return self;
            },
            destroy: function() {
                var self = this;
                self.mc && self.mc.destroy();
                self.sticky && self.sticky.destroy();
                self.fixed && self.fixed.destroy();
            },
            _initContainer: function() {},
            enableGPUAcceleration: function() {
                this.userConfig.gpuAcceleration = true;
                return this;
            },
            disableGPUAcceleration: function() {
                this.userConfig.gpuAcceleration = false;
                return this;
            },
            getScrollPos: function() {
                var self = this;
                return {
                    scrollLeft: self.getScrollLeft(),
                    scrollTop: self.getScrollTop()
                };
            },
            getScrollTop: function() {},
            getScrollLeft: function() {},
            scrollTo: function(scrollLeft, scrollTop, duration, easing, callback) {
                var self = this;
                var scrollLeft = undefined === scrollLeft || isNaN(scrollLeft) ? -self.getScrollLeft() : scrollLeft;
                var scrollTop = undefined === scrollTop || isNaN(scrollTop) ? -self.getScrollTop() : scrollTop;
                self.scrollLeft(scrollLeft, duration, easing, callback);
                self.scrollTop(scrollTop, duration, easing, callback);
            },
            scrollBy: function(scrollLeft, scrollTop, duration, easing, callback) {
                this.scrollByX(scrollLeft, duration, easing, callback);
                this.scrollByY(scrollTop, duration, easing, callback);
            },
            scrollLeftBy: function(scrollLeft, duration, easing, callback) {
                this.scrollLeft(Number(scrollLeft) + Number(this.getScrollLeft()), duration, easing, callback);
            },
            scrollTopBy: function(scrollTop, duration, easing, callback) {
                this.scrollTop(Number(scrollTop) + Number(this.getScrollTop()), duration, easing, callback);
            },
            scrollLeft: function(scrollLeft, duration, easing, callback) {},
            scrollTop: function(scrollTop, duration, easing, callback) {},
            resetSize: function() {
                var self = this;
                if (!self.container || !self.content) return;
                var userConfig = self.userConfig;
                var renderToStyle = getComputedStyle(self.renderTo);
                var width = self.width = (userConfig.width || self.renderTo.offsetWidth) - Util.px2Num(renderToStyle["padding-left"]) - Util.px2Num(renderToStyle["padding-right"]);
                var height = self.height = (userConfig.height || self.renderTo.offsetHeight) - Util.px2Num(renderToStyle["padding-top"]) - Util.px2Num(renderToStyle["padding-bottom"]);
                var containerWidth = userConfig.containerWidth || self.content.offsetWidth;
                var containerHeight = userConfig.containerHeight || self.content.offsetHeight;
                self.containerWidth = containerWidth < self.width ? self.width : containerWidth;
                self.containerHeight = containerHeight < self.height ? self.height : containerHeight;
                self.boundry.refresh({
                    width: self.width,
                    height: self.height
                });
                return self;
            },
            render: function() {
                var self = this;
                self.resetSize();
                self.initSticky();
                self.initFixed();
                self.trigger("afterrender", {
                    type: "afterrender"
                });
                self._bindEvt();
                self.initTouchAction();
                return self;
            },
            initTouchAction: function() {
                var self = this;
                self.mc.set({
                    touchAction: self.userConfig.touchAction
                });
                return self;
            },
            initFixed: function() {
                var self = this, userConfig = self.userConfig;
                self.fixed = self.fixed || new Fixed({
                    fixedElements: userConfig.fixedElements,
                    xscroll: self,
                    fixedRenderTo: userConfig.fixedRenderTo
                });
                self.fixed.render();
                self.resetSize();
                return self;
            },
            initSticky: function() {
                var self = this, userConfig = self.userConfig;
                var sticky = self.sticky = self.sticky || new Sticky({
                    xscroll: self,
                    zoomType: userConfig.zoomType,
                    stickyRenderTo: userConfig.stickyRenderTo
                });
                sticky.render();
            },
            boundryCheck: function() {
                return this;
            },
            boundryCheckX: function() {
                return this;
            },
            boundryCheckY: function() {
                return this;
            },
            _bindEvt: function() {
                var self = this;
                if (self.___isEvtBind) return;
                self.___isEvtBind = true;
                var mc = self.mc = new Hammer.Manager(self.renderTo);
                var tap = new Hammer.Tap();
                var pan = new Hammer.Pan();
                var pinch = new Hammer.Pinch();
                mc.add([ tap, pan ]);
                self.mc.on("panstart pan panend pancancel pinchstart pinchmove pinchend pinchcancel pinchin pinchout", function(e) {
                    self.trigger(e.type, e);
                });
                var touchEvents = [ "touchstart", "touchmove", "touchend", "touchcancel", "mousedown" ];
                for (var i = 0, l = touchEvents.length; i < l; i++) {
                    self.renderTo.addEventListener(touchEvents[i], function(e) {
                        if (self.userConfig.stopPropagation) {
                            e.stopPropagation && e.stopPropagation();
                        }
                        self.trigger(e.type, e);
                    });
                }
                self.mc.on("tap", function(e) {
                    if (e.tapCount == 1) {
                        e.type = "tap";
                        self.trigger(e.type, e);
                    } else if (e.tapCount == 2) {
                        e.type = "doubletap";
                        self.trigger("doubletap", e);
                    }
                });
                return self;
            },
            _resetLockConfig: function() {},
            stop: function() {}
        });
        if (typeof module == "object" && module.exports) {
            module.exports = XScroll;
        } else {
            return XScroll;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Easing = {
            linear: [ 0, 0, 1, 1 ],
            ease: [ .25, .1, .25, 1 ],
            "ease-in": [ .42, 0, 1, 1 ],
            "ease-out": [ 0, 0, .58, 1 ],
            "ease-in-out": [ .42, 0, .58, 1 ],
            quadratic: [ .33, .66, .66, 1 ],
            circular: [ .1, .57, .1, 1 ],
            bounce: [ .71, 1.35, .47, 1.41 ],
            format: function(easing) {
                if (!easing) return;
                if (typeof easing === "string" && this[easing]) {
                    return this[easing] instanceof Array ? [ " cubic-bezier(", this[easing], ") " ].join("") : this[easing];
                }
                if (easing instanceof Array) {
                    return [ " cubic-bezier(", easing, ") " ].join("");
                }
                return easing;
            }
        };
        if (typeof module == "object" && module.exports) {
            module.exports = Easing;
        } else {
            return Easing;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1);
        var Base = __webpack_require__(2);
        var Easing = __webpack_require__(15);
        var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1e3 / 60);
        };
        var vendors = [ "webkit", "moz", "ms", "o" ];
        var cancelRAF = window.cancelAnimationFrame;
        for (var i = 0; i < vendors.length; i++) {
            if (window[vendors[i] + "CancelAnimationFrame"] || window[vendors[i] + "CancelRequestAnimationFrame"]) {
                cancelRAF = window[vendors[i] + "CancelAnimationFrame"] || window[vendors[i] + "CancelRequestAnimationFrame"];
            }
        }
        cancelRAF = cancelRAF || window.clearTimeout;
        function Bezier(x1, y1, x2, y2, epsilon) {
            var curveX = function(t) {
                var v = 1 - t;
                return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
            };
            var curveY = function(t) {
                var v = 1 - t;
                return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
            };
            var derivativeCurveX = function(t) {
                var v = 1 - t;
                return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
            };
            return function(t) {
                var x = t, t0, t1, t2, x2, d2, i;
                for (t2 = x, i = 0; i < 8; i++) {
                    x2 = curveX(t2) - x;
                    if (Math.abs(x2) < epsilon) return curveY(t2);
                    d2 = derivativeCurveX(t2);
                    if (Math.abs(d2) < 1e-6) break;
                    t2 = t2 - x2 / d2;
                }
                t0 = 0, t1 = 1, t2 = x;
                if (t2 < t0) return curveY(t0);
                if (t2 > t1) return curveY(t1);
                while (t0 < t1) {
                    x2 = curveX(t2);
                    if (Math.abs(x2 - x) < epsilon) return curveY(t2);
                    if (x > x2) t0 = t2; else t1 = t2;
                    t2 = (t1 - t0) * .5 + t0;
                }
                return curveY(t2);
            };
        }
        function Timer(cfg) {
            var self = this;
            self.cfg = Util.mix({
                easing: "linear"
            }, cfg);
        }
        Timer.MIN_DURATION = 1;
        Util.extend(Timer, Base, {
            reset: function(cfg) {
                var self = this;
                Util.mix(self.cfg, cfg);
                self.isfinished = false;
                self.percent = 0;
                self._stop = null;
            },
            run: function() {
                var self = this;
                var duration = self.cfg.duration;
                if (duration <= Timer.MIN_DURATION) {
                    self.isfinished = true;
                    self.trigger("run", {
                        percent: 1
                    });
                    self.trigger("end", {
                        percent: 1
                    });
                }
                if (self.isfinished) return;
                self._hasFinishedPercent = self._stop && self._stop.percent || 0;
                self._stop = null;
                self.start = Date.now();
                self.percent = 0;
                var epsilon = 1e3 / 60 / duration / 4;
                var b = Easing[self.cfg.easing];
                self.easingFn = Bezier(b[0], b[1], b[2], b[3], epsilon);
                self._run();
            },
            _run: function() {
                var self = this;
                cancelRAF(self._raf);
                self._raf = RAF(function() {
                    self.now = Date.now();
                    self.duration = self.now - self.start >= self.cfg.duration ? self.cfg.duration : self.now - self.start;
                    self.progress = self.easingFn(self.duration / self.cfg.duration);
                    self.percent = self.duration / self.cfg.duration + self._hasFinishedPercent;
                    if (self.percent >= 1 || self._stop) {
                        self.percent = self._stop && self._stop.percent ? self._stop.percent : 1;
                        self.duration = self._stop && self._stop.duration ? self._stop.duration : self.duration;
                        var param = {
                            percent: self.percent
                        };
                        self.trigger("stop", param);
                        if (self.percent >= 1) {
                            self.isfinished = true;
                            self.trigger("end", {
                                percent: 1
                            });
                        }
                        return;
                    }
                    self.trigger("run", {
                        percent: self.progress,
                        originPercent: self.percent
                    });
                    self._run();
                });
            },
            stop: function() {
                var self = this;
                self._stop = {
                    percent: self.percent,
                    now: self.now
                };
                cancelRAF(self._raf);
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = Timer;
        } else {
            return Timer;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _assign = __webpack_require__(18);
    var _assign2 = _interopRequireDefault(_assign);
    var _xscroll = __webpack_require__(59);
    var _xscroll2 = _interopRequireDefault(_xscroll);
    var _pulldown = __webpack_require__(56);
    var _pulldown2 = _interopRequireDefault(_pulldown);
    var _pullup = __webpack_require__(57);
    var _pullup2 = _interopRequireDefault(_pullup);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var pulldownDefaultConfig = function pulldownDefaultConfig() {
        return {
            content: "Pull Down To Refresh",
            height: 60,
            autoRefresh: false,
            downContent: "Pull Down To Refresh",
            upContent: "Release To Refresh",
            loadingContent: "Loading...",
            clsPrefix: "xs-plugin-pulldown-"
        };
    };
    var pullupDefaultConfig = function pullupDefaultConfig() {
        return {
            content: "Pull Up To Refresh",
            pullUpHeight: 60,
            height: 40,
            autoRefresh: false,
            downContent: "Release To Refresh",
            upContent: "Pull Up To Refresh",
            loadingContent: "Loading...",
            clsPrefix: "xs-plugin-pullup-"
        };
    };
    exports.default = {
        props: {
            height: String,
            lockX: Boolean,
            lockY: Boolean,
            scrollbarX: Boolean,
            scrollbarY: Boolean,
            bounce: {
                type: Boolean,
                "default": true
            },
            useOriginScroll: {
                type: Boolean,
                "default": false
            },
            useTransition: {
                type: Boolean,
                "default": true
            },
            preventDefault: {
                type: Boolean,
                "default": true
            },
            stopPropagation: Boolean,
            boundryCheck: {
                type: Boolean,
                "default": true
            },
            gpuAcceleration: {
                type: Boolean,
                "default": true
            },
            usePulldown: {
                type: Boolean,
                "default": false
            },
            usePullup: {
                type: Boolean,
                "default": false
            },
            pulldownConfig: {
                type: Object,
                "default": function _default() {
                    return {};
                }
            },
            pullupConfig: {
                type: Object,
                "default": function _default() {
                    return {};
                }
            },
            pulldownStatus: {
                type: String,
                "default": "default",
                twoWay: true
            },
            pullupStatus: {
                type: String,
                "default": "default",
                twoWay: true
            },
            enableHorizontalSwiping: {
                type: Boolean,
                "default": false
            }
        },
        methods: {
            reset: function reset(scrollPosition) {
                var _this = this;
                if (scrollPosition) {
                    if (typeof scrollPosition.left !== "undefined") {
                        this._xscroll.scrollLeft(scrollPosition.left);
                    }
                    if (typeof scrollPosition.top !== "undefined") {
                        this._xscroll.scrollTop(scrollPosition.top);
                    }
                }
                setTimeout(function() {
                    _this._xscroll && _this._xscroll.render();
                });
            }
        },
        compiled: function compiled() {
            this.uuid = Math.random().toString(36).substring(3, 8);
        },
        computed: {
            styles: function styles() {
                if (!this.height && !this.$el.style.height && this.lockX) {
                    this.height = document.documentElement.clientHeight + "px";
                    this.reset();
                }
                if (this.height && this.height.indexOf("-") === 0) {
                    this.height = document.documentElement.clientHeight + parseInt(this.height) + "px";
                }
                return {
                    height: "" + this.height
                };
            }
        },
        ready: function ready() {
            var _this2 = this;
            this.$el.setAttribute("id", "vux-scroller-" + this.uuid);
            var content = null;
            var slotChildren = this.$el.querySelector(".xs-container").childNodes;
            for (var i = 0; i < slotChildren.length; i++) {
                if (slotChildren[i].nodeType === 1) {
                    content = slotChildren[i];
                    break;
                }
            }
            if (!content) {
                throw new Error("no content is found");
            }
            this._xscroll = new _xscroll2.default({
                renderTo: "#vux-scroller-" + this.uuid,
                lockX: this.lockX,
                lockY: this.lockY,
                scrollbarX: this.scrollbarX,
                scrollbarY: this.scrollbarY,
                content: content,
                bounce: this.bounce,
                useOriginScroll: this.useOriginScroll,
                useTransition: this.useTransition,
                preventDefault: this.preventDefault,
                boundryCheck: this.boundryCheck,
                gpuAcceleration: this.gpuAcceleration,
                stopPropagation: this.stopPropagation
            });
            if (this.usePulldown) {
                var container = this.$el.querySelector('div[slot="pulldown"]');
                var config = (0, _assign2.default)(pulldownDefaultConfig(), this.pulldownConfig);
                if (container) {
                    config.container = container;
                }
                this.pulldown = new _pulldown2.default(config);
                this._xscroll.plug(this.pulldown);
                this.pulldown.on("loading", function(e) {
                    _this2.$emit("pulldown:loading", _this2.uuid);
                });
                this.pulldown.on("statuschange", function(val) {
                    _this2.pulldownStatus = val.newVal;
                });
            }
            if (this.usePullup) {
                var _container = this.$el.querySelector('div[slot="pullup"]');
                var _config = (0, _assign2.default)(pullupDefaultConfig(), this.pullupConfig);
                if (_container) {
                    _config.container = _container;
                }
                this.pullup = new _pullup2.default(_config);
                this._xscroll.plug(this.pullup);
                this.pullup.on("loading", function(e) {
                    _this2.$emit("pullup:loading", _this2.uuid);
                });
                this.pullup.on("statuschange", function(val) {
                    _this2.pullupStatus = val.newVal;
                });
            }
            if (this.enableHorizontalSwiping) {
                this._xscroll.on("panstart", function(e) {
                    if (e.direction === 2 || e.direction === 4) {
                        e.preventDefault();
                        if (_this2.scrollbarY) {
                            _this2._xscroll.userConfig.scrollbarY = false;
                        }
                        _this2._xscroll.userConfig.lockY = true;
                    }
                });
                this._xscroll.on("panend", function() {
                    if (_this2.scrollbarY) {
                        _this2._xscroll.userConfig.scrollbarY = true;
                    }
                    _this2._xscroll.userConfig.lockY = false;
                });
            }
            this._xscroll.render();
        },
        events: {
            "pulldown:reset": function pulldownReset(uuid) {
                var _this3 = this;
                this.pulldownStatus = "default";
                if (uuid === this.uuid) {
                    this.pulldown.reset(function() {
                        _this3.reset();
                    });
                }
            },
            "pullup:reset": function pullupReset(uuid) {
                this.pullupStatus = "default";
                if (uuid === this.uuid) {
                    this.pullup.complete();
                    this.reset();
                }
            },
            "pullup:done": function pullupDone(uuid) {
                if (uuid === this.uuid) {
                    this._xscroll.unplug(this.pullup);
                }
            },
            "scroller:reset": function scrollerReset(uuid) {
                if (uuid === this.uuid) {
                    this.reset();
                }
            },
            "pullup:disable": function pullupDisable(uuid) {
                if (uuid === this.uuid) {
                    this.pullup.stop();
                }
            },
            "pullup:enable": function pullupEnable(uuid) {
                if (uuid === this.uuid) {
                    this.pullup.restart();
                }
            }
        },
        beforeDestroy: function beforeDestroy() {
            if (this.pullup) {
                this._xscroll.unplug(this.pullup);
                this.pullup.pluginDestructor();
            }
            if (this.pulldown) {
                this._xscroll.unplug(this.pulldown);
                this.pulldown.pluginDestructor();
            }
            this._xscroll.destroy();
            this._xscroll = null;
        }
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(19),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(45);
    module.exports = __webpack_require__(9).Object.assign;
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(7);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(13), toLength = __webpack_require__(41), toIndex = __webpack_require__(40);
    module.exports = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
            var O = toIObject($this), length = toLength(O.length), index = toIndex(fromIndex, length), value;
            if (IS_INCLUDES && el != el) while (length > index) {
                value = O[index++];
                if (value != value) return true;
            } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
                if (O[index] === el) return IS_INCLUDES || index || 0;
            }
            return !IS_INCLUDES && -1;
        };
    };
}, function(module, exports) {
    var toString = {}.toString;
    module.exports = function(it) {
        return toString.call(it).slice(8, -1);
    };
}, function(module, exports, __webpack_require__) {
    var aFunction = __webpack_require__(20);
    module.exports = function(fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;
        switch (length) {
          case 1:
            return function(a) {
                return fn.call(that, a);
            };

          case 2:
            return function(a, b) {
                return fn.call(that, a, b);
            };

          case 3:
            return function(a, b, c) {
                return fn.call(that, a, b, c);
            };
        }
        return function() {
            return fn.apply(that, arguments);
        };
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(7), document = __webpack_require__(6).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(6), core = __webpack_require__(9), ctx = __webpack_require__(24), hide = __webpack_require__(29), PROTOTYPE = "prototype";
    var $export = function(type, name, source) {
        var IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), expProto = exports[PROTOTYPE], target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE], key, own, out;
        if (IS_GLOBAL) source = name;
        for (key in source) {
            own = !IS_FORCED && target && target[key] !== undefined;
            if (own && key in exports) continue;
            out = own ? target[key] : source[key];
            exports[key] = IS_GLOBAL && typeof target[key] != "function" ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
                var F = function(a, b, c) {
                    if (this instanceof C) {
                        switch (arguments.length) {
                          case 0:
                            return new C();

                          case 1:
                            return new C(a);

                          case 2:
                            return new C(a, b);
                        }
                        return new C(a, b, c);
                    }
                    return C.apply(this, arguments);
                };
                F[PROTOTYPE] = C[PROTOTYPE];
                return F;
            }(out) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
            if (IS_PROTO) {
                (exports.virtual || (exports.virtual = {}))[key] = out;
                if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
            }
        }
    };
    $export.F = 1;
    $export.G = 2;
    $export.S = 4;
    $export.P = 8;
    $export.B = 16;
    $export.W = 32;
    $export.U = 64;
    $export.R = 128;
    module.exports = $export;
}, function(module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function(it, key) {
        return hasOwnProperty.call(it, key);
    };
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(32), createDesc = __webpack_require__(37);
    module.exports = __webpack_require__(4) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(4) && !__webpack_require__(5)(function() {
        return Object.defineProperty(__webpack_require__(25)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var getKeys = __webpack_require__(35), gOPS = __webpack_require__(33), pIE = __webpack_require__(36), toObject = __webpack_require__(42), IObject = __webpack_require__(11), $assign = Object.assign;
    module.exports = !$assign || __webpack_require__(5)(function() {
        var A = {}, B = {}, S = Symbol(), K = "abcdefghijklmnopqrst";
        A[S] = 7;
        K.split("").forEach(function(k) {
            B[k] = k;
        });
        return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join("") != K;
    }) ? function assign(target, source) {
        var T = toObject(target), aLen = arguments.length, index = 1, getSymbols = gOPS.f, isEnum = pIE.f;
        while (aLen > index) {
            var S = IObject(arguments[index++]), keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S), length = keys.length, j = 0, key;
            while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
        }
        return T;
    } : $assign;
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(21), IE8_DOM_DEFINE = __webpack_require__(30), toPrimitive = __webpack_require__(43), dP = Object.defineProperty;
    exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPrimitive(P, true);
        anObject(Attributes);
        if (IE8_DOM_DEFINE) try {
            return dP(O, P, Attributes);
        } catch (e) {}
        if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
    };
}, function(module, exports) {
    exports.f = Object.getOwnPropertySymbols;
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(28), toIObject = __webpack_require__(13), arrayIndexOf = __webpack_require__(22)(false), IE_PROTO = __webpack_require__(38)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(34), enumBugKeys = __webpack_require__(26);
    module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
    };
}, function(module, exports) {
    exports.f = {}.propertyIsEnumerable;
}, function(module, exports) {
    module.exports = function(bitmap, value) {
        return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value
        };
    };
}, function(module, exports, __webpack_require__) {
    var shared = __webpack_require__(39)("keys"), uid = __webpack_require__(44);
    module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key));
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(6), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
    module.exports = function(key) {
        return store[key] || (store[key] = {});
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(12), max = Math.max, min = Math.min;
    module.exports = function(index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(12), min = Math.min;
    module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
    };
}, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(10);
    module.exports = function(it) {
        return Object(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(7);
    module.exports = function(it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it))) return val;
        if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(module, exports) {
    var id = 0, px = Math.random();
    module.exports = function(key) {
        return "Symbol(".concat(key === undefined ? "" : key, ")_", (++id + px).toString(36));
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(27);
    $export($export.S + $export.F, "Object", {
        assign: __webpack_require__(31)
    });
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div :style=styles> <div class=xs-container> <slot></slot> <slot name=pulldown></slot> <slot name=pullup></slot> </div> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(46);
    __vue_script__ = __webpack_require__(17);
    __vue_template__ = __webpack_require__(47);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1);
        function Boundry(cfg) {
            this.cfg = Util.mix({
                width: 0,
                height: 0
            }, cfg);
            this.init();
        }
        Util.mix(Boundry.prototype, {
            init: function() {
                var self = this;
                self._xtop = 0;
                self._xright = 0;
                self._xleft = 0;
                self._xbottom = 0;
                self.refresh({
                    width: self.cfg.width,
                    height: self.cfg.height
                });
            },
            reset: function() {
                this.resetTop();
                this.resetLeft();
                this.resetBottom();
                this.resetRight();
                return this;
            },
            resetTop: function() {
                this._xtop = 0;
                this.refresh();
                return this;
            },
            resetLeft: function() {
                this._xleft = 0;
                this.refresh();
                return this;
            },
            resetBottom: function() {
                this._xbottom = 0;
                this.refresh();
                return this;
            },
            resetRight: function() {
                this._xright = 0;
                this.refresh();
                return this;
            },
            expandTop: function(top) {
                this._xtop = top;
                this.refresh();
                return this;
            },
            expandLeft: function(left) {
                this._xleft = left;
                this.refresh();
                return this;
            },
            expandRight: function(right) {
                this._xright = right;
                this.refresh();
                return this;
            },
            expandBottom: function(bottom) {
                this._xbottom = bottom;
                this.refresh();
                return this;
            },
            refresh: function(cfg) {
                Util.mix(this.cfg, cfg);
                this.top = this._xtop;
                this.left = this._xleft;
                this.bottom = (cfg && cfg.height || this.cfg.height || 0) - this._xbottom;
                this.right = (cfg && cfg.width || this.cfg.width || 0) - this._xright;
                this.width = this.right - this.left > 0 ? this.right - this.left : 0;
                this.height = this.bottom - this.top > 0 ? this.bottom - this.top : 0;
                return this;
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = Boundry;
        } else {
            return Boundry;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1), Base = __webpack_require__(2);
        var Controller = function(cfg) {
            Controller.superclass.constructor.call(this, cfg);
            this.userConfig = Util.mix({}, cfg);
            this.init();
        };
        Util.extend(Controller, Base, {
            init: function() {
                var self = this;
                self.xscroll = self.userConfig.xscroll;
            },
            add: function(scroll, cfg) {
                var self = this;
                cfg = Util.extend({
                    captureBounce: false,
                    stopPropagation: true
                }, cfg);
                if (!self.__scrolls) {
                    self.__scrolls = {};
                }
                if (scroll.guid && !self.__scrolls[scroll.guid]) {
                    scroll.parentscroll = self.xscroll;
                    self._bind(scroll);
                    return self.__scrolls[scroll.guid] = scroll;
                }
                return;
            },
            remove: function(scroll) {
                var self = this;
                if (!scroll || !scroll.guid) return;
                var subscroll = self.__scrolls[scroll.guid];
                if (subscroll) {
                    subscroll.parentscroll = null;
                    self._unbind(scroll);
                    subscroll = null;
                }
            },
            get: function(guid) {
                if (guid) {
                    return this.__scrolls[guid];
                }
                return this.__scrolls;
            },
            _unbind: function(sub) {},
            _bind: function(sub) {
                var self = this, xscroll = self.xscroll;
                xscroll.renderTo.addEventListener("touchstart", function() {
                    xscroll._resetLockConfig();
                });
                sub.renderTo.addEventListener("touchstart", function() {
                    sub._resetLockConfig();
                });
                xscroll.on("panend", xscroll._resetLockConfig);
                sub.on("panend", sub._resetLockConfig);
                sub.on("panstart", function(e) {
                    if (!sub.userConfig.lockY && !xscroll.userConfig.lockY) {
                        if (sub.isBoundryOut()) {
                            xscroll.userConfig.lockY = true;
                            return;
                        }
                        if (e.direction == 16 && sub.getBoundryOutTop() >= 0) {
                            sub.userConfig.lockY = true;
                        } else if (e.direction == 8 && sub.getBoundryOutTop() >= 0 && sub.getBoundryOutBottom() < 0) {
                            xscroll.userConfig.lockY = true;
                        }
                        if (e.direction == 8 && sub.getBoundryOutBottom() >= 0) {
                            sub.userConfig.lockY = true;
                        } else if (e.direction == 16 && sub.getBoundryOutBottom() >= 0 && sub.getBoundryOutTop() < 0) {
                            xscroll.userConfig.lockY = true;
                        }
                        if (sub.getBoundryOutTop() < 0 && sub.getBoundryOutBottom() < 0) {
                            xscroll.userConfig.lockY = true;
                        }
                    }
                    if (!sub.userConfig.lockX && !xscroll.userConfig.lockX) {
                        if (sub.isBoundryOut()) {
                            xscroll.userConfig.lockX = true;
                            return;
                        }
                        if (e.direction == 4 && sub.getBoundryOutLeft() >= 0) {
                            sub.userConfig.lockX = true;
                        } else if (e.direction == 2 && sub.getBoundryOutLeft() >= 0 && sub.getBoundryOutRight() < 0) {
                            xscroll.userConfig.lockX = true;
                        }
                        if (e.direction == 2 && sub.getBoundryOutRight() >= 0) {
                            sub.userConfig.lockX = true;
                        } else if (e.direction == 4 && sub.getBoundryOutRight() >= 0 && sub.getBoundryOutLeft() < 0) {
                            xscroll.userConfig.lockX = true;
                        }
                        if (sub.getBoundryOutLeft() < 0 && sub.getBoundryOutRight() < 0) {
                            xscroll.userConfig.lockX = true;
                        }
                    }
                    if (!sub.userConfig.lockX && xscroll.userConfig.lockX) {
                        if (e.direction == 2 || e.direction == 4) {
                            xscroll.userConfig.lockY = true;
                        } else {
                            sub.userConfig.lockX = true;
                        }
                    }
                    if (!sub.userConfig.lockY && xscroll.userConfig.lockY) {
                        if (e.direction == 8 || e.direction == 16) {
                            xscroll.userConfig.lockX = true;
                        } else {
                            sub.userConfig.lockY = true;
                        }
                    }
                });
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = Controller;
        } else {
            return Controller;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1);
        var Base = __webpack_require__(2);
        var transform = Util.prefixStyle("transform");
        var Fixed = function(cfg) {
            Fixed.superclass.constructor.call(this, cfg);
            this.userConfig = Util.mix({
                fixedRenderTo: undefined,
                fixedElements: ".xs-fixed",
                prefix: "xs-fixed-container",
                zoomType: "y"
            }, cfg);
            this.init();
        };
        Util.extend(Fixed, Base, {
            fixedElements: [],
            init: function() {
                var self = this, userConfig = self.userConfig, xscroll = self.xscroll = userConfig.xscroll, xscrollConfig = self.xscrollConfig = xscroll.userConfig;
                self.isY = !!(userConfig.zoomType == "y");
                self._ = self.isY ? {
                    top: "top",
                    height: "height",
                    width: "width",
                    offsetTop: "offsetTop"
                } : {
                    top: "left",
                    height: "width",
                    width: "height",
                    offsetTop: "offsetLeft"
                };
                self.fixedRenderTo = Util.getNode(userConfig.fixedRenderTo);
                return self;
            },
            render: function() {
                var self = this;
                var xscroll = self.xscroll;
                self.infinite = xscroll.getPlugin("infinite");
                if (!self.fixedRenderTo) {
                    self.fixedRenderTo = document.createElement("div");
                    xscroll.renderTo.appendChild(self.fixedRenderTo);
                }
                Util.addClass(self.fixedRenderTo, self.userConfig.prefix);
                var originalFixedElements = self.originalFixedElements = self.getFixedElements();
                for (var i = 0, l = originalFixedElements.length; i < l; i++) {
                    self.renderFixedElement(originalFixedElements[i], i, self.fixedRenderTo);
                }
                return self;
            },
            getFixedElements: function() {
                var self = this;
                var infinite = self.infinite;
                var userConfig = self.userConfig;
                if (infinite) {
                    var els = [];
                    for (var i in infinite.__serializedData) {
                        var data = infinite.__serializedData[i];
                        if (data && data.style && data.style.position == "fixed") {
                            els.push(data);
                        }
                    }
                    return els;
                } else {
                    return Util.getNodes(userConfig.fixedElements, self.xscroll.content);
                }
            },
            renderFixedElement: function(el, fixedIndex, fixedRenderTo) {
                var self = this;
                var isRender = true;
                var _ = self._;
                var xscroll = self.xscroll;
                var userConfig = self.userConfig;
                var xscrollConfig = self.xscrollConfig;
                var useOriginScroll = xscrollConfig.useOriginScroll;
                var infinite = self.infinite;
                var fixedElement = self.fixedElements[fixedIndex];
                if (!self.fixedElements[fixedIndex]) {
                    isRender = false;
                    if (useOriginScroll && !infinite) {
                        el.style.position = "fixed";
                        el.style.display = "block";
                    } else {
                        fixedElement = document.createElement("div");
                        if (infinite) {
                            fixedElement.setAttribute("style", Util.stringifyStyle(Util.mix(el.style, {
                                display: "block",
                                width: "100%"
                            })));
                            fixedElement.style[_.top] = (el.style[_.top] >= 0 ? el.style[_.top] : el._top) + "px";
                            if (el.style[_.height]) {
                                fixedElement.style[_.height] = el.style[_.height] + "px";
                            }
                            infinite.userConfig.renderHook.call(self, fixedElement, el);
                        } else {
                            fixedElement.style.display = "block";
                            fixedElement.style.position = "absolute";
                            fixedElement.style[_.width] = "100%";
                            fixedElement.innerHTML = el.innerHTML;
                            fixedElement.className = el.className;
                            fixedElement.setAttribute("style", el.getAttribute("style"));
                            fixedElement.style[_.top] = el[_.offsetTop] + "px";
                            el.style.display = "none";
                        }
                        fixedRenderTo.appendChild(fixedElement);
                        self.fixedElements.push(fixedElement);
                    }
                }
                xscroll.trigger("fixedchange", {
                    fixedIndex: fixedIndex,
                    fixedElement: useOriginScroll ? el : fixedElement,
                    originalFixedElement: el,
                    isRender: isRender
                });
            },
            destroy: function() {
                var self = this;
                self.fixedElements = undefined;
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = Fixed;
        } else {
            return Fixed;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1);
        var Animate = __webpack_require__(3);
        var MAX_BOUNCE_DISTANCE = 40;
        var MIN_BAR_SCROLLED_SIZE = 10;
        var MIN_BAR_SIZE = 50;
        var transform = Util.prefixStyle("transform");
        var transformStr = Util.vendor ? [ "-", Util.vendor, "-transform" ].join("") : "transform";
        var transition = Util.prefixStyle("transition");
        var borderRadius = Util.prefixStyle("borderRadius");
        var transitionDuration = Util.prefixStyle("transitionDuration");
        var ScrollBar = function(cfg) {
            this.userConfig = Util.mix({
                MIN_BAR_SCROLLED_SIZE: MIN_BAR_SCROLLED_SIZE,
                MIN_BAR_SIZE: MIN_BAR_SIZE,
                MAX_BOUNCE_DISTANCE: MAX_BOUNCE_DISTANCE,
                spacing: 5
            }, cfg);
            this.init(cfg.xscroll);
        };
        Util.mix(ScrollBar.prototype, {
            init: function(xscroll) {
                var self = this;
                self.xscroll = xscroll;
                self.type = self.userConfig.type;
                self.isY = self.type == "y" ? true : false;
                self.scrollTopOrLeft = self.isY ? "scrollTop" : "scrollLeft";
            },
            destroy: function() {
                var self = this;
                Util.remove(self.scrollbar);
                self.xscroll.off("scroll", self._scrollHandler, self);
                self.xscroll.off("scrollend", self._scrollEndHandler, self);
            },
            render: function() {
                var self = this;
                var xscroll = self.xscroll;
                var boundry = xscroll.boundry;
                var indicatorInsets = self.xscroll.userConfig.indicatorInsets;
                var translateZ = xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
                var transform = translateZ ? transformStr + ":" + translateZ + ";" : "";
                var commonCss = "opacity:0;position:absolute;z-index:999;overflow:hidden;-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;" + transform;
                indicatorInsets._xright = indicatorInsets.right + indicatorInsets.spacing;
                indicatorInsets._xbottom = indicatorInsets.bottom + indicatorInsets.spacing;
                var css = self.isY ? Util.substitute("width:{width}px;bottom:{_xbottom}px;top:{top}px;right:{right}px;", indicatorInsets) + commonCss : Util.substitute("height:{width}px;left:{left}px;right:{_xright}px;bottom:{bottom}px;", indicatorInsets) + commonCss;
                if (!self.scrollbar) {
                    self.scrollbar = document.createElement("div");
                    self.indicate = document.createElement("div");
                    xscroll.renderTo.appendChild(self.scrollbar);
                    self.scrollbar.appendChild(self.indicate);
                }
                self.scrollbar.style.cssText = css;
                var size = self.isY ? "width:100%;" : "height:100%;";
                self.indicate.style.cssText = size + "position:absolute;background:rgba(0,0,0,0.3);-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;";
                self._update();
                self.hide(0);
                self._bindEvt();
            },
            _update: function(pos, duration, easing, callback) {
                var self = this;
                var pos = undefined === pos ? self.isY ? self.xscroll.getScrollTop() : self.xscroll.getScrollLeft() : pos;
                var barInfo = self.computeScrollBar(pos);
                var size = self.isY ? "height" : "width";
                self.indicate.style[size] = Math.round(barInfo.size) + "px";
                if (duration && easing) {
                    self.scrollTo(barInfo.pos, duration, easing, callback);
                } else {
                    self.moveTo(barInfo.pos);
                }
            },
            computeScrollBar: function(pos) {
                var self = this;
                var type = self.isY ? "y" : "x";
                var spacing = self.userConfig.spacing;
                var xscroll = self.xscroll;
                var boundry = xscroll.boundry;
                var userConfig = self.userConfig;
                var pos = self.isY ? Math.round(pos) + boundry._xtop : Math.round(pos) + boundry._xleft;
                var MIN_BAR_SCROLLED_SIZE = userConfig.MIN_BAR_SCROLLED_SIZE;
                var MIN_BAR_SIZE = userConfig.MIN_BAR_SIZE;
                var MAX_BOUNCE_DISTANCE = userConfig.MAX_BOUNCE_DISTANCE;
                self.containerSize = self.isY ? xscroll.containerHeight + boundry._xtop + boundry._xbottom : self.xscroll.containerWidth + boundry._xright + boundry._xleft;
                self.size = self.isY ? boundry.cfg.height : boundry.cfg.width;
                self.indicateSize = self.isY ? boundry.cfg.height - spacing * 2 : boundry.cfg.width - spacing * 2;
                var indicateSize = self.indicateSize;
                var containerSize = self.containerSize;
                var barPos = indicateSize * pos / containerSize;
                var barSize = Math.round(indicateSize * self.size / containerSize);
                var overTop = self.isY ? xscroll.getBoundryOutTop() : xscroll.getBoundryOutLeft();
                var overBottom = self.isY ? xscroll.getBoundryOutBottom() : xscroll.getBoundryOutRight();
                var barShiftSize = MIN_BAR_SIZE - barSize > 0 ? MIN_BAR_SIZE - barSize : 0;
                barSize = barSize < MIN_BAR_SIZE ? MIN_BAR_SIZE : barSize;
                barPos = (indicateSize - barShiftSize) * pos / containerSize;
                if (overTop >= 0) {
                    var pct = overTop / MAX_BOUNCE_DISTANCE;
                    pct = pct > 1 ? 1 : pct;
                    barPos = -pct * (barSize - MIN_BAR_SCROLLED_SIZE);
                }
                if (overBottom >= 0) {
                    var pct = overBottom / MAX_BOUNCE_DISTANCE;
                    pct = pct > 1 ? 1 : pct;
                    barPos = pct * (barSize - MIN_BAR_SCROLLED_SIZE) + indicateSize - barSize;
                }
                self.barPos = Math.round(barPos);
                return {
                    size: Math.round(barSize),
                    pos: self.barPos
                };
            },
            scrollTo: function(pos, duration, easing, callback) {
                var self = this;
                self.show();
                var translateZ = self.xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
                var config = {
                    css: {
                        transform: self.isY ? "translateY(" + pos + "px)" + translateZ : "translateX(" + pos + "px)" + translateZ
                    },
                    duration: duration,
                    easing: easing,
                    useTransition: self.xscroll.userConfig.useTransition,
                    end: callback
                };
                self.__timer = self.__timer || new Animate(self.indicate, config);
                self.__timer.stop();
                self.__timer.reset(config);
                self.__timer.run();
            },
            moveTo: function(pos) {
                var self = this;
                self.show();
                var translateZ = self.xscroll.userConfig.gpuAcceleration ? " translateZ(0) " : "";
                self.isY ? self.indicate.style[transform] = "translateY(" + pos + "px) " + translateZ : self.indicate.style[transform] = "translateX(" + pos + "px) " + translateZ;
                self.indicate.style[transition] = "";
            },
            _scrollHandler: function(e) {
                var self = this;
                self._update(e[self.scrollTopOrLeft]);
                return self;
            },
            isBoundryOut: function() {
                var self = this;
                return !self.isY ? self.xscroll.isBoundryOutLeft() || self.xscroll.isBoundryOutRight() : self.xscroll.isBoundryOutTop() || self.xscroll.isBoundryOutBottom();
            },
            _scrollEndHandler: function(e) {
                var self = this;
                if (!self.isBoundryOut()) {
                    self._update(e[self.scrollTopOrLeft]);
                    self.hide();
                }
                return self;
            },
            _bindEvt: function() {
                var self = this;
                if (self.__isEvtBind) return;
                self.__isEvtBind = true;
                self.xscroll.on("scroll", self._scrollHandler, self);
                self.xscroll.on("scrollend", self._scrollEndHandler, self);
            },
            reset: function() {
                var self = this;
                self.pos = 0;
                self._update();
            },
            hide: function(duration, easing, delay) {
                var self = this;
                var duration = duration >= 0 ? duration : 300;
                var easing = easing || "ease-out";
                var delay = delay >= 0 ? delay : 100;
                self.scrollbar.style.opacity = 0;
                self.scrollbar.style[transition] = [ "opacity ", duration, "ms ", " ease-out ", delay, "ms" ].join("");
            },
            show: function() {
                var self = this;
                self.scrollbar.style.opacity = 1;
                self.scrollbar.style[transition] = "";
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = ScrollBar;
        } else {
            return ScrollBar;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1);
        var Base = __webpack_require__(2);
        var transform = Util.prefixStyle("transform");
        var defaultStickyRenderFunc = function(e) {
            var stickyElement = e.stickyElement;
            var curStickyElement = e.curStickyElement;
            var xscroll = e.xscroll;
            var _ = e._;
            var infinite = xscroll.getPlugin("infinite");
            if (infinite) {
                infinite.userConfig.renderHook.call(self, stickyElement, curStickyElement);
                stickyElement.setAttribute("xs-guid", curStickyElement.guid);
                Util.addClass(stickyElement, curStickyElement.className);
                for (var attrName in curStickyElement.style) {
                    if (attrName != "display" && attrName != "position") {
                        stickyElement.style[attrName] = attrName == _.height ? curStickyElement.style[attrName] + "px" : curStickyElement.style[attrName];
                    }
                }
            } else {
                var style = curStickyElement.getAttribute("style");
                stickyElement.innerHTML = curStickyElement.innerHTML;
                stickyElement.className = curStickyElement.className;
                style && stickyElement.setAttribute("style", style);
            }
        };
        var Sticky = function(cfg) {
            Sticky.superclass.constructor.call(this, cfg);
            this.userConfig = Util.mix({
                stickyRenderTo: undefined,
                forceSticky: true,
                prefix: "xs-sticky-container",
                stickyRenderFunc: defaultStickyRenderFunc,
                zoomType: "y"
            }, cfg);
            this.init();
        };
        Util.extend(Sticky, Base, {
            init: function() {
                var self = this, userConfig = self.userConfig, xscroll = self.xscroll = userConfig.xscroll;
                var isY = self.isY = !!(userConfig.zoomType == "y");
                self._ = {
                    top: self.isY ? "top" : "left",
                    left: self.isY ? "left" : "bottom",
                    right: self.isY ? "right" : "top",
                    height: self.isY ? "height" : "width",
                    width: self.isY ? "width" : "height"
                };
                self.stickyRenderTo = Util.getNode(userConfig.stickyRenderTo);
                self._handlers = [];
                return self;
            },
            getStickiesPos: function() {
                var self = this;
                var xscroll = self.xscroll;
                var isInfinite = self.isInfinite;
                var isY = self.isY;
                var _ = self._;
                var stickiesPos = [];
                var getPos = function(sticky) {
                    var pos = {};
                    if (isInfinite) {
                        pos[_.top] = isY ? sticky._top : sticky._left;
                        pos[_.height] = isY ? sticky._height : sticky._width;
                    } else {
                        pos[_.top] = self.isY ? Util.getOffsetTop(sticky) : Util.getOffsetLeft(sticky);
                        pos[_.height] = self.isY ? sticky.offsetHeight : sticky.offsetWidth;
                    }
                    return pos;
                };
                for (var i = 0; i < self.stickiesNum; i++) {
                    var pos = getPos(self.stickyElements[i]);
                    self._handlers[i] = self._handlers[i] || self.createStickyEl();
                    pos.el = self._handlers[i];
                    pos.isRender = false;
                    stickiesPos.push(pos);
                }
                return stickiesPos;
            },
            getStickyElements: function() {
                var self = this;
                var xscroll = self.xscroll;
                var userConfig = self.userConfig;
                var isInfinite = self.isInfinite;
                var infinite = xscroll.getPlugin("infinite");
                if (infinite) {
                    var stickyElements = [], serializedData = infinite.__serializedData;
                    for (var i in serializedData) {
                        var rowData = serializedData[i];
                        if (rowData && rowData.style && "sticky" == rowData.style.position) {
                            stickyElements.push(rowData);
                        }
                    }
                    return stickyElements;
                } else {
                    return Util.getNodes(xscroll.userConfig.stickyElements, xscroll.content);
                }
            },
            render: function(force) {
                var self = this;
                var userConfig = self.userConfig;
                var xscroll = self.xscroll;
                self.isInfinite = !!xscroll.getPlugin("infinite");
                var _ = self._;
                self.stickyElements = self.getStickyElements();
                self.stickiesNum = self.stickyElements && self.stickyElements.length;
                if (!self.stickiesNum) return;
                if (!self.stickyRenderTo) {
                    self.stickyRenderTo = document.createElement("div");
                    xscroll.renderTo.appendChild(self.stickyRenderTo);
                }
                self.stickiesPos = self.getStickiesPos();
                var stickyRenderTo = self.stickyRenderTo;
                stickyRenderTo.style[_.top] = 0;
                stickyRenderTo.style[_.left] = 0;
                stickyRenderTo.style[_.right] = 0;
                stickyRenderTo.style.position = xscroll.userConfig.useOriginScroll ? "fixed" : "absolute";
                Util.addClass(self.stickyRenderTo, userConfig.prefix);
                self.stickyHandler(force);
                self._bindEvt();
            },
            createStickyEl: function() {
                var self = this;
                var el = document.createElement("div");
                el.style.display = "none";
                Util.addClass(el, "xs-sticky-handler");
                self.stickyRenderTo.appendChild(el);
                return el;
            },
            _bindEvt: function() {
                var self = this, xscroll = self.xscroll;
                xscroll.on("scroll", self.stickyHandler, self);
            },
            stickyHandler: function(force) {
                var self = this;
                var xscroll = self.xscroll;
                var userConfig = self.userConfig;
                var scrollTop = self.isY ? xscroll.getScrollTop() : xscroll.getScrollLeft();
                var stickiesPos = self.stickiesPos;
                var _ = self._;
                var indexes = [];
                for (var i = 0, l = stickiesPos.length; i < l; i++) {
                    var top = stickiesPos[i][_.top];
                    if (scrollTop > top) {
                        indexes.push(i);
                    }
                }
                if (!indexes.length) {
                    if (self.stickyElement) {
                        self.stickyElement.style.display = "none";
                    }
                    self.curStickyIndex = undefined;
                    return;
                }
                var curStickyIndex = Math.max.apply(null, indexes);
                if (self.curStickyIndex != curStickyIndex || force) {
                    var prevStickyIndex = self.curStickyIndex;
                    self.curStickyIndex = curStickyIndex;
                    self.curStickyElement = self.stickyElements[curStickyIndex];
                    self.curStickyPos = stickiesPos[curStickyIndex];
                    self.stickyElement = self.curStickyPos.el;
                    for (var i = 0, l = stickiesPos.length; i < l; i++) {
                        stickiesPos[i].el.style.display = "none";
                    }
                    var eventsObj = {
                        stickyElement: self.stickyElement,
                        curStickyIndex: self.curStickyIndex,
                        prevStickyIndex: prevStickyIndex,
                        curStickyPos: self.curStickyPos,
                        isRender: self.curStickyPos.isRender
                    };
                    xscroll.trigger("beforestickychange", eventsObj);
                    self._stickyRenderFunc(self);
                    xscroll.trigger("stickychange", eventsObj);
                }
                var trans = 0;
                if (self.stickiesPos[self.curStickyIndex + 1]) {
                    var cur = self.stickiesPos[self.curStickyIndex];
                    var next = self.stickiesPos[self.curStickyIndex + 1];
                    if (scrollTop + cur[_.height] > next[_.top] && scrollTop + cur[_.height] < next[_.top] + cur[_.height]) {
                        trans = cur[_.height] + scrollTop - next[_.top];
                    } else {
                        trans = 0;
                    }
                }
                self.stickyElement.style[transform] = self.isY ? "translateY(-" + trans + "px) translateZ(0)" : "translateX(-" + trans + "px) translateZ(0)";
            },
            _stickyRenderFunc: function(e) {
                var self = this;
                var _ = self._;
                var stickyRenderFunc = self.userConfig.stickyRenderFunc;
                var el = self.curStickyPos.el;
                if (!self.curStickyPos.isRender) {
                    el.style[_.left] = 0;
                    el.style[_.right] = 0;
                    stickyRenderFunc && stickyRenderFunc.call(self, e);
                }
                el.style.display = "block";
                self.curStickyPos.isRender = true;
            },
            destroy: function() {
                var self = this;
                self.stickyElements = undefined;
                self.stickiesNum = undefined;
                self.stickiesPos = undefined;
                Util.remove(self.stickyElement);
                self.stickyElement = undefined;
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = Sticky;
        } else {
            return Sticky;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1);
        var _once = function(func) {
            var ran = false, memo;
            return function() {
                if (ran) return memo;
                ran = true;
                memo = func.apply(this, arguments);
                func = null;
                return memo;
            };
        };
        var Events = {
            on: function(name, callback, context) {
                if (!eventsApi(this, "on", name, [ callback, context ]) || !callback) return this;
                this._events || (this._events = {});
                var events = this._events[name] || (this._events[name] = []);
                events.push({
                    callback: callback,
                    context: context,
                    ctx: context || this
                });
                return this;
            },
            once: function(name, callback, context) {
                if (!eventsApi(this, "once", name, [ callback, context ]) || !callback) return this;
                var self = this;
                var once = _once(function() {
                    self.off(name, once);
                    callback.apply(this, arguments);
                });
                once._callback = callback;
                return this.on(name, once, context);
            },
            off: function(name, callback, context) {
                if (!this._events || !eventsApi(this, "off", name, [ callback, context ])) return this;
                if (!name && !callback && !context) {
                    this._events = void 0;
                    return this;
                }
                var names = name ? [ name ] : Object.keys(this._events);
                for (var i = 0, length = names.length; i < length; i++) {
                    name = names[i];
                    var events = this._events[name];
                    if (!events) continue;
                    if (!callback && !context) {
                        delete this._events[name];
                        continue;
                    }
                    var remaining = [];
                    for (var j = 0, k = events.length; j < k; j++) {
                        var event = events[j];
                        if (callback && callback !== event.callback && callback !== event.callback._callback || context && context !== event.context) {
                            remaining.push(event);
                        }
                    }
                    if (remaining.length) {
                        this._events[name] = remaining;
                    } else {
                        delete this._events[name];
                    }
                }
                return this;
            },
            trigger: function(name) {
                if (!this._events) return this;
                var args = Array.prototype.slice.call(arguments, 1);
                if (!eventsApi(this, "trigger", name, args)) return this;
                var events = this._events[name];
                var allEvents = this._events.all;
                if (events) triggerEvents(events, args);
                if (allEvents) triggerEvents(allEvents, arguments);
                return this;
            },
            listenTo: function(obj, name, callback) {
                var listeningTo = this._listeningTo || (this._listeningTo = {});
                var id = obj._listenId || (obj._listenId = Util.guid("l"));
                listeningTo[id] = obj;
                if (!callback && typeof name === "object") callback = this;
                obj.on(name, callback, this);
                return this;
            },
            listenToOnce: function(obj, name, callback) {
                if (typeof name === "object") {
                    for (var event in name) this.listenToOnce(obj, event, name[event]);
                    return this;
                }
                var cb = _once(function() {
                    this.stopListening(obj, name, cb);
                    callback.apply(this, arguments);
                });
                cb._callback = callback;
                return this.listenTo(obj, name, cb);
            },
            stopListening: function(obj, name, callback) {
                var listeningTo = this._listeningTo;
                if (!listeningTo) return this;
                var remove = !name && !callback;
                if (!callback && typeof name === "object") callback = this;
                if (obj) (listeningTo = {})[obj._listenId] = obj;
                for (var id in listeningTo) {
                    obj = listeningTo[id];
                    obj.off(name, callback, this);
                    if (remove || Util.isEmpty(obj._events)) delete this._listeningTo[id];
                }
                return this;
            }
        };
        var eventSplitter = /\s+/;
        var eventsApi = function(obj, action, name, rest) {
            if (!name) return true;
            if (typeof name === "object") {
                for (var key in name) {
                    obj[action].apply(obj, [ key, name[key] ].concat(rest));
                }
                return false;
            }
            if (eventSplitter.test(name)) {
                var names = name.split(eventSplitter);
                for (var i = 0, length = names.length; i < length; i++) {
                    obj[action].apply(obj, [ names[i] ].concat(rest));
                }
                return false;
            }
            return true;
        };
        var triggerEvents = function(events, args) {
            var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
            switch (args.length) {
              case 0:
                while (++i < l) (ev = events[i]).callback.call(ev.ctx);
                return;

              case 1:
                while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);
                return;

              case 2:
                while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);
                return;

              case 3:
                while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                return;

              default:
                while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
                return;
            }
        };
        Events.bind = Events.on;
        Events.unbind = Events.off;
        if (typeof module == "object" && module.exports) {
            module.exports = Events;
        } else {
            return Events;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1), Base = __webpack_require__(2), Core = __webpack_require__(14), Animate = __webpack_require__(3);
        var transformOrigin = Util.prefixStyle("transformOrigin");
        function OriginScroll(cfg) {
            OriginScroll.superclass.constructor.call(this, cfg);
        }
        Util.extend(OriginScroll, Core, {
            init: function() {
                var self = this;
                OriginScroll.superclass.init.call(this);
                self.resetSize();
            },
            getScrollTop: function() {
                return this.renderTo.scrollTop;
            },
            getScrollLeft: function() {
                return this.renderTo.scrollLeft;
            },
            scrollTop: function(y, duration, easing, callback) {
                var self = this;
                var y = Math.round(y);
                if (self.userConfig.lockY) return;
                var duration = duration || 0;
                var easing = easing || "quadratic";
                var config = {
                    css: {
                        scrollTop: y
                    },
                    duration: duration,
                    easing: easing,
                    run: function(e) {
                        self.trigger("scroll", {
                            scrollTop: self.getScrollTop(),
                            scrollLeft: self.getScrollLeft()
                        });
                    },
                    useTransition: false,
                    end: callback
                };
                self.__timers.y = self.__timers.y || new Animate(self.renderTo, config);
                self.__timers.y.stop();
                self.__timers.y.reset(config);
                self.__timers.y.run();
            },
            scrollLeft: function(x, duration, easing, callback) {
                var self = this;
                var x = Math.round(x);
                if (self.userConfig.lockX) return;
                var duration = duration || 0;
                var easing = easing || "quadratic";
                var config = {
                    css: {
                        scrollLeft: x
                    },
                    duration: duration,
                    easing: easing,
                    run: function(e) {
                        self.trigger("scroll", {
                            scrollTop: self.getScrollTop(),
                            scrollLeft: self.getScrollLeft()
                        });
                    },
                    useTransition: false,
                    end: callback
                };
                self.__timers.x = self.__timers.x || new Animate(self.renderTo, config);
                self.__timers.x.stop();
                self.__timers.x.reset(config);
                self.__timers.x.run();
            },
            _bindEvt: function() {
                OriginScroll.superclass._bindEvt.call(this);
                var self = this;
                if (self.__isEvtBind) return;
                self.__isEvtBind = true;
                self.renderTo.addEventListener("scroll", function(e) {
                    self.trigger("scroll", {
                        type: "scroll",
                        scrollTop: self.getScrollTop(),
                        scrollLeft: self.getScrollLeft()
                    });
                }, false);
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = OriginScroll;
        } else {
            return OriginScroll;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1);
        var Base = __webpack_require__(2);
        var clsPrefix;
        var containerCls;
        var content = "Pull Down To Refresh";
        var loadingContent = "Loading...";
        var PullDown = function(cfg) {
            PullDown.superclass.constructor.call(this, cfg);
            this.userConfig = Util.mix({
                content: content,
                height: 60,
                autoRefresh: true,
                downContent: "Pull Down To Refresh",
                upContent: "Release To Refresh",
                loadingContent: loadingContent,
                clsPrefix: "xs-plugin-pulldown-"
            }, cfg);
        };
        Util.extend(PullDown, Base, {
            pluginId: "pulldown",
            pluginInitializer: function(xscroll) {
                var self = this;
                self.xscroll = xscroll.render();
                clsPrefix = self.userConfig.clsPrefix;
                self.render();
                return self;
            },
            pluginDestructor: function() {
                var self = this;
                Util.remove(self.pulldown);
                self.xscroll.off("panstart", self._panStartHandler, self);
                self.xscroll.off("pan", self._panHandler, self);
                self.xscroll.off("panend", self._panEndHandler, self);
                self.__isRender = false;
                self._evtBinded = false;
            },
            render: function() {
                var self = this;
                if (self.__isRender) return;
                self.__isRender = true;
                if (!self.userConfig.container) {
                    var containerCls = clsPrefix + "container";
                    var height = self.userConfig.height || 60;
                    var pulldown = self.pulldown = document.createElement("div");
                    pulldown.className = containerCls;
                    pulldown.style.position = "absolute";
                    pulldown.style.width = "100%";
                    pulldown.style.height = height + "px";
                    pulldown.style.lineHeight = height + "px";
                    pulldown.style.top = -height + "px";
                    pulldown.style.textAlign = "center";
                    self.xscroll.container.appendChild(pulldown);
                    self.status = "up";
                    Util.addClass(pulldown, clsPrefix + self.status);
                    pulldown.innerHTML = self.userConfig[self.status + "Content"] || self.userConfig.content;
                } else {
                    self.pulldown = self.userConfig.container;
                }
                self._bindEvt();
                return self;
            },
            _bindEvt: function() {
                var self = this;
                if (self._evtBinded) return;
                self._evtBinded = true;
                var pulldown = self.pulldown;
                var xscroll = self.xscroll;
                xscroll.on("pan", self._panHandler, self);
                xscroll.on("panstart", self._panStartHandler, self);
                xscroll.on("panend", self._panEndHandler, self);
            },
            _changeStatus: function(status) {
                var prevVal = this.status;
                this.status = status;
                if (!this.userConfig.container) {
                    Util.removeClass(this.pulldown, clsPrefix + prevVal);
                    Util.addClass(this.pulldown, clsPrefix + status);
                    if (this.userConfig[status + "Content"]) {
                        this.pulldown.innerHTML = this.userConfig[status + "Content"];
                    }
                }
                if (prevVal != status) {
                    this.trigger("statuschange", {
                        prevVal: prevVal,
                        newVal: status
                    });
                    if (status == "loading") {
                        this.trigger("loading");
                    }
                }
            },
            reset: function(callback) {
                this.xscroll.boundry.resetTop();
                this.xscroll.boundryCheckY(callback);
                this._expanded = false;
                return this;
            },
            _panStartHandler: function(e) {
                clearTimeout(this.loadingItv);
            },
            _panHandler: function(e) {
                var self = this;
                var scrollTop = self.xscroll.getScrollTop();
                if (scrollTop > 0) return;
                self._changeStatus(Math.abs(scrollTop) < self.userConfig.height ? "down" : "up");
            },
            _panEndHandler: function(e) {
                var self = this;
                var xscroll = self.xscroll;
                var height = self.userConfig.height || 60;
                var scrollTop = xscroll.getScrollTop();
                if (scrollTop < -height) {
                    e.preventDefault();
                    xscroll.boundry.resetTop();
                    self._changeStatus("loading");
                    xscroll.boundry.expandTop(height);
                    xscroll.boundryCheckY(function() {});
                    if (self.userConfig.autoRefresh) {
                        clearTimeout(self.loadingItv);
                        self.loadingItv = setTimeout(function() {
                            xscroll.boundry.resetTop();
                            xscroll.boundryCheckY(function() {
                                window.location.reload();
                            });
                        }, 800);
                    }
                }
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = PullDown;
        } else if (window.XScroll && window.XScroll.Plugins) {
            return XScroll.Plugins.PullDown = PullDown;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1);
        var Base = __webpack_require__(2);
        var clsPrefix;
        var containerCls;
        var loadingContent = "Loading...";
        var upContent = "Pull Up To Refresh";
        var downContent = "Release To Refresh";
        var PULL_UP_HEIGHT = 60;
        var HEIGHT = 40;
        var PullUp = function(cfg) {
            PullUp.superclass.constructor.call(this);
            this.userConfig = Util.mix({
                upContent: upContent,
                downContent: downContent,
                pullUpHeight: PULL_UP_HEIGHT,
                height: HEIGHT,
                loadingContent: loadingContent,
                bufferHeight: 0,
                clsPrefix: "xs-plugin-pullup-"
            }, cfg);
        };
        Util.extend(PullUp, Base, {
            pluginId: "pullup",
            pluginInitializer: function(xscroll) {
                var self = this;
                self.xscroll = xscroll.render();
                clsPrefix = self.userConfig.clsPrefix;
                self.render();
                return self;
            },
            pluginDestructor: function() {
                var self = this;
                Util.remove(self.pullup);
                self.xscroll.off("scrollend", self._scrollEndHandler, self);
                self.xscroll.off("scroll", self._scrollHandler, self);
                self.xscroll.off("pan", self._panHandler, self);
                self.xscroll.boundry.resetBottom();
                self.__isRender = false;
                self._evtBinded = false;
            },
            pluginDisable: function() {
                var self = this;
                self.userConfig.container || Util.remove(self.pullup);
                self.xscroll.off("scrollend", self._scrollEndHandler, self);
                self.xscroll.off("scroll", self._scrollHandler, self);
                self.xscroll.off("pan", self._panHandler, self);
                self.xscroll.boundry.resetBottom();
                self.__isRender = false;
                self._evtBinded = false;
            },
            render: function() {
                var self = this;
                if (self.__isRender) return;
                self.__isRender = true;
                if (!self.userConfig.container) {
                    var containerCls = clsPrefix + "container";
                    var height = self.userConfig.height;
                    var pullup = self.pullup = document.createElement("div");
                    pullup.className = containerCls;
                    pullup.style.position = "absolute";
                    pullup.style.width = "100%";
                    pullup.style.height = height + "px";
                    pullup.style.bottom = -height + "px";
                    pullup.style.textAlign = "center";
                    self.xscroll.container.appendChild(pullup);
                    Util.addClass(pullup, clsPrefix + self.status);
                    pullup.innerHTML = self.userConfig[self.status + "Content"] || self.userConfig.content;
                } else {
                    self.pullup = self.userConfig.container;
                }
                self.xscroll.boundry.expandBottom(self.userConfig.height);
                self.status = "up";
                self._bindEvt();
                return self;
            },
            _bindEvt: function() {
                var self = this;
                if (self._evtBinded) return;
                self._evtBinded = true;
                var pullup = self.pullup;
                var xscroll = self.xscroll;
                xscroll.on("pan", self._panHandler, self);
                if (self.userConfig.bufferHeight > 0) {
                    xscroll.on("scroll", self._scrollHandler, self);
                }
                xscroll.on("scrollend", self._scrollEndHandler, self);
                return self;
            },
            _scrollEndHandler: function(e) {
                var self = this, xscroll = self.xscroll, scrollTop = xscroll.getScrollTop();
                if (scrollTop == xscroll.containerHeight - xscroll.height + self.userConfig.height) {
                    self._changeStatus("loading");
                }
                return self;
            },
            _scrollHandler: function(e) {
                var self = this, xscroll = self.xscroll;
                if (!self.isLoading && Math.abs(e.scrollTop) + xscroll.height + self.userConfig.height + self.userConfig.bufferHeight >= xscroll.containerHeight + xscroll.boundry._xtop + xscroll.boundry._xbottom) {
                    self._changeStatus("loading");
                }
                return self;
            },
            _panHandler: function(e) {
                var self = this;
                var xscroll = self.xscroll;
                var offsetTop = -xscroll.getScrollTop();
                if (offsetTop < xscroll.height - xscroll.containerHeight - self.userConfig.pullUpHeight) {
                    self._changeStatus("down");
                } else {
                    self._changeStatus("up");
                }
                return self;
            },
            _changeStatus: function(status) {
                if (status != "loading" && this.isLoading) return;
                var prevVal = this.status;
                this.status = status;
                if (!this.userConfig.container) {
                    Util.removeClass(this.pullup, clsPrefix + prevVal);
                    Util.addClass(this.pullup, clsPrefix + status);
                    this.pullup.innerHTML = this.userConfig[status + "Content"];
                }
                if (prevVal != status) {
                    this.trigger("statuschange", {
                        prevVal: prevVal,
                        newVal: status
                    });
                    if (status == "loading") {
                        this.isLoading = true;
                        this.trigger("loading");
                    }
                }
                return this;
            },
            complete: function() {
                var self = this;
                var xscroll = self.xscroll;
                self.isLoading = false;
                self._changeStatus("up");
                return self;
            },
            stop: function() {
                var xscroll = this.xscroll;
                this.isLoading = false;
                this._changeStatus("stop");
                this.pluginDisable();
                return this;
            },
            restart: function() {
                var xscroll = this.xscroll;
                this.isLoading = false;
                this._changeStatus("default");
                this.render();
                return this;
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = PullUp;
        } else if (window.XScroll && window.XScroll.Plugins) {
            return XScroll.Plugins.PullUp = PullUp;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1), Base = __webpack_require__(2), Core = __webpack_require__(14), Animate = __webpack_require__(3), Hammer = __webpack_require__(8), ScrollBar = __webpack_require__(52), Controller = __webpack_require__(50);
        var PAN_RATE = 1 - .618;
        var SCROLL_ACCELERATION = 5e-4;
        var BOUNDRY_ACCELERATION = .03;
        var transformOrigin = Util.prefixStyle("transformOrigin");
        var transform = Util.prefixStyle("transform");
        function SimuScroll(cfg) {
            SimuScroll.superclass.constructor.call(this, cfg);
        }
        Util.extend(SimuScroll, Core, {
            init: function() {
                var self = this;
                var defaultCfg = {
                    preventDefault: true,
                    preventTouchMove: true
                };
                SimuScroll.superclass.init.call(this);
                self.userConfig = Util.mix(defaultCfg, self.userConfig);
                self.SCROLL_ACCELERATION = self.userConfig.SCROLL_ACCELERATION || SCROLL_ACCELERATION;
                self.BOUNDRY_ACCELERATION = self.userConfig.BOUNDRY_ACCELERATION || BOUNDRY_ACCELERATION;
                self._initContainer();
                self.resetSize();
                self._setOverflowBehavior();
                self.defaltConfig = {
                    lockY: self.userConfig.lockY,
                    lockX: self.userConfig.lockX
                };
                return self;
            },
            destroy: function() {
                var self = this;
                SimuScroll.superclass.destroy.call(this);
                self.renderTo.style.overflow = "";
                self.renderTo.style.touchAction = "";
                self.container.style.transform = "";
                self.container.style.transformOrigin = "";
                self.content.style.transform = "";
                self.content.style.transformOrigin = "";
                self.off("touchstart mousedown", self._ontouchstart);
                self.off("touchmove", self._ontouchmove);
                self.destroyScrollBars();
            },
            _setOverflowBehavior: function() {
                var self = this;
                var renderTo = self.renderTo;
                var computeStyle = getComputedStyle(renderTo);
                self.userConfig.lockX = undefined === self.userConfig.lockX ? computeStyle["overflow-x"] == "hidden" || self.width == self.containerWidth ? true : false : self.userConfig.lockX;
                self.userConfig.lockY = undefined === self.userConfig.lockY ? computeStyle["overflow-y"] == "hidden" || self.height == self.containerHeight ? true : false : self.userConfig.lockY;
                self.userConfig.scrollbarX = undefined === self.userConfig.scrollbarX ? self.userConfig.lockX ? false : true : self.userConfig.scrollbarX;
                self.userConfig.scrollbarY = undefined === self.userConfig.scrollbarY ? self.userConfig.lockY ? false : true : self.userConfig.scrollbarY;
                return self;
            },
            _resetLockConfig: function() {
                var self = this;
                self.userConfig.lockX = self.defaltConfig.lockX;
                self.userConfig.lockY = self.defaltConfig.lockY;
                return self;
            },
            _initContainer: function() {
                var self = this;
                SimuScroll.superclass._initContainer.call(self);
                if (self.__isContainerInited || !self.container || !self.content) return;
                self.container.style[transformOrigin] = "0 0";
                self.content.style[transformOrigin] = "0 0";
                self.translate(0, 0);
                self.__isContainerInited = true;
                return self;
            },
            getScrollTop: function() {
                var transY = window.getComputedStyle(this.container)[transform].match(/[-\d\.*\d*]+/g);
                return transY ? Math.round(transY[5]) === 0 ? 0 : -Math.round(transY[5]) : 0;
            },
            getScrollLeft: function() {
                var transX = window.getComputedStyle(this.content)[transform].match(/[-\d\.*\d*]+/g);
                return transX ? Math.round(transX[4]) === 0 ? 0 : -Math.round(transX[4]) : 0;
            },
            scrollLeft: function(x, duration, easing, callback) {
                if (this.userConfig.lockX) return;
                var translateZ = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
                this.x = undefined === x || isNaN(x) || 0 === x ? 0 : -Math.round(x);
                this._animate("x", "translateX(" + this.x + "px) scale(" + this.scale + ")" + translateZ, duration, easing, callback);
                return this;
            },
            scrollTop: function(y, duration, easing, callback) {
                if (this.userConfig.lockY) return;
                var translateZ = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
                this.y = undefined === y || isNaN(y) || 0 === y ? 0 : -Math.round(y);
                this._animate("y", "translateY(" + this.y + "px) " + translateZ, duration, easing, callback);
                return this;
            },
            translate: function(x, y, scale) {
                var translateZ = this.userConfig.gpuAcceleration ? " translateZ(0) " : "";
                this.x = x || this.x || 0;
                this.y = y || this.y || 0;
                this.scale = scale || this.scale || 1;
                this.content.style[transform] = "translate(" + this.x + "px,0px) scale(" + this.scale + ") " + translateZ;
                this.container.style[transform] = "translate(0px," + this.y + "px) " + translateZ;
                return this;
            },
            _animate: function(type, transform, duration, easing, callback) {
                var self = this;
                var duration = duration || 0;
                var easing = easing || "quadratic";
                var el = type == "y" ? self.container : self.content;
                var config = {
                    css: {
                        transform: transform
                    },
                    duration: duration,
                    easing: easing,
                    run: function(e) {
                        self.trigger("scroll", {
                            scrollTop: self.getScrollTop(),
                            scrollLeft: self.getScrollLeft(),
                            type: "scroll"
                        });
                    },
                    useTransition: self.userConfig.useTransition,
                    end: function(e) {
                        callback && callback();
                        if ((self["_bounce" + type] === 0 || self["_bounce" + type] === undefined) && easing != "linear") {
                            self["isScrolling" + type.toUpperCase()] = false;
                            self["isRealScrolling" + type.toUpperCase()] = false;
                            self.trigger("scrollend", {
                                type: "scrollend",
                                scrollTop: self.getScrollTop(),
                                scrollLeft: self.getScrollLeft(),
                                zoomType: type,
                                duration: duration,
                                easing: easing
                            });
                        }
                    }
                };
                var timer = self.__timers[type] = self.__timers[type] || new Animate(el, config);
                timer.stop();
                timer.reset(config);
                timer.run();
                self.trigger("scrollanimate", {
                    type: "scrollanimate",
                    scrollTop: -self.y,
                    scrollLeft: -self.x,
                    duration: duration,
                    easing: easing,
                    zoomType: type
                });
                return this;
            },
            _ontap: function(e) {
                var self = this;
                self.boundryCheck();
                self._unPreventHref(e);
                if (!self.isRealScrollingX && !self.isRealScrollingY) {
                    self._triggerClick(e);
                }
                self._preventHref(e);
                self.isRealScrollingY = false;
                self.isRealScrollingY = false;
            },
            _bindEvt: function() {
                SimuScroll.superclass._bindEvt.call(this);
                var self = this;
                if (self.__isEvtBind) return;
                self.__isEvtBind = true;
                var pinch = new Hammer.Pinch();
                self.mc.add(pinch);
                self.on("touchstart mousedown", self._ontouchstart, self);
                self.on("touchmove", self._ontouchmove, self);
                self.on("tap", self._ontap, self);
                self.on("panstart", self._onpanstart, self);
                self.on("pan", self._onpan, self);
                self.on("panend", self._onpanend, self);
                window.addEventListener("resize", function(e) {
                    setTimeout(function() {
                        self.resetSize();
                        self.boundryCheck(0);
                        self.render();
                    }, 100);
                }, self);
                return this;
            },
            _ontouchstart: function(e) {
                var self = this;
                if (!/(SELECT|INPUT|TEXTAREA)/i.test(e.target.tagName) && self.userConfig.preventDefault) {
                    e.preventDefault();
                }
                self.stop();
            },
            _ontouchmove: function(e) {
                this.userConfig.preventTouchMove && e.preventDefault();
            },
            _onpanstart: function(e) {
                this.userConfig.preventTouchMove && e.preventDefault();
                var self = this;
                var scrollLeft = self.getScrollLeft();
                var scrollTop = self.getScrollTop();
                self.stop();
                self.translate(-scrollLeft, -scrollTop);
                var threshold = self.mc.get("pan").options.threshold;
                self.thresholdY = e.direction == "8" ? threshold : e.direction == "16" ? -threshold : 0;
                self.thresholdX = e.direction == "2" ? threshold : e.direction == "4" ? -threshold : 0;
                return self;
            },
            _onpan: function(e) {
                this.userConfig.preventTouchMove && e.preventDefault();
                var self = this;
                var boundry = self.boundry;
                var userConfig = self.userConfig;
                var boundryCheck = userConfig.boundryCheck;
                var bounce = userConfig.bounce;
                var scrollTop = self.__topstart || (self.__topstart = -self.getScrollTop());
                var scrollLeft = self.__leftstart || (self.__leftstart = -self.getScrollLeft());
                var y = userConfig.lockY ? Number(scrollTop) : Number(scrollTop) + (e.deltaY + self.thresholdY);
                var x = userConfig.lockX ? Number(scrollLeft) : Number(scrollLeft) + (e.deltaX + self.thresholdX);
                var containerWidth = self.containerWidth;
                var containerHeight = self.containerHeight;
                if (boundryCheck) {
                    y = y > boundry.top ? bounce ? (y - boundry.top) * PAN_RATE + boundry.top : boundry.top : y;
                    y = y < boundry.bottom - containerHeight ? bounce ? y + (boundry.bottom - containerHeight - y) * PAN_RATE : boundry.bottom - containerHeight : y;
                    x = x > boundry.left ? bounce ? (x - boundry.left) * PAN_RATE + boundry.left : boundry.left : x;
                    x = x < boundry.right - containerWidth ? bounce ? x + (boundry.right - containerWidth - x) * PAN_RATE : boundry.right - containerWidth : x;
                }
                self.translate(x, y);
                self.directionX = e.type == "panleft" ? "right" : e.type == "panright" ? "left" : "";
                self.directionY = e.type == "panup" ? "down" : e.type == "pandown" ? "up" : "";
                self.trigger("scroll", {
                    scrollTop: -y,
                    scrollLeft: -x,
                    triggerType: "pan",
                    type: "scroll"
                });
                return self;
            },
            _onpanend: function(e) {
                var self = this;
                var userConfig = self.userConfig;
                var transX = self.computeScroll("x", e.velocityX);
                var transY = self.computeScroll("y", e.velocityY);
                var scrollLeft = transX ? transX.pos : 0;
                var scrollTop = transY ? transY.pos : 0;
                var duration;
                if (transX && transY && transX.status == "inside" && transY.status == "inside" && transX.duration && transY.duration) {
                    duration = Math.max(transX.duration, transY.duration);
                }
                transX && self.scrollLeft(scrollLeft, duration || transX.duration, transX.easing, function(e) {
                    self.boundryCheckX();
                });
                transY && self.scrollTop(scrollTop, duration || transY.duration, transY.easing, function(e) {
                    self.boundryCheckY();
                });
                self.directionX = e.velocityX < 0 ? "left" : "right";
                self.directionY = e.velocityY < 0 ? "up" : "down";
                self.__topstart = null;
                self.__leftstart = null;
                return self;
            },
            isBoundryOut: function() {
                return this.isBoundryOutLeft() || this.isBoundryOutRight() || this.isBoundryOutTop() || this.isBoundryOutBottom();
            },
            isBoundryOutLeft: function() {
                return this.getBoundryOutLeft() > 0 ? true : false;
            },
            isBoundryOutRight: function() {
                return this.getBoundryOutRight() > 0 ? true : false;
            },
            isBoundryOutTop: function() {
                return this.getBoundryOutTop() > 0 ? true : false;
            },
            isBoundryOutBottom: function() {
                return this.getBoundryOutBottom() > 0 ? true : false;
            },
            getBoundryOutTop: function() {
                return -this.boundry.top - this.getScrollTop();
            },
            getBoundryOutLeft: function() {
                return -this.boundry.left - this.getScrollLeft();
            },
            getBoundryOutBottom: function() {
                return this.boundry.bottom - this.containerHeight + this.getScrollTop();
            },
            getBoundryOutRight: function() {
                return this.boundry.right - this.containerWidth + this.getScrollLeft();
            },
            computeScroll: function(type, v) {
                var self = this;
                var userConfig = self.userConfig;
                var boundry = self.boundry;
                var pos = type == "x" ? self.getScrollLeft() : self.getScrollTop();
                var boundryStart = type == "x" ? boundry.left : boundry.top;
                var boundryEnd = type == "x" ? boundry.right : boundry.bottom;
                var innerSize = type == "x" ? self.containerWidth : self.containerHeight;
                var maxSpeed = userConfig.maxSpeed || 2;
                var boundryCheck = userConfig.boundryCheck;
                var bounce = userConfig.bounce;
                var transition = {};
                var status = "inside";
                if (boundryCheck) {
                    if (type == "x" && (self.isBoundryOutLeft() || self.isBoundryOutRight())) {
                        self.boundryCheckX();
                        return;
                    } else if (type == "y" && (self.isBoundryOutTop() || self.isBoundryOutBottom())) {
                        self.boundryCheckY();
                        return;
                    }
                }
                if (type == "x" && self.userConfig.lockX) return;
                if (type == "y" && self.userConfig.lockY) return;
                v = v > maxSpeed ? maxSpeed : v < -maxSpeed ? -maxSpeed : v;
                var a = self.SCROLL_ACCELERATION * (v / (Math.abs(v) || 1));
                var a2 = self.BOUNDRY_ACCELERATION;
                var t = isNaN(v / a) ? 0 : v / a;
                var s = Number(pos) + t * v / 2;
                if (s < -boundryStart && boundryCheck) {
                    var _s = -boundryStart - pos;
                    var _t = (Math.sqrt(-2 * a * _s + v * v) + v) / a;
                    var v0 = v - a * _t;
                    var _t2 = Math.abs(v0 / a2);
                    var s2 = v0 / 2 * _t2;
                    t = _t + _t2;
                    s = bounce ? -boundryStart + s2 : -boundryStart;
                    status = "outside";
                } else if (s > innerSize - boundryEnd && boundryCheck) {
                    var _s = boundryEnd - innerSize + pos;
                    var _t = (Math.sqrt(-2 * a * _s + v * v) - v) / a;
                    var v0 = v - a * _t;
                    var _t2 = Math.abs(v0 / a2);
                    var s2 = v0 / 2 * _t2;
                    t = _t + _t2;
                    s = bounce ? innerSize - boundryEnd + s2 : innerSize - boundryEnd;
                    status = "outside";
                }
                if (isNaN(s) || isNaN(t)) return;
                transition.pos = s;
                transition.duration = t;
                transition.easing = Math.abs(v) > 2 ? "circular" : "quadratic";
                transition.status = status;
                var Type = type.toUpperCase();
                self["isScrolling" + Type] = true;
                self["isRealScrolling" + Type] = true;
                return transition;
            },
            boundryCheckX: function(duration, easing, callback) {
                var self = this;
                if (!self.userConfig.boundryCheck) return;
                if (typeof arguments[0] == "function") {
                    callback = arguments[0];
                    duration = self.userConfig.BOUNDRY_CHECK_DURATION;
                    easing = self.userConfig.BOUNDRY_CHECK_EASING;
                } else {
                    duration = duration === 0 ? 0 : self.userConfig.BOUNDRY_CHECK_DURATION, easing = easing || self.userConfig.BOUNDRY_CHECK_EASING;
                }
                if (!self.userConfig.bounce || self.userConfig.lockX) return;
                var boundry = self.boundry;
                if (self.isBoundryOutLeft()) {
                    self.scrollLeft(-boundry.left, duration, easing, callback);
                } else if (self.isBoundryOutRight()) {
                    self.scrollLeft(self.containerWidth - boundry.right, duration, easing, callback);
                }
                return self;
            },
            boundryCheckY: function(duration, easing, callback) {
                var self = this;
                if (!self.userConfig.boundryCheck) return;
                if (typeof arguments[0] == "function") {
                    callback = arguments[0];
                    duration = self.userConfig.BOUNDRY_CHECK_DURATION;
                    easing = self.userConfig.BOUNDRY_CHECK_EASING;
                } else {
                    duration = duration === 0 ? 0 : self.userConfig.BOUNDRY_CHECK_DURATION, easing = easing || self.userConfig.BOUNDRY_CHECK_EASING;
                }
                if (!self.userConfig.boundryCheck || self.userConfig.lockY) return;
                var boundry = self.boundry;
                if (self.isBoundryOutTop()) {
                    self.scrollTop(-boundry.top, duration, easing, callback);
                } else if (self.isBoundryOutBottom()) {
                    self.scrollTop(self.containerHeight - boundry.bottom, duration, easing, callback);
                }
                return self;
            },
            boundryCheck: function(duration, easing, callback) {
                this.boundryCheckX(duration, easing, callback);
                this.boundryCheckY(duration, easing, callback);
                return this;
            },
            stop: function() {
                var self = this;
                self.__timers.x && self.__timers.x.stop();
                self.__timers.y && self.__timers.y.stop();
                if (self.isScrollingX || self.isScrollingY) {
                    var scrollTop = self.getScrollTop(), scrollLeft = self.getScrollLeft();
                    self.trigger("scrollend", {
                        scrollTop: scrollTop,
                        scrollLeft: scrollLeft
                    });
                    self.trigger("stop", {
                        scrollTop: scrollTop,
                        scrollLeft: scrollLeft
                    });
                    self.isScrollingX = false;
                    self.isScrollingY = false;
                }
                return self;
            },
            render: function() {
                var self = this;
                SimuScroll.superclass.render.call(this);
                if (getComputedStyle(self.renderTo).position == "static") {
                    self.renderTo.style.position = "relative";
                }
                self.renderTo.style.overflow = "hidden";
                self.initScrollBars();
                self.initController();
                return self;
            },
            initScrollBars: function() {
                var self = this;
                if (!self.userConfig.boundryCheck) return;
                var indicatorInsets = self.userConfig.indicatorInsets;
                if (self.userConfig.scrollbarX) {
                    self.scrollbarX = self.scrollbarX || new ScrollBar({
                        xscroll: self,
                        type: "x",
                        spacing: indicatorInsets.spacing
                    });
                    self.scrollbarX.render();
                    self.scrollbarX._update();
                    self.scrollbarX.hide();
                }
                if (self.userConfig.scrollbarY) {
                    self.scrollbarY = self.scrollbarY || new ScrollBar({
                        xscroll: self,
                        type: "y",
                        spacing: indicatorInsets.spacing
                    });
                    self.scrollbarY.render();
                    self.scrollbarY._update();
                    self.scrollbarY.hide();
                }
                return self;
            },
            destroyScrollBars: function() {
                this.scrollbarX && this.scrollbarX.destroy();
                this.scrollbarY && this.scrollbarY.destroy();
                return this;
            },
            initController: function() {
                var self = this;
                self.controller = self.controller || new Controller({
                    xscroll: self
                });
                return self;
            },
            _unPreventHref: function(e) {
                var target = Util.findParentEl(e.target, "a", this.renderTo);
                if (!target) return;
                if (target.tagName.toLowerCase() == "a") {
                    var href = target.getAttribute("data-xs-href");
                    if (href) {
                        target.setAttribute("href", href);
                    }
                }
            },
            _preventHref: function(e) {
                var target = Util.findParentEl(e.target, "a", this.renderTo);
                if (!target) return;
                if (target.tagName.toLowerCase() == "a") {
                    var href = target.getAttribute("href");
                    href && target.setAttribute("href", "javascript:void(0)");
                    href && target.setAttribute("data-xs-href", href);
                }
            },
            _triggerClick: function(e) {
                var target = e.target;
                if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
                    var ev = document.createEvent("MouseEvents");
                    ev.initMouseEvent("click", true, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                    target.dispatchEvent(ev);
                }
            }
        });
        if (typeof module == "object" && module.exports) {
            module.exports = SimuScroll;
        } else {
            return SimuScroll;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
        "use strict";
        var Util = __webpack_require__(1), Base = __webpack_require__(2), Timer = __webpack_require__(16), Animate = __webpack_require__(3), Hammer = __webpack_require__(8), SimuScroll = __webpack_require__(58), OriginScroll = __webpack_require__(55);
        var XScroll = function(cfg) {
            var _ = cfg && cfg.useOriginScroll ? OriginScroll : SimuScroll;
            return new _(cfg);
        };
        XScroll.Util = Util;
        XScroll.Base = Base;
        XScroll.Timer = Timer;
        XScroll.Animate = Animate;
        XScroll.Hammer = Hammer;
        XScroll.Plugins = {};
        if (typeof module == "object" && module.exports) {
            module.exports = XScroll;
        } else {
            return window.XScroll = XScroll;
        }
    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} ]);