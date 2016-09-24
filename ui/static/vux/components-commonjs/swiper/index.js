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
    module.exports = __webpack_require__(89);
}, function(module, exports) {
    var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
    if (typeof __g == "number") __g = global;
}, function(module, exports, __webpack_require__) {
    var store = __webpack_require__(24)("wks"), uid = __webpack_require__(15), Symbol = __webpack_require__(1).Symbol, USE_SYMBOL = typeof Symbol == "function";
    var $exports = module.exports = function(name) {
        return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)("Symbol." + name));
    };
    $exports.store = store;
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(10)(function() {
        return Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function(it, key) {
        return hasOwnProperty.call(it, key);
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(9), IE8_DOM_DEFINE = __webpack_require__(30), toPrimitive = __webpack_require__(26), dP = Object.defineProperty;
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
}, function(module, exports, __webpack_require__) {
    var IObject = __webpack_require__(64), defined = __webpack_require__(17);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(6), createDesc = __webpack_require__(14);
    module.exports = __webpack_require__(4) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(11);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, function(module, exports) {
    module.exports = function(exec) {
        try {
            return !!exec();
        } catch (e) {
            return true;
        }
    };
}, function(module, exports) {
    module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
    };
}, function(module, exports) {
    module.exports = {};
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(35), enumBugKeys = __webpack_require__(18);
    module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
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
}, function(module, exports) {
    var id = 0, px = Math.random();
    module.exports = function(key) {
        return "Symbol(".concat(key === undefined ? "" : key, ")_", (++id + px).toString(36));
    };
}, function(module, exports) {
    var toString = {}.toString;
    module.exports = function(it) {
        return toString.call(it).slice(8, -1);
    };
}, function(module, exports) {
    module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, function(module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(1), core = __webpack_require__(3), ctx = __webpack_require__(61), hide = __webpack_require__(8), PROTOTYPE = "prototype";
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
    module.exports = true;
}, function(module, exports) {
    exports.f = {}.propertyIsEnumerable;
}, function(module, exports, __webpack_require__) {
    var def = __webpack_require__(6).f, has = __webpack_require__(5), TAG = __webpack_require__(2)("toStringTag");
    module.exports = function(it, tag, stat) {
        if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
            configurable: true,
            value: tag
        });
    };
}, function(module, exports, __webpack_require__) {
    var shared = __webpack_require__(24)("keys"), uid = __webpack_require__(15);
    module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key));
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(1), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
    module.exports = function(key) {
        return store[key] || (store[key] = {});
    };
}, function(module, exports) {
    var ceil = Math.ceil, floor = Math.floor;
    module.exports = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(11);
    module.exports = function(it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it))) return val;
        if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(1), core = __webpack_require__(3), LIBRARY = __webpack_require__(20), wksExt = __webpack_require__(28), defineProperty = __webpack_require__(6).f;
    module.exports = function(name) {
        var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
        if (name.charAt(0) != "_" && !(name in $Symbol)) defineProperty($Symbol, name, {
            value: wksExt.f(name)
        });
    };
}, function(module, exports, __webpack_require__) {
    exports.f = __webpack_require__(2);
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(11), document = __webpack_require__(1).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(4) && !__webpack_require__(10)(function() {
        return Object.defineProperty(__webpack_require__(29)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var LIBRARY = __webpack_require__(20), $export = __webpack_require__(19), redefine = __webpack_require__(36), hide = __webpack_require__(8), has = __webpack_require__(5), Iterators = __webpack_require__(12), $iterCreate = __webpack_require__(66), setToStringTag = __webpack_require__(22), getPrototypeOf = __webpack_require__(73), ITERATOR = __webpack_require__(2)("iterator"), BUGGY = !([].keys && "next" in [].keys()), FF_ITERATOR = "@@iterator", KEYS = "keys", VALUES = "values";
    var returnThis = function() {
        return this;
    };
    module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
        $iterCreate(Constructor, NAME, next);
        var getMethod = function(kind) {
            if (!BUGGY && kind in proto) return proto[kind];
            switch (kind) {
              case KEYS:
                return function keys() {
                    return new Constructor(this, kind);
                };

              case VALUES:
                return function values() {
                    return new Constructor(this, kind);
                };
            }
            return function entries() {
                return new Constructor(this, kind);
            };
        };
        var TAG = NAME + " Iterator", DEF_VALUES = DEFAULT == VALUES, VALUES_BUG = false, proto = Base.prototype, $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT], $default = $native || getMethod(DEFAULT), $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : undefined, $anyNative = NAME == "Array" ? proto.entries || $native : $native, methods, key, IteratorPrototype;
        if ($anyNative) {
            IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
            if (IteratorPrototype !== Object.prototype) {
                setToStringTag(IteratorPrototype, TAG, true);
                if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
            }
        }
        if (DEF_VALUES && $native && $native.name !== VALUES) {
            VALUES_BUG = true;
            $default = function values() {
                return $native.call(this);
            };
        }
        if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
            hide(proto, ITERATOR, $default);
        }
        Iterators[NAME] = $default;
        Iterators[TAG] = returnThis;
        if (DEFAULT) {
            methods = {
                values: DEF_VALUES ? $default : getMethod(VALUES),
                keys: IS_SET ? $default : getMethod(KEYS),
                entries: $entries
            };
            if (FORCED) for (key in methods) {
                if (!(key in proto)) redefine(proto, key, methods[key]);
            } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
        }
        return methods;
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(9), dPs = __webpack_require__(70), enumBugKeys = __webpack_require__(18), IE_PROTO = __webpack_require__(23)("IE_PROTO"), Empty = function() {}, PROTOTYPE = "prototype";
    var createDict = function() {
        var iframe = __webpack_require__(29)("iframe"), i = enumBugKeys.length, gt = ">", iframeDocument;
        iframe.style.display = "none";
        __webpack_require__(63).appendChild(iframe);
        iframe.src = "javascript:";
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write("<script>document.F=Object</script" + gt);
        iframeDocument.close();
        createDict = iframeDocument.F;
        while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
        return createDict();
    };
    module.exports = Object.create || function create(O, Properties) {
        var result;
        if (O !== null) {
            Empty[PROTOTYPE] = anObject(O);
            result = new Empty();
            Empty[PROTOTYPE] = null;
            result[IE_PROTO] = O;
        } else result = createDict();
        return Properties === undefined ? result : dPs(result, Properties);
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(35), hiddenKeys = __webpack_require__(18).concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return $keys(O, hiddenKeys);
    };
}, function(module, exports) {
    exports.f = Object.getOwnPropertySymbols;
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(5), toIObject = __webpack_require__(7), arrayIndexOf = __webpack_require__(59)(false), IE_PROTO = __webpack_require__(23)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(8);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var $at = __webpack_require__(74)(true);
    __webpack_require__(31)(String, "String", function(iterated) {
        this._t = String(iterated);
        this._i = 0;
    }, function() {
        var O = this._t, index = this._i, point;
        if (index >= O.length) return {
            value: undefined,
            done: true
        };
        point = $at(O, index);
        this._i += point.length;
        return {
            value: point,
            done: false
        };
    });
}, function(module, exports, __webpack_require__) {
    __webpack_require__(80);
    var global = __webpack_require__(1), hide = __webpack_require__(8), Iterators = __webpack_require__(12), TO_STRING_TAG = __webpack_require__(2)("toStringTag");
    for (var collections = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], i = 0; i < 5; i++) {
        var NAME = collections[i], Collection = global[NAME], proto = Collection && Collection.prototype;
        if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = Iterators.Array;
    }
}, function(module, exports, __webpack_require__) {
    module.exports = typeof Array.from === "function" ? Array.from : __webpack_require__(40);
}, function(module, exports) {
    module.exports = function() {
        var isCallable = function(fn) {
            return typeof fn === "function";
        };
        var toInteger = function(value) {
            var number = Number(value);
            if (isNaN(number)) {
                return 0;
            }
            if (number === 0 || !isFinite(number)) {
                return number;
            }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function(value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };
        var iteratorProp = function(value) {
            if (value != null) {
                if ([ "string", "number", "boolean", "symbol" ].indexOf(typeof value) > -1) {
                    return Symbol.iterator;
                } else if (typeof Symbol !== "undefined" && "iterator" in Symbol && Symbol.iterator in value) {
                    return Symbol.iterator;
                } else if ("@@iterator" in value) {
                    return "@@iterator";
                }
            }
        };
        var getMethod = function(O, P) {
            if (O != null && P != null) {
                var func = O[P];
                if (func == null) {
                    return void 0;
                }
                if (!isCallable(func)) {
                    throw new TypeError(func + " is not a function");
                }
                return func;
            }
        };
        var iteratorStep = function(iterator) {
            var result = iterator.next();
            var done = Boolean(result.done);
            if (done) {
                return false;
            }
            return result;
        };
        return function from(items) {
            "use strict";
            var C = this;
            var mapFn = arguments.length > 1 ? arguments[1] : void 0;
            var T;
            if (typeof mapFn !== "undefined") {
                if (!isCallable(mapFn)) {
                    throw new TypeError("Array.from: when provided, the second argument must be a function");
                }
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }
            var A, k;
            var usingIterator = getMethod(items, iteratorProp(items));
            if (usingIterator !== void 0) {
                A = isCallable(C) ? Object(new C()) : [];
                var iterator = usingIterator.call(items);
                if (iterator == null) {
                    throw new TypeError("Array.from requires an array-like or iterable object");
                }
                k = 0;
                var next, nextValue;
                while (true) {
                    next = iteratorStep(iterator);
                    if (!next) {
                        A.length = k;
                        return A;
                    }
                    nextValue = next.value;
                    if (mapFn) {
                        A[k] = mapFn.call(T, nextValue, k);
                    } else {
                        A[k] = nextValue;
                    }
                    k++;
                }
            } else {
                var arrayLike = Object(items);
                if (items == null) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                }
                var len = toLength(arrayLike.length);
                A = isCallable(C) ? Object(new C(len)) : new Array(len);
                k = 0;
                var kValue;
                while (k < len) {
                    kValue = arrayLike[k];
                    if (mapFn) {
                        A[k] = mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                    k++;
                }
                A.length = len;
            }
            return A;
        };
    }();
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _stringify = __webpack_require__(45);
    var _stringify2 = _interopRequireDefault(_stringify);
    var _swiper = __webpack_require__(42);
    var _swiper2 = _interopRequireDefault(_swiper);
    var _router = __webpack_require__(43);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        ready: function ready() {
            if (!(this.list && this.list.length === 0)) {
                this.render();
            }
            this.xheight = this.getHeight();
        },
        methods: {
            clickListItem: function clickListItem(item) {
                (0, _router.go)(item.url, this.$router);
                this.$emit("on-click-list-item", JSON.parse((0, _stringify2.default)(item)));
            },
            buildBackgroundUrl: function buildBackgroundUrl(url) {
                return "url(" + url + ")";
            },
            render: function render() {
                var _this = this;
                this.swiper = new _swiper2.default({
                    container: this.$el,
                    direction: this.direction,
                    auto: this.auto,
                    loop: this.loop,
                    interval: this.interval,
                    threshold: this.threshold,
                    duration: this.duration,
                    height: this.height || this._height,
                    minMovingDistance: this.minMovingDistance,
                    imgList: this.imgList
                }).on("swiped", function(prev, index) {
                    _this.current = index;
                    _this.index = index;
                });
            },
            rerender: function rerender() {
                var _this2 = this;
                if (!this.$el) {
                    return;
                }
                this.$nextTick(function() {
                    _this2.index = 0;
                    _this2.current = 0;
                    _this2.length = _this2.list.length || _this2.$children.length;
                    _this2.destroy();
                    _this2.render();
                });
            },
            destroy: function destroy() {
                this.swiper && this.swiper.destroy();
            },
            getHeight: function getHeight() {
                var hasHeight = parseInt(this.height, 10);
                if (hasHeight) return this.height;
                if (!hasHeight) {
                    if (this.aspectRatio) {
                        return this.$el.offsetWidth * this.aspectRatio + "px";
                    }
                    return "180px";
                }
            }
        },
        props: {
            list: {
                type: Array,
                "default": function _default() {
                    return [];
                }
            },
            direction: {
                type: String,
                "default": "horizontal"
            },
            showDots: {
                type: Boolean,
                "default": true
            },
            showDescMask: {
                type: Boolean,
                "default": true
            },
            dotsPosition: {
                type: String,
                "default": "right"
            },
            dotsClass: String,
            auto: {
                type: Boolean,
                "default": false
            },
            loop: Boolean,
            interval: {
                type: Number,
                "default": 3e3
            },
            threshold: {
                type: Number,
                "default": 50
            },
            duration: {
                type: Number,
                "default": 300
            },
            height: {
                type: String,
                "default": "auto"
            },
            aspectRatio: Number,
            minMovingDistance: {
                type: Number,
                "default": 0
            },
            index: {
                type: Number,
                "default": 0
            }
        },
        data: function data() {
            return {
                current: this.index,
                xheight: "auto",
                length: this.list.length
            };
        },
        watch: {
            list: function list(val) {
                this.rerender();
            },
            current: function current(currentIndex) {
                this.$emit("on-index-change", currentIndex);
            },
            index: function index(val) {
                var _this3 = this;
                if (val !== this.current) {
                    this.$nextTick(function() {
                        _this3.swiper.go(val);
                    });
                }
            }
        },
        beforeDestroy: function beforeDestroy() {
            this.destroy();
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _getIterator2 = __webpack_require__(44);
    var _getIterator3 = _interopRequireDefault(_getIterator2);
    var _classCallCheck2 = __webpack_require__(49);
    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
    var _createClass2 = __webpack_require__(50);
    var _createClass3 = _interopRequireDefault(_createClass2);
    var _arrayFrom = __webpack_require__(39);
    var _arrayFrom2 = _interopRequireDefault(_arrayFrom);
    var _objectAssign = __webpack_require__(87);
    var _objectAssign2 = _interopRequireDefault(_objectAssign);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var Swiper = function() {
        function Swiper(options) {
            (0, _classCallCheck3.default)(this, Swiper);
            this._default = {
                container: ".vux-swiper",
                item: ".vux-swiper-item",
                direction: "vertical",
                activeClass: "active",
                threshold: 50,
                duration: 300,
                auto: false,
                loop: false,
                interval: 3e3,
                height: "auto",
                minMovingDistance: 0
            };
            this._options = (0, _objectAssign2.default)(this._default, options);
            this._options.height = this._options.height.replace("px", "");
            this._start = {};
            this._move = {};
            this._end = {};
            this._eventHandlers = {};
            this._prev = this._current = this._goto = 0;
            this._width = this._height = this._distance = 0;
            this._offset = [];
            this.$box = this._options.container;
            this.$container = this._options.container.querySelector(".vux-swiper");
            this.$items = this.$container.querySelectorAll(this._options.item);
            this.count = this.$items.length;
            this._position = [];
            this._firstItemIndex = 0;
            if (!this.count) {
                return;
            }
            this._init();
            this._auto();
            this._bind();
            this._onResize();
            return this;
        }
        (0, _createClass3.default)(Swiper, [ {
            key: "_auto",
            value: function _auto() {
                var me = this;
                me.stop();
                if (me._options.auto) {
                    me.timer = setTimeout(function() {
                        me.next();
                    }, me._options.interval);
                }
            }
        }, {
            key: "updateItemWidth",
            value: function updateItemWidth() {
                this._width = this.$box.offsetWidth;
                this._distance = this._options.direction === "horizontal" ? this._width : this._height;
            }
        }, {
            key: "stop",
            value: function stop() {
                this.timer && clearTimeout(this.timer);
            }
        }, {
            key: "_loop",
            value: function _loop() {
                return this._options.loop && this.count >= 3;
            }
        }, {
            key: "_onResize",
            value: function _onResize() {
                var me = this;
                this.resizeHandler = function() {
                    setTimeout(function() {
                        me.updateItemWidth();
                        var firstItemIndex = me._getZeroIndexByPosition();
                        me._initOffset(firstItemIndex);
                        me._setTransfrom();
                    }, 100);
                };
                window.addEventListener("orientationchange", this.resizeHandler, false);
            }
        }, {
            key: "_init",
            value: function _init() {
                this._height = this._options.height === "auto" ? "auto" : this._options.height - 0;
                this.updateItemWidth();
                this._initPosition();
                this._activate(this._current);
                this._initOffset();
                this._setTransfrom();
                if (this._loop()) {
                    this._loopRender();
                }
            }
        }, {
            key: "_initPosition",
            value: function _initPosition() {
                for (var i = 0; i < this.count; i++) {
                    this._position.push(i);
                }
            }
        }, {
            key: "_movePosition",
            value: function _movePosition(position) {
                var me = this;
                if (position > 0) {
                    var firstIndex = me._position.splice(0, 1);
                    me._position.push(firstIndex[0]);
                } else if (position < 0) {
                    var lastIndex = me._position.pop();
                    me._position.unshift(lastIndex);
                }
            }
        }, {
            key: "_initOffset",
            value: function _initOffset(position) {
                position = position || 0;
                for (var i = 0; i < this.count; i++) {
                    this._offset[i] = (i - position) * this._distance;
                }
            }
        }, {
            key: "_moveOffset",
            value: function _moveOffset(position) {
                position = position || 0;
                for (var i = 0; i < this.count; i++) {
                    this._offset[i] = this._offset[i] + position * this._distance;
                }
            }
        }, {
            key: "_setTransition",
            value: function _setTransition(duration) {
                duration = duration || this._options.duration || "none";
                var transition = duration === "none" ? "none" : duration + "ms";
                (0, _arrayFrom2.default)(this.$items).forEach(function($item, key) {
                    $item.style.webkitTransition = transition;
                    $item.style.transition = transition;
                });
            }
        }, {
            key: "_setTransfrom",
            value: function _setTransfrom(offset) {
                var me = this;
                offset = offset || 0;
                (0, _arrayFrom2.default)(me.$items).forEach(function($item, key) {
                    var distance = me._offset[key] + offset;
                    var transform = "translate3d(" + distance + "px, 0, 0)";
                    if (me._options.direction === "vertical") {
                        transform = "translate3d(0, " + distance + "px, 0)";
                    }
                    $item.style.webkitTransform = transform;
                    $item.style.transform = transform;
                });
            }
        }, {
            key: "_bind",
            value: function _bind() {
                var me = this;
                me.touchstartHandler = function(e) {
                    me.stop();
                    me._start.x = e.changedTouches[0].pageX;
                    me._start.y = e.changedTouches[0].pageY;
                    me._setTransition("none");
                };
                me.touchmoveHandler = function(e) {
                    me._move.x = e.changedTouches[0].pageX;
                    me._move.y = e.changedTouches[0].pageY;
                    var distanceX = me._move.x - me._start.x;
                    var distanceY = me._move.y - me._start.y;
                    var distance = distanceY;
                    var noScrollerY = Math.abs(distanceX) > Math.abs(distanceY);
                    if (me._options.direction === "horizontal" && noScrollerY) {
                        distance = distanceX;
                    }
                    if ((me._options.minMovingDistance && Math.abs(distance) >= me._options.minMovingDistance || !me._options.minMovingDistance) && noScrollerY) {
                        me._setTransfrom(distance);
                    }
                    noScrollerY && e.preventDefault();
                };
                me.touchendHandler = function(e) {
                    me._end.x = e.changedTouches[0].pageX;
                    me._end.y = e.changedTouches[0].pageY;
                    var distance = me._end.y - me._start.y;
                    if (me._options.direction === "horizontal") {
                        distance = me._end.x - me._start.x;
                    }
                    distance = me.getDistance(distance);
                    if (distance !== 0 && me._options.minMovingDistance && Math.abs(distance) < me._options.minMovingDistance) {
                        return;
                    }
                    if (distance > me._options.threshold) {
                        me.move(-1);
                    } else if (distance < -me._options.threshold) {
                        me.move(1);
                    } else {
                        me.move(0);
                    }
                    me._loopRender();
                };
                me.transitionEndHandler = function(e) {
                    me._activate(me._current);
                    var cb = me._eventHandlers.swiped;
                    cb && cb.apply(me, [ me._prev, me._current ]);
                    me._auto();
                    me._loopRender();
                    e.preventDefault();
                };
                me.$container.addEventListener("touchstart", me.touchstartHandler, false);
                me.$container.addEventListener("touchmove", me.touchmoveHandler, false);
                me.$container.addEventListener("touchend", me.touchendHandler, false);
                me.$items[1] && me.$items[1].addEventListener("webkitTransitionEnd", me.transitionEndHandler, false);
            }
        }, {
            key: "_loopRender",
            value: function _loopRender() {
                var me = this;
                if (me._loop()) {
                    if (me._offset[me._offset.length - 1] === 0) {
                        var firstChild = me.$items[0].cloneNode(true);
                        me.$container.appendChild(firstChild);
                        me.$container.removeChild(me.$items[0]);
                        me._loopEvent(1);
                    } else if (me._offset[0] === 0) {
                        var lastChild = me.$items[me.$items.length - 1].cloneNode(true);
                        me.$container.insertBefore(lastChild, me.$container.firstChild);
                        me.$container.removeChild(me.$items[me.$items.length - 1]);
                        me._loopEvent(-1);
                    }
                }
            }
        }, {
            key: "_loopEvent",
            value: function _loopEvent(num) {
                var me = this;
                me._itemDestoy();
                me.$items = me.$container.querySelectorAll(me._options.item);
                me.$items[1] && me.$items[1].addEventListener("webkitTransitionEnd", me.transitionEndHandler, false);
                me._movePosition(num);
                me._moveOffset(num);
                me._setTransfrom();
            }
        }, {
            key: "getDistance",
            value: function getDistance(distance) {
                if (this._loop()) {
                    return distance;
                } else {
                    if (distance > 0 && this._current === 0) {
                        return 0;
                    } else if (distance < 0 && this._current === this.count - 1) {
                        return 0;
                    } else {
                        return distance;
                    }
                }
            }
        }, {
            key: "_moveIndex",
            value: function _moveIndex(num) {
                this._prev = this._current;
                this._current += num;
                this._current %= this.count;
                this._current = this._current < 0 ? this.count + this._current : this._current;
            }
        }, {
            key: "_activate",
            value: function _activate(index) {
                var _this = this;
                var clazz = this._options.activeClass;
                Array.prototype.forEach.call(this.$items, function($item, key) {
                    $item.classList.remove(clazz);
                    if (index === _this._position[key]) {
                        $item.classList.add(clazz);
                    }
                });
            }
        }, {
            key: "_getZeroIndexByPosition",
            value: function _getZeroIndexByPosition() {
                for (var i = 0; i < this._position.length; i++) {
                    if (this._position[i] === 0) {
                        return i;
                    } else if (i === this._position.length - 1) {
                        return -1;
                    }
                }
            }
        }, {
            key: "_goOffset",
            value: function _goOffset(index) {
                index = index || 0;
                index = index % this.count;
                var me = this;
                var firstItemIndex = me._getZeroIndexByPosition();
                for (var i = 0; i < me._offset.length; i++) {
                    if (me._offset[i] === 0) {
                        return firstItemIndex - i;
                    }
                }
            }
        }, {
            key: "go",
            value: function go(index) {
                var me = this;
                me.stop();
                if (me._loop()) {
                    var goOffset = me._goOffset(index);
                    me._moveOffset(-goOffset);
                    me._moveIndex(goOffset);
                    me._setTransition();
                    me._setTransfrom();
                } else {
                    if (index < 0 || index > me.count - 1 || index === me._current) {
                        return;
                    }
                    me._prev = me._current;
                    me._current = index;
                    var distance = -(index - me._prev) * me._distance;
                    for (var i = 0; i < me._offset.length; i++) {
                        me._offset[i] = me._offset[i] + distance;
                    }
                    me._setTransition();
                    me._setTransfrom();
                }
                me._auto();
                return this;
            }
        }, {
            key: "next",
            value: function next() {
                var me = this;
                if (me._loop()) {
                    me.move(1);
                } else {
                    var index = me._current;
                    index = index === me.count - 1 ? 0 : index + 1;
                    me.go(index);
                }
                return this;
            }
        }, {
            key: "move",
            value: function move(num, noAnimate) {
                var me = this;
                me._moveOffset(-num);
                me._movePosition(-num);
                me._moveIndex(num);
                me._setTransition(!noAnimate ? undefined : "none");
                me._setTransfrom();
                return this;
            }
        }, {
            key: "on",
            value: function on(event, callback) {
                if (this._eventHandlers[event]) {
                    console.error("[swiper] event " + event + " is already register");
                }
                if (typeof callback !== "function") {
                    console.error("[swiper] parameter callback must be a function");
                }
                this._eventHandlers[event] = callback;
                return this;
            }
        }, {
            key: "_itemDestoy",
            value: function _itemDestoy() {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = (0, _getIterator3.default)(this.$items), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;
                        item.removeEventListener("webkitTransitionEnd", this.transitionEndHandler, false);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.stop();
                this._current = 0;
                this._setTransfrom(0);
                window.removeEventListener("orientationchange", this.resizeHandler, false);
                this.$container.removeEventListener("touchstart", this.touchstartHandler, false);
                this.$container.removeEventListener("touchmove", this.touchmoveHandler, false);
                this.$container.removeEventListener("touchend", this.touchendHandler, false);
                this._itemDestoy();
            }
        } ]);
        return Swiper;
    }();
    exports.default = Swiper;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _typeof2 = __webpack_require__(51);
    var _typeof3 = _interopRequireDefault(_typeof2);
    exports.go = go;
    exports.getUrl = getUrl;
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function go(url, $router) {
        if (/^javas/.test(url) || !url) return;
        var useRouter = (typeof url === "undefined" ? "undefined" : (0, _typeof3.default)(url)) === "object" || $router && typeof url === "string" && !/http/.test(url);
        if (useRouter) {
            $router.go(url);
        } else {
            window.location.href = url;
        }
    }
    function getUrl(url, $router) {
        if ($router && !$router._history && typeof url === "string" && !/http/.test(url)) {
            return "#!" + url;
        }
        return url && (typeof url === "undefined" ? "undefined" : (0, _typeof3.default)(url)) !== "object" ? url : "javascript:void(0);";
    }
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(52),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(53),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(54),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(55),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(56),
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
    var _defineProperty = __webpack_require__(46);
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
    "use strict";
    exports.__esModule = true;
    var _iterator = __webpack_require__(48);
    var _iterator2 = _interopRequireDefault(_iterator);
    var _symbol = __webpack_require__(47);
    var _symbol2 = _interopRequireDefault(_symbol);
    var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj;
    };
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function(obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof(obj);
    } : function(obj) {
        return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(38);
    __webpack_require__(37);
    module.exports = __webpack_require__(79);
}, function(module, exports, __webpack_require__) {
    var core = __webpack_require__(3), $JSON = core.JSON || (core.JSON = {
        stringify: JSON.stringify
    });
    module.exports = function stringify(it) {
        return $JSON.stringify.apply($JSON, arguments);
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(81);
    var $Object = __webpack_require__(3).Object;
    module.exports = function defineProperty(it, key, desc) {
        return $Object.defineProperty(it, key, desc);
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(83);
    __webpack_require__(82);
    __webpack_require__(84);
    __webpack_require__(85);
    module.exports = __webpack_require__(3).Symbol;
}, function(module, exports, __webpack_require__) {
    __webpack_require__(37);
    __webpack_require__(38);
    module.exports = __webpack_require__(28).f("iterator");
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports) {
    module.exports = function() {};
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(7), toLength = __webpack_require__(76), toIndex = __webpack_require__(75);
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
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(16), TAG = __webpack_require__(2)("toStringTag"), ARG = cof(function() {
        return arguments;
    }()) == "Arguments";
    var tryGet = function(it, key) {
        try {
            return it[key];
        } catch (e) {}
    };
    module.exports = function(it) {
        var O, T, B;
        return it === undefined ? "Undefined" : it === null ? "Null" : typeof (T = tryGet(O = Object(it), TAG)) == "string" ? T : ARG ? cof(O) : (B = cof(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : B;
    };
}, function(module, exports, __webpack_require__) {
    var aFunction = __webpack_require__(57);
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
    var getKeys = __webpack_require__(13), gOPS = __webpack_require__(34), pIE = __webpack_require__(21);
    module.exports = function(it) {
        var result = getKeys(it), getSymbols = gOPS.f;
        if (getSymbols) {
            var symbols = getSymbols(it), isEnum = pIE.f, i = 0, key;
            while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(1).document && document.documentElement;
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(16);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(16);
    module.exports = Array.isArray || function isArray(arg) {
        return cof(arg) == "Array";
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var create = __webpack_require__(32), descriptor = __webpack_require__(14), setToStringTag = __webpack_require__(22), IteratorPrototype = {};
    __webpack_require__(8)(IteratorPrototype, __webpack_require__(2)("iterator"), function() {
        return this;
    });
    module.exports = function(Constructor, NAME, next) {
        Constructor.prototype = create(IteratorPrototype, {
            next: descriptor(1, next)
        });
        setToStringTag(Constructor, NAME + " Iterator");
    };
}, function(module, exports) {
    module.exports = function(done, value) {
        return {
            value: value,
            done: !!done
        };
    };
}, function(module, exports, __webpack_require__) {
    var getKeys = __webpack_require__(13), toIObject = __webpack_require__(7);
    module.exports = function(object, el) {
        var O = toIObject(object), keys = getKeys(O), length = keys.length, index = 0, key;
        while (length > index) if (O[key = keys[index++]] === el) return key;
    };
}, function(module, exports, __webpack_require__) {
    var META = __webpack_require__(15)("meta"), isObject = __webpack_require__(11), has = __webpack_require__(5), setDesc = __webpack_require__(6).f, id = 0;
    var isExtensible = Object.isExtensible || function() {
        return true;
    };
    var FREEZE = !__webpack_require__(10)(function() {
        return isExtensible(Object.preventExtensions({}));
    });
    var setMeta = function(it) {
        setDesc(it, META, {
            value: {
                i: "O" + ++id,
                w: {}
            }
        });
    };
    var fastKey = function(it, create) {
        if (!isObject(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
        if (!has(it, META)) {
            if (!isExtensible(it)) return "F";
            if (!create) return "E";
            setMeta(it);
        }
        return it[META].i;
    };
    var getWeak = function(it, create) {
        if (!has(it, META)) {
            if (!isExtensible(it)) return true;
            if (!create) return false;
            setMeta(it);
        }
        return it[META].w;
    };
    var onFreeze = function(it) {
        if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
        return it;
    };
    var meta = module.exports = {
        KEY: META,
        NEED: false,
        fastKey: fastKey,
        getWeak: getWeak,
        onFreeze: onFreeze
    };
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(6), anObject = __webpack_require__(9), getKeys = __webpack_require__(13);
    module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var keys = getKeys(Properties), length = keys.length, i = 0, P;
        while (length > i) dP.f(O, P = keys[i++], Properties[P]);
        return O;
    };
}, function(module, exports, __webpack_require__) {
    var pIE = __webpack_require__(21), createDesc = __webpack_require__(14), toIObject = __webpack_require__(7), toPrimitive = __webpack_require__(26), has = __webpack_require__(5), IE8_DOM_DEFINE = __webpack_require__(30), gOPD = Object.getOwnPropertyDescriptor;
    exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P) {
        O = toIObject(O);
        P = toPrimitive(P, true);
        if (IE8_DOM_DEFINE) try {
            return gOPD(O, P);
        } catch (e) {}
        if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(7), gOPN = __webpack_require__(33).f, toString = {}.toString;
    var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    var getWindowNames = function(it) {
        try {
            return gOPN(it);
        } catch (e) {
            return windowNames.slice();
        }
    };
    module.exports.f = function getOwnPropertyNames(it) {
        return windowNames && toString.call(it) == "[object Window]" ? getWindowNames(it) : gOPN(toIObject(it));
    };
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(5), toObject = __webpack_require__(77), IE_PROTO = __webpack_require__(23)("IE_PROTO"), ObjectProto = Object.prototype;
    module.exports = Object.getPrototypeOf || function(O) {
        O = toObject(O);
        if (has(O, IE_PROTO)) return O[IE_PROTO];
        if (typeof O.constructor == "function" && O instanceof O.constructor) {
            return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectProto : null;
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(25), defined = __webpack_require__(17);
    module.exports = function(TO_STRING) {
        return function(that, pos) {
            var s = String(defined(that)), i = toInteger(pos), l = s.length, a, b;
            if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
            a = s.charCodeAt(i);
            return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
        };
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(25), max = Math.max, min = Math.min;
    module.exports = function(index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(25), min = Math.min;
    module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
    };
}, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(17);
    module.exports = function(it) {
        return Object(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var classof = __webpack_require__(60), ITERATOR = __webpack_require__(2)("iterator"), Iterators = __webpack_require__(12);
    module.exports = __webpack_require__(3).getIteratorMethod = function(it) {
        if (it != undefined) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(9), get = __webpack_require__(78);
    module.exports = __webpack_require__(3).getIterator = function(it) {
        var iterFn = get(it);
        if (typeof iterFn != "function") throw TypeError(it + " is not iterable!");
        return anObject(iterFn.call(it));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var addToUnscopables = __webpack_require__(58), step = __webpack_require__(67), Iterators = __webpack_require__(12), toIObject = __webpack_require__(7);
    module.exports = __webpack_require__(31)(Array, "Array", function(iterated, kind) {
        this._t = toIObject(iterated);
        this._i = 0;
        this._k = kind;
    }, function() {
        var O = this._t, kind = this._k, index = this._i++;
        if (!O || index >= O.length) {
            this._t = undefined;
            return step(1);
        }
        if (kind == "keys") return step(0, index);
        if (kind == "values") return step(0, O[index]);
        return step(0, [ index, O[index] ]);
    }, "values");
    Iterators.Arguments = Iterators.Array;
    addToUnscopables("keys");
    addToUnscopables("values");
    addToUnscopables("entries");
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(19);
    $export($export.S + $export.F * !__webpack_require__(4), "Object", {
        defineProperty: __webpack_require__(6).f
    });
}, function(module, exports) {}, function(module, exports, __webpack_require__) {
    "use strict";
    var global = __webpack_require__(1), has = __webpack_require__(5), DESCRIPTORS = __webpack_require__(4), $export = __webpack_require__(19), redefine = __webpack_require__(36), META = __webpack_require__(69).KEY, $fails = __webpack_require__(10), shared = __webpack_require__(24), setToStringTag = __webpack_require__(22), uid = __webpack_require__(15), wks = __webpack_require__(2), wksExt = __webpack_require__(28), wksDefine = __webpack_require__(27), keyOf = __webpack_require__(68), enumKeys = __webpack_require__(62), isArray = __webpack_require__(65), anObject = __webpack_require__(9), toIObject = __webpack_require__(7), toPrimitive = __webpack_require__(26), createDesc = __webpack_require__(14), _create = __webpack_require__(32), gOPNExt = __webpack_require__(72), $GOPD = __webpack_require__(71), $DP = __webpack_require__(6), $keys = __webpack_require__(13), gOPD = $GOPD.f, dP = $DP.f, gOPN = gOPNExt.f, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, PROTOTYPE = "prototype", HIDDEN = wks("_hidden"), TO_PRIMITIVE = wks("toPrimitive"), isEnum = {}.propertyIsEnumerable, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), OPSymbols = shared("op-symbols"), ObjectProto = Object[PROTOTYPE], USE_NATIVE = typeof $Symbol == "function", QObject = global.QObject;
    var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
    var setSymbolDesc = DESCRIPTORS && $fails(function() {
        return _create(dP({}, "a", {
            get: function() {
                return dP(this, "a", {
                    value: 7
                }).a;
            }
        })).a != 7;
    }) ? function(it, key, D) {
        var protoDesc = gOPD(ObjectProto, key);
        if (protoDesc) delete ObjectProto[key];
        dP(it, key, D);
        if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
    } : dP;
    var wrap = function(tag) {
        var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
        sym._k = tag;
        return sym;
    };
    var isSymbol = USE_NATIVE && typeof $Symbol.iterator == "symbol" ? function(it) {
        return typeof it == "symbol";
    } : function(it) {
        return it instanceof $Symbol;
    };
    var $defineProperty = function defineProperty(it, key, D) {
        if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
        anObject(it);
        key = toPrimitive(key, true);
        anObject(D);
        if (has(AllSymbols, key)) {
            if (!D.enumerable) {
                if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
                it[HIDDEN][key] = true;
            } else {
                if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
                D = _create(D, {
                    enumerable: createDesc(0, false)
                });
            }
            return setSymbolDesc(it, key, D);
        }
        return dP(it, key, D);
    };
    var $defineProperties = function defineProperties(it, P) {
        anObject(it);
        var keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length, key;
        while (l > i) $defineProperty(it, key = keys[i++], P[key]);
        return it;
    };
    var $create = function create(it, P) {
        return P === undefined ? _create(it) : $defineProperties(_create(it), P);
    };
    var $propertyIsEnumerable = function propertyIsEnumerable(key) {
        var E = isEnum.call(this, key = toPrimitive(key, true));
        if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
        return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
    };
    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
        it = toIObject(it);
        key = toPrimitive(key, true);
        if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
        var D = gOPD(it, key);
        if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
        return D;
    };
    var $getOwnPropertyNames = function getOwnPropertyNames(it) {
        var names = gOPN(toIObject(it)), result = [], i = 0, key;
        while (names.length > i) {
            if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
        }
        return result;
    };
    var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
        var IS_OP = it === ObjectProto, names = gOPN(IS_OP ? OPSymbols : toIObject(it)), result = [], i = 0, key;
        while (names.length > i) {
            if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
        }
        return result;
    };
    if (!USE_NATIVE) {
        $Symbol = function Symbol() {
            if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
            var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
            var $set = function(value) {
                if (this === ObjectProto) $set.call(OPSymbols, value);
                if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                setSymbolDesc(this, tag, createDesc(1, value));
            };
            if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {
                configurable: true,
                set: $set
            });
            return wrap(tag);
        };
        redefine($Symbol[PROTOTYPE], "toString", function toString() {
            return this._k;
        });
        $GOPD.f = $getOwnPropertyDescriptor;
        $DP.f = $defineProperty;
        __webpack_require__(33).f = gOPNExt.f = $getOwnPropertyNames;
        __webpack_require__(21).f = $propertyIsEnumerable;
        __webpack_require__(34).f = $getOwnPropertySymbols;
        if (DESCRIPTORS && !__webpack_require__(20)) {
            redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, true);
        }
        wksExt.f = function(name) {
            return wrap(wks(name));
        };
    }
    $export($export.G + $export.W + $export.F * !USE_NATIVE, {
        Symbol: $Symbol
    });
    for (var symbols = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), i = 0; symbols.length > i; ) wks(symbols[i++]);
    for (var symbols = $keys(wks.store), i = 0; symbols.length > i; ) wksDefine(symbols[i++]);
    $export($export.S + $export.F * !USE_NATIVE, "Symbol", {
        "for": function(key) {
            return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
        },
        keyFor: function keyFor(key) {
            if (isSymbol(key)) return keyOf(SymbolRegistry, key);
            throw TypeError(key + " is not a symbol!");
        },
        useSetter: function() {
            setter = true;
        },
        useSimple: function() {
            setter = false;
        }
    });
    $export($export.S + $export.F * !USE_NATIVE, "Object", {
        create: $create,
        defineProperty: $defineProperty,
        defineProperties: $defineProperties,
        getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
        getOwnPropertyNames: $getOwnPropertyNames,
        getOwnPropertySymbols: $getOwnPropertySymbols
    });
    $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function() {
        var S = $Symbol();
        return _stringify([ S ]) != "[null]" || _stringify({
            a: S
        }) != "{}" || _stringify(Object(S)) != "{}";
    })), "JSON", {
        stringify: function stringify(it) {
            if (it === undefined || isSymbol(it)) return;
            var args = [ it ], i = 1, replacer, $replacer;
            while (arguments.length > i) args.push(arguments[i++]);
            replacer = args[1];
            if (typeof replacer == "function") $replacer = replacer;
            if ($replacer || !isArray(replacer)) replacer = function(key, value) {
                if ($replacer) value = $replacer.call(this, key, value);
                if (!isSymbol(value)) return value;
            };
            args[1] = replacer;
            return _stringify.apply($JSON, args);
        }
    });
    $Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(8)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
    setToStringTag($Symbol, "Symbol");
    setToStringTag(Math, "Math", true);
    setToStringTag(global.JSON, "JSON", true);
}, function(module, exports, __webpack_require__) {
    __webpack_require__(27)("asyncIterator");
}, function(module, exports, __webpack_require__) {
    __webpack_require__(27)("observable");
}, function(module, exports) {}, function(module, exports) {
    "use strict";
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
    }
    function shouldUseNative() {
        try {
            if (!Object.assign) {
                return false;
            }
            var test1 = new String("abc");
            test1[5] = "de";
            if (Object.getOwnPropertyNames(test1)[0] === "5") {
                return false;
            }
            var test2 = {};
            for (var i = 0; i < 10; i++) {
                test2["_" + String.fromCharCode(i)] = i;
            }
            var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
                return test2[n];
            });
            if (order2.join("") !== "0123456789") {
                return false;
            }
            var test3 = {};
            "abcdefghijklmnopqrst".split("").forEach(function(letter) {
                test3[letter] = letter;
            });
            if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
            from = Object(arguments[s]);
            for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }
            if (Object.getOwnPropertySymbols) {
                symbols = Object.getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                        to[symbols[i]] = from[symbols[i]];
                    }
                }
            }
        }
        return to;
    };
}, function(module, exports) {
    module.exports = '<div class=vux-slider> <div class=vux-swiper :style="{height: xheight}"> <slot></slot> <div class=vux-swiper-item v-for="item in list" @click=clickListItem(item)> <a href=javascript:> <div class=vux-img :style="{backgroundImage: buildBackgroundUrl(item.img)}"></div> <p class=vux-swiper-desc v-if=showDescMask>{{item.title}}</p> </a> </div> </div> <div :class="[dotsClass, \'vux-indicator\', \'vux-indicator-\' + dotsPosition]" v-show=showDots> <a href=javascript: v-for="key in length"> <i class=vux-icon-dot :class="{\'active\': key === current}"></i> </a> </div> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(86);
    __vue_script__ = __webpack_require__(41);
    __vue_template__ = __webpack_require__(88);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);