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
    var _inlineDesc = __webpack_require__(6);
    var _inlineDesc2 = _interopRequireDefault(_inlineDesc);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        components: {
            InlineDesc: _inlineDesc2.default
        },
        computed: {
            labelStyle: function labelStyle() {
                var isHTML = /<\/?[^>]*>/.test(this.title);
                var width = Math.min(isHTML ? 5 : this.title.length + 1, 14) + "em";
                return {
                    width: width
                };
            }
        },
        props: {
            title: {
                type: String,
                required: true
            },
            disabled: Boolean,
            value: {
                type: Boolean,
                "default": false
            },
            inlineDesc: String
        },
        watch: {
            value: function value(newVal) {
                this.$emit("on-change", newVal);
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {}, function(module, exports) {
    module.exports = "<span class=vux-label-desc><slot></slot></span>";
}, function(module, exports) {
    module.exports = '<div class="weui_cell weui_cell_switch"> <div class="weui_cell_hd weui_cell_primary"> <label class=weui_label :style=labelStyle v-html=title></label> <inline-desc v-if=inlineDesc>{{inlineDesc}}</inline-desc> </div> <div class=weui_cell_ft> <input class=weui_switch type=checkbox :disabled=disabled v-model=value /> </div> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(3);
    __vue_template__ = __webpack_require__(4);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(2);
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(5);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);