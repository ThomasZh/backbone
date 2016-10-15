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
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        props: {
            show: {
                type: Boolean,
                "default": false
            },
            time: {
                type: Number,
                "default": 2e3
            },
            type: {
                type: String,
                "default": "success"
            },
            transition: {
                type: String,
                "default": "vux-fade"
            },
            width: {
                type: String,
                "default": "7.6em"
            },
            text: String
        },
        computed: {
            toastClass: function toastClass() {
                return {
                    weui_toast_forbidden: this.type === "warn",
                    weui_toast_cancel: this.type === "cancel",
                    weui_toast_success: this.type === "success",
                    weui_toast_text: this.type === "text"
                };
            }
        },
        watch: {
            show: function show(val) {
                var _this = this;
                if (val) {
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(function() {
                        _this.show = false;
                        _this.$emit("on-hide");
                    }, this.time);
                }
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = '<div class=vux-toast> <div class=weui_mask_transparent v-show=show></div> <div class=weui_toast :style="{width: width}" :class=toastClass v-show=show :transition=transition> <i class=weui_icon_toast v-show="type !== \'text\'"></i> <p class=weui_toast_content v-if=text v-html=text></p> <p class=weui_toast_content v-else><slot></slot></p> </div> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(2);
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(3);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);