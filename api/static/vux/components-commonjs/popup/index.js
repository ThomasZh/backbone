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
    module.exports = __webpack_require__(40);
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(3)(function() {
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
}, function(module, exports) {
    module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, function(module, exports) {
    var ceil = Math.ceil, floor = Math.floor;
    module.exports = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
}, function(module, exports, __webpack_require__) {
    var IObject = __webpack_require__(24), defined = __webpack_require__(6);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _keys = __webpack_require__(11);
    var _keys2 = _interopRequireDefault(_keys);
    var _popup = __webpack_require__(10);
    var _popup2 = _interopRequireDefault(_popup);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        props: {
            show: {
                type: Boolean,
                twoWay: true
            },
            height: {
                type: String,
                "default": "auto"
            },
            hideOnBlur: {
                type: Boolean,
                "default": true
            }
        },
        ready: function ready() {
            var _this = this;
            this.popup = new _popup2.default({
                container: _this.$el,
                innerHTML: "",
                hideOnBlur: _this.hideOnBlur,
                onOpen: function onOpen(dialog) {
                    _this.fixSafariOverflowScrolling("auto");
                    _this.show = true;
                },
                onClose: function onClose(dialog) {
                    _this.show = false;
                    if ((0, _keys2.default)(window.__$vuxPopups).length >= 1) return;
                    _this.fixSafariOverflowScrolling("touch");
                }
            });
            this.$overflowScrollingList = document.querySelectorAll(".vux-fix-safari-overflow-scrolling");
        },
        methods: {
            fixSafariOverflowScrolling: function fixSafariOverflowScrolling(type) {
                if (!this.$overflowScrollingList.length) return;
                if (!/iphone/i.test(navigator.userAgent)) return;
                for (var i = 0; i < this.$overflowScrollingList.length; i++) {
                    this.$overflowScrollingList[i].style.webkitOverflowScrolling = type;
                }
            }
        },
        data: function data() {
            return {
                hasFirstShow: false
            };
        },
        watch: {
            show: function show(val) {
                if (val) {
                    this.popup.show();
                    this.$emit("on-show");
                    if (!this.hasFirstShow) {
                        this.$emit("on-first-show");
                        this.hasFirstShow = true;
                    }
                } else {
                    this.$emit("on-hide");
                    this.show = false;
                    this.popup.hide(false);
                }
            }
        },
        beforeDestroy: function beforeDestroy() {
            this.popup.destroy();
            this.fixSafariOverflowScrolling("touch");
        }
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    window.__$vuxPopups = window.__$vuxPopups || {};
    var popupDialog = function popupDialog(option) {
        this.uuid = Math.random().toString(36).substring(3, 8);
        this.params = {};
        this.isShow = false;
        if (Object.prototype.toString.call(option) === "[object Object]") {
            this.params = {
                input: option.input || "",
                container: document.querySelector(option.input) || "",
                innerHTML: option.innerHTML || "",
                hideOnBlur: option.hideOnBlur,
                onOpen: option.onOpen || function() {},
                onClose: option.onClose || function() {}
            };
        }
        if (!!document.querySelectorAll(".vux-popup-mask").length <= 0) {
            this.divMask = document.createElement("a");
            this.divMask.className = "vux-popup-mask";
            this.divMask.href = "javascript:void(0)";
            document.body.appendChild(this.divMask);
        }
        var div = void 0;
        if (!option.container) {
            div = document.createElement("div");
        } else {
            div = option.container;
        }
        div.className = "vux-popup-dialog vux-popup-dialog-" + this.uuid;
        if (!option.container) {
            document.body.appendChild(div);
        }
        this.mask = document.querySelector(".vux-popup-mask");
        this.container = document.querySelector(".vux-popup-dialog-" + this.uuid);
        this._bindEvents();
        option = null;
        return this;
    };
    popupDialog.prototype.onClickMask = function() {
        if (this.params.hideOnBlur && this.isShow) {
            this.hide(false);
        }
    };
    popupDialog.prototype._bindEvents = function() {
        this.params.hideOnBlur && this.mask.addEventListener("click", this.onClickMask.bind(this), false);
    };
    popupDialog.prototype.show = function() {
        this.mask.classList.add("vux-popup-show");
        this.container.classList.add("vux-popup-show");
        this.params.onOpen && this.params.onOpen(this);
        this.isShow = true;
        window.__$vuxPopups[this.uuid] = 1;
    };
    popupDialog.prototype.hide = function() {
        var shouldCallback = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
        this.container.classList.remove("vux-popup-show");
        if (!document.querySelector(".vux-popup-dialog.vux-popup-show")) {
            this.mask.classList.remove("vux-popup-show");
        }
        shouldCallback === false && this.params.onClose && this.params.hideOnBlur && this.params.onClose(this);
        this.isShow = false;
        delete window.__$vuxPopups[this.uuid];
    };
    popupDialog.prototype.html = function(html) {
        this.container.innerHTML = html;
    };
    popupDialog.prototype.destroy = function() {
        this.mask.removeEventListener("click", this.onClickMask.bind(this), false);
        this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask);
        delete window.__$vuxPopups[this.uuid];
    };
    exports.default = popupDialog;
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(12),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(37);
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
    var toIObject = __webpack_require__(8), toLength = __webpack_require__(33), toIndex = __webpack_require__(32);
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
    var aFunction = __webpack_require__(13);
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
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(4), core = __webpack_require__(1), ctx = __webpack_require__(17), hide = __webpack_require__(22), PROTOTYPE = "prototype";
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
    var dP = __webpack_require__(25), createDesc = __webpack_require__(29);
    module.exports = __webpack_require__(2) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function() {
        return Object.defineProperty(__webpack_require__(18)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(16);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(14), IE8_DOM_DEFINE = __webpack_require__(23), toPrimitive = __webpack_require__(35), dP = Object.defineProperty;
    exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(21), toIObject = __webpack_require__(8), arrayIndexOf = __webpack_require__(15)(false), IE_PROTO = __webpack_require__(30)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(26), enumBugKeys = __webpack_require__(19);
    module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(20), core = __webpack_require__(1), fails = __webpack_require__(3);
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
    var shared = __webpack_require__(31)("keys"), uid = __webpack_require__(36);
    module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key));
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(4), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
    module.exports = function(key) {
        return store[key] || (store[key] = {});
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(7), max = Math.max, min = Math.min;
    module.exports = function(index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(7), min = Math.min;
    module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
    };
}, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(6);
    module.exports = function(it) {
        return Object(defined(it));
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
    var toObject = __webpack_require__(34), $keys = __webpack_require__(27);
    __webpack_require__(28)("keys", function() {
        return function keys(it) {
            return $keys(toObject(it));
        };
    });
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div v-show=show transition=vux-popup :style={height:height} class=vux-popup> <slot></slot> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(38);
    __vue_script__ = __webpack_require__(9);
    __vue_template__ = __webpack_require__(39);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);