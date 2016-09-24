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
    module.exports = __webpack_require__(56);
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(10)(function() {
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
    "use strict";
    var bind = window.addEventListener ? "addEventListener" : "attachEvent";
    var unbind = window.removeEventListener ? "removeEventListener" : "detachEvent";
    var prefix = bind !== "addEventListener" ? "on" : "";
    exports.bind = function(el, type, fn, capture) {
        el[bind](prefix + type, fn, capture || false);
        return fn;
    };
    exports.unbind = function(el, type, fn, capture) {
        el[unbind](prefix + type, fn, capture || false);
        return fn;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(5);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, function(module, exports) {
    module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
    };
}, function(module, exports) {
    "use strict";
    exports.isNumber = function(num) {
        return typeof num === "number";
    };
    exports.of = function(perc, num) {
        if (exports.isNumber(perc) && exports.isNumber(num)) return perc / 100 * num;
    };
    exports.from = function(part, target) {
        if (exports.isNumber(part) && exports.isNumber(target)) return part / target * 100;
    };
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(5), document = __webpack_require__(2).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(module, exports) {
    module.exports = function(exec) {
        try {
            return !!exec();
        } catch (e) {
            return true;
        }
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(4), IE8_DOM_DEFINE = __webpack_require__(41), toPrimitive = __webpack_require__(51), dP = Object.defineProperty;
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
    var shared = __webpack_require__(48)("keys"), uid = __webpack_require__(52);
    module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key));
    };
}, function(module, exports) {
    var ceil = Math.ceil, floor = Math.floor;
    module.exports = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
}, function(module, exports, __webpack_require__) {
    var IObject = __webpack_require__(42), defined = __webpack_require__(36);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var Powerange = __webpack_require__(29);
    exports.default = {
        props: {
            decimal: Boolean,
            value: {
                "default": 0,
                type: Number
            },
            min: {
                type: Number,
                "default": 0
            },
            minHTML: String,
            maxHTML: String,
            max: {
                type: Number,
                "default": 100
            },
            step: {
                type: Number,
                "default": 0
            },
            disabled: Boolean,
            disabledOpacity: Number,
            rangeBarHeight: {
                type: Number,
                "default": 1
            },
            rangeHandleHeight: {
                type: Number,
                "default": 30
            }
        },
        ready: function ready() {
            var options = {
                decimal: this.decimal,
                start: this.value,
                min: this.min,
                max: this.max,
                minHTML: this.minHTML,
                maxHTML: this.maxHTML,
                disable: this.disabled,
                disabledOpacity: this.disabledOpacity,
                initialBarWidth: getComputedStyle(this.$el.parentNode).width.replace("px", "") - 80
            };
            if (this.step !== 0) {
                options.step = this.step;
            }
            this.range = new Powerange(this.$el.querySelector(".vux-range-input"), options);
            var handleTop = (this.rangeHandleHeight - this.rangeBarHeight) / 2;
            this.$el.querySelector(".range-handle").style.top = "-" + handleTop + "px";
            this.$el.querySelector(".range-bar").style.height = this.rangeBarHeight + "px";
        },
        watch: {
            value: function value(val) {
                this.range.setStart(val);
            },
            "min + max": function minMax() {
                var value = this.value;
                if (value < this.min) {
                    value = this.min;
                }
                if (value > this.max) {
                    value = this.max;
                }
                this.range.reInit({
                    min: this.min,
                    max: this.max,
                    value: value
                });
                this.value = value;
                this.range.setStart(this.value);
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var inherits = __webpack_require__(27);
    var closest = __webpack_require__(18);
    var percentage = __webpack_require__(6);
    var Powerange = __webpack_require__(28);
    module.exports = Horizontal;
    function getWidth(el) {
        var width = getComputedStyle(el, null)["width"];
        if (width === "100%" || width === "auto") {
            return 0;
        }
        return parseInt(width, 10);
    }
    function Horizontal() {
        Powerange.apply(this, arguments);
        if (this.options.step) {
            this.step(getWidth(this.slider) || this.options.initialBarWidth, getWidth(this.handle));
        }
        this.setStart(this.options.start);
    }
    inherits(Horizontal, Powerange);
    Horizontal.prototype.setStart = function(start) {
        var begin = start === null ? this.options.min : start;
        var part = percentage.from(begin - this.options.min, this.options.max - this.options.min) || 0;
        var offset = percentage.of(part, this.slider.offsetWidth - this.handle.offsetWidth);
        var position = this.options.step ? closest.find(offset, this.steps) : offset;
        this.setPosition(position);
        this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth);
    };
    Horizontal.prototype.setPosition = function(val) {
        this.handle.style.left = val + "px";
        this.slider.querySelector(".range-quantity").style.width = val + "px";
    };
    Horizontal.prototype.onmousedown = function(e) {
        if (e.touches) e = e.touches[0];
        this.startX = e.clientX;
        this.handleOffsetX = this.handle.offsetLeft;
        this.restrictHandleX = this.slider.offsetWidth - this.handle.offsetWidth;
        this.unselectable(this.slider, true);
    };
    Horizontal.prototype.onmousemove = function(e) {
        e.preventDefault();
        if (e.touches) e = e.touches[0];
        var leftOffset = this.handleOffsetX + e.clientX - this.startX;
        var position = this.steps ? closest.find(leftOffset, this.steps) : leftOffset;
        if (leftOffset <= 0) {
            this.setPosition(0);
        } else if (leftOffset >= this.restrictHandleX) {
            this.setPosition(this.restrictHandleX);
        } else {
            this.setPosition(position);
        }
        this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth);
    };
    Horizontal.prototype.onmouseup = function(e) {
        this.unselectable(this.slider, false);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var index = __webpack_require__(23);
    var re = /\s+/;
    var toString = Object.prototype.toString;
    module.exports = function(el) {
        return new ClassList(el);
    };
    function ClassList(el) {
        if (!el || !el.nodeType) {
            throw new Error("A DOM element reference is required");
        }
        this.el = el;
        this.list = el.classList;
    }
    ClassList.prototype.add = function(name) {
        if (this.list) {
            this.list.add(name);
            return this;
        }
        var arr = this.array();
        var i = index(arr, name);
        if (!~i) arr.push(name);
        this.el.className = arr.join(" ");
        return this;
    };
    ClassList.prototype.remove = function(name) {
        if (toString.call(name) === "[object RegExp]") {
            return this.removeMatching(name);
        }
        if (this.list) {
            this.list.remove(name);
            return this;
        }
        var arr = this.array();
        var i = index(arr, name);
        if (~i) arr.splice(i, 1);
        this.el.className = arr.join(" ");
        return this;
    };
    ClassList.prototype.removeMatching = function(re) {
        var arr = this.array();
        for (var i = 0; i < arr.length; i++) {
            if (re.test(arr[i])) {
                this.remove(arr[i]);
            }
        }
        return this;
    };
    ClassList.prototype.toggle = function(name, force) {
        if (this.list) {
            if (typeof force !== "undefined") {
                if (force !== this.list.toggle(name, force)) {
                    this.list.toggle(name);
                }
            } else {
                this.list.toggle(name);
            }
            return this;
        }
        if (typeof force !== "undefined") {
            if (!force) {
                this.remove(name);
            } else {
                this.add(name);
            }
        } else {
            if (this.has(name)) {
                this.remove(name);
            } else {
                this.add(name);
            }
        }
        return this;
    };
    ClassList.prototype.array = function() {
        var className = this.el.getAttribute("class") || "";
        var str = className.replace(/^\s+|\s+$/g, "");
        var arr = str.split(re);
        if (arr[0] === "") arr.shift();
        return arr;
    };
    ClassList.prototype.has = ClassList.prototype.contains = function(name) {
        return this.list ? this.list.contains(name) : !!~index(this.array(), name);
    };
}, function(module, exports) {
    "use strict";
    exports.find = function(target, points) {
        var diff = null;
        var current = null;
        var closest = points[0];
        for (var i = 0; i < points.length; i++) {
            diff = Math.abs(target - closest);
            current = Math.abs(target - points[i]);
            if (current < diff) {
                closest = points[i];
            }
        }
        return closest;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var matches = __webpack_require__(24);
    module.exports = closest;
    function closest(el, selector, scope) {
        scope = scope || document.documentElement;
        while (el && el !== scope) {
            if (matches(el, selector)) return el;
            el = el.parentNode;
        }
        return matches(el, selector) ? el : null;
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    var closest = __webpack_require__(19);
    var event = __webpack_require__(3);
    exports.bind = function(el, selector, type, fn, capture) {
        return event.bind(el, type, function(e) {
            var target = e.target || e.srcElement;
            e.delegateTarget = closest(target, selector, true, el);
            if (e.delegateTarget) fn.call(el, e);
        }, capture);
    };
    exports.unbind = function(el, type, fn, capture) {
        event.unbind(el, type, fn, capture);
    };
}, function(module, exports) {
    "use strict";
    module.exports = Emitter;
    function Emitter(obj) {
        if (obj) return mixin(obj);
    }
    function mixin(obj) {
        for (var key in Emitter.prototype) {
            obj[key] = Emitter.prototype[key];
        }
        return obj;
    }
    Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
        return this;
    };
    Emitter.prototype.once = function(event, fn) {
        function on() {
            this.off(event, on);
            fn.apply(this, arguments);
        }
        on.fn = fn;
        this.on(event, on);
        return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        if (!arguments.length) {
            this._callbacks = {};
            return this;
        }
        var callbacks = this._callbacks["$" + event];
        if (!callbacks) return this;
        if (arguments.length === 1) {
            delete this._callbacks["$" + event];
            return this;
        }
        var cb;
        for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
                callbacks.splice(i, 1);
                break;
            }
        }
        return this;
    };
    Emitter.prototype.emit = function(event) {
        this._callbacks = this._callbacks || {};
        var args = [].slice.call(arguments, 1);
        var callbacks = this._callbacks["$" + event];
        if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0, len = callbacks.length; i < len; ++i) {
                callbacks[i].apply(this, args);
            }
        }
        return this;
    };
    Emitter.prototype.listeners = function(event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks["$" + event] || [];
    };
    Emitter.prototype.hasListeners = function(event) {
        return !!this.listeners(event).length;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var events = __webpack_require__(3);
    var delegate = __webpack_require__(20);
    module.exports = Events;
    function Events(el, obj) {
        if (!(this instanceof Events)) return new Events(el, obj);
        if (!el) throw new Error("element required");
        if (!obj) throw new Error("object required");
        this.el = el;
        this.obj = obj;
        this._events = {};
    }
    Events.prototype.sub = function(event, method, cb) {
        this._events[event] = this._events[event] || {};
        this._events[event][method] = cb;
    };
    Events.prototype.bind = function(event, method) {
        var e = parse(event);
        var el = this.el;
        var obj = this.obj;
        var name = e.name;
        method = method || "on" + name;
        var args = [].slice.call(arguments, 2);
        var cb = function cb() {
            var a = [].slice.call(arguments).concat(args);
            obj[method].apply(obj, a);
        };
        if (e.selector) {
            cb = delegate.bind(el, e.selector, name, cb);
        } else {
            events.bind(el, name, cb);
        }
        this.sub(name, method, cb);
        return cb;
    };
    Events.prototype.unbind = function(event, method) {
        if (arguments.length === 0) return this.unbindAll();
        if (arguments.length === 1) return this.unbindAllOf(event);
        var bindings = this._events[event];
        if (!bindings) return;
        var cb = bindings[method];
        if (!cb) return;
        events.unbind(this.el, event, cb);
    };
    Events.prototype.unbindAll = function() {
        for (var event in this._events) {
            this.unbindAllOf(event);
        }
    };
    Events.prototype.unbindAllOf = function(event) {
        var bindings = this._events[event];
        if (!bindings) return;
        for (var method in bindings) {
            this.unbind(event, method);
        }
    };
    function parse(event) {
        var parts = event.split(/ +/);
        return {
            name: parts.shift(),
            selector: parts.join(" ")
        };
    }
}, function(module, exports) {
    "use strict";
    module.exports = function(arr, obj) {
        if (arr.indexOf) return arr.indexOf(obj);
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === obj) return i;
        }
        return -1;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var query = __webpack_require__(26);
    var proto = Element.prototype;
    var vendor = proto.matches || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
    module.exports = match;
    function match(el, selector) {
        if (!el || el.nodeType !== 1) return false;
        if (vendor) return vendor.call(el, selector);
        var nodes = query.all(selector, el.parentNode);
        for (var i = 0; i < nodes.length; ++i) {
            if (nodes[i] === el) return true;
        }
        return false;
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    var emitter = __webpack_require__(21);
    var event = __webpack_require__(3);
    module.exports = function(el, obj) {
        return new Mouse(el, obj);
    };
    function Mouse(el, obj) {
        this.obj = obj || {};
        this.el = el;
    }
    emitter(Mouse.prototype);
    Mouse.prototype.bind = function() {
        var obj = this.obj;
        var self = this;
        function up(e) {
            obj.onmouseup && obj.onmouseup(e);
            event.unbind(document, "mousemove", move);
            event.unbind(document, "mouseup", up);
            self.emit("up", e);
        }
        function move(e) {
            obj.onmousemove && obj.onmousemove(e);
            self.emit("move", e);
        }
        self.down = function(e) {
            obj.onmousedown && obj.onmousedown(e);
            event.bind(document, "mouseup", up);
            event.bind(document, "mousemove", move);
            self.emit("down", e);
        };
        event.bind(this.el, "mousedown", self.down);
        return this;
    };
    Mouse.prototype.unbind = function() {
        event.unbind(this.el, "mousedown", this.down);
        this.down = null;
    };
}, function(module, exports) {
    "use strict";
    function one(selector, el) {
        return el.querySelector(selector);
    }
    exports = module.exports = function(selector, el) {
        el = el || document;
        return one(selector, el);
    };
    exports.all = function(selector, el) {
        el = el || document;
        return el.querySelectorAll(selector);
    };
    exports.engine = function(obj) {
        if (!obj.one) throw new Error(".one callback required");
        if (!obj.all) throw new Error(".all callback required");
        exports.all = obj.all;
        return exports;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _create = __webpack_require__(30);
    var _create2 = _interopRequireDefault(_create);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var slice = Array.prototype.slice;
    var _exports = module.exports = super_;
    function super_() {
        var args = slice.call(arguments);
        if (!args.length) return;
        if (typeof args[0] !== "function") return _exports.merge(args);
        _exports.inherits.apply(null, args);
    }
    _exports.extend = function(proto, klass) {
        var self = this;
        var child = function child() {
            return self.apply(this, arguments);
        };
        _exports.merge([ child, this ]);
        _exports.inherits(child, this);
        if (proto) _exports.merge([ child.prototype, proto ]);
        if (klass) _exports.merge([ child, klass ]);
        child.extend = this.extend;
        return child;
    };
    _exports.inherits = function(ctor, SuperCtor) {
        ctor.super_ = SuperCtor;
        if (_create2.default) {
            ctor.prototype = (0, _create2.default)(SuperCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
        } else {
            ctor.prototype = new SuperCtor();
            ctor.prototype.constructor = ctor;
        }
    };
    _exports.merge = function(arr) {
        var main = arr.length === 2 ? arr.shift() : {};
        var obj = null;
        for (var i = 0, len = arr.length; i < len; i++) {
            obj = arr[i];
            for (var p in obj) {
                if (!obj.hasOwnProperty(p)) continue;
                main[p] = obj[p];
            }
        }
        return main;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var mouse = __webpack_require__(25);
    var events = __webpack_require__(22);
    var classes = __webpack_require__(17);
    var percentage = __webpack_require__(6);
    module.exports = Powerange;
    function Powerange(element, options) {
        if (!(this instanceof Powerange)) return new Powerange(element, options);
        this.element = element;
        this.options = options || {};
        this.slider = this.create("span", "range-bar");
        this.hasAppend = false;
        if (this.element !== null && this.element.type === "text") this.init();
    }
    Powerange.prototype.bindEvents = function() {
        this.handle = this.slider.querySelector(".range-handle");
        this.touch = events(this.handle, this);
        this.touch.bind("touchstart", "onmousedown");
        this.touch.bind("touchmove", "onmousemove");
        this.touch.bind("touchend", "onmouseup");
        this.mouse = mouse(this.handle, this);
        this.mouse.bind();
    };
    Powerange.prototype.hide = function() {
        this.element.style.display = "none";
    };
    Powerange.prototype.append = function() {
        if (!this.hasAppend) {
            var slider = this.generate();
            this.insertAfter(this.element, slider);
        }
        this.hasAppend = true;
    };
    Powerange.prototype.generate = function() {
        var elems = {
            handle: {
                type: "span",
                selector: "range-handle"
            },
            min: {
                type: "span",
                selector: "range-min"
            },
            max: {
                type: "span",
                selector: "range-max"
            },
            quantity: {
                type: "span",
                selector: "range-quantity"
            }
        };
        for (var key in elems) {
            if (elems.hasOwnProperty(key)) {
                var temp = this.create(elems[key].type, elems[key].selector);
                this.slider.appendChild(temp);
            }
        }
        return this.slider;
    };
    Powerange.prototype.create = function(type, name) {
        var elem = document.createElement(type);
        elem.className = name;
        return elem;
    };
    Powerange.prototype.insertAfter = function(reference, target) {
        reference.parentNode.insertBefore(target, reference.nextSibling);
    };
    Powerange.prototype.setRange = function(min, max) {
        if (typeof min === "number" && typeof max === "number" && !this.options.hideRange) {
            this.slider.querySelector(".range-min").innerHTML = this.options.minHTML || min;
            this.slider.querySelector(".range-max").innerHTML = this.options.maxHTML || max;
        }
    };
    Powerange.prototype.setValue = function(offset, size) {
        var part = percentage.from(parseFloat(offset), size);
        if (offset === "0px" || size === 0) {
            value = this.options.min;
        } else {
            var value = percentage.of(part, this.options.max - this.options.min) + this.options.min;
            value = this.options.decimal ? Math.round(value * 100) / 100 : Math.round(value);
            if (value > this.options.max) {
                value = this.options.max;
            }
        }
        var changed = false;
        changed = this.element.value !== value;
        this.element.value = value;
        this.options.callback();
        if (changed) this.changeEvent();
    };
    Powerange.prototype.step = function(sliderSize, handleSize) {
        var dimension = sliderSize - handleSize;
        var part = percentage.from(this.checkStep(this.options.step), this.options.max - this.options.min);
        var interval = percentage.of(part, dimension);
        var steps = [];
        for (var i = 0; i <= dimension; i += interval) {
            steps.push(i);
        }
        this.steps = steps;
        return this.steps;
    };
    Powerange.prototype.checkValues = function(start) {
        if (start < this.options.min) this.options.start = this.options.min;
        if (start > this.options.max) this.options.start = this.options.max;
        if (this.options.min >= this.options.max) this.options.min = this.options.max;
    };
    Powerange.prototype.checkStep = function(value) {
        if (value < 0) value = Math.abs(value);
        this.options.step = value;
        return this.options.step;
    };
    Powerange.prototype.disable = function(force) {
        if (this.options.disable || force) {
            this.mouse.unbind();
            this.touch.unbind();
        }
        if (this.options.disable) {
            if (this.options.disableOpacity) {
                this.slider.style.opacity = this.options.disableOpacity;
            }
            classes(this.slider).add("range-bar-disabled");
        }
    };
    Powerange.prototype.unselectable = function(element, set) {
        if (!classes(this.slider).has("unselectable") && set === true) {
            classes(this.slider).add("unselectable");
        } else {
            classes(this.slider).remove("unselectable");
        }
    };
    Powerange.prototype.changeEvent = function(state) {
        if (typeof Event === "function" || !document.fireEvent) {
            var event = document.createEvent("HTMLEvents");
            event.initEvent("change", false, true);
            this.element.dispatchEvent(event);
        } else {
            this.element.fireEvent("onchange");
        }
    };
    Powerange.prototype.init = function() {
        this.hide();
        this.append();
        this.bindEvents();
        this.checkValues(this.options.start);
        this.setRange(this.options.min, this.options.max);
        this.disable();
    };
    Powerange.prototype.reInit = function(opts) {
        this.options.start = opts.value;
        this.options.min = opts.min;
        this.options.max = opts.max;
        this.disable(true);
        this.init();
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var Horizontal = __webpack_require__(16);
    var defaults = {
        callback: function callback() {},
        decimal: false,
        disable: false,
        disableOpacity: null,
        hideRange: false,
        min: 0,
        max: 100,
        start: null,
        step: null,
        vertical: false
    };
    module.exports = function(element, options) {
        options = options || {};
        for (var i in defaults) {
            if (options[i] == null) {
                options[i] = defaults[i];
            }
        }
        return new Horizontal(element, options);
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(31),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(53);
    var $Object = __webpack_require__(7).Object;
    module.exports = function create(P, D) {
        return $Object.create(P, D);
    };
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(14), toLength = __webpack_require__(50), toIndex = __webpack_require__(49);
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
    var aFunction = __webpack_require__(32);
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
}, function(module, exports) {
    module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(2), core = __webpack_require__(7), ctx = __webpack_require__(35), hide = __webpack_require__(39), PROTOTYPE = "prototype";
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
    var dP = __webpack_require__(11), createDesc = __webpack_require__(47);
    module.exports = __webpack_require__(1) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(2).document && document.documentElement;
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(1) && !__webpack_require__(10)(function() {
        return Object.defineProperty(__webpack_require__(8)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(34);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(4), dPs = __webpack_require__(44), enumBugKeys = __webpack_require__(9), IE_PROTO = __webpack_require__(12)("IE_PROTO"), Empty = function() {}, PROTOTYPE = "prototype";
    var createDict = function() {
        var iframe = __webpack_require__(8)("iframe"), i = enumBugKeys.length, gt = ">", iframeDocument;
        iframe.style.display = "none";
        __webpack_require__(40).appendChild(iframe);
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
    var dP = __webpack_require__(11), anObject = __webpack_require__(4), getKeys = __webpack_require__(46);
    module.exports = __webpack_require__(1) ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var keys = getKeys(Properties), length = keys.length, i = 0, P;
        while (length > i) dP.f(O, P = keys[i++], Properties[P]);
        return O;
    };
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(38), toIObject = __webpack_require__(14), arrayIndexOf = __webpack_require__(33)(false), IE_PROTO = __webpack_require__(12)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(45), enumBugKeys = __webpack_require__(9);
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
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(2), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
    module.exports = function(key) {
        return store[key] || (store[key] = {});
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(13), max = Math.max, min = Math.min;
    module.exports = function(index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(13), min = Math.min;
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
    var $export = __webpack_require__(37);
    $export($export.S, "Object", {
        create: __webpack_require__(43)
    });
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div class=vux-range-input-box style=position:relative;margin-right:30px;margin-left:50px> <input class=vux-range-input v-model=value number> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(54);
    __vue_script__ = __webpack_require__(15);
    __vue_template__ = __webpack_require__(55);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);