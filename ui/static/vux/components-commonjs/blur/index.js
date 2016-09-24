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
    module.exports = __webpack_require__(47);
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
}, function(module, exports) {
    module.exports = function(exec) {
        try {
            return !!exec();
        } catch (e) {
            return true;
        }
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(2)(function() {
        return Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports) {
    var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
    if (typeof __g == "number") __g = global;
}, function(module, exports) {
    module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
    };
}, function(module, exports) {
    module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(4), core = __webpack_require__(1), ctx = __webpack_require__(24), hide = __webpack_require__(28), PROTOTYPE = "prototype";
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
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(23);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(33), enumBugKeys = __webpack_require__(26);
    module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
    };
}, function(module, exports) {
    var ceil = Math.ceil, floor = Math.floor;
    module.exports = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
}, function(module, exports, __webpack_require__) {
    var IObject = __webpack_require__(8), defined = __webpack_require__(6);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(6);
    module.exports = function(it) {
        return Object(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _blur = __webpack_require__(14);
    var _blur2 = _interopRequireDefault(_blur);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        ready: function ready() {
            this._blur = new _blur2.default(this.$el, {
                url: this.url,
                blurAmount: this.blurAmount,
                imageClass: "vux-bg-blur",
                duration: 100,
                opacity: 1
            });
        },
        props: {
            blurAmount: {
                type: Number,
                "default": 10
            },
            url: {
                type: String,
                required: true
            },
            height: {
                type: Number,
                "default": 200
            }
        },
        watch: {
            blurAmount: function blurAmount(_blurAmount) {
                this._blur.setBlurAmount(_blurAmount);
                this._blur.generateBlurredImage(this.url);
            },
            url: function url(_url) {
                this._blur.generateBlurredImage(_url);
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _assign = __webpack_require__(16);
    var _assign2 = _interopRequireDefault(_assign);
    var _eventor = __webpack_require__(15);
    var _eventor2 = _interopRequireDefault(_eventor);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var randomID = function randomID() {
        return "_" + Math.random().toString(36).substr(2, 9);
    };
    var SVG = {
        svgns: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        createElement: function createElement(name, attrs) {
            var element = document.createElementNS(SVG.svgns, name);
            if (attrs) {
                SVG.setAttr(element, attrs);
            }
            return element;
        },
        setAttr: function setAttr(element, attrs) {
            for (var i in attrs) {
                if (i === "href") {
                    element.setAttributeNS(SVG.xlink, i, attrs[i]);
                } else {
                    element.setAttribute(i, attrs[i]);
                }
            }
            return element;
        }
    };
    var Blur = function Blur(element, options) {
        this.internalID = randomID();
        this.element = element;
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
        this.element = element;
        this.parent = this.element.parentNode;
        this.options = (0, _assign2.default)({}, Blur.DEFAULTS, options);
        this.overlayEl = this.createOverlay();
        this.blurredImage = null;
        this.attachListeners();
        this.generateBlurredImage(this.options.url);
    };
    Blur.VERSION = "0.0.1";
    _eventor2.default.mixTo(Blur);
    Blur.DEFAULTS = {
        url: "",
        blurAmount: 10,
        imageClass: "",
        overlayClass: "",
        duration: false,
        opacity: 1
    };
    Blur.prototype.setBlurAmount = function(blurAmount) {
        this.options.blurAmount = blurAmount;
    };
    Blur.prototype.attachListeners = function() {
        this.on("ui.blur.loaded", this.fadeIn.bind(this));
        this.on("ui.blur.unload", this.fadeOut.bind(this));
    };
    Blur.prototype.fadeIn = function() {};
    Blur.prototype.fadeOut = function() {};
    Blur.prototype.generateBlurredImage = function(url) {
        var previousImage = this.blurredImage;
        this.internalID = randomID();
        if (previousImage) {
            previousImage.parentNode.removeChild(previousImage);
        }
        this.blurredImage = this.createSVG(url, this.width, this.height);
    };
    Blur.prototype.createOverlay = function() {
        if (this.options.overlayClass && this.options.overlayClass !== "") {
            var div = document.createElement("div");
            div.classList.add(this.options.overlayClass);
            this.parent.insertBefore(div, this.element);
            return div;
        }
        return false;
    };
    Blur.prototype.createSVG = function(url, width, height) {
        var that = this;
        var svg = SVG.createElement("svg", {
            xmlns: SVG.svgns,
            version: "1.1",
            width: width,
            height: height,
            id: "blurred" + this.internalID,
            "class": this.options.imageClass,
            viewBox: "0 0 " + width + " " + height,
            preserveAspectRatio: "none"
        });
        var filterId = "blur" + this.internalID;
        var filter = SVG.createElement("filter", {
            id: filterId
        });
        var gaussianBlur = SVG.createElement("feGaussianBlur", {
            "in": "SourceGraphic",
            stdDeviation: this.options.blurAmount
        });
        var image = SVG.createElement("image", {
            x: 0,
            y: 0,
            width: width,
            height: height,
            externalResourcesRequired: "true",
            href: url,
            style: "filter:url(#" + filterId + ")",
            preserveAspectRatio: "none"
        });
        image.addEventListener("load", function() {
            that.emit("ui.blur.loaded");
        }, true);
        image.addEventListener("SVGLoad", function() {
            that.emit("ui.blur.loaded");
        }, true);
        filter.appendChild(gaussianBlur);
        svg.appendChild(filter);
        svg.appendChild(image);
        if (that.options.duration && that.options.duration > 0) {
            svg.style.opacity = 0;
            window.setTimeout(function() {
                if (getStyle(svg, "opacity") === "0") {
                    svg.style.opacity = 1;
                }
            }, this.options.duration + 100);
        }
        this.element.insertBefore(svg, this.element.firstChild);
        return svg;
    };
    Blur.prototype.createIMG = function(url, width, height) {
        var that = this;
        var originalImage = this.prependImage(url);
        var newBlurAmount = this.options.blurAmount * 2 > 100 ? 100 : this.options.blurAmount * 2;
        var styles = {
            filter: "progid:DXImageTransform.Microsoft.Blur(pixelradius=" + newBlurAmount + ") ",
            top: -this.options.blurAmount * 2.5,
            left: -this.options.blurAmount * 2.5,
            width: width + this.options.blurAmount * 2.5,
            height: height + this.options.blurAmount * 2.5
        };
        for (var i in styles) {
            originalImage.style[i] = styles[i];
        }
        originalImage.setAttribute("id", this.internalID);
        originalImage.onload = function() {
            that.trigger("ui.blur.loaded");
        };
        if (this.options.duration && this.options.duration > 0) {
            window.setTimeout(function() {
                if (getStyle(originalImage, "opacity") === "0") {
                    originalImage.style.opacity = 1;
                }
            }, this.options.duration + 100);
        }
        return originalImage;
    };
    Blur.prototype.prependImage = function(url) {
        var img = document.createElement("img");
        img.url = url;
        img.setAttribute("id", this.internalID);
        img.classList.add(this.options.imageClass);
        if (this.overlayEl) {
            this.parent.insertBefore(img, this.overlayEl);
        } else {
            this.parent.insertBefore(img, this.parent.firstChild);
        }
        return img;
    };
    exports.default = Blur;
    function getStyle(ele, prop) {
        return window.getComputedStyle(ele, null).getPropertyValue(prop);
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _keys = __webpack_require__(17);
    var _keys2 = _interopRequireDefault(_keys);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var eventSplitter = /\s+/;
    function Events() {}
    Events.prototype.on = function(events, callback, context) {
        var cache, event, list;
        if (!callback) return this;
        cache = this.__events || (this.__events = {});
        events = events.split(eventSplitter);
        while (event = events.shift()) {
            list = cache[event] || (cache[event] = []);
            list.push(callback, context);
        }
        return this;
    };
    Events.prototype.once = function(events, callback, context) {
        var that = this;
        var cb = function cb() {
            that.off(events, cb);
            callback.apply(context || that, arguments);
        };
        return this.on(events, cb, context);
    };
    Events.prototype.off = function(events, callback, context) {
        var cache, event, list, i;
        if (!(cache = this.__events)) return this;
        if (!(events || callback || context)) {
            delete this.__events;
            return this;
        }
        events = events ? events.split(eventSplitter) : keys(cache);
        while (event = events.shift()) {
            list = cache[event];
            if (!list) continue;
            if (!(callback || context)) {
                delete cache[event];
                continue;
            }
            for (i = list.length - 2; i >= 0; i -= 2) {
                if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
                    list.splice(i, 2);
                }
            }
        }
        return this;
    };
    Events.prototype.trigger = function(events) {
        var cache, event, all, list, i, len;
        var rest = [];
        var returned = true;
        if (!(cache = this.__events)) return this;
        events = events.split(eventSplitter);
        for (i = 1, len = arguments.length; i < len; i++) {
            rest[i - 1] = arguments[i];
        }
        while (event = events.shift()) {
            if (all = cache.all) all = all.slice();
            if (list = cache[event]) list = list.slice();
            if (event !== "all") {
                returned = triggerEvents(list, rest, this) && returned;
            }
            returned = triggerEvents(all, [ event ].concat(rest), this) && returned;
        }
        return returned;
    };
    Events.prototype.emit = Events.prototype.trigger;
    var keys = _keys2.default;
    if (!keys) {
        keys = function keys(o) {
            var result = [];
            for (var name in o) {
                if (o.hasOwnProperty(name)) {
                    result.push(name);
                }
            }
            return result;
        };
    }
    Events.mixTo = function(receiver) {
        var proto = Events.prototype;
        if (isFunction(receiver)) {
            for (var key in proto) {
                if (proto.hasOwnProperty(key)) {
                    receiver.prototype[key] = proto[key];
                }
            }
        } else {
            var event = new Events();
            for (var _key in proto) {
                if (proto.hasOwnProperty(_key)) {
                    copyProto(_key);
                }
            }
        }
        function copyProto(key) {
            receiver[key] = function() {
                proto[key].apply(event, Array.prototype.slice.call(arguments));
                return this;
            };
        }
    };
    function triggerEvents(list, args, context) {
        var pass = true;
        if (list) {
            var i = 0;
            var l = list.length;
            var a1 = args[0];
            var a2 = args[1];
            var a3 = args[2];
            switch (args.length) {
              case 0:
                for (;i < l; i += 2) {
                    pass = list[i].call(list[i + 1] || context) !== false && pass;
                }
                break;

              case 1:
                for (;i < l; i += 2) {
                    pass = list[i].call(list[i + 1] || context, a1) !== false && pass;
                }
                break;

              case 2:
                for (;i < l; i += 2) {
                    pass = list[i].call(list[i + 1] || context, a1, a2) !== false && pass;
                }
                break;

              case 3:
                for (;i < l; i += 2) {
                    pass = list[i].call(list[i + 1] || context, a1, a2, a3) !== false && pass;
                }
                break;

              default:
                for (;i < l; i += 2) {
                    pass = list[i].apply(list[i + 1] || context, args) !== false && pass;
                }
                break;
            }
        }
        return pass;
    }
    function isFunction(func) {
        return Object.prototype.toString.call(func) === "[object Function]";
    }
    module.exports = Events;
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(18),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(19),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(43);
    module.exports = __webpack_require__(1).Object.assign;
}, function(module, exports, __webpack_require__) {
    __webpack_require__(44);
    module.exports = __webpack_require__(1).Object.keys;
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(5);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(11), toLength = __webpack_require__(40), toIndex = __webpack_require__(39);
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
    var isObject = __webpack_require__(5), document = __webpack_require__(4).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function(it, key) {
        return hasOwnProperty.call(it, key);
    };
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(31), createDesc = __webpack_require__(36);
    module.exports = __webpack_require__(3) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(3) && !__webpack_require__(2)(function() {
        return Object.defineProperty(__webpack_require__(25)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var getKeys = __webpack_require__(9), gOPS = __webpack_require__(32), pIE = __webpack_require__(34), toObject = __webpack_require__(12), IObject = __webpack_require__(8), $assign = Object.assign;
    module.exports = !$assign || __webpack_require__(2)(function() {
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
    var anObject = __webpack_require__(21), IE8_DOM_DEFINE = __webpack_require__(29), toPrimitive = __webpack_require__(41), dP = Object.defineProperty;
    exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
    var has = __webpack_require__(27), toIObject = __webpack_require__(11), arrayIndexOf = __webpack_require__(22)(false), IE_PROTO = __webpack_require__(37)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports) {
    exports.f = {}.propertyIsEnumerable;
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(7), core = __webpack_require__(1), fails = __webpack_require__(2);
    module.exports = function(KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function() {
            fn(1);
        }), "Object", exp);
    };
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
    var shared = __webpack_require__(38)("keys"), uid = __webpack_require__(42);
    module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key));
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(4), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
    module.exports = function(key) {
        return store[key] || (store[key] = {});
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(10), max = Math.max, min = Math.min;
    module.exports = function(index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(10), min = Math.min;
    module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(5);
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
    var $export = __webpack_require__(7);
    $export($export.S + $export.F, "Object", {
        assign: __webpack_require__(30)
    });
}, function(module, exports, __webpack_require__) {
    var toObject = __webpack_require__(12), $keys = __webpack_require__(9);
    __webpack_require__(35)("keys", function() {
        return function keys(it) {
            return $keys(toObject(it));
        };
    });
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div :style=\"{height: height + 'px',position: 'relative', overflow: 'hidden'}\"> <slot></slot> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(45);
    __vue_script__ = __webpack_require__(13);
    __vue_template__ = __webpack_require__(46);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);