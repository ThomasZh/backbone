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
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _countup = __webpack_require__(2);
    var _countup2 = _interopRequireDefault(_countup);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = {
        ready: function ready() {
            this._countup = new _countup2.default(this.$el, this.startVal, this.endVal, this.decimals, this.duration, this.options);
            this._countup.start();
        },
        props: {
            startVal: {
                type: Number,
                "default": 0
            },
            endVal: {
                type: Number,
                required: true
            },
            decimals: {
                type: Number,
                "default": 0
            },
            duration: {
                type: Number,
                "default": 2
            },
            options: {
                type: Object,
                "default": function _default() {
                    return {};
                }
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(a, e) {
        true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = e, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == typeof exports ? module.exports = e(require, exports, module) : a.CountUp = e();
    }(this, function(a, e, n) {
        var t = function(a, e, n, t, r, i) {
            console.error('Please adjust your project dependencies: CountUp is now maintained under "countup.js". The repo you are currently using under the npm package name "countup" is deprecated.');
            for (var o = 0, s = [ "webkit", "moz", "ms", "o" ], u = 0; u < s.length && !window.requestAnimationFrame; ++u) window.requestAnimationFrame = window[s[u] + "RequestAnimationFrame"], 
            window.cancelAnimationFrame = window[s[u] + "CancelAnimationFrame"] || window[s[u] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(a, e) {
                var n = new Date().getTime(), t = Math.max(0, 16 - (n - o)), r = window.setTimeout(function() {
                    a(n + t);
                }, t);
                return o = n + t, r;
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
                clearTimeout(a);
            });
            var m = this;
            m.options = {
                useEasing: !0,
                useGrouping: !0,
                separator: ",",
                decimal: ".",
                easingFn: null,
                formattingFn: null
            };
            for (var l in i) i.hasOwnProperty(l) && (m.options[l] = i[l]);
            "" === m.options.separator && (m.options.useGrouping = !1), m.options.prefix || (m.options.prefix = ""), 
            m.options.suffix || (m.options.suffix = ""), m.d = "string" == typeof a ? document.getElementById(a) : a, 
            m.startVal = Number(e), m.endVal = Number(n), m.countDown = m.startVal > m.endVal, 
            m.frameVal = m.startVal, m.decimals = Math.max(0, t || 0), m.dec = Math.pow(10, m.decimals), 
            m.duration = 1e3 * Number(r) || 2e3, m.formatNumber = function(a) {
                a = a.toFixed(m.decimals), a += "";
                var e, n, t, r;
                if (e = a.split("."), n = e[0], t = e.length > 1 ? m.options.decimal + e[1] : "", 
                r = /(\d+)(\d{3})/, m.options.useGrouping) for (;r.test(n); ) n = n.replace(r, "$1" + m.options.separator + "$2");
                return m.options.prefix + n + t + m.options.suffix;
            }, m.easeOutExpo = function(a, e, n, t) {
                return n * (-Math.pow(2, -10 * a / t) + 1) * 1024 / 1023 + e;
            }, m.easingFn = m.options.easingFn ? m.options.easingFn : m.easeOutExpo, m.formattingFn = m.options.formattingFn ? m.options.formattingFn : m.formatNumber, 
            m.version = function() {
                return "1.7.1";
            }, m.printValue = function(a) {
                var e = m.formattingFn(a);
                "INPUT" === m.d.tagName ? this.d.value = e : "text" === m.d.tagName || "tspan" === m.d.tagName ? this.d.textContent = e : this.d.innerHTML = e;
            }, m.count = function(a) {
                m.startTime || (m.startTime = a), m.timestamp = a;
                var e = a - m.startTime;
                m.remaining = m.duration - e, m.options.useEasing ? m.countDown ? m.frameVal = m.startVal - m.easingFn(e, 0, m.startVal - m.endVal, m.duration) : m.frameVal = m.easingFn(e, m.startVal, m.endVal - m.startVal, m.duration) : m.countDown ? m.frameVal = m.startVal - (m.startVal - m.endVal) * (e / m.duration) : m.frameVal = m.startVal + (m.endVal - m.startVal) * (e / m.duration), 
                m.countDown ? m.frameVal = m.frameVal < m.endVal ? m.endVal : m.frameVal : m.frameVal = m.frameVal > m.endVal ? m.endVal : m.frameVal, 
                m.frameVal = Math.round(m.frameVal * m.dec) / m.dec, m.printValue(m.frameVal), e < m.duration ? m.rAF = requestAnimationFrame(m.count) : m.callback && m.callback();
            }, m.start = function(a) {
                return m.callback = a, m.rAF = requestAnimationFrame(m.count), !1;
            }, m.pauseResume = function() {
                m.paused ? (m.paused = !1, delete m.startTime, m.duration = m.remaining, m.startVal = m.frameVal, 
                requestAnimationFrame(m.count)) : (m.paused = !0, cancelAnimationFrame(m.rAF));
            }, m.reset = function() {
                m.paused = !1, delete m.startTime, m.startVal = e, cancelAnimationFrame(m.rAF), 
                m.printValue(m.startVal);
            }, m.update = function(a) {
                cancelAnimationFrame(m.rAF), m.paused = !1, delete m.startTime, m.startVal = m.frameVal, 
                m.endVal = Number(a), m.countDown = m.startVal > m.endVal, m.rAF = requestAnimationFrame(m.count);
            }, m.printValue(m.startVal);
        };
        return t;
    });
}, function(module, exports) {
    module.exports = "<span>{{startVal}}</span>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_script__ = __webpack_require__(1);
    __vue_template__ = __webpack_require__(3);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);