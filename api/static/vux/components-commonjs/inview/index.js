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
    module.exports = __webpack_require__(1);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _inview = __webpack_require__(2);
    var _inview2 = _interopRequireDefault(_inview);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        update: function update(option) {
            if (!option || !option.id) {
                return console.error("no id specified");
            }
            var _this = this;
            var id = option.id;
            var vm = this.vm;
            vm.$nextTick(function() {
                _this._inview = (0, _inview2.default)(_this.el, function(isInView, data) {
                    if (isInView) {
                        vm.$emit("on-view-enter", id);
                    } else {
                        vm.$emit("on-view-leave", id);
                    }
                });
            });
        },
        unbind: function unbind() {}
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function InView(el, callback, className) {
        var _this = this;
        if (!(_this instanceof InView)) {
            return new InView(el, callback);
        }
        _this.el = el;
        _this.callback = callback;
        function check(e) {
            var params = {
                windowScrollTop: getScrollTop(),
                elementOffsetTop: _this.el.offsetTop,
                inViewHeight: window.outerHeight,
                elementOffsetTopInViewHeight: window.outerHeight - (getScrollTop() - (_this.el.offsetTop - window.outerHeight))
            };
            if (isInView(_this.el)) {
                addClass(_this.el, className);
                _this.callback.call(_this.el, true, params);
            } else {
                removeClass(_this.el, className);
                _this.callback.call(_this.el, false, params);
            }
        }
        var throttledCheck = throttle(check, 100);
        check();
        addEvent(window, "scroll", throttledCheck);
    }
    function throttle(fn, threshhold, scope) {
        threshhold || (threshhold = 100);
        var last, deferTimer;
        return function() {
            var context = scope || this;
            var now = +new Date();
            var args = arguments;
            if (last && now < last + threshhold) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
    function hasClass(el, name) {
        return new RegExp(" " + name + " ").test(" " + el.className + " ");
    }
    function addClass(el, name) {
        if (!hasClass(el, name)) {
            el.className += " " + name;
        }
        return el;
    }
    function removeClass(el, name) {
        var newClass = " " + el.className.replace(/[\t\r\n]/g, " ") + " ";
        if (hasClass(el, name)) {
            while (newClass.indexOf(" " + name + " ") >= 0) {
                newClass = newClass.replace(" " + name + " ", " ");
            }
            el.className = newClass.replace(/^\s+|\s+$/g, "");
        }
        return el;
    }
    function addEvent(el, name, fn) {
        if (el.addEventListener) {
            return el.addEventListener(name, fn, false);
        } else if (el.attachEvent) {
            return el.attachEvent("on" + name, fn);
        }
    }
    function getScrollTop() {
        if (typeof window.pageYOffset !== "undefined") {
            return window.pageYOffset;
        } else {
            var b = document.body;
            var d = document.documentElement;
            d = d.clientHeight ? d : b;
            return d.scrollTop;
        }
    }
    function isInView(obj) {
        var winTop = getScrollTop();
        var winBottom = winTop + window.innerHeight;
        var objTop = obj.offsetTop;
        var objBottom = objTop + obj.offsetHeight;
        var offset = 0;
        if (objTop <= winBottom + offset && objBottom >= winTop) {
            return true;
        }
    }
    exports.default = InView;
} ]);