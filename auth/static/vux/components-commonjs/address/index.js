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
    module.exports = __webpack_require__(115);
}, function(module, exports) {
    var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
    if (typeof __g == "number") __g = global;
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(9)(function() {
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
    var anObject = __webpack_require__(11), IE8_DOM_DEFINE = __webpack_require__(35), toPrimitive = __webpack_require__(26), dP = Object.defineProperty;
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
}, function(module, exports, __webpack_require__) {
    var IObject = __webpack_require__(78), defined = __webpack_require__(17);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(5), createDesc = __webpack_require__(14);
    module.exports = __webpack_require__(3) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    var store = __webpack_require__(24)("wks"), uid = __webpack_require__(15), Symbol = __webpack_require__(1).Symbol, USE_SYMBOL = typeof Symbol == "function";
    var $exports = module.exports = function(name) {
        return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)("Symbol." + name));
    };
    $exports.store = store;
}, function(module, exports) {
    module.exports = function(exec) {
        try {
            return !!exec();
        } catch (e) {
            return true;
        }
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(40), enumBugKeys = __webpack_require__(18);
    module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(13);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(1), core = __webpack_require__(2), ctx = __webpack_require__(75), hide = __webpack_require__(7), PROTOTYPE = "prototype";
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
    module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
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
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(67),
        __esModule: true
    };
}, function(module, exports) {
    module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, function(module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(module, exports) {
    module.exports = {};
}, function(module, exports) {
    module.exports = true;
}, function(module, exports) {
    exports.f = {}.propertyIsEnumerable;
}, function(module, exports, __webpack_require__) {
    var def = __webpack_require__(5).f, has = __webpack_require__(4), TAG = __webpack_require__(8)("toStringTag");
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
    var isObject = __webpack_require__(13);
    module.exports = function(it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it))) return val;
        if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(1), core = __webpack_require__(2), LIBRARY = __webpack_require__(20), wksExt = __webpack_require__(28), defineProperty = __webpack_require__(5).f;
    module.exports = function(name) {
        var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
        if (name.charAt(0) != "_" && !(name in $Symbol)) defineProperty($Symbol, name, {
            value: wksExt.f(name)
        });
    };
}, function(module, exports, __webpack_require__) {
    exports.f = __webpack_require__(8);
}, function(module, exports) {
    "use strict";
    function find(array, predicate, context) {
        if (typeof Array.prototype.find === "function") {
            return array.find(predicate, context);
        }
        context = context || this;
        var length = array.length;
        var i;
        if (typeof predicate !== "function") {
            throw new TypeError(predicate + " is not a function");
        }
        for (i = 0; i < length; i++) {
            if (predicate.call(context, array[i], i, array)) {
                return array[i];
            }
        }
    }
    module.exports = find;
}, function(module, exports) {
    module.exports = function(xs, f) {
        if (xs.map) return xs.map(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
            var x = xs[i];
            if (hasOwn.call(xs, i)) res.push(f(x, i, xs));
        }
        return res;
    };
    var hasOwn = Object.prototype.hasOwnProperty;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexboxItem = exports.Flexbox = undefined;
    var _flexbox = __webpack_require__(118);
    var _flexbox2 = _interopRequireDefault(_flexbox);
    var _flexboxItem = __webpack_require__(117);
    var _flexboxItem2 = _interopRequireDefault(_flexboxItem);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.Flexbox = _flexbox2.default;
    exports.FlexboxItem = _flexboxItem2.default;
}, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    var _iterator = __webpack_require__(64);
    var _iterator2 = _interopRequireDefault(_iterator);
    var _symbol = __webpack_require__(63);
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
}, function(module, exports) {
    var toString = {}.toString;
    module.exports = function(it) {
        return toString.call(it).slice(8, -1);
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(13), document = __webpack_require__(1).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(3) && !__webpack_require__(9)(function() {
        return Object.defineProperty(__webpack_require__(34)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var LIBRARY = __webpack_require__(20), $export = __webpack_require__(12), redefine = __webpack_require__(41), hide = __webpack_require__(7), has = __webpack_require__(4), Iterators = __webpack_require__(19), $iterCreate = __webpack_require__(80), setToStringTag = __webpack_require__(22), getPrototypeOf = __webpack_require__(87), ITERATOR = __webpack_require__(8)("iterator"), BUGGY = !([].keys && "next" in [].keys()), FF_ITERATOR = "@@iterator", KEYS = "keys", VALUES = "values";
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
    var anObject = __webpack_require__(11), dPs = __webpack_require__(84), enumBugKeys = __webpack_require__(18), IE_PROTO = __webpack_require__(23)("IE_PROTO"), Empty = function() {}, PROTOTYPE = "prototype";
    var createDict = function() {
        var iframe = __webpack_require__(34)("iframe"), i = enumBugKeys.length, gt = ">", iframeDocument;
        iframe.style.display = "none";
        __webpack_require__(77).appendChild(iframe);
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
    var $keys = __webpack_require__(40), hiddenKeys = __webpack_require__(18).concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return $keys(O, hiddenKeys);
    };
}, function(module, exports) {
    exports.f = Object.getOwnPropertySymbols;
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(4), toIObject = __webpack_require__(6), arrayIndexOf = __webpack_require__(74)(false), IE_PROTO = __webpack_require__(23)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(7);
}, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(17);
    module.exports = function(it) {
        return Object(defined(it));
    };
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
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _name2value = __webpack_require__(57);
    var _name2value2 = _interopRequireDefault(_name2value);
    var _popupPicker = __webpack_require__(121);
    var _popupPicker2 = _interopRequireDefault(_popupPicker);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        components: {
            PopupPicker: _popupPicker2.default
        },
        props: {
            title: {
                type: String,
                required: true
            },
            value: {
                type: Array,
                "default": function _default() {
                    return [];
                }
            },
            rawValue: Boolean,
            list: {
                type: Array,
                required: true
            },
            inlineDesc: String,
            placeholder: String,
            hideDistrict: Boolean
        },
        beforeCompile: function beforeCompile() {
            if (this.value.length && this.rawValue) {
                var parsedVal = (0, _name2value2.default)(this.value, this.list);
                if (/__/.test(parsedVal)) {
                    console.error("Vux: Wrong address value", this.value);
                    this.value = [];
                } else {
                    this.value = parsedVal.split(" ");
                }
            }
        },
        methods: {
            emitHide: function emitHide(val) {
                this.$emit("on-hide", val);
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _inlineDesc = __webpack_require__(119);
    var _inlineDesc2 = _interopRequireDefault(_inlineDesc);
    var _router = __webpack_require__(60);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        components: {
            InlineDesc: _inlineDesc2.default
        },
        props: {
            title: String,
            value: [ String, Number ],
            isLink: Boolean,
            inlineDesc: String,
            primary: {
                type: String,
                "default": "title"
            },
            link: {
                type: [ String, Object ]
            }
        },
        methods: {
            onClick: function onClick() {
                (0, _router.go)(this.link, this.$router);
            }
        }
    };
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
    var _stringify = __webpack_require__(16);
    var _stringify2 = _interopRequireDefault(_stringify);
    var _typeof2 = __webpack_require__(32);
    var _typeof3 = _interopRequireDefault(_typeof2);
    var _scroller = __webpack_require__(53);
    var _scroller2 = _interopRequireDefault(_scroller);
    var _flexbox = __webpack_require__(31);
    var _chain = __webpack_require__(52);
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
    var _stringify = __webpack_require__(16);
    var _stringify2 = _interopRequireDefault(_stringify);
    var _picker = __webpack_require__(120);
    var _picker2 = _interopRequireDefault(_picker);
    var _cell = __webpack_require__(116);
    var _cell2 = _interopRequireDefault(_cell);
    var _popup = __webpack_require__(122);
    var _popup2 = _interopRequireDefault(_popup);
    var _flexbox = __webpack_require__(31);
    var _array2String = __webpack_require__(56);
    var _array2String2 = _interopRequireDefault(_array2String);
    var _value2name = __webpack_require__(58);
    var _value2name2 = _interopRequireDefault(_value2name);
    var _mixin_uuid = __webpack_require__(59);
    var _mixin_uuid2 = _interopRequireDefault(_mixin_uuid);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var getObject = function getObject(obj) {
        return JSON.parse((0, _stringify2.default)(obj));
    };
    exports.default = {
        mixins: [ _mixin_uuid2.default ],
        components: {
            Picker: _picker2.default,
            Cell: _cell2.default,
            Popup: _popup2.default,
            Flexbox: _flexbox.Flexbox,
            FlexboxItem: _flexbox.FlexboxItem
        },
        filters: {
            array2string: _array2String2.default,
            value2name: _value2name2.default
        },
        props: {
            title: String,
            data: {
                type: Array,
                "default": function _default() {
                    return [];
                }
            },
            placeholder: String,
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
                "default": function _default() {
                    return [];
                }
            },
            showName: Boolean,
            inlineDesc: String,
            showCell: {
                type: Boolean,
                "default": true
            },
            show: Boolean
        },
        methods: {
            getNameValues: function getNameValues() {
                return (0, _value2name2.default)(this.value, this.data);
            },
            onClick: function onClick() {
                this.show = true;
            },
            onHide: function onHide(type) {
                this.show = false;
                if (type) {
                    this.closeType = true;
                    this.value = getObject(this.tempValue);
                }
                if (!type) {
                    this.closeType = false;
                    if (this.value.length > 0) {
                        this.tempValue = getObject(this.value);
                    }
                }
            },
            onPopupHide: function onPopupHide(val) {
                if (this.value.length > 0) {
                    this.tempValue = getObject(this.value);
                }
                this.$emit("on-hide", this.closeType);
            },
            onPickerChange: function onPickerChange(val) {
                if ((0, _stringify2.default)(this.value) !== (0, _stringify2.default)(val)) {
                    if (this.value.length) {
                        var nowData = (0, _stringify2.default)(this.data);
                        if (nowData !== this.currentData && this.currentData !== "[]") {
                            this.value = getObject(val);
                        }
                        this.currentData = nowData;
                    } else {}
                }
                this.$emit("on-shadow-change", getObject(val));
            }
        },
        watch: {
            value: function value(val) {
                if ((0, _stringify2.default)(val) !== (0, _stringify2.default)(this.tempValue)) {
                    this.tempValue = getObject(val);
                }
            }
        },
        data: function data() {
            return {
                tempValue: getObject(this.value),
                closeType: false,
                currentData: (0, _stringify2.default)(this.data)
            };
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _keys = __webpack_require__(62);
    var _keys2 = _interopRequireDefault(_keys);
    var _popup = __webpack_require__(55);
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
    var _stringify = __webpack_require__(16);
    var _stringify2 = _interopRequireDefault(_stringify);
    var _classCallCheck2 = __webpack_require__(65);
    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
    var _createClass2 = __webpack_require__(66);
    var _createClass3 = _interopRequireDefault(_createClass2);
    var _arrayFilter = __webpack_require__(43);
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
    var _animate = __webpack_require__(51);
    var _animate2 = _interopRequireDefault(_animate);
    var _util = __webpack_require__(54);
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
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = function(array) {
        return array.length === 1 ? array[0] : array.join(" ");
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = function(name, list) {
        var rs = (0, _arrayMap2.default)(name, function(one, index) {
            var parent = "";
            if (index === 2) {
                parent = (0, _arrayFind2.default)(list, function(item) {
                    return item.name === name[1];
                }) || {
                    value: "__"
                };
                return (0, _arrayFind2.default)(list, function(item) {
                    return item.name === one && item.parent === parent.value;
                });
            } else {
                return (0, _arrayFind2.default)(list, function(item) {
                    return item.name === one;
                });
            }
        });
        return (0, _arrayMap2.default)(rs, function(one) {
            return one ? one.value : "__";
        }).join(" ");
    };
    var _arrayMap = __webpack_require__(30);
    var _arrayMap2 = _interopRequireDefault(_arrayMap);
    var _arrayFind = __webpack_require__(29);
    var _arrayFind2 = _interopRequireDefault(_arrayFind);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = function(value, list) {
        var rs = (0, _arrayMap2.default)(value, function(one, index) {
            return (0, _arrayFind2.default)(list, function(item) {
                return item.value === one;
            });
        });
        return (0, _arrayMap2.default)(rs, function(one) {
            return one.name;
        }).join(" ").replace("--", "");
    };
    var _arrayMap = __webpack_require__(30);
    var _arrayMap2 = _interopRequireDefault(_arrayMap);
    var _arrayFind = __webpack_require__(29);
    var _arrayFind2 = _interopRequireDefault(_arrayFind);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        created: function created() {
            this.uuid = Math.random().toString(36).substring(3, 8);
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _typeof2 = __webpack_require__(32);
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
        "default": __webpack_require__(68),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(69),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(70),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(71),
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
    var _defineProperty = __webpack_require__(61);
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
    var core = __webpack_require__(2), $JSON = core.JSON || (core.JSON = {
        stringify: JSON.stringify
    });
    module.exports = function stringify(it) {
        return $JSON.stringify.apply($JSON, arguments);
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(93);
    var $Object = __webpack_require__(2).Object;
    module.exports = function defineProperty(it, key, desc) {
        return $Object.defineProperty(it, key, desc);
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(94);
    module.exports = __webpack_require__(2).Object.keys;
}, function(module, exports, __webpack_require__) {
    __webpack_require__(97);
    __webpack_require__(95);
    __webpack_require__(98);
    __webpack_require__(99);
    module.exports = __webpack_require__(2).Symbol;
}, function(module, exports, __webpack_require__) {
    __webpack_require__(96);
    __webpack_require__(100);
    module.exports = __webpack_require__(28).f("iterator");
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports) {
    module.exports = function() {};
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(6), toLength = __webpack_require__(91), toIndex = __webpack_require__(90);
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
    var aFunction = __webpack_require__(72);
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
    var getKeys = __webpack_require__(10), gOPS = __webpack_require__(39), pIE = __webpack_require__(21);
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
    var cof = __webpack_require__(33);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(33);
    module.exports = Array.isArray || function isArray(arg) {
        return cof(arg) == "Array";
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var create = __webpack_require__(37), descriptor = __webpack_require__(14), setToStringTag = __webpack_require__(22), IteratorPrototype = {};
    __webpack_require__(7)(IteratorPrototype, __webpack_require__(8)("iterator"), function() {
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
    var getKeys = __webpack_require__(10), toIObject = __webpack_require__(6);
    module.exports = function(object, el) {
        var O = toIObject(object), keys = getKeys(O), length = keys.length, index = 0, key;
        while (length > index) if (O[key = keys[index++]] === el) return key;
    };
}, function(module, exports, __webpack_require__) {
    var META = __webpack_require__(15)("meta"), isObject = __webpack_require__(13), has = __webpack_require__(4), setDesc = __webpack_require__(5).f, id = 0;
    var isExtensible = Object.isExtensible || function() {
        return true;
    };
    var FREEZE = !__webpack_require__(9)(function() {
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
    var dP = __webpack_require__(5), anObject = __webpack_require__(11), getKeys = __webpack_require__(10);
    module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var keys = getKeys(Properties), length = keys.length, i = 0, P;
        while (length > i) dP.f(O, P = keys[i++], Properties[P]);
        return O;
    };
}, function(module, exports, __webpack_require__) {
    var pIE = __webpack_require__(21), createDesc = __webpack_require__(14), toIObject = __webpack_require__(6), toPrimitive = __webpack_require__(26), has = __webpack_require__(4), IE8_DOM_DEFINE = __webpack_require__(35), gOPD = Object.getOwnPropertyDescriptor;
    exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P) {
        O = toIObject(O);
        P = toPrimitive(P, true);
        if (IE8_DOM_DEFINE) try {
            return gOPD(O, P);
        } catch (e) {}
        if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(6), gOPN = __webpack_require__(38).f, toString = {}.toString;
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
    var has = __webpack_require__(4), toObject = __webpack_require__(42), IE_PROTO = __webpack_require__(23)("IE_PROTO"), ObjectProto = Object.prototype;
    module.exports = Object.getPrototypeOf || function(O) {
        O = toObject(O);
        if (has(O, IE_PROTO)) return O[IE_PROTO];
        if (typeof O.constructor == "function" && O instanceof O.constructor) {
            return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectProto : null;
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(12), core = __webpack_require__(2), fails = __webpack_require__(9);
    module.exports = function(KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function() {
            fn(1);
        }), "Object", exp);
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
    "use strict";
    var addToUnscopables = __webpack_require__(73), step = __webpack_require__(81), Iterators = __webpack_require__(19), toIObject = __webpack_require__(6);
    module.exports = __webpack_require__(36)(Array, "Array", function(iterated, kind) {
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
    var $export = __webpack_require__(12);
    $export($export.S + $export.F * !__webpack_require__(3), "Object", {
        defineProperty: __webpack_require__(5).f
    });
}, function(module, exports, __webpack_require__) {
    var toObject = __webpack_require__(42), $keys = __webpack_require__(10);
    __webpack_require__(88)("keys", function() {
        return function keys(it) {
            return $keys(toObject(it));
        };
    });
}, function(module, exports) {}, function(module, exports, __webpack_require__) {
    "use strict";
    var $at = __webpack_require__(89)(true);
    __webpack_require__(36)(String, "String", function(iterated) {
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
    var global = __webpack_require__(1), has = __webpack_require__(4), DESCRIPTORS = __webpack_require__(3), $export = __webpack_require__(12), redefine = __webpack_require__(41), META = __webpack_require__(83).KEY, $fails = __webpack_require__(9), shared = __webpack_require__(24), setToStringTag = __webpack_require__(22), uid = __webpack_require__(15), wks = __webpack_require__(8), wksExt = __webpack_require__(28), wksDefine = __webpack_require__(27), keyOf = __webpack_require__(82), enumKeys = __webpack_require__(76), isArray = __webpack_require__(79), anObject = __webpack_require__(11), toIObject = __webpack_require__(6), toPrimitive = __webpack_require__(26), createDesc = __webpack_require__(14), _create = __webpack_require__(37), gOPNExt = __webpack_require__(86), $GOPD = __webpack_require__(85), $DP = __webpack_require__(5), $keys = __webpack_require__(10), gOPD = $GOPD.f, dP = $DP.f, gOPN = gOPNExt.f, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, PROTOTYPE = "prototype", HIDDEN = wks("_hidden"), TO_PRIMITIVE = wks("toPrimitive"), isEnum = {}.propertyIsEnumerable, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), OPSymbols = shared("op-symbols"), ObjectProto = Object[PROTOTYPE], USE_NATIVE = typeof $Symbol == "function", QObject = global.QObject;
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
        __webpack_require__(38).f = gOPNExt.f = $getOwnPropertyNames;
        __webpack_require__(21).f = $propertyIsEnumerable;
        __webpack_require__(39).f = $getOwnPropertySymbols;
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
    $Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
    setToStringTag($Symbol, "Symbol");
    setToStringTag(Math, "Math", true);
    setToStringTag(global.JSON, "JSON", true);
}, function(module, exports, __webpack_require__) {
    __webpack_require__(27)("asyncIterator");
}, function(module, exports, __webpack_require__) {
    __webpack_require__(27)("observable");
}, function(module, exports, __webpack_require__) {
    __webpack_require__(92);
    var global = __webpack_require__(1), hide = __webpack_require__(7), Iterators = __webpack_require__(19), TO_STRING_TAG = __webpack_require__(8)("toStringTag");
    for (var collections = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], i = 0; i < 5; i++) {
        var NAME = collections[i], Collection = global[NAME], proto = Collection && Collection.prototype;
        if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = Iterators.Array;
    }
}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {
    module.exports = '<popup-picker :fixed-columns="hideDistrict ? 2 : 0" :columns=3 :data=list :title=title :value.sync=value show-name :inline-desc=inlineDesc :placeholder=placeholder @on-hide=emitHide @on-show="$emit(\'on-show\')"></popup-picker>';
}, function(module, exports) {
    module.exports = "<div class=weui_cell :class=\"{'vux-tap-active': isLink || !!link}\" @click=onClick> <div class=weui_cell_hd> <slot name=icon></slot> </div> <div class=weui_cell_bd :class=\"{'weui_cell_primary':primary==='title'}\"> <p> {{title}} <slot name=after-title></slot> </p> <inline-desc>{{inlineDesc}}</inline-desc> </div> <div class=weui_cell_ft :class=\"{'weui_cell_primary':primary==='content', 'with_arrow': isLink || !!link}\"> {{value}} <slot name=value></slot> <slot></slot> </div> <slot name=child></slot> </div>";
}, function(module, exports) {
    module.exports = "<div class=vux-flexbox-item :style=style> <slot></slot> </div>";
}, function(module, exports) {
    module.exports = "<div class=vux-flexbox :class=\"{'vux-flex-col': orient === 'vertical', 'vux-flex-row': orient === 'horizontal'}\" :style=styles> <slot></slot> </div>";
}, function(module, exports) {
    module.exports = "<span class=vux-label-desc><slot></slot></span>";
}, function(module, exports) {
    module.exports = "<div class=vux-picker> <flexbox :gutter=0> <flexbox-item v-for=\"(index, one) in data\" style=margin-left:0> <div class=vux-picker-item :id=\"'vux-picker-' + uuid + '-' + index\"></div> </flexbox-item> </flexbox> </div>";
}, function(module, exports) {
    module.exports = '<cell v-show=showCell :title=title primary=content is-link :inline-desc=inlineDesc @click=onClick> <span class=vux-popup-picker-value v-if="!showName && value.length">{{value | array2string}}</span> <span class=vux-popup-picker-value v-else="showName && value.length">{{value | value2name data}}</span> <span v-if="!value.length && placeholder" v-html=placeholder></span> </cell> <popup :show.sync=show class=vux-popup-picker :id="\'vux-popup-picker-\'+uuid" @on-hide=onPopupHide @on-show="$emit(\'on-show\')"> <div class=vux-popup-picker-container> <div class=vux-popup-picker-header> <flexbox> <flexbox-item style=text-align:left;padding-left:15px;line-height:44px @click=onHide(false)>取消</flexbox-item> <flexbox-item style=text-align:right;padding-right:15px;line-height:44px @click=onHide(true)>完成</flexbox-item> </flexbox> </div> <picker :data=data :value.sync=tempValue @on-change=onPickerChange :columns=columns :fixed-columns=fixedColumns :container="\'#vux-popup-picker-\'+uuid"></picker> </div> </popup>';
}, function(module, exports) {
    module.exports = "<div v-show=show transition=vux-popup :style={height:height} class=vux-popup> <slot></slot> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(44);
    __vue_template__ = __webpack_require__(107);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(101);
    __vue_script__ = __webpack_require__(45);
    __vue_template__ = __webpack_require__(108);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(46);
    __vue_template__ = __webpack_require__(109);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(102);
    __vue_script__ = __webpack_require__(47);
    __vue_template__ = __webpack_require__(110);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(103);
    __vue_template__ = __webpack_require__(111);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(104);
    __vue_script__ = __webpack_require__(48);
    __vue_template__ = __webpack_require__(112);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(105);
    __vue_script__ = __webpack_require__(49);
    __vue_template__ = __webpack_require__(113);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(106);
    __vue_script__ = __webpack_require__(50);
    __vue_template__ = __webpack_require__(114);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);