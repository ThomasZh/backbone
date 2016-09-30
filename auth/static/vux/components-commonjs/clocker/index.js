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
    var IObject = __webpack_require__(25), defined = __webpack_require__(6);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Clocker = __webpack_require__(10);
    exports.default = {
        ready: function ready() {
            this.slot = this.$el.querySelector(".vux-clocker-tpl");
            this.slotString = this.slot.innerHTML;
            if (this.slotString !== "") {
                this.showTimeString = false;
            }
            this.render();
        },
        methods: {
            render: function render() {
                var _this = this;
                if (!this.time) return;
                this.clocker = new Clocker(this.time).on("tick", function(event) {
                    _this.update(event);
                    _this.$emit("on-tick", event);
                }).on("finish", function() {
                    _this.timeString = "00:00:00";
                    _this.$emit("on-finish");
                }).start();
            },
            update: function update(event) {
                if (this.showTimeString) {
                    this.timeString = event.strftime(this.format);
                } else {
                    var string = event.strftime(this.slotString);
                    if (string !== this.cacheSlotString) {
                        this.slot.innerHTML = this.cacheSlotString = string;
                    }
                }
            }
        },
        props: {
            time: String,
            format: {
                type: String,
                "default": "%D 天 %H 小时 %M 分 %S 秒"
            }
        },
        watch: {
            time: function time() {
                this.clocker.remove();
                this.render();
            }
        },
        data: function data() {
            return {
                showTimeString: true,
                timeString: "",
                slotString: "",
                cacheSlotString: ""
            };
        },
        beforeDestroy: function beforeDestroy() {
            this.clocker.remove();
            this.clocker = null;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var instances = [];
    var matchers = [];
    matchers.push(/^[0-9]*$/.source);
    matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
    matchers = new RegExp(matchers.join("|"));
    function parseDateString(dateString) {
        if (dateString instanceof Date) {
            return dateString;
        }
        if (String(dateString).match(matchers)) {
            if (String(dateString).match(/^[0-9]*$/)) {
                dateString = Number(dateString);
            }
            if (String(dateString).match(/\-/)) {
                dateString = String(dateString).replace(/\-/g, "/");
            }
            return new Date(dateString);
        } else {
            throw new Error("Couldn't cast `" + dateString + "` to a date object.");
        }
    }
    var DIRECTIVE_KEY_MAP = {
        Y: "years",
        m: "months",
        w: "weeks",
        D: "days",
        H: "hours",
        M: "minutes",
        S: "seconds"
    };
    function escapedRegExp(str) {
        var sanitize = str.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(sanitize);
    }
    function strftime(offsetObject) {
        return function(format) {
            var directives = format.match(/%(-|!)?[A-Z]{1}(:[^]+)?/gi);
            if (directives) {
                for (var i = 0, len = directives.length; i < len; ++i) {
                    var directive = directives[i].match(/%(-|!)?([a-zA-Z]{1})(:[^]+)?/);
                    var regexp = escapedRegExp(directive[0]);
                    var modifier = directive[1] || "";
                    var plural = directive[3] || "";
                    var value = null;
                    directive = directive[2];
                    if (DIRECTIVE_KEY_MAP.hasOwnProperty(directive)) {
                        value = DIRECTIVE_KEY_MAP[directive];
                        value = Number(offsetObject[value]);
                    }
                    if (value !== null) {
                        if (modifier === "!") {
                            value = pluralize(plural, value);
                        }
                        if (modifier === "") {
                            if (value < 10) {
                                value = "0" + value.toString();
                            }
                        }
                        format = format.replace(regexp, value.toString());
                    }
                }
            }
            format = format.replace("%_M1", offsetObject.minutes_1).replace("%_M2", offsetObject.minutes_2).replace("%_S1", offsetObject.seconds_1).replace("%_S2", offsetObject.seconds_2).replace("%_H1", offsetObject.hours_1).replace("%_H2", offsetObject.hours_2).replace("%_D1", offsetObject.days_1).replace("%_D2", offsetObject.days_2);
            format = format.replace(/%%/, "%");
            return format;
        };
    }
    function pluralize(format, count) {
        var plural = "s";
        var singular = "";
        if (format) {
            format = format.replace(/(:||\s)/gi, "").split(/,/);
            if (format.length === 1) {
                plural = format[0];
            } else {
                singular = format[0];
                plural = format[1];
            }
        }
        if (Math.abs(count) === 1) {
            return singular;
        } else {
            return plural;
        }
    }
    function splitNumber(number) {
        number = number + "";
        number = (number.length === 1 ? "0" + number : number) + "";
        return number.split("");
    }
    var Countdown = function Countdown(finalDate, option) {
        option = option || {};
        this.PRECISION = option.precision || 100;
        this.interval = null;
        this.offset = {};
        this.instanceNumber = instances.length;
        instances.push(this);
        this.setFinalDate(finalDate);
    };
    var Eventor = __webpack_require__(11);
    Eventor.mixTo(Countdown);
    var pro = Countdown.prototype;
    var fns = {
        start: function start() {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            var self = this;
            this.update();
            this.interval = setInterval(function() {
                self.update();
            }, this.PRECISION);
            return this;
        },
        stop: function stop() {
            clearInterval(this.interval);
            this.interval = null;
            this._dispatchEvent("stoped");
            return this;
        },
        toggle: function toggle() {
            if (this.interval) {
                this.stop();
            } else {
                this.start();
            }
            return this;
        },
        pause: function pause() {
            return this.stop();
        },
        resume: function resume() {
            return this.start();
        },
        remove: function remove() {
            this.stop();
            instances[this.instanceNumber] = null;
        },
        setFinalDate: function setFinalDate(value) {
            this.finalDate = parseDateString(value);
            return this;
        },
        getOffset: function getOffset() {
            this.totalSecsLeft = this.finalDate.getTime() - new Date().getTime();
            this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3);
            this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft;
            return {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
                years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)
            };
        },
        update: function update() {
            this.offset = this.getOffset();
            var list = [ "days", "hours", "minutes", "seconds" ];
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var numbers = splitNumber(this.offset[key]);
                this.offset[key + "_1"] = numbers[0];
                this.offset[key + "_2"] = numbers[1];
            }
            if (this.totalSecsLeft === 0) {
                this.stop();
                this._dispatchEvent("finish");
            } else {
                this._dispatchEvent("update");
            }
            return this;
        },
        _dispatchEvent: function _dispatchEvent(eventName) {
            var event = {};
            event.finalDate = this.finalDate;
            event.offset = this.offset;
            event.strftime = strftime(this.offset);
            this.emit(eventName, event);
            this.emit("tick", event);
        }
    };
    for (var i in fns) {
        pro[i] = fns[i];
    }
    module.exports = Countdown;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _keys = __webpack_require__(12);
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
        "default": __webpack_require__(13),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(38);
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
    var toIObject = __webpack_require__(8), toLength = __webpack_require__(34), toIndex = __webpack_require__(33);
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
    var aFunction = __webpack_require__(14);
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
    var global = __webpack_require__(4), core = __webpack_require__(1), ctx = __webpack_require__(18), hide = __webpack_require__(23), PROTOTYPE = "prototype";
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
    var dP = __webpack_require__(26), createDesc = __webpack_require__(30);
    module.exports = __webpack_require__(2) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function() {
        return Object.defineProperty(__webpack_require__(19)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(17);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(15), IE8_DOM_DEFINE = __webpack_require__(24), toPrimitive = __webpack_require__(36), dP = Object.defineProperty;
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
    var has = __webpack_require__(22), toIObject = __webpack_require__(8), arrayIndexOf = __webpack_require__(16)(false), IE_PROTO = __webpack_require__(31)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(27), enumBugKeys = __webpack_require__(20);
    module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(21), core = __webpack_require__(1), fails = __webpack_require__(3);
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
    var shared = __webpack_require__(32)("keys"), uid = __webpack_require__(37);
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
    var toObject = __webpack_require__(35), $keys = __webpack_require__(28);
    __webpack_require__(29)("keys", function() {
        return function keys(it) {
            return $keys(toObject(it));
        };
    });
}, function(module, exports) {
    module.exports = "<div> <span v-if=showTimeString>{{timeString}}</span> <div class=vux-clocker-tpl><slot></slot></div> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(9);
    __vue_template__ = __webpack_require__(39);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);