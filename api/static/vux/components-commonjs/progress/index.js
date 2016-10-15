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
    module.exports = __webpack_require__(6);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _base = __webpack_require__(2);
    var _base2 = _interopRequireDefault(_base);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        mixins: [ _base2.default ],
        props: {
            percent: {
                type: Number,
                "default": 0
            },
            showCancel: {
                type: Boolean,
                "default": true
            }
        },
        methods: {
            cancel: function cancel() {
                this.$emit("on-cancel");
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _mixin_uuid = __webpack_require__(3);
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
}, function(module, exports) {}, function(module, exports) {
    module.exports = '<div class=weui_progress> <div class=weui_progress_bar> <div class="weui_progress_inner_bar js_progress" :style="{width: percent + \'%\'}"></div> </div> <a href=javascript:; class=weui_progress_opr v-show=showCancel> <i class=weui_icon_cancel @click=cancel></i> </a> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(4);
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(5);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);