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
    module.exports = __webpack_require__(4);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _shake = __webpack_require__(2);
    var _shake2 = _interopRequireDefault(_shake);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        props: {
            stop: Boolean,
            threshold: {
                type: Number,
                "default": 15
            },
            timeout: {
                type: Number,
                "default": 1e3
            }
        },
        ready: function ready() {
            var _this = this;
            this._shake = new _shake2.default({
                threshold: _this.threshold,
                timeout: _this.timeout
            });
            this._handler = function() {
                if (!_this.stop) {
                    _this.$emit("on-shake");
                }
            };
            window.addEventListener("shake", this._handler, false);
            this._shake.start();
        },
        beforeDestroy: function beforeDestroy() {
            window.removeEventListener("shake", this._handler, false);
        }
    };
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    (function(global, factory) {
        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                return factory(global, global.document);
            }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else if (typeof module !== "undefined" && module.exports) {
            module.exports = factory(global, global.document);
        } else {
            global.Shake = factory(global, global.document);
        }
    })(typeof window !== "undefined" ? window : this, function(window, document) {
        "use strict";
        function Shake(options) {
            this.hasDeviceMotion = "ondevicemotion" in window;
            this.options = {
                threshold: 15,
                timeout: 1e3
            };
            if (typeof options === "object") {
                for (var i in options) {
                    if (options.hasOwnProperty(i)) {
                        this.options[i] = options[i];
                    }
                }
            }
            this.lastTime = new Date();
            this.lastX = null;
            this.lastY = null;
            this.lastZ = null;
            if (typeof document.CustomEvent === "function") {
                this.event = new document.CustomEvent("shake", {
                    bubbles: true,
                    cancelable: true
                });
            } else if (typeof document.createEvent === "function") {
                this.event = document.createEvent("Event");
                this.event.initEvent("shake", true, true);
            } else {
                return false;
            }
        }
        Shake.prototype.reset = function() {
            this.lastTime = new Date();
            this.lastX = null;
            this.lastY = null;
            this.lastZ = null;
        };
        Shake.prototype.start = function() {
            this.reset();
            if (this.hasDeviceMotion) {
                window.addEventListener("devicemotion", this, false);
            }
        };
        Shake.prototype.stop = function() {
            if (this.hasDeviceMotion) {
                window.removeEventListener("devicemotion", this, false);
            }
            this.reset();
        };
        Shake.prototype.devicemotion = function(e) {
            var current = e.accelerationIncludingGravity;
            var currentTime;
            var timeDifference;
            var deltaX = 0;
            var deltaY = 0;
            var deltaZ = 0;
            if (this.lastX === null && this.lastY === null && this.lastZ === null) {
                this.lastX = current.x;
                this.lastY = current.y;
                this.lastZ = current.z;
                return;
            }
            deltaX = Math.abs(this.lastX - current.x);
            deltaY = Math.abs(this.lastY - current.y);
            deltaZ = Math.abs(this.lastZ - current.z);
            if (deltaX > this.options.threshold && deltaY > this.options.threshold || deltaX > this.options.threshold && deltaZ > this.options.threshold || deltaY > this.options.threshold && deltaZ > this.options.threshold) {
                currentTime = new Date();
                timeDifference = currentTime.getTime() - this.lastTime.getTime();
                if (timeDifference > this.options.timeout) {
                    window.dispatchEvent(this.event);
                    this.lastTime = new Date();
                }
            }
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
        };
        Shake.prototype.handleEvent = function(e) {
            if (typeof this[e.type] === "function") {
                return this[e.type](e);
            }
        };
        return Shake;
    });
}, function(module, exports) {
    module.exports = "<div style=display:none></div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(3);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);