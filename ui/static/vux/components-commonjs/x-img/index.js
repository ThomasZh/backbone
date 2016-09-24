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
    module.exports = __webpack_require__(5);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _vuxBlazy = __webpack_require__(6);
    var _vuxBlazy2 = _interopRequireDefault(_vuxBlazy);
    var _webpSupport = __webpack_require__(7);
    var _webpSupport2 = _interopRequireDefault(_webpSupport);
    var _mixin_uuid = __webpack_require__(2);
    var _mixin_uuid2 = _interopRequireDefault(_mixin_uuid);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        mixins: [ _mixin_uuid2.default ],
        compiled: function compiled() {
            if ((0, _webpSupport2.default)() && this.src && this.webpSrc) {
                this.src = this.webpSrc;
            }
        },
        ready: function ready() {
            var _this = this;
            var id = "vux-ximg-" + this.uuid;
            this.$el.setAttribute("id", id);
            this.$el.setAttribute("data-src", this.src);
            this.blazy = new _vuxBlazy2.default({
                scroller: this.scroller,
                container: this.container,
                selector: "#" + id,
                offset: _this.offset,
                errorClass: _this.errorClass,
                successClass: _this.successClass,
                success: function success(ele) {
                    _this.$emit("on-success", _this.src, ele);
                },
                error: function error(ele, msg) {
                    _this.$emit("on-error", _this.src, ele, msg);
                }
            });
        },
        props: {
            src: String,
            webpSrc: String,
            defaultSrc: {
                type: String,
                "default": "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            },
            errorClass: String,
            successClass: String,
            offset: {
                type: Number,
                defaut: 100
            },
            "class": String,
            scroller: Object,
            container: String
        },
        beforeDestroy: function beforeDestroy() {
            this.blazy && this.blazy.destroy();
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
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<img :src=defaultSrc class=vux-x-img :class=class />";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(3);
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(4);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
    (function(root, blazy) {
        if (true) {
            !(__WEBPACK_AMD_DEFINE_FACTORY__ = blazy, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, 
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else if (typeof exports === "object") {
            module.exports = blazy();
        } else {
            root.Blazy = blazy();
        }
    })(this, function() {
        "use strict";
        var _source, _viewport, _isRetina, _attrSrc = "src", _attrSrcset = "srcset";
        return function Blazy(options) {
            if (!document.querySelectorAll) {
                var s = document.createStyleSheet();
                document.querySelectorAll = function(r, c, i, j, a) {
                    a = document.all, c = [], r = r.replace(/\[for\b/gi, "[htmlFor").split(",");
                    for (i = r.length; i--; ) {
                        s.addRule(r[i], "k:v");
                        for (j = a.length; j--; ) a[j].currentStyle.k && c.push(a[j]);
                        s.removeRule(0);
                    }
                    return c;
                };
            }
            var scope = this;
            var util = scope._util = {};
            util.elements = [];
            util.destroyed = true;
            scope.options = options || {};
            scope.options.error = scope.options.error || false;
            scope.options.offset = scope.options.offset || 100;
            scope.options.success = scope.options.success || false;
            scope.options.selector = scope.options.selector || ".b-lazy";
            scope.options.separator = scope.options.separator || "|";
            scope.options.container = scope.options.container ? document.querySelectorAll(scope.options.container) : false;
            scope.options.errorClass = scope.options.errorClass || "b-error";
            scope.options.breakpoints = scope.options.breakpoints || false;
            scope.options.loadInvisible = scope.options.loadInvisible || false;
            scope.options.successClass = scope.options.successClass || "b-loaded";
            scope.options.validateDelay = scope.options.validateDelay || 25;
            scope.options.saveViewportOffsetDelay = scope.options.saveViewportOffsetDelay || 50;
            scope.options.srcset = scope.options.srcset || "data-srcset";
            scope.options.src = _source = scope.options.src || "data-src";
            _isRetina = window.devicePixelRatio > 1;
            _viewport = {};
            _viewport.top = 0 - scope.options.offset;
            _viewport.left = 0 - scope.options.offset;
            scope.revalidate = function() {
                initialize(this);
            };
            scope.load = function(elements, force) {
                var opt = this.options;
                if (elements.length === undefined) {
                    loadElement(elements, force, opt);
                } else {
                    each(elements, function(element) {
                        loadElement(element, force, opt);
                    });
                }
            };
            scope.destroy = function() {
                var self = this;
                var util = self._util;
                if (self.options.container) {
                    each(self.options.container, function(object) {
                        unbindEvent(object, "scroll", util.validateT);
                    });
                }
                unbindEvent(window, "scroll", util.validateT);
                unbindEvent(window, "resize", util.validateT);
                unbindEvent(window, "resize", util.saveViewportOffsetT);
                if (self.scroller) {
                    self.scroller._xscroll && self.scroller._xscroll.off("scroll scrollend afterrender", util.validateT, self.scroller._xscroll);
                }
                util.count = 0;
                util.elements.length = 0;
                util.destroyed = true;
            };
            util.validateT = throttle(function() {
                validate(scope);
            }, scope.options.validateDelay, scope);
            util.saveViewportOffsetT = throttle(function() {
                saveViewportOffset(scope.options.offset);
            }, scope.options.saveViewportOffsetDelay, scope);
            saveViewportOffset(scope.options.offset);
            each(scope.options.breakpoints, function(object) {
                if (object.width >= window.screen.width) {
                    _source = object.src;
                    return false;
                }
            });
            setTimeout(function() {
                initialize(scope);
            });
        };
        function initialize(self) {
            var util = self._util;
            util.elements = toArray(self.options.selector);
            util.count = util.elements.length;
            if (util.destroyed) {
                util.destroyed = false;
                if (self.options.container) {
                    each(self.options.container, function(object) {
                        bindEvent(object, "scroll", util.validateT);
                    });
                }
                bindEvent(window, "resize", util.saveViewportOffsetT);
                bindEvent(window, "resize", util.validateT);
                bindEvent(window, "scroll", util.validateT);
                if (self.options.scroller) {
                    var scroller = self.options.scroller._xscroll;
                    var eventType = scroller.userConfig.useOriginScroll ? "scroll" : "scrollend";
                    scroller.on("afterrender", util.validateT, self);
                    scroller.on(eventType, util.validateT, self);
                }
            }
            validate(self);
        }
        function validate(self) {
            var util = self._util;
            for (var i = 0; i < util.count; i++) {
                var element = util.elements[i];
                if (elementInView(element) || hasClass(element, self.options.successClass)) {
                    self.load(element);
                    util.elements.splice(i, 1);
                    util.count--;
                    i--;
                }
            }
            if (util.count === 0) {
                self.destroy();
            }
        }
        function elementInView(ele) {
            var rect = ele.getBoundingClientRect();
            return rect.right >= _viewport.left && rect.bottom >= _viewport.top && rect.left <= _viewport.right && rect.top <= _viewport.bottom;
        }
        function loadElement(ele, force, options) {
            if (!hasClass(ele, options.successClass) && (force || options.loadInvisible || ele.offsetWidth > 0 && ele.offsetHeight > 0)) {
                var dataSrc = ele.getAttribute(_source) || ele.getAttribute(options.src);
                if (dataSrc) {
                    var dataSrcSplitted = dataSrc.split(options.separator);
                    var src = dataSrcSplitted[_isRetina && dataSrcSplitted.length > 1 ? 1 : 0];
                    var isImage = equal(ele, "img");
                    if (isImage || ele.src === undefined) {
                        var img = new Image();
                        var onErrorHandler = function() {
                            if (options.error) options.error(ele, "invalid");
                            addClass(ele, options.errorClass);
                            unbindEvent(img, "error", onErrorHandler);
                            unbindEvent(img, "load", onLoadHandler);
                        };
                        var onLoadHandler = function() {
                            if (isImage) {
                                setSrc(ele, src);
                                handleSource(ele, _attrSrcset, options.srcset);
                                var parent = ele.parentNode;
                                if (parent && equal(parent, "picture")) {
                                    each(parent.getElementsByTagName("source"), function(source) {
                                        handleSource(source, _attrSrcset, options.srcset);
                                    });
                                }
                                if (options.scroller) {
                                    options.scroller.reset();
                                }
                            } else {
                                ele.style.backgroundImage = 'url("' + src + '")';
                            }
                            itemLoaded(ele, options);
                            unbindEvent(img, "load", onLoadHandler);
                            unbindEvent(img, "error", onErrorHandler);
                        };
                        bindEvent(img, "error", onErrorHandler);
                        bindEvent(img, "load", onLoadHandler);
                        setSrc(img, src);
                    } else {
                        setSrc(ele, src);
                        itemLoaded(ele, options);
                    }
                } else {
                    if (equal(ele, "video")) {
                        each(ele.getElementsByTagName("source"), function(source) {
                            handleSource(source, _attrSrc, options.src);
                        });
                        ele.load();
                        itemLoaded(ele, options);
                    } else {
                        if (options.error) options.error(ele, "missing");
                        addClass(ele, options.errorClass);
                    }
                }
            }
        }
        function itemLoaded(ele, options) {
            addClass(ele, options.successClass);
            if (options.success) options.success(ele);
            ele.removeAttribute(options.src);
            each(options.breakpoints, function(object) {
                ele.removeAttribute(object.src);
            });
        }
        function setSrc(ele, src) {
            ele[_attrSrc] = src;
        }
        function handleSource(ele, attr, dataAttr) {
            var dataSrc = ele.getAttribute(dataAttr);
            if (dataSrc) {
                ele[attr] = dataSrc;
                ele.removeAttribute(dataAttr);
            }
        }
        function equal(ele, str) {
            return ele.nodeName.toLowerCase() === str;
        }
        function hasClass(ele, className) {
            return (" " + ele.className + " ").indexOf(" " + className + " ") !== -1;
        }
        function addClass(ele, className) {
            if (!hasClass(ele, className)) {
                ele.className += " " + className;
            }
        }
        function toArray(selector) {
            var array = [];
            var nodelist = document.querySelectorAll(selector);
            for (var i = nodelist.length; i--; array.unshift(nodelist[i])) {}
            return array;
        }
        function saveViewportOffset(offset) {
            _viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + offset;
            _viewport.right = (window.innerWidth || document.documentElement.clientWidth) + offset;
        }
        function bindEvent(ele, type, fn) {
            if (ele.attachEvent) {
                ele.attachEvent && ele.attachEvent("on" + type, fn);
            } else {
                ele.addEventListener(type, fn, false);
            }
        }
        function unbindEvent(ele, type, fn) {
            if (ele.detachEvent) {
                ele.detachEvent && ele.detachEvent("on" + type, fn);
            } else {
                ele.removeEventListener(type, fn, false);
            }
        }
        function each(object, fn) {
            if (object && fn) {
                var l = object.length;
                for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}
            }
        }
        function throttle(fn, minDelay, scope) {
            var lastCall = 0;
            return function() {
                var now = +new Date();
                if (now - lastCall < minDelay) {
                    return;
                }
                lastCall = now;
                fn.apply(scope, arguments);
            };
        }
    });
}, function(module, exports) {
    var webp_name = "can_use_webp";
    function detectWebp() {
        if (!window.localStorage || typeof localStorage !== "object") return;
        if (!localStorage.getItem(webp_name) || localStorage.getItem(webp_name) !== "available" && localStorage.getItem(webp_name) !== "disable") {
            var img = document.createElement("img");
            img.onload = function() {
                try {
                    localStorage.setItem(webp_name, "available");
                } catch (ex) {}
            };
            img.onerror = function() {
                try {
                    localStorage.setItem(webp_name, "disable");
                } catch (ex) {}
            };
            img.src = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==";
        }
    }
    detectWebp();
    module.exports = function() {
        return !!window.localStorage && window.localStorage.getItem(webp_name) === "available";
    };
} ]);