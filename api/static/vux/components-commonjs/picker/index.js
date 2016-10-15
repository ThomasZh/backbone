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
    module.exports = __webpack_require__(92);
}, function(module, exports) {
    var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
    if (typeof __g == "number") __g = global;
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
    var anObject = __webpack_require__(9), IE8_DOM_DEFINE = __webpack_require__(31), toPrimitive = __webpack_require__(25), dP = Object.defineProperty;
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
    var IObject = __webpack_require__(63), defined = __webpack_require__(15);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(4), createDesc = __webpack_require__(13);
    module.exports = __webpack_require__(2) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    var store = __webpack_require__(23)("wks"), uid = __webpack_require__(14), Symbol = __webpack_require__(1).Symbol, USE_SYMBOL = typeof Symbol == "function";
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
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(36), enumBugKeys = __webpack_require__(16);
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
    module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, function(module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(1), core = __webpack_require__(8), ctx = __webpack_require__(60), hide = __webpack_require__(6), PROTOTYPE = "prototype";
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
    module.exports = {};
}, function(module, exports) {
    module.exports = true;
}, function(module, exports) {
    exports.f = {}.propertyIsEnumerable;
}, function(module, exports, __webpack_require__) {
    var def = __webpack_require__(4).f, has = __webpack_require__(3), TAG = __webpack_require__(7)("toStringTag");
    module.exports = function(it, tag, stat) {
        if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
            configurable: true,
            value: tag
        });
    };
}, function(module, exports, __webpack_require__) {
    var shared = __webpack_require__(23)("keys"), uid = __webpack_require__(14);
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
    var global = __webpack_require__(1), core = __webpack_require__(8), LIBRARY = __webpack_require__(19), wksExt = __webpack_require__(27), defineProperty = __webpack_require__(4).f;
    module.exports = function(name) {
        var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
        if (name.charAt(0) != "_" && !(name in $Symbol)) defineProperty($Symbol, name, {
            value: wksExt.f(name)
        });
    };
}, function(module, exports, __webpack_require__) {
    exports.f = __webpack_require__(7);
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(53),
        __esModule: true
    };
}, function(module, exports) {
    var toString = {}.toString;
    module.exports = function(it) {
        return toString.call(it).slice(8, -1);
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(11), document = __webpack_require__(1).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(2) && !__webpack_require__(10)(function() {
        return Object.defineProperty(__webpack_require__(30)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var LIBRARY = __webpack_require__(19), $export = __webpack_require__(17), redefine = __webpack_require__(37), hide = __webpack_require__(6), has = __webpack_require__(3), Iterators = __webpack_require__(18), $iterCreate = __webpack_require__(65), setToStringTag = __webpack_require__(21), getPrototypeOf = __webpack_require__(72), ITERATOR = __webpack_require__(7)("iterator"), BUGGY = !([].keys && "next" in [].keys()), FF_ITERATOR = "@@iterator", KEYS = "keys", VALUES = "values";
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
    var anObject = __webpack_require__(9), dPs = __webpack_require__(69), enumBugKeys = __webpack_require__(16), IE_PROTO = __webpack_require__(22)("IE_PROTO"), Empty = function() {}, PROTOTYPE = "prototype";
    var createDict = function() {
        var iframe = __webpack_require__(30)("iframe"), i = enumBugKeys.length, gt = ">", iframeDocument;
        iframe.style.display = "none";
        __webpack_require__(62).appendChild(iframe);
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
    var $keys = __webpack_require__(36), hiddenKeys = __webpack_require__(16).concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return $keys(O, hiddenKeys);
    };
}, function(module, exports) {
    exports.f = Object.getOwnPropertySymbols;
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(3), toIObject = __webpack_require__(5), arrayIndexOf = __webpack_require__(59)(false), IE_PROTO = __webpack_require__(22)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(6);
}, function(module, exports) {
    module.exports = function(arr, fn, self) {
        if (arr.filter) return arr.filter(fn, self);
        if (void 0 === arr || null === arr) throw new TypeError();
        if ("function" != typeof fn) throw new TypeError();
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            if (!hasOwn.call(arr, i)) continue;
            var val = arr[i];
            if (fn.call(self, val, i, arr)) ret.push(val);
        }
        return ret;
    };
    var hasOwn = Object.prototype.hasOwnProperty;
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var prefixList = [ "-moz-box-", "-webkit-box-", "" ];
    exports.default = {
        props: {
            span: [ Number, String ],
            order: [ Number, String ]
        },
        methods: {
            buildWidth: function buildWidth(width) {
                if (typeof width === "number") {
                    if (width < 1) {
                        return width;
                    } else {
                        return width / 12;
                    }
                } else if (typeof width === "string") {
                    return width.replace("px", "") / this.bodyWidth;
                }
            }
        },
        computed: {
            style: function style() {
                var styles = {};
                var marginName = this.$parent.orient === "horizontal" ? "marginLeft" : "marginTop";
                styles[marginName] = this.$parent.gutter + "px";
                if (this.span) {
                    for (var i = 0; i < prefixList.length; i++) {
                        styles[prefixList[i] + "flex"] = "0 0 " + this.buildWidth(this.span) * 100 + "%";
                    }
                }
                if (typeof this.order !== "undefined") {
                    styles.order = this.order;
                }
                return styles;
            }
        },
        data: function data() {
            return {
                bodyWidth: document.documentElement.offsetWidth
            };
        }
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            gutter: {
                type: Number,
                "default": 8
            },
            orient: {
                type: String,
                "default": "horizontal"
            },
            justify: String,
            align: String,
            wrap: String,
            direction: String
        },
        computed: {
            styles: function styles() {
                return {
                    "justify-content": this.justify,
                    "align-items": this.align,
                    "flex-wrap": this.wrap,
                    "flex-direction": this.direction
                };
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _stringify = __webpack_require__(28);
    var _stringify2 = _interopRequireDefault(_stringify);
    var _typeof2 = __webpack_require__(52);
    var _typeof3 = _interopRequireDefault(_typeof2);
    var _scroller = __webpack_require__(45);
    var _scroller2 = _interopRequireDefault(_scroller);
    var _flexbox = __webpack_require__(42);
    var _chain = __webpack_require__(44);
    var _chain2 = _interopRequireDefault(_chain);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        components: {
            Flexbox: _flexbox.Flexbox,
            FlexboxItem: _flexbox.FlexboxItem
        },
        created: function created() {
            if (this.columns !== 0) {
                var length = this.columns;
                this.store = new _chain2.default(this.data, length, this.fixedColumns);
                this.data = this.store.getColumns(this.value);
            }
        },
        ready: function ready() {
            var _this2 = this;
            this.$nextTick(function() {
                _this2.render(_this2.data, _this2.value);
            });
        },
        props: {
            data: {
                type: Array
            },
            columns: {
                type: Number,
                "default": 0
            },
            fixedColumns: {
                type: Number,
                "default": 0
            },
            value: {
                type: Array,
                twoWay: true
            },
            itemClass: {
                type: String,
                "default": "scroller-item"
            }
        },
        methods: {
            getId: function getId(i) {
                return "#vux-picker-" + this.uuid + "-" + i;
            },
            render: function render(data, value) {
                this.count = this.data.length;
                var _this = this;
                if (!data || !data.length) {
                    return;
                }
                var count = this.data.length;
                if (value.length < count) {
                    for (var i = 0; i < count; i++) {
                        _this.value.$set(i, data[i][0].value || data[i][0]);
                    }
                }
                var _loop = function _loop(_i) {
                    if (!document.querySelector(_this.getId(_i))) {
                        return {
                            v: void 0
                        };
                    }
                    _this.scroller[_i] && _this.scroller[_i].destroy();
                    _this.scroller[_i] = new _scroller2.default(_this.getId(_i), {
                        data: data[_i],
                        defaultValue: value[_i] || data[_i][0].value,
                        itemClass: _this.item_class,
                        onSelect: function onSelect(value) {
                            _this.value.$set(_i, value);
                            if (!this.columns || this.columns && _this.getValue().length === _this.store.count) {
                                _this.$emit("on-change", _this.getValue());
                            }
                            if (_this.columns !== 0) {
                                _this.renderChain(_i + 1);
                            }
                        }
                    });
                    if (_this.value) {
                        _this.scroller[_i].select(value[_i]);
                    }
                };
                for (var _i = 0; _i < data.length; _i++) {
                    var _ret = _loop(_i);
                    if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
                }
            },
            renderChain: function renderChain(i) {
                if (!this.columns) {
                    return;
                }
                if (i > this.count - 1) {
                    return;
                }
                var _this = this;
                var ID = this.getId(i);
                this.scroller[i].destroy();
                var list = this.store.getChildren(_this.getValue()[i - 1]);
                this.scroller[i] = new _scroller2.default(ID, {
                    data: list,
                    itemClass: _this.item_class,
                    onSelect: function onSelect(value) {
                        _this.value.$set(i, value);
                        _this.$emit("on-change", _this.getValue());
                        _this.renderChain(i + 1);
                    }
                });
                this.value.$set(i, list[0].value);
                this.renderChain(i + 1);
            },
            getValue: function getValue() {
                var data = [];
                for (var i = 0; i < this.data.length; i++) {
                    if (this.scroller[i]) {
                        data.push(this.scroller[i].value);
                    } else {
                        return [];
                    }
                }
                return data;
            },
            emitValueChange: function emitValueChange(val) {
                if (!this.columns || this.columns && val.length === this.store.count) {
                    this.$emit("on-change", val);
                }
            }
        },
        data: function data() {
            return {
                scroller: [],
                count: 0,
                uuid: Math.random().toString(36).substring(3, 8)
            };
        },
        watch: {
            value: function value(val, oldVal) {
                if (this.columns !== 0) {
                    if (val.length > 0) {
                        if ((0, _stringify2.default)(val) !== (0, _stringify2.default)(oldVal)) {
                            this.data = this.store.getColumns(val);
                            this.$nextTick(function() {
                                this.render(this.data, val);
                            });
                        }
                    }
                } else {
                    for (var i = 0; i < val.length; i++) {
                        if (this.scroller[i].value !== val[i]) {
                            this.scroller[i].select(val[i]);
                        }
                    }
                }
            },
            data: function data(newData) {
                var _this3 = this;
                if (Object.prototype.toString.call(newData[0]) === "[object Array]") {
                    this.$nextTick(function() {
                        _this3.render(newData, _this3.value);
                        _this3.$nextTick(function() {
                            _this3.emitValueChange(_this3.getValue());
                            if ((0, _stringify2.default)(_this3.getValue()) !== (0, _stringify2.default)(_this3.value)) {
                                if (!_this3.columns || _this3.columns && _this3.getValue().length === _this3.store.count) {
                                    _this3.value = _this3.getValue();
                                }
                            }
                        });
                    });
                } else {
                    if (this.columns !== 0) {
                        if (!newData.length) {
                            return;
                        }
                        var length = this.columns;
                        this.store = new _chain2.default(newData, length, this.fixedColumns);
                        this.data = this.store.getColumns(this.value);
                    }
                }
            }
        },
        beforeDestroy: function beforeDestroy() {
            for (var i = 0; i < this.count; i++) {
                this.scroller[i].destroy();
                this.scroller[i] = null;
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexboxItem = exports.Flexbox = undefined;
    var _flexbox = __webpack_require__(91);
    var _flexbox2 = _interopRequireDefault(_flexbox);
    var _flexboxItem = __webpack_require__(90);
    var _flexboxItem2 = _interopRequireDefault(_flexboxItem);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.Flexbox = _flexbox2.default;
    exports.FlexboxItem = _flexboxItem2.default;
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var time = Date.now || function() {
        return +new Date();
    };
    var running = {};
    var counter = 1;
    var desiredFrames = 60;
    var millisecondsPerSecond = 1e3;
    exports.default = {
        requestAnimationFrame: function() {
            var requestFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
            return function(callback, root) {
                requestFrame(callback, root);
            };
        }(),
        stop: function stop(id) {
            var cleared = running[id] != null;
            if (cleared) {
                running[id] = null;
            }
            return cleared;
        },
        isRunning: function isRunning(id) {
            return running[id] != null;
        },
        start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
            var _this = this;
            var start = time();
            var lastFrame = start;
            var percent = 0;
            var dropCounter = 0;
            var id = counter++;
            if (!root) {
                root = document.body;
            }
            if (id % 20 === 0) {
                var newRunning = {};
                for (var usedId in running) {
                    newRunning[usedId] = true;
                }
                running = newRunning;
            }
            var step = function step(virtual) {
                var render = virtual !== true;
                var now = time();
                if (!running[id] || verifyCallback && !verifyCallback(id)) {
                    running[id] = null;
                    completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
                    return;
                }
                if (render) {
                    var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
                    for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
                        step(true);
                        dropCounter++;
                    }
                }
                if (duration) {
                    percent = (now - start) / duration;
                    if (percent > 1) {
                        percent = 1;
                    }
                }
                var value = easingMethod ? easingMethod(percent) : percent;
                if ((stepCallback(value, now, render) === false || percent === 1) && render) {
                    running[id] = null;
                    completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration == null);
                } else if (render) {
                    lastFrame = now;
                    _this.requestAnimationFrame(step, root);
                }
            };
            running[id] = true;
            _this.requestAnimationFrame(step, root);
            return id;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _stringify = __webpack_require__(28);
    var _stringify2 = _interopRequireDefault(_stringify);
    var _classCallCheck2 = __webpack_require__(50);
    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
    var _createClass2 = __webpack_require__(51);
    var _createClass3 = _interopRequireDefault(_createClass2);
    var _arrayFilter = __webpack_require__(38);
    var _arrayFilter2 = _interopRequireDefault(_arrayFilter);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var Manager = function() {
        function Manager(data, count, fixedColumns) {
            (0, _classCallCheck3.default)(this, Manager);
            this.data = data;
            this.count = count;
            if (fixedColumns) {
                this.fixedColumns = fixedColumns;
            }
        }
        (0, _createClass3.default)(Manager, [ {
            key: "getChildren",
            value: function getChildren(value) {
                return (0, _arrayFilter2.default)(this.data, function(one) {
                    return one.parent === value;
                });
            }
        }, {
            key: "getFirstColumn",
            value: function getFirstColumn() {
                return (0, _arrayFilter2.default)(this.data, function(one) {
                    return !one.parent || one.parent === 0;
                });
            }
        }, {
            key: "getPure",
            value: function getPure(obj) {
                return JSON.parse((0, _stringify2.default)(obj));
            }
        }, {
            key: "getColumns",
            value: function getColumns(value) {
                var _this = this;
                if (value.length > 0) {
                    var matchCount = this.getPure(this.data).filter(function(item) {
                        return _this.getPure(value).indexOf(item.value) > -1;
                    }).length;
                    if (matchCount < this.getPure(value).length) {
                        value = [];
                    }
                }
                var datas = [];
                var max = this.fixedColumns || 8;
                for (var i = 0; i < max; i++) {
                    if (i === 0) {
                        datas.push(this.getFirstColumn());
                    } else {
                        if (!value[i]) {
                            if (typeof datas[i - 1][0] === "undefined") {
                                break;
                            } else {
                                var topValue = datas[i - 1][0].value;
                                datas.push(this.getChildren(topValue));
                            }
                        } else {
                            datas.push(this.getChildren(value[i - 1]));
                        }
                    }
                }
                var list = datas.filter(function(item) {
                    return item.length > 0;
                });
                this.count = list.length;
                return list;
            }
        } ]);
        return Manager;
    }();
    exports.default = Manager;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _animate = __webpack_require__(43);
    var _animate2 = _interopRequireDefault(_animate);
    var _util = __webpack_require__(46);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var TEMPLATE = '\n<div class="scroller-component" data-role="component">\n  <div class="scroller-mask" data-role="mask"></div>\n  <div class="scroller-indicator" data-role="indicator"></div>\n  <div class="scroller-content" data-role="content"></div>\n</div>\n';
    var Scroller = function Scroller(container, options) {
        var self = this;
        options = options || {};
        self.options = {
            itemClass: "scroller-item",
            onSelect: function onSelect() {},
            defaultValue: 0,
            data: []
        };
        for (var key in options) {
            if (options[key] !== undefined) {
                self.options[key] = options[key];
            }
        }
        self.__container = (0, _util.getElement)(container);
        var tempContainer = document.createElement("div");
        tempContainer.innerHTML = options.template || TEMPLATE;
        var component = self.__component = tempContainer.querySelector("[data-role=component]");
        var content = self.__content = component.querySelector("[data-role=content]");
        var indicator = component.querySelector("[data-role=indicator]");
        var data = self.options.data;
        var html = "";
        if (data.length && data[0].constructor === Object) {
            data.forEach(function(row) {
                html += '<div class="' + self.options.itemClass + '" data-value="' + row.value + '">' + row.name + "</div>";
            });
        } else {
            data.forEach(function(val) {
                html += '<div class="' + self.options.itemClass + '" data-value="' + val + '">' + val + "</div>";
            });
        }
        content.innerHTML = html;
        self.__container.appendChild(component);
        self.__itemHeight = parseInt((0, _util.getComputedStyle)(indicator, "height"), 10);
        self.__callback = options.callback || function(top) {
            content.style.webkitTransform = "translate3d(0, " + -top + "px, 0)";
        };
        var rect = component.getBoundingClientRect();
        self.__clientTop = rect.top + component.clientTop || 0;
        self.__setDimensions(component.clientHeight, content.offsetHeight);
        if (component.clientHeight === 0) {
            self.__setDimensions(parseInt((0, _util.getComputedStyle)(component, "height"), 10), 204);
        }
        self.select(self.options.defaultValue, false);
        component.addEventListener("touchstart", function(e) {
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return;
            }
            e.preventDefault();
            self.__doTouchStart(e.touches, e.timeStamp);
        }, false);
        component.addEventListener("touchmove", function(e) {
            self.__doTouchMove(e.touches, e.timeStamp);
        }, false);
        component.addEventListener("touchend", function(e) {
            self.__doTouchEnd(e.timeStamp);
        }, false);
    };
    var members = {
        value: null,
        __prevValue: null,
        __isSingleTouch: false,
        __isTracking: false,
        __didDecelerationComplete: false,
        __isGesturing: false,
        __isDragging: false,
        __isDecelerating: false,
        __isAnimating: false,
        __clientTop: 0,
        __clientHeight: 0,
        __contentHeight: 0,
        __itemHeight: 0,
        __scrollTop: 0,
        __minScrollTop: 0,
        __maxScrollTop: 0,
        __scheduledTop: 0,
        __lastTouchTop: null,
        __lastTouchMove: null,
        __positions: null,
        __minDecelerationScrollTop: null,
        __maxDecelerationScrollTop: null,
        __decelerationVelocityY: null,
        __setDimensions: function __setDimensions(clientHeight, contentHeight) {
            var self = this;
            self.__clientHeight = clientHeight;
            self.__contentHeight = contentHeight;
            var totalItemCount = self.options.data.length;
            var clientItemCount = Math.round(self.__clientHeight / self.__itemHeight);
            self.__minScrollTop = -self.__itemHeight * (clientItemCount / 2);
            self.__maxScrollTop = self.__minScrollTop + totalItemCount * self.__itemHeight - .1;
        },
        selectByIndex: function selectByIndex(index, animate) {
            var self = this;
            if (index < 0 || index > self.__content.childElementCount - 1) {
                return;
            }
            self.__scrollTop = self.__minScrollTop + index * self.__itemHeight;
            self.scrollTo(self.__scrollTop, animate);
            self.__selectItem(self.__content.children[index]);
        },
        select: function select(value, animate) {
            var self = this;
            var children = self.__content.children;
            for (var i = 0, len = children.length; i < len; i++) {
                if (children[i].dataset.value === value) {
                    self.selectByIndex(i, animate);
                    return;
                }
            }
            self.selectByIndex(0, animate);
        },
        getValue: function getValue() {
            return this.value;
        },
        scrollTo: function scrollTo(top, animate) {
            var self = this;
            animate = animate === undefined ? true : animate;
            if (self.__isDecelerating) {
                _animate2.default.stop(self.__isDecelerating);
                self.__isDecelerating = false;
            }
            top = Math.round(top / self.__itemHeight) * self.__itemHeight;
            top = Math.max(Math.min(self.__maxScrollTop, top), self.__minScrollTop);
            if (top === self.__scrollTop || !animate) {
                self.__publish(top);
                self.__scrollingComplete();
                return;
            }
            self.__publish(top, 250);
        },
        destroy: function destroy() {
            this.__component.parentNode && this.__component.parentNode.removeChild(this.__component);
        },
        __selectItem: function __selectItem(selectedItem) {
            var self = this;
            var selectedItemClass = self.options.itemClass + "-selected";
            var lastSelectedElem = self.__content.querySelector("." + selectedItemClass);
            if (lastSelectedElem) {
                lastSelectedElem.classList.remove(selectedItemClass);
            }
            selectedItem.classList.add(selectedItemClass);
            if (self.value !== null) {
                self.__prevValue = self.value;
            }
            self.value = selectedItem.dataset.value;
        },
        __scrollingComplete: function __scrollingComplete() {
            var self = this;
            var index = Math.round((self.__scrollTop - self.__minScrollTop - self.__itemHeight / 2) / self.__itemHeight);
            self.__selectItem(self.__content.children[index]);
            if (self.__prevValue !== null && self.__prevValue !== self.value) {
                self.options.onSelect(self.value);
            }
        },
        __doTouchStart: function __doTouchStart(touches, timeStamp) {
            var self = this;
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            self.__interruptedAnimation = true;
            if (self.__isDecelerating) {
                _animate2.default.stop(self.__isDecelerating);
                self.__isDecelerating = false;
                self.__interruptedAnimation = true;
            }
            if (self.__isAnimating) {
                _animate2.default.stop(self.__isAnimating);
                self.__isAnimating = false;
                self.__interruptedAnimation = true;
            }
            var currentTouchTop;
            var isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                currentTouchTop = touches[0].pageY;
            } else {
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            self.__initialTouchTop = currentTouchTop;
            self.__lastTouchTop = currentTouchTop;
            self.__lastTouchMove = timeStamp;
            self.__lastScale = 1;
            self.__enableScrollY = !isSingleTouch;
            self.__isTracking = true;
            self.__didDecelerationComplete = false;
            self.__isDragging = !isSingleTouch;
            self.__isSingleTouch = isSingleTouch;
            self.__positions = [];
        },
        __doTouchMove: function __doTouchMove(touches, timeStamp, scale) {
            var self = this;
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            if (!self.__isTracking) {
                return;
            }
            var currentTouchTop;
            if (touches.length === 2) {
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            } else {
                currentTouchTop = touches[0].pageY;
            }
            var positions = self.__positions;
            if (self.__isDragging) {
                var moveY = currentTouchTop - self.__lastTouchTop;
                var scrollTop = self.__scrollTop;
                if (self.__enableScrollY) {
                    scrollTop -= moveY;
                    var minScrollTop = self.__minScrollTop;
                    var maxScrollTop = self.__maxScrollTop;
                    if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
                        if (scrollTop > maxScrollTop) {
                            scrollTop = maxScrollTop;
                        } else {
                            scrollTop = minScrollTop;
                        }
                    }
                }
                if (positions.length > 40) {
                    positions.splice(0, 20);
                }
                positions.push(scrollTop, timeStamp);
                self.__publish(scrollTop);
            } else {
                var minimumTrackingForScroll = 0;
                var minimumTrackingForDrag = 5;
                var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);
                self.__enableScrollY = distanceY >= minimumTrackingForScroll;
                positions.push(self.__scrollTop, timeStamp);
                self.__isDragging = self.__enableScrollY && distanceY >= minimumTrackingForDrag;
                if (self.__isDragging) {
                    self.__interruptedAnimation = false;
                }
            }
            self.__lastTouchTop = currentTouchTop;
            self.__lastTouchMove = timeStamp;
            self.__lastScale = scale;
        },
        __doTouchEnd: function __doTouchEnd(timeStamp) {
            var self = this;
            if (timeStamp instanceof Date) {
                timeStamp = timeStamp.valueOf();
            }
            if (typeof timeStamp !== "number") {
                throw new Error("Invalid timestamp value: " + timeStamp);
            }
            if (!self.__isTracking) {
                return;
            }
            self.__isTracking = false;
            if (self.__isDragging) {
                self.__isDragging = false;
                if (self.__isSingleTouch && timeStamp - self.__lastTouchMove <= 100) {
                    var positions = self.__positions;
                    var endPos = positions.length - 1;
                    var startPos = endPos;
                    for (var i = endPos; i > 0 && positions[i] > self.__lastTouchMove - 100; i -= 2) {
                        startPos = i;
                    }
                    if (startPos !== endPos) {
                        var timeOffset = positions[endPos] - positions[startPos];
                        var movedTop = self.__scrollTop - positions[startPos - 1];
                        self.__decelerationVelocityY = movedTop / timeOffset * (1e3 / 60);
                        var minVelocityToStartDeceleration = 4;
                        if (Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
                            self.__startDeceleration(timeStamp);
                        }
                    }
                }
            }
            if (!self.__isDecelerating) {
                self.scrollTo(self.__scrollTop);
            }
            self.__positions.length = 0;
        },
        __publish: function __publish(top, animationDuration) {
            var self = this;
            var wasAnimating = self.__isAnimating;
            if (wasAnimating) {
                _animate2.default.stop(wasAnimating);
                self.__isAnimating = false;
            }
            if (animationDuration) {
                self.__scheduledTop = top;
                var oldTop = self.__scrollTop;
                var diffTop = top - oldTop;
                var step = function step(percent, now, render) {
                    self.__scrollTop = oldTop + diffTop * percent;
                    if (self.__callback) {
                        self.__callback(self.__scrollTop);
                    }
                };
                var verify = function verify(id) {
                    return self.__isAnimating === id;
                };
                var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
                    if (animationId === self.__isAnimating) {
                        self.__isAnimating = false;
                    }
                    if (self.__didDecelerationComplete || wasFinished) {
                        self.__scrollingComplete();
                    }
                };
                self.__isAnimating = _animate2.default.start(step, verify, completed, animationDuration, wasAnimating ? _util.easeOutCubic : _util.easeInOutCubic);
            } else {
                self.__scheduledTop = self.__scrollTop = top;
                if (self.__callback) {
                    self.__callback(top);
                }
            }
        },
        __startDeceleration: function __startDeceleration(timeStamp) {
            var self = this;
            self.__minDecelerationScrollTop = self.__minScrollTop;
            self.__maxDecelerationScrollTop = self.__maxScrollTop;
            var step = function step(percent, now, render) {
                self.__stepThroughDeceleration(render);
            };
            var minVelocityToKeepDecelerating = .5;
            var verify = function verify() {
                var shouldContinue = Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
                if (!shouldContinue) {
                    self.__didDecelerationComplete = true;
                }
                return shouldContinue;
            };
            var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
                self.__isDecelerating = false;
                if (self.__scrollTop <= self.__minScrollTop || self.__scrollTop >= self.__maxScrollTop) {
                    self.scrollTo(self.__scrollTop);
                    return;
                }
                if (self.__didDecelerationComplete) {
                    self.__scrollingComplete();
                }
            };
            self.__isDecelerating = _animate2.default.start(step, verify, completed);
        },
        __stepThroughDeceleration: function __stepThroughDeceleration(render) {
            var self = this;
            var scrollTop = self.__scrollTop + self.__decelerationVelocityY;
            var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
            if (scrollTopFixed !== scrollTop) {
                scrollTop = scrollTopFixed;
                self.__decelerationVelocityY = 0;
            }
            if (Math.abs(self.__decelerationVelocityY) <= 1) {
                if (Math.abs(scrollTop % self.__itemHeight) < 1) {
                    self.__decelerationVelocityY = 0;
                }
            } else {
                self.__decelerationVelocityY *= .95;
            }
            self.__publish(scrollTop);
        }
    };
    for (var key in members) {
        Scroller.prototype[key] = members[key];
    }
    module.exports = Scroller;
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getElement = getElement;
    exports.getComputedStyle = getComputedStyle;
    exports.easeOutCubic = easeOutCubic;
    exports.easeInOutCubic = easeInOutCubic;
    function getElement(expr) {
        return typeof expr === "string" ? document.querySelector(expr) : expr;
    }
    function getComputedStyle(el, key) {
        var computedStyle = window.getComputedStyle(el);
        return computedStyle[key] || "";
    }
    function easeOutCubic(pos) {
        return Math.pow(pos - 1, 3) + 1;
    }
    function easeInOutCubic(pos) {
        if ((pos /= .5) < 1) {
            return .5 * Math.pow(pos, 3);
        }
        return .5 * (Math.pow(pos - 2, 3) + 2);
    }
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
    var _defineProperty = __webpack_require__(47);
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
    var _iterator = __webpack_require__(49);
    var _iterator2 = _interopRequireDefault(_iterator);
    var _symbol = __webpack_require__(48);
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
    var core = __webpack_require__(8), $JSON = core.JSON || (core.JSON = {
        stringify: JSON.stringify
    });
    module.exports = function stringify(it) {
        return $JSON.stringify.apply($JSON, arguments);
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(78);
    var $Object = __webpack_require__(8).Object;
    module.exports = function defineProperty(it, key, desc) {
        return $Object.defineProperty(it, key, desc);
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(81);
    __webpack_require__(79);
    __webpack_require__(82);
    __webpack_require__(83);
    module.exports = __webpack_require__(8).Symbol;
}, function(module, exports, __webpack_require__) {
    __webpack_require__(80);
    __webpack_require__(84);
    module.exports = __webpack_require__(27).f("iterator");
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports) {
    module.exports = function() {};
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(5), toLength = __webpack_require__(75), toIndex = __webpack_require__(74);
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
    var getKeys = __webpack_require__(12), gOPS = __webpack_require__(35), pIE = __webpack_require__(20);
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
    var cof = __webpack_require__(29);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(29);
    module.exports = Array.isArray || function isArray(arg) {
        return cof(arg) == "Array";
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var create = __webpack_require__(33), descriptor = __webpack_require__(13), setToStringTag = __webpack_require__(21), IteratorPrototype = {};
    __webpack_require__(6)(IteratorPrototype, __webpack_require__(7)("iterator"), function() {
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
    var getKeys = __webpack_require__(12), toIObject = __webpack_require__(5);
    module.exports = function(object, el) {
        var O = toIObject(object), keys = getKeys(O), length = keys.length, index = 0, key;
        while (length > index) if (O[key = keys[index++]] === el) return key;
    };
}, function(module, exports, __webpack_require__) {
    var META = __webpack_require__(14)("meta"), isObject = __webpack_require__(11), has = __webpack_require__(3), setDesc = __webpack_require__(4).f, id = 0;
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
    var dP = __webpack_require__(4), anObject = __webpack_require__(9), getKeys = __webpack_require__(12);
    module.exports = __webpack_require__(2) ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var keys = getKeys(Properties), length = keys.length, i = 0, P;
        while (length > i) dP.f(O, P = keys[i++], Properties[P]);
        return O;
    };
}, function(module, exports, __webpack_require__) {
    var pIE = __webpack_require__(20), createDesc = __webpack_require__(13), toIObject = __webpack_require__(5), toPrimitive = __webpack_require__(25), has = __webpack_require__(3), IE8_DOM_DEFINE = __webpack_require__(31), gOPD = Object.getOwnPropertyDescriptor;
    exports.f = __webpack_require__(2) ? gOPD : function getOwnPropertyDescriptor(O, P) {
        O = toIObject(O);
        P = toPrimitive(P, true);
        if (IE8_DOM_DEFINE) try {
            return gOPD(O, P);
        } catch (e) {}
        if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(5), gOPN = __webpack_require__(34).f, toString = {}.toString;
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
    var has = __webpack_require__(3), toObject = __webpack_require__(76), IE_PROTO = __webpack_require__(22)("IE_PROTO"), ObjectProto = Object.prototype;
    module.exports = Object.getPrototypeOf || function(O) {
        O = toObject(O);
        if (has(O, IE_PROTO)) return O[IE_PROTO];
        if (typeof O.constructor == "function" && O instanceof O.constructor) {
            return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectProto : null;
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(24), defined = __webpack_require__(15);
    module.exports = function(TO_STRING) {
        return function(that, pos) {
            var s = String(defined(that)), i = toInteger(pos), l = s.length, a, b;
            if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
            a = s.charCodeAt(i);
            return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
        };
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(24), max = Math.max, min = Math.min;
    module.exports = function(index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(24), min = Math.min;
    module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
    };
}, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(15);
    module.exports = function(it) {
        return Object(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var addToUnscopables = __webpack_require__(58), step = __webpack_require__(66), Iterators = __webpack_require__(18), toIObject = __webpack_require__(5);
    module.exports = __webpack_require__(32)(Array, "Array", function(iterated, kind) {
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
    var $export = __webpack_require__(17);
    $export($export.S + $export.F * !__webpack_require__(2), "Object", {
        defineProperty: __webpack_require__(4).f
    });
}, function(module, exports) {}, function(module, exports, __webpack_require__) {
    "use strict";
    var $at = __webpack_require__(73)(true);
    __webpack_require__(32)(String, "String", function(iterated) {
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
    "use strict";
    var global = __webpack_require__(1), has = __webpack_require__(3), DESCRIPTORS = __webpack_require__(2), $export = __webpack_require__(17), redefine = __webpack_require__(37), META = __webpack_require__(68).KEY, $fails = __webpack_require__(10), shared = __webpack_require__(23), setToStringTag = __webpack_require__(21), uid = __webpack_require__(14), wks = __webpack_require__(7), wksExt = __webpack_require__(27), wksDefine = __webpack_require__(26), keyOf = __webpack_require__(67), enumKeys = __webpack_require__(61), isArray = __webpack_require__(64), anObject = __webpack_require__(9), toIObject = __webpack_require__(5), toPrimitive = __webpack_require__(25), createDesc = __webpack_require__(13), _create = __webpack_require__(33), gOPNExt = __webpack_require__(71), $GOPD = __webpack_require__(70), $DP = __webpack_require__(4), $keys = __webpack_require__(12), gOPD = $GOPD.f, dP = $DP.f, gOPN = gOPNExt.f, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, PROTOTYPE = "prototype", HIDDEN = wks("_hidden"), TO_PRIMITIVE = wks("toPrimitive"), isEnum = {}.propertyIsEnumerable, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), OPSymbols = shared("op-symbols"), ObjectProto = Object[PROTOTYPE], USE_NATIVE = typeof $Symbol == "function", QObject = global.QObject;
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
        __webpack_require__(34).f = gOPNExt.f = $getOwnPropertyNames;
        __webpack_require__(20).f = $propertyIsEnumerable;
        __webpack_require__(35).f = $getOwnPropertySymbols;
        if (DESCRIPTORS && !__webpack_require__(19)) {
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
    $Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(6)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
    setToStringTag($Symbol, "Symbol");
    setToStringTag(Math, "Math", true);
    setToStringTag(global.JSON, "JSON", true);
}, function(module, exports, __webpack_require__) {
    __webpack_require__(26)("asyncIterator");
}, function(module, exports, __webpack_require__) {
    __webpack_require__(26)("observable");
}, function(module, exports, __webpack_require__) {
    __webpack_require__(77);
    var global = __webpack_require__(1), hide = __webpack_require__(6), Iterators = __webpack_require__(18), TO_STRING_TAG = __webpack_require__(7)("toStringTag");
    for (var collections = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], i = 0; i < 5; i++) {
        var NAME = collections[i], Collection = global[NAME], proto = Collection && Collection.prototype;
        if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = Iterators.Array;
    }
}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div class=vux-flexbox-item :style=style> <slot></slot> </div>";
}, function(module, exports) {
    module.exports = "<div class=vux-flexbox :class=\"{'vux-flex-col': orient === 'vertical', 'vux-flex-row': orient === 'horizontal'}\" :style=styles> <slot></slot> </div>";
}, function(module, exports) {
    module.exports = "<div class=vux-picker> <flexbox :gutter=0> <flexbox-item v-for=\"(index, one) in data\" style=margin-left:0> <div class=vux-picker-item :id=\"'vux-picker-' + uuid + '-' + index\"></div> </flexbox-item> </flexbox> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(39);
    __vue_template__ = __webpack_require__(87);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(85);
    __vue_script__ = __webpack_require__(40);
    __vue_template__ = __webpack_require__(88);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(86);
    __vue_script__ = __webpack_require__(41);
    __vue_template__ = __webpack_require__(89);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);