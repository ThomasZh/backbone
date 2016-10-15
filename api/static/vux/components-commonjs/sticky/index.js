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
    var _sticky = __webpack_require__(2);
    var _sticky2 = _interopRequireDefault(_sticky);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        ready: function ready() {
            (0, _sticky2.default)(this.$el);
        }
    };
}, function(module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = function(nav) {
        if (gtIOS6() || isSupportSticky()) {
            nav.classList.add("vux-sticky");
        } else {
            var navOffsetY = nav.offsetTop;
            window.addEventListener("scroll", function() {
                window.scrollY >= navOffsetY ? nav.classList.add("vux-fixed") : nav.classList.remove("vux-fixed");
            });
        }
    };
    function gtIOS6() {
        var userAgent = window.navigator.userAgent;
        var ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/);
        return ios && ios[2] && parseInt(ios[2].replace(/_/g, "."), 10) >= 6;
    }
    function isSupportSticky() {
        var prefixTestList = [ "", "-webkit-", "-ms-", "-moz-", "-o-" ];
        var stickyText = "";
        for (var i = 0; i < prefixTestList.length; i++) {
            stickyText += "position:" + prefixTestList[i] + "sticky";
        }
        var div = document.createElement("div");
        var body = document.body;
        div.style.cssText = "display:none" + stickyText;
        body.appendChild(div);
        var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
        body.removeChild(div);
        div = null;
        return isSupport;
    }
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div><slot></slot></div>";
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