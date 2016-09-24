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
            required: {
                type: Boolean,
                "default": true
            },
            placeholder: {
                type: String,
                "default": "Search"
            },
            cancelText: {
                type: String,
                "default": "cancel"
            },
            value: {
                type: String,
                twoWay: true,
                "default": ""
            },
            results: {
                type: Array,
                "default": function _default() {
                    return [];
                }
            },
            autoFixed: {
                type: Boolean,
                "default": true
            },
            top: {
                type: String,
                "default": "0px"
            }
        },
        methods: {
            clear: function clear() {
                this.value = "";
                this.isFocus = true;
                this.setFocus();
            },
            cancel: function cancel() {
                this.value = "";
                this.isCancel = true;
                this.isFixed = false;
                this.$emit("on-cancel");
            },
            handleResultClick: function handleResultClick(item) {
                this.$emit("result-click", item);
                this.isCancel = true;
                this.isFixed = false;
            },
            touch: function touch() {
                this.isCancel = false;
                if (this.autoFixed) {
                    this.isFixed = true;
                }
            },
            setFocus: function setFocus() {
                this.$els.input.focus();
            }
        },
        data: function data() {
            return {
                isCancel: true,
                isFocus: false,
                isFixed: false
            };
        },
        watch: {
            isFixed: function isFixed(val) {
                if (val === true) {
                    this.setFocus();
                    this.isFocus = true;
                } else {}
            },
            value: function value(val) {
                this.$emit("on-change", this.value);
            }
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = '<div class=vux-search-box :class="{\'vux-search-fixed\':isFixed}" :style="{top: isFixed ? top : \'\'}"> <div class=weui_search_bar id=search_bar :class="{weui_search_focusing: !isCancel}"> <form class=weui_search_outer @submit.prevent="$emit(\'on-submit\', value)"> <div class=vux-search-mask @click=touch v-show="!isFixed && autoFixed"></div> <div class=weui_search_inner> <i class=weui_icon_search></i> <input type=search class=weui_search_input id=search_input :placeholder=placeholder autocomplete=off :required=required v-model=value v-el:input @focus="isFocus = true" @blur="isFocus = false"/> <a href=javascript: class=weui_icon_clear id=search_clear @click=clear></a> </div> <label for=search_input class=weui_search_text id=search_text v-show="!isFocus && !value"> <i class=weui_icon_search></i> <span>{{placeholder}}</span> </label> </form> <a href=javascript: class=weui_search_cancel id=search_cancel @click=cancel>{{cancelText}}</a> </div> <div class="weui_cells weui_cells_access vux-search_show" id=search_show v-show=isFixed> <slot></slot> <div class=weui_cell v-for="item in results" @click=handleResultClick(item)> <div class="weui_cell_bd weui_cell_primary"> <p>{{item.title}}</p> </div> </div> </div> </div>';
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