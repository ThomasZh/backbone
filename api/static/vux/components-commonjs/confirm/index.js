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
    module.exports = __webpack_require__(7);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _dialog = __webpack_require__(8);
    var _dialog2 = _interopRequireDefault(_dialog);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        components: {
            Dialog: _dialog2.default
        },
        props: {
            show: {
                type: Boolean,
                "default": false,
                twoWay: true
            },
            title: {
                type: String,
                required: true
            },
            confirmText: {
                type: String,
                "default": "confirm"
            },
            cancelText: {
                type: String,
                "default": "cancel"
            },
            maskTransition: {
                type: String,
                "default": "vux-fade"
            },
            dialogTransition: {
                type: String,
                "default": "vux-dialog"
            }
        },
        methods: {
            onConfirm: function onConfirm() {
                this.show = false;
                this.$emit("on-confirm");
            },
            onCancel: function onCancel() {
                this.show = false;
                this.$emit("on-cancel");
            }
        }
    };
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
            maskTransition: {
                type: String,
                "default": "vux-fade"
            },
            dialogTransition: {
                type: String,
                "default": "vux-dialog"
            },
            hideOnBlur: Boolean,
            scroll: {
                type: Boolean,
                "default": true
            }
        },
        watch: {
            show: function show(val) {
                this.$emit(val ? "on-show" : "on-hide");
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {
    module.exports = '<dialog class=weui_dialog_confirm :show=show :mask-transition=maskTransition :dialog-transition=dialogTransition @on-hide="$emit(\'on-hide\')" @on-show="$emit(\'on-show\')"> <div class=weui_dialog_hd><strong class=weui_dialog_title>{{title}}</strong></div> <div class=weui_dialog_bd><slot></slot></div> <div class=weui_dialog_ft> <a href=javascript:; class="weui_btn_dialog default" @click=onCancel>{{cancelText}}</a> <a href=javascript:; class="weui_btn_dialog primary" @click=onConfirm>{{confirmText}}</a> </div> </dialog>';
}, function(module, exports) {
    module.exports = '<div class=weui_dialog_alert @touchmove="!this.scroll && $event.preventDefault()"> <div class=weui_mask @click="hideOnBlur && (show = false)" v-show=show :transition=maskTransition></div> <div class=weui_dialog v-show=show :transition=dialogTransition> <slot></slot> </div> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(3);
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(5);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(4);
    __vue_script__ = __webpack_require__(2);
    __vue_template__ = __webpack_require__(6);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);