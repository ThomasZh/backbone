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
        ready: function ready() {
            this.$tabbar = document.querySelector(".weui_tabbar");
        },
        props: {
            show: {
                type: Boolean,
                required: true,
                twoWay: true
            },
            showCancel: Boolean,
            cancelText: {
                type: String,
                "default": "cancel"
            },
            menus: {
                type: Object,
                "default": {}
            }
        },
        methods: {
            emitEvent: function emitEvent(event, menu) {
                if (event === "on-click-menu" && !/.noop/.test(menu)) {
                    this.$emit(event, menu);
                    this.$emit(event + "-" + menu);
                    this.show = false;
                }
            },
            fixIos: function fixIos(zIndex) {
                if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
                    this.$tabbar.style.zIndex = zIndex;
                }
            }
        },
        watch: {
            show: function show(val) {
                var _this = this;
                if (val) {
                    this.fixIos(-1);
                } else {
                    setTimeout(function() {
                        _this.fixIos(100);
                    }, 200);
                }
            }
        },
        beforeDestroy: function beforeDestroy() {
            this.fixIos(100);
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = '<div class=vux-actionsheet> <div class=weui_mask_transition :class="{\'weui_fade_toggle\': show}" :style="{display: show ? \'block\' : \'none\'}" @click="show=false"></div> <div class=weui_actionsheet :class="{\'weui_actionsheet_toggle\': show}"> <div class=weui_actionsheet_menu> <div class=weui_actionsheet_cell v-for="(key, text) in menus" @click="emitEvent(\'on-click-menu\', key)" v-html=text> </div> <div class=vux-actionsheet-gap v-if=showCancel></div> <div class="weui_actionsheet_cell vux-actionsheet-cancel" @click="emitEvent(\'on-click-menu\', \'cancel\')" v-if=showCancel>{{cancelText}}</div> </div> </div> </div>';
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