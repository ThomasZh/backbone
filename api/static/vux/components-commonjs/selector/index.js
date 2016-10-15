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
}, function(module, exports) {
    "use strict";
    function find(array, predicate, context) {
        if (typeof Array.prototype.find === "function") {
            return array.find(predicate, context);
        }
        context = context || this;
        var length = array.length;
        var i;
        if (typeof predicate !== "function") {
            throw new TypeError(predicate + " is not a function");
        }
        for (i = 0; i < length; i++) {
            if (predicate.call(context, array[i], i, array)) {
                return array[i];
            }
        }
    }
    module.exports = find;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _arrayFind = __webpack_require__(1);
    var _arrayFind2 = _interopRequireDefault(_arrayFind);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var findByKey = function findByKey(key, options) {
        var _rs = (0, _arrayFind2.default)(options, function(item) {
            return item.key === key;
        });
        return _rs ? _rs.value : key;
    };
    exports.default = {
        computed: {
            processOptions: function processOptions() {
                if (this.options.length && this.options[0].key) {
                    return this.options;
                } else {
                    return this.options.map(function(item) {
                        return {
                            key: item,
                            value: item
                        };
                    });
                }
            }
        },
        filters: {
            findByKey: findByKey
        },
        watch: {
            value: function value(newValue) {
                this.$emit("on-change", newValue);
            }
        },
        props: {
            title: String,
            direction: String,
            options: {
                type: Array,
                required: true
            },
            name: String,
            placeholder: String,
            readonly: Boolean,
            value: String
        }
    };
}, function(module, exports) {}, function(module, exports) {
    module.exports = '<div class=weui_cell :class="{\'weui_select_after\':title, \'weui_cell_select\':!readonly}"> <div class=weui_cell_hd v-if=title :class="{\'weui_cell_primary\':readonly}"> <label for="" class=weui_label :style="{width: $parent.labelWidth, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}">{{title}}</label> </div> <div class="weui_cell_bd weui_cell_primary" v-if=!readonly> <select class=weui_select :class="{\'vux-selector-no-padding\':!title}" :name=name v-model=value :style="{direction: direction}"> <option value="" v-if=placeholder :selected="placeholder && !value">{{placeholder}}</option> <option :value=one.key v-for="one in processOptions">{{one.value}}</option> </select> </div> <div class=weui_cell_ft v-else> {{value | findByKey processOptions}} </div> </div>';
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(3);
    __vue_script__ = __webpack_require__(2);
    __vue_template__ = __webpack_require__(4);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);