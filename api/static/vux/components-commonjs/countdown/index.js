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
    module.exports = __webpack_require__(3);
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            time: {
                type: Number,
                "default": 60
            },
            start: {
                type: Boolean,
                "default": true
            }
        },
        methods: {
            tick: function tick() {
                var _this = this;
                this.interval = setInterval(function() {
                    if (_this.time > 0) {
                        _this.time--;
                    } else {
                        _this.stop();
                        _this.index++;
                        _this.$emit("on-finish", _this.index);
                    }
                }, 1e3);
            },
            stop: function stop() {
                clearInterval(this.interval);
            }
        },
        watch: {
            start: function start(newVal, oldVal) {
                if (newVal === true && oldVal === false && this.time > 0) {
                    this.tick();
                }
                if (newVal === false && oldVal === true) {
                    this.stop();
                }
            }
        },
        ready: function ready() {
            if (this.start) {
                this.tick();
            }
        },
        data: function data() {
            return {
                interval: null,
                index: 0
            };
        }
    };
}, function(module, exports) {
    module.exports = "<span>{{time}}</span>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(2);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);