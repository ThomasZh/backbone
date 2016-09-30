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
    module.exports = __webpack_require__(54);
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = assertString;
    function assertString(input) {
        if (typeof input !== "string") {
            throw new TypeError("This library (validator.js) validates strings only");
        }
    }
    module.exports = exports["default"];
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(4)(function() {
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
    var IObject = __webpack_require__(28), defined = __webpack_require__(7);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = merge;
    function merge() {
        var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var defaults = arguments[1];
        for (var key in defaults) {
            if (typeof obj[key] === "undefined") {
                obj[key] = defaults[key];
            }
        }
        return obj;
    }
    module.exports = exports["default"];
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            type: String
        },
        computed: {
            className: function className() {
                return "weui_icon weui_icon_" + this.type;
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _keys = __webpack_require__(15);
    var _keys2 = _interopRequireDefault(_keys);
    var _base = __webpack_require__(13);
    var _base2 = _interopRequireDefault(_base);
    var _icon = __webpack_require__(52);
    var _icon2 = _interopRequireDefault(_icon);
    var _inlineDesc = __webpack_require__(53);
    var _inlineDesc2 = _interopRequireDefault(_inlineDesc);
    var _isEmail = __webpack_require__(46);
    var _isEmail2 = _interopRequireDefault(_isEmail);
    var _isMobilePhone = __webpack_require__(48);
    var _isMobilePhone2 = _interopRequireDefault(_isMobilePhone);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var validators = {
        email: {
            fn: _isEmail2.default,
            msg: "邮箱格式"
        },
        "china-mobile": {
            fn: function fn(str) {
                return (0, _isMobilePhone2.default)(str, "zh-CN");
            },
            msg: "手机号码"
        },
        "china-name": {
            fn: function fn(str) {
                return str.length >= 2 && str.length <= 6;
            },
            msg: "中文姓名"
        }
    };
    exports.default = {
        ready: function ready() {
            if (!this.title && !this.placeholder && !this.value) {
                console.warn("no title and no placeholder?");
            }
            if (this.equalWith) {
                this.showClear = false;
            }
            if (this.required && !this.value) {
                this.valid = false;
            }
            if (this.isType === "email") {
                this.type = "email";
            }
        },
        mixins: [ _base2.default ],
        components: {
            Icon: _icon2.default,
            InlineDesc: _inlineDesc2.default
        },
        props: {
            title: {
                type: String,
                "default": ""
            },
            placeholder: String,
            value: {
                type: String,
                "default": "",
                twoWay: true
            },
            name: String,
            readonly: {
                type: Boolean,
                "default": false
            },
            keyboard: String,
            inlineDesc: String,
            isType: String,
            min: Number,
            max: Number,
            showClear: {
                type: Boolean,
                "default": true
            },
            equalWith: String,
            type: {
                type: String,
                "default": "text"
            },
            textAlign: String,
            autocomplete: "off",
            autocapitalize: "off",
            autocorrect: "off",
            spellcheck: "false"
        },
        computed: {
            pattern: function pattern() {
                if (this.keyboard === "number" || this.isType === "china-mobile") {
                    return "[0-9]*";
                }
            },
            labelWidth: function labelWidth() {
                return this.title.replace(/[^x00-xff]/g, "00").length / 2 + 1;
            },
            hasErrors: function hasErrors() {
                return (0, _keys2.default)(this.errors).length > 0;
            },
            inputStyle: function inputStyle() {
                if (this.textAlign) {
                    return {
                        textAlign: this.textAlign
                    };
                }
            }
        },
        methods: {
            clear: function clear() {
                this.value = "";
                this.focus = true;
            },
            blur: function blur() {
                this.setTouched();
                this.validate();
            },
            getError: function getError() {
                var key = (0, _keys2.default)(this.errors)[0];
                this.firstError = this.errors[key];
            },
            validate: function validate() {
                if (this.equalWith) {
                    this.validateEqual();
                    return;
                }
                this.errors = {};
                if (!this.value && !this.required) {
                    this.valid = true;
                    return;
                }
                if (!this.value && this.required) {
                    this.valid = false;
                    this.errors.required = "必填哦";
                    return;
                }
                var validator = validators[this.isType];
                if (validator) {
                    this.valid = validator["fn"](this.value);
                    if (!this.valid) {
                        this.errors.format = validator["msg"] + "格式不对哦~";
                        return;
                    } else {
                        delete this.errors.format;
                    }
                }
                if (this.min) {
                    if (this.value.length < this.min) {
                        this.errors.min = this.$interpolate("最少应该输入{{min}}个字符哦");
                        this.valid = false;
                        return;
                    } else {
                        delete this.errors.min;
                    }
                }
                if (this.max) {
                    if (this.value.length > this.max) {
                        this.errors.max = this.$interpolate("最多可以输入{{max}}个字符哦");
                        this.valid = false;
                        this.forceShowError = true;
                        return;
                    } else {
                        this.forceShowError = false;
                        delete this.errors.max;
                    }
                }
                this.valid = true;
            },
            validateEqual: function validateEqual() {
                var willCheck = this.dirty || this.value.length >= this.equalWith.length;
                if (willCheck && this.value !== this.equalWith) {
                    this.valid = false;
                    this.errors.equal = "输入不一致";
                    return;
                } else {
                    this.valid = true;
                    delete this.errors.equal;
                }
            }
        },
        data: function data() {
            var data = {
                firstError: "",
                forceShowError: false,
                hasLengthEqual: false,
                focus: false
            };
            return data;
        },
        watch: {
            focus: function focus(newVal) {
                if (newVal) {
                    this.$els.input.focus();
                }
            },
            valid: function valid() {
                this.getError();
            },
            value: function value(newVal) {
                if (this.equalWith) {
                    if (newVal.length === this.equalWith.length) {
                        this.hasLengthEqual = true;
                    }
                    this.validateEqual();
                } else {
                    this.validate();
                }
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _mixin_uuid = __webpack_require__(14);
    var _mixin_uuid2 = _interopRequireDefault(_mixin_uuid);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        mixins: [ _mixin_uuid2.default ],
        props: {
            required: {
                type: Boolean,
                "default": true
            }
        },
        created: function created() {
            this.handleChangeEvent = false;
        },
        computed: {
            dirty: function dirty() {
                return !this.prisine;
            },
            invalid: function invalid() {
                return !this.valid;
            }
        },
        methods: {
            setTouched: function setTouched() {
                this.touched = true;
            }
        },
        watch: {
            value: function value(newVal) {
                if (this.prisine === true) {
                    this.prisine = false;
                }
                if (!this.handleChangeEvent) {
                    this.$emit("on-change", newVal);
                }
            }
        },
        data: function data() {
            return {
                errors: {},
                prisine: true,
                touched: false,
                valid: true
            };
        }
    };
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
    module.exports = {
        "default": __webpack_require__(16),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(41);
    module.exports = __webpack_require__(2).Object.keys;
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(6);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(9), toLength = __webpack_require__(37), toIndex = __webpack_require__(36);
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
    var aFunction = __webpack_require__(17);
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
    var isObject = __webpack_require__(6), document = __webpack_require__(5).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(5), core = __webpack_require__(2), ctx = __webpack_require__(21), hide = __webpack_require__(26), PROTOTYPE = "prototype";
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
    var dP = __webpack_require__(29), createDesc = __webpack_require__(33);
    module.exports = __webpack_require__(3) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(3) && !__webpack_require__(4)(function() {
        return Object.defineProperty(__webpack_require__(22)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(20);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(18), IE8_DOM_DEFINE = __webpack_require__(27), toPrimitive = __webpack_require__(39), dP = Object.defineProperty;
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
    var has = __webpack_require__(25), toIObject = __webpack_require__(9), arrayIndexOf = __webpack_require__(19)(false), IE_PROTO = __webpack_require__(34)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(30), enumBugKeys = __webpack_require__(23);
    module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(24), core = __webpack_require__(2), fails = __webpack_require__(4);
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
    var shared = __webpack_require__(35)("keys"), uid = __webpack_require__(40);
    module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key));
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(5), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
    module.exports = function(key) {
        return store[key] || (store[key] = {});
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(8), max = Math.max, min = Math.min;
    module.exports = function(index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(8), min = Math.min;
    module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
    };
}, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(7);
    module.exports = function(it) {
        return Object(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(6);
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
    var toObject = __webpack_require__(38), $keys = __webpack_require__(31);
    __webpack_require__(32)("keys", function() {
        return function keys(it) {
            return $keys(toObject(it));
        };
    });
}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };
    exports.default = isByteLength;
    var _assertString = __webpack_require__(1);
    var _assertString2 = _interopRequireDefault(_assertString);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function isByteLength(str, options) {
        (0, _assertString2.default)(str);
        var min = void 0;
        var max = void 0;
        if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
            min = options.min || 0;
            max = options.max;
        } else {
            min = arguments[1];
            max = arguments[2];
        }
        var len = encodeURI(str).split(/%..|./).length - 1;
        return len >= min && (typeof max === "undefined" || len <= max);
    }
    module.exports = exports["default"];
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = isEmail;
    var _assertString = __webpack_require__(1);
    var _assertString2 = _interopRequireDefault(_assertString);
    var _merge = __webpack_require__(10);
    var _merge2 = _interopRequireDefault(_merge);
    var _isByteLength = __webpack_require__(45);
    var _isByteLength2 = _interopRequireDefault(_isByteLength);
    var _isFQDN = __webpack_require__(47);
    var _isFQDN2 = _interopRequireDefault(_isFQDN);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var default_email_options = {
        allow_display_name: false,
        allow_utf8_local_part: true,
        require_tld: true
    };
    var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
    var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
    var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
    var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
    var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
    function isEmail(str, options) {
        (0, _assertString2.default)(str);
        options = (0, _merge2.default)(options, default_email_options);
        if (options.allow_display_name) {
            var display_email = str.match(displayName);
            if (display_email) {
                str = display_email[1];
            }
        }
        var parts = str.split("@");
        var domain = parts.pop();
        var user = parts.join("@");
        var lower_domain = domain.toLowerCase();
        if (lower_domain === "gmail.com" || lower_domain === "googlemail.com") {
            user = user.replace(/\./g, "").toLowerCase();
        }
        if (!(0, _isByteLength2.default)(user, {
            max: 64
        }) || !(0, _isByteLength2.default)(domain, {
            max: 256
        })) {
            return false;
        }
        if (!(0, _isFQDN2.default)(domain, {
            require_tld: options.require_tld
        })) {
            return false;
        }
        if (user[0] === '"') {
            user = user.slice(1, user.length - 1);
            return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
        }
        var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
        var user_parts = user.split(".");
        for (var i = 0; i < user_parts.length; i++) {
            if (!pattern.test(user_parts[i])) {
                return false;
            }
        }
        return true;
    }
    module.exports = exports["default"];
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = isFDQN;
    var _assertString = __webpack_require__(1);
    var _assertString2 = _interopRequireDefault(_assertString);
    var _merge = __webpack_require__(10);
    var _merge2 = _interopRequireDefault(_merge);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var default_fqdn_options = {
        require_tld: true,
        allow_underscores: false,
        allow_trailing_dot: false
    };
    function isFDQN(str, options) {
        (0, _assertString2.default)(str);
        options = (0, _merge2.default)(options, default_fqdn_options);
        if (options.allow_trailing_dot && str[str.length - 1] === ".") {
            str = str.substring(0, str.length - 1);
        }
        var parts = str.split(".");
        if (options.require_tld) {
            var tld = parts.pop();
            if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
                return false;
            }
        }
        for (var part, i = 0; i < parts.length; i++) {
            part = parts[i];
            if (options.allow_underscores) {
                part = part.replace(/_/g, "");
            }
            if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                return false;
            }
            if (/[\uff01-\uff5e]/.test(part)) {
                return false;
            }
            if (part[0] === "-" || part[part.length - 1] === "-") {
                return false;
            }
        }
        return true;
    }
    module.exports = exports["default"];
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = isMobilePhone;
    var _assertString = __webpack_require__(1);
    var _assertString2 = _interopRequireDefault(_assertString);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var phones = {
        "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
        "en-US": /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
        "cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
        "de-DE": /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
        "el-GR": /^(\+?30)?(69\d{8})$/,
        "en-AU": /^(\+?61|0)4\d{8}$/,
        "en-GB": /^(\+?44|0)7\d{9}$/,
        "en-HK": /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
        "en-IN": /^(\+?91|0)?[789]\d{9}$/,
        "en-NZ": /^(\+?64|0)2\d{7,9}$/,
        "en-ZA": /^(\+?27|0)\d{9}$/,
        "en-ZM": /^(\+?26)?09[567]\d{7}$/,
        "es-ES": /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
        "fi-FI": /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
        "fr-FR": /^(\+?33|0)[67]\d{8}$/,
        "ms-MY": /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
        "nb-NO": /^(\+?47)?[49]\d{7}$/,
        "nn-NO": /^(\+?47)?[49]\d{7}$/,
        "pt-BR": /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
        "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
        "ru-RU": /^(\+?7|8)?9\d{9}$/,
        "tr-TR": /^(\+?90|0)?5\d{9}$/,
        "vi-VN": /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
        "zh-CN": /^(\+?0?86\-?)?((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
        "zh-TW": /^(\+?886\-?|0)?9\d{8}$/
    };
    function isMobilePhone(str, locale) {
        (0, _assertString2.default)(str);
        if (locale in phones) {
            return phones[locale].test(str);
        }
        return false;
    }
    module.exports = exports["default"];
}, function(module, exports) {
    module.exports = "<i class={{className}}></i>";
}, function(module, exports) {
    module.exports = "<span class=vux-label-desc><slot></slot></span>";
}, function(module, exports) {
    module.exports = '<div class=weui_cell :class="{\'weui_cell_warn\': !valid}"> <div class=weui_cell_hd> <label class=weui_label :style="{width: $parent.labelWidth || (labelWidth + \'em\'), textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if=title>{{title}}</label> <inline-desc v-if=inlineDesc>{{inlineDesc}}</inline-desc> </div> <div class="weui_cell_bd weui_cell_primary"> <input class=weui_input :autocomplete=autocomplete :autocapitalize=autocapitalize :autocorrect=autocorrect :spellcheck=spellcheck :style=inputStyle :type=type :name=name :pattern=pattern :placeholder=placeholder :readonly=readonly v-model=value @blur=blur v-el:input/> </div> <div class=weui_cell_ft> <icon type=clear v-show="showClear && value && !readonly" @click=clear></icon> <icon type=warn title="{{!valid ? firstError : \'\'}}" v-show="!equalWith && ((touched && !valid && firstError) || (forceShowError && !valid && firstError))"></icon> <icon type=warn v-show="hasLengthEqual && dirty && equalWith && !valid"></icon> <icon type=success v-show="equalWith && equalWith===value && valid"></icon> <slot name=right><slot> </slot></slot></div> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(42);
    __vue_script__ = __webpack_require__(11);
    __vue_template__ = __webpack_require__(49);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(44);
    __vue_template__ = __webpack_require__(50);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(43);
    __vue_script__ = __webpack_require__(12);
    __vue_template__ = __webpack_require__(51);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);