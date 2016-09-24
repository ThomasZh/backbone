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
    module.exports = __webpack_require__(24);
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(4)(function() {
        return Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports) {
    module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
    };
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
}, function(module, exports) {
    var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
    if (typeof __g == "number") __g = global;
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(14), IE8_DOM_DEFINE = __webpack_require__(19), toPrimitive = __webpack_require__(21), dP = Object.defineProperty;
    exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _lib = __webpack_require__(8);
    var _lib2 = _interopRequireDefault(_lib);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        props: {
            number: Number,
            width: {
                type: Number,
                "default": 3
            }
        },
        ready: function ready() {
            this._roller = new _lib2.default({
                container: this.$el,
                width: this.width
            });
            this._roller.roll(this.number);
        },
        watch: {
            number: function number(newVal, oldVal) {
                if (newVal.toString().length !== oldVal.toString().length) {
                    this._roller.width = newVal.toString().length;
                    this._roller.setWidth();
                }
                this._roller.roll(newVal);
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _classCallCheck2 = __webpack_require__(10);
    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
    var _createClass2 = __webpack_require__(11);
    var _createClass3 = _interopRequireDefault(_createClass2);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var Roller = function() {
        function Roller(opts) {
            (0, _classCallCheck3.default)(this, Roller);
            this.container = typeof opts.container === "string" ? document.querySelector(opts.container) : opts.container;
            this.width = opts.width || 1;
            if (!this.container) {
                throw Error("no container");
            }
            this.container.style.overflow = "hidden";
            this.rollHeight = parseInt(getComputedStyle(this.container).height);
            if (this.rollHeight < 1) {
                this.container.style.height = "20px";
                this.rollHeight = 20;
            }
            this.setWidth();
        }
        (0, _createClass3.default)(Roller, [ {
            key: "roll",
            value: function roll(n) {
                var self = this;
                this.number = parseInt(n) + "";
                if (this.number.length < this.width) {
                    this.number = new Array(this.width - this.number.length + 1).join("0") + this.number;
                } else if (this.number.length > this.width) {
                    this.width = this.number.length;
                    this.setWidth();
                }
                Array.prototype.forEach.call(this.container.querySelectorAll(".num"), function(item, i) {
                    var currentNum = parseInt(item.querySelector("div:last-child").innerHTML);
                    var goalNum = parseInt(self.number[i]);
                    var gapNum = 0;
                    var gapStr = "";
                    if (currentNum === goalNum) {
                        return;
                    } else if (currentNum < goalNum) {
                        gapNum = goalNum - currentNum;
                        for (var j = currentNum; j < goalNum + 1; j++) {
                            gapStr += "<div>" + j + "</div>";
                        }
                    } else {
                        gapNum = 10 - currentNum + goalNum;
                        for (var _j = currentNum; _j < 10; _j++) {
                            gapStr += "<div>" + _j + "</div>";
                        }
                        for (var _j2 = 0; _j2 < goalNum + 1; _j2++) {
                            gapStr += "<div>" + _j2 + "</div>";
                        }
                    }
                    item.style.cssText += "-webkit-transition-duration:0;s-webkit-transform:translateY(0)";
                    item.innerHTML = gapStr;
                    var time = gapNum * (1 / 9);
                    setTimeout(function() {
                        item.style.cssText += "-webkit-transition-duration:" + time + "s;-webkit-transform:translateY(-" + self.rollHeight * gapNum + "px)";
                    }, 50);
                });
            }
        }, {
            key: "setWidth",
            value: function setWidth(n) {
                n = n || this.width;
                var str = "";
                for (var i = 0; i < n; i++) {
                    str += '<div class="num" style="float:left;height:100%;line-height:' + this.rollHeight + 'px"><div>0</div></div>';
                }
                this.container.innerHTML = str;
            }
        } ]);
        return Roller;
    }();
    exports.default = Roller;
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(12),
        __esModule: true
    };
}, function(module, exports) {
    "use strict";
    exports.__esModule = true;
    exports.default = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    var _defineProperty = __webpack_require__(9);
    var _defineProperty2 = _interopRequireDefault(_defineProperty);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                (0, _defineProperty2.default)(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
}, function(module, exports, __webpack_require__) {
    __webpack_require__(22);
    var $Object = __webpack_require__(3).Object;
    module.exports = function defineProperty(it, key, desc) {
        return $Object.defineProperty(it, key, desc);
    };
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(2);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
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
    var isObject = __webpack_require__(2), document = __webpack_require__(5).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(5), core = __webpack_require__(3), ctx = __webpack_require__(15), hide = __webpack_require__(18), PROTOTYPE = "prototype";
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
    var dP = __webpack_require__(6), createDesc = __webpack_require__(20);
    module.exports = __webpack_require__(1) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(1) && !__webpack_require__(4)(function() {
        return Object.defineProperty(__webpack_require__(16)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
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
    var isObject = __webpack_require__(2);
    module.exports = function(it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it))) return val;
        if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(17);
    $export($export.S + $export.F * !__webpack_require__(1), "Object", {
        defineProperty: __webpack_require__(6).f
    });
}, function(module, exports) {
    module.exports = "<div style=height:100px;font-size:100px></div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(7);
    __vue_template__ = __webpack_require__(23);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);