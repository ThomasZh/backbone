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
    var _multiItems = __webpack_require__(2);
    exports.default = {
        mixins: [ _multiItems.parentMixin ],
        props: {
            iconClass: String
        }
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var parentMixin = {
        ready: function ready() {
            this.updateIndex();
        },
        methods: {
            updateIndex: function updateIndex() {
                if (!this.$children) return;
                this.number = this.$children.length;
                var children = this.$children;
                for (var i = 0; i < children.length; i++) {
                    children[i].index = i;
                    if (children[i].selected) {
                        this.index = i;
                    }
                }
            }
        },
        props: {
            index: {
                type: Number,
                "default": -1
            }
        },
        watch: {
            index: function index(val, oldVal) {
                oldVal > -1 && (this.$children[oldVal].selected = false);
                this.$children[val].selected = true;
            }
        },
        data: function data() {
            return {
                number: this.$children.length
            };
        }
    };
    var childMixin = {
        props: {
            selected: {
                type: Boolean,
                "default": false
            }
        },
        ready: function ready() {
            this.$parent.updateIndex();
        },
        beforeDestroy: function beforeDestroy() {
            var $parent = this.$parent;
            this.$nextTick(function() {
                $parent.updateIndex();
            });
        },
        methods: {
            onItemClick: function onItemClick() {
                this.selected = true;
                this.$parent.index = this.index;
                this.$emit("on-item-click");
            }
        },
        watch: {
            selected: function selected(val) {
                if (val) {
                    this.$parent.index = this.index;
                }
            }
        },
        data: function data() {
            return {
                index: -1
            };
        }
    };
    exports.parentMixin = parentMixin;
    exports.childMixin = childMixin;
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div class=weui_tabbar> <slot></slot> </div>";
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
} ]);