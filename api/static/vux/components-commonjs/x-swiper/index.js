/*!
 * Vux v0.1.3-rc9 (https://vux.li)
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
    module.exports = __webpack_require__(40);
}, function(module, exports) {
    var global = module.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
    if (typeof __g == "number") __g = global;
}, function(module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function(it, key) {
        return hasOwnProperty.call(it, key);
    };
}, function(module, exports, __webpack_require__) {
    var IObject = __webpack_require__(33), defined = __webpack_require__(17);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports) {
    var core = module.exports = {
        version: "2.4.0"
    };
    if (typeof __e == "number") __e = core;
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(6)(function() {
        return Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports) {
    module.exports = function(exec) {
        try {
            return !!exec();
        } catch (e) {
            return true;
        }
    };
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(8), createDesc = __webpack_require__(15);
    module.exports = __webpack_require__(5) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        object[key] = value;
        return object;
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(11), IE8_DOM_DEFINE = __webpack_require__(32), toPrimitive = __webpack_require__(27), dP = Object.defineProperty;
    exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPrimitive(P, true);
        anObject(Attributes);
        if (IE8_DOM_DEFINE) try {
            return dP(O, P, Attributes);
        } catch (e) {}
        if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(37), enumBugKeys = __webpack_require__(18);
    module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
    };
}, function(module, exports, __webpack_require__) {
    var store = __webpack_require__(24)("wks"), uid = __webpack_require__(16), Symbol = __webpack_require__(1).Symbol, USE_SYMBOL = typeof Symbol == "function";
    var $exports = module.exports = function(name) {
        return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)("Symbol." + name));
    };
    $exports.store = store;
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(13);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(1), core = __webpack_require__(4), ctx = __webpack_require__(54), hide = __webpack_require__(7), PROTOTYPE = "prototype";
    var $export = function(type, name, source) {
        var IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), expProto = exports[PROTOTYPE], target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE], key, own, out;
        if (IS_GLOBAL) source = name;
        for (key in source) {
            own = !IS_FORCED && target && target[key] !== undefined;
            if (own && key in exports) continue;
            out = own ? target[key] : source[key];
            exports[key] = IS_GLOBAL && typeof target[key] != "function" ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
                var F = function(a, b, c) {
                    if (this instanceof C) {
                        switch (arguments.length) {
                          case 0:
                            return new C();

                          case 1:
                            return new C(a);

                          case 2:
                            return new C(a, b);
                        }
                        return new C(a, b, c);
                    }
                    return C.apply(this, arguments);
                };
                F[PROTOTYPE] = C[PROTOTYPE];
                return F;
            }(out) : IS_PROTO && typeof out == "function" ? ctx(Function.call, out) : out;
            if (IS_PROTO) {
                (exports.virtual || (exports.virtual = {}))[key] = out;
                if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
            }
        }
    };
    $export.F = 1;
    $export.G = 2;
    $export.S = 4;
    $export.P = 8;
    $export.B = 16;
    $export.W = 32;
    $export.U = 64;
    $export.R = 128;
    module.exports = $export;
}, function(module, exports) {
    module.exports = function(it) {
        return typeof it === "object" ? it !== null : typeof it === "function";
    };
}, function(module, exports) {
    exports.f = {}.propertyIsEnumerable;
}, function(module, exports) {
    module.exports = function(bitmap, value) {
        return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value
        };
    };
}, function(module, exports) {
    var id = 0, px = Math.random();
    module.exports = function(key) {
        return "Symbol(".concat(key === undefined ? "" : key, ")_", (++id + px).toString(36));
    };
}, function(module, exports) {
    module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, function(module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(module, exports) {
    module.exports = {};
}, function(module, exports) {
    module.exports = true;
}, function(module, exports) {
    exports.f = Object.getOwnPropertySymbols;
}, function(module, exports, __webpack_require__) {
    var def = __webpack_require__(8).f, has = __webpack_require__(2), TAG = __webpack_require__(10)("toStringTag");
    module.exports = function(it, tag, stat) {
        if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
            configurable: true,
            value: tag
        });
    };
}, function(module, exports, __webpack_require__) {
    var shared = __webpack_require__(24)("keys"), uid = __webpack_require__(16);
    module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key));
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(1), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
    module.exports = function(key) {
        return store[key] || (store[key] = {});
    };
}, function(module, exports) {
    var ceil = Math.ceil, floor = Math.floor;
    module.exports = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
}, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(17);
    module.exports = function(it) {
        return Object(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(13);
    module.exports = function(it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        if (typeof (fn = it.valueOf) == "function" && !isObject(val = fn.call(it))) return val;
        if (!S && typeof (fn = it.toString) == "function" && !isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(1), core = __webpack_require__(4), LIBRARY = __webpack_require__(20), wksExt = __webpack_require__(29), defineProperty = __webpack_require__(8).f;
    module.exports = function(name) {
        var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
        if (name.charAt(0) != "_" && !(name in $Symbol)) defineProperty($Symbol, name, {
            value: wksExt.f(name)
        });
    };
}, function(module, exports, __webpack_require__) {
    exports.f = __webpack_require__(10);
}, function(module, exports) {
    var toString = {}.toString;
    module.exports = function(it) {
        return toString.call(it).slice(8, -1);
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(13), document = __webpack_require__(1).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(5) && !__webpack_require__(6)(function() {
        return Object.defineProperty(__webpack_require__(31)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a != 7;
    });
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(30);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return cof(it) == "String" ? it.split("") : Object(it);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var LIBRARY = __webpack_require__(20), $export = __webpack_require__(12), redefine = __webpack_require__(38), hide = __webpack_require__(7), has = __webpack_require__(2), Iterators = __webpack_require__(19), $iterCreate = __webpack_require__(58), setToStringTag = __webpack_require__(22), getPrototypeOf = __webpack_require__(66), ITERATOR = __webpack_require__(10)("iterator"), BUGGY = !([].keys && "next" in [].keys()), FF_ITERATOR = "@@iterator", KEYS = "keys", VALUES = "values";
    var returnThis = function() {
        return this;
    };
    module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
        $iterCreate(Constructor, NAME, next);
        var getMethod = function(kind) {
            if (!BUGGY && kind in proto) return proto[kind];
            switch (kind) {
              case KEYS:
                return function keys() {
                    return new Constructor(this, kind);
                };

              case VALUES:
                return function values() {
                    return new Constructor(this, kind);
                };
            }
            return function entries() {
                return new Constructor(this, kind);
            };
        };
        var TAG = NAME + " Iterator", DEF_VALUES = DEFAULT == VALUES, VALUES_BUG = false, proto = Base.prototype, $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT], $default = $native || getMethod(DEFAULT), $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod("entries") : undefined, $anyNative = NAME == "Array" ? proto.entries || $native : $native, methods, key, IteratorPrototype;
        if ($anyNative) {
            IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
            if (IteratorPrototype !== Object.prototype) {
                setToStringTag(IteratorPrototype, TAG, true);
                if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
            }
        }
        if (DEF_VALUES && $native && $native.name !== VALUES) {
            VALUES_BUG = true;
            $default = function values() {
                return $native.call(this);
            };
        }
        if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
            hide(proto, ITERATOR, $default);
        }
        Iterators[NAME] = $default;
        Iterators[TAG] = returnThis;
        if (DEFAULT) {
            methods = {
                values: DEF_VALUES ? $default : getMethod(VALUES),
                keys: IS_SET ? $default : getMethod(KEYS),
                entries: $entries
            };
            if (FORCED) for (key in methods) {
                if (!(key in proto)) redefine(proto, key, methods[key]);
            } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
        }
        return methods;
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(11), dPs = __webpack_require__(63), enumBugKeys = __webpack_require__(18), IE_PROTO = __webpack_require__(23)("IE_PROTO"), Empty = function() {}, PROTOTYPE = "prototype";
    var createDict = function() {
        var iframe = __webpack_require__(31)("iframe"), i = enumBugKeys.length, gt = ">", iframeDocument;
        iframe.style.display = "none";
        __webpack_require__(56).appendChild(iframe);
        iframe.src = "javascript:";
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write("<script>document.F=Object</script" + gt);
        iframeDocument.close();
        createDict = iframeDocument.F;
        while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
        return createDict();
    };
    module.exports = Object.create || function create(O, Properties) {
        var result;
        if (O !== null) {
            Empty[PROTOTYPE] = anObject(O);
            result = new Empty();
            Empty[PROTOTYPE] = null;
            result[IE_PROTO] = O;
        } else result = createDict();
        return Properties === undefined ? result : dPs(result, Properties);
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(37), hiddenKeys = __webpack_require__(18).concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return $keys(O, hiddenKeys);
    };
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(2), toIObject = __webpack_require__(3), arrayIndexOf = __webpack_require__(53)(false), IE_PROTO = __webpack_require__(23)("IE_PROTO");
    module.exports = function(object, names) {
        var O = toIObject(object), i = 0, result = [], key;
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
        while (names.length > i) if (has(O, key = names[i++])) {
            ~arrayIndexOf(result, key) || result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(7);
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _assign = __webpack_require__(42);
    var _assign2 = _interopRequireDefault(_assign);
    var _keys = __webpack_require__(43);
    var _keys2 = _interopRequireDefault(_keys);
    var _swiper = __webpack_require__(41);
    var _swiper2 = _interopRequireDefault(_swiper);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    var getProps = function getProps() {
        return {
            direction: String,
            touchEventsTarget: String,
            initialSlide: Number,
            speed: Number,
            autoplay: [ Boolean, Number ],
            autoplayDisableOnInteraction: Boolean,
            autoplayStopOnLast: Boolean,
            iOSEdgeSwipeDetection: Boolean,
            iOSEdgeSwipeThreshold: Number,
            freeMode: Boolean,
            freeModeMomentum: Boolean,
            freeModeMomentumRatio: Number,
            freeModeMomentumBounce: Boolean,
            freeModeMomentumBounceRatio: Number,
            freeModeSticky: Boolean,
            freeModeMinimumVelocity: Number,
            autoHeight: Boolean,
            setWrapperSize: Boolean,
            virtualTranslate: Boolean,
            breakpoints: Object,
            spaceBetween: Number,
            slidesPerView: [ Number, String ],
            slidesPerColumn: Number,
            slidesPerColumnFill: String,
            slidesPerGroup: Number,
            centeredSlides: Boolean,
            slidesOffsetBefore: Number,
            slidesOffsetAfter: Number,
            roundLengths: Boolean,
            touchRatio: Number,
            touchAngle: Number,
            simulateTouch: Boolean,
            shortSwipes: Boolean,
            longSwipes: Boolean,
            longSwipesRatio: Number,
            longSwipesMs: Number,
            followFinger: Boolean,
            onlyExternal: Boolean,
            threshold: Number,
            touchMoveStopPropagation: Boolean,
            uniqueNavElements: Boolean,
            pagination: Boolean,
            paginationElement: String,
            paginationClickable: Boolean,
            paginationHide: Boolean,
            paginationBulletRender: Function,
            paginationProgressRender: Function,
            paginationFractionRender: Function,
            paginationCustomRender: Function,
            paginationType: String,
            resistance: Boolean,
            resistanceRatio: Number,
            nextButton: Boolean,
            prevButton: Boolean,
            watchSlidesProgress: Boolean,
            watchSlidesVisibility: Boolean,
            grabCursor: Boolean,
            preventClicks: Boolean,
            preventClicksPropagation: Boolean,
            slideToClickedSlide: Boolean,
            lazyLoading: Boolean,
            lazyLoadingInPrevNext: Boolean,
            lazyLoadingInPrevNextAmount: Number,
            lazyLoadingOnTransitionStart: Boolean,
            preloadImages: Boolean,
            updateOnImagesReady: Boolean,
            loop: Boolean,
            loopAdditionalSlides: Number,
            loopedSlides: Number,
            allowSwipeToPrev: Boolean,
            allowSwipeToNext: Boolean,
            swipeHandler: String,
            noSwiping: Boolean,
            noSwipingClass: String,
            observer: Boolean,
            observeParents: Boolean,
            runCallbacksOnInit: Boolean
        };
    };
    exports.default = {
        props: getProps(),
        ready: function ready() {
            var _this = this;
            var keys = (0, _keys2.default)(getProps());
            var _props = {};
            keys.forEach(function(item) {
                _this[item] && (_props[item] = _this[item]);
            });
            (0, _assign2.default)(_props, {
                pagination: _props.pagination && this.$el.querySelector(".vux-swiper-pagination"),
                nextButton: _props.nextButton && this.$el.querySelector(".vux-swiper-button-next"),
                prevButton: _props.prevButton && this.$el.querySelector(".vux-swiper-button-prev"),
                onInit: this._events["init"] && function(swiper) {
                    _this.$emit("on-init", swiper);
                }
            });
            this.swiper = new _swiper2.default(this.$el, _props);
            var _loop = function _loop(k) {
                if (k && !k.startsWith("hook")) {
                    var e = k.replace(/(-\w)/g, function(s) {
                        return s.toUpperCase().substring(1);
                    });
                    _this.swiper.on(e, function(swiper, evt) {
                        _this.$emit(k, swiper, evt);
                    });
                }
            };
            for (var k in this._events) {
                _loop(k);
            }
        },
        beforeDestroy: function beforeDestroy() {
            this.swiper && this.swiper.destroy(true, true);
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.XSwiperItem = exports.XSwiper = undefined;
    var _xswiper = __webpack_require__(84);
    var _xswiper2 = _interopRequireDefault(_xswiper);
    var _xswiperItem = __webpack_require__(83);
    var _xswiperItem2 = _interopRequireDefault(_xswiperItem);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.XSwiper = _xswiper2.default;
    exports.XSwiperItem = _xswiperItem2.default;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _typeof2 = __webpack_require__(46);
    var _typeof3 = _interopRequireDefault(_typeof2);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    (function() {
        "use strict";
        var $;
        var Swiper = function Swiper(container, params) {
            if (!(this instanceof Swiper)) return new Swiper(container, params);
            var defaults = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: false,
                autoplayDisableOnInteraction: true,
                autoplayStopOnLast: false,
                iOSEdgeSwipeDetection: false,
                iOSEdgeSwipeThreshold: 20,
                freeMode: false,
                freeModeMomentum: true,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: true,
                freeModeMomentumBounceRatio: 1,
                freeModeSticky: false,
                freeModeMinimumVelocity: .02,
                autoHeight: false,
                setWrapperSize: false,
                virtualTranslate: false,
                effect: "slide",
                breakpoints: undefined,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: false,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: false,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: true,
                shortSwipes: true,
                longSwipes: true,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: true,
                onlyExternal: false,
                threshold: 0,
                touchMoveStopPropagation: true,
                uniqueNavElements: true,
                pagination: null,
                paginationElement: "span",
                paginationClickable: false,
                paginationHide: false,
                paginationBulletRender: null,
                paginationProgressRender: null,
                paginationFractionRender: null,
                paginationCustomRender: null,
                paginationType: "bullets",
                resistance: true,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: false,
                watchSlidesVisibility: false,
                grabCursor: false,
                preventClicks: true,
                preventClicksPropagation: true,
                slideToClickedSlide: false,
                lazyLoading: false,
                lazyLoadingInPrevNext: false,
                lazyLoadingInPrevNextAmount: 1,
                lazyLoadingOnTransitionStart: false,
                preloadImages: true,
                updateOnImagesReady: true,
                loop: false,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: undefined,
                controlInverse: false,
                controlBy: "slide",
                allowSwipeToPrev: true,
                allowSwipeToNext: true,
                swipeHandler: null,
                noSwiping: true,
                noSwipingClass: "vux-swiper-no-swiping",
                slideClass: "vux-swiper-slide",
                slideActiveClass: "vux-swiper-slide-active",
                slideVisibleClass: "vux-swiper-slide-visible",
                slideDuplicateClass: "vux-swiper-slide-duplicate",
                slideNextClass: "vux-swiper-slide-next",
                slidePrevClass: "vux-swiper-slide-prev",
                wrapperClass: "vux-swiper-wrapper",
                bulletClass: "vux-swiper-pagination-bullet",
                bulletActiveClass: "vux-swiper-pagination-bullet-active",
                buttonDisabledClass: "vux-swiper-button-disabled",
                paginationCurrentClass: "vux-swiper-pagination-current",
                paginationTotalClass: "vux-swiper-pagination-total",
                paginationHiddenClass: "vux-swiper-pagination-hidden",
                paginationProgressbarClass: "vux-swiper-pagination-progressbar",
                lazyLoadingClass: "vux-swiper-lazy",
                observer: false,
                observeParents: false,
                runCallbacksOnInit: true
            };
            var initialVirtualTranslate = params && params.virtualTranslate;
            params = params || {};
            var originalParams = {};
            for (var param in params) {
                if ((0, _typeof3.default)(params[param]) === "object" && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || typeof Dom7 !== "undefined" && params[param] instanceof Dom7 || typeof jQuery !== "undefined" && params[param] instanceof jQuery)) {
                    originalParams[param] = {};
                    for (var deepParam in params[param]) {
                        originalParams[param][deepParam] = params[param][deepParam];
                    }
                } else {
                    originalParams[param] = params[param];
                }
            }
            for (var def in defaults) {
                if (typeof params[def] === "undefined") {
                    params[def] = defaults[def];
                } else if ((0, _typeof3.default)(params[def]) === "object") {
                    for (var deepDef in defaults[def]) {
                        if (typeof params[def][deepDef] === "undefined") {
                            params[def][deepDef] = defaults[def][deepDef];
                        }
                    }
                }
            }
            var s = this;
            s.params = params;
            s.originalParams = originalParams;
            s.classNames = [];
            if (typeof $ !== "undefined" && typeof Dom7 !== "undefined") {
                $ = Dom7;
            }
            if (typeof $ === "undefined") {
                if (typeof Dom7 === "undefined") {
                    $ = window.Dom7 || window.Zepto || window.jQuery;
                } else {
                    $ = Dom7;
                }
                if (!$) return;
            }
            s.$ = $;
            s.currentBreakpoint = undefined;
            s.getActiveBreakpoint = function() {
                if (!s.params.breakpoints) return false;
                var breakpoint = false;
                var points = [], point;
                for (point in s.params.breakpoints) {
                    if (s.params.breakpoints.hasOwnProperty(point)) {
                        points.push(point);
                    }
                }
                points.sort(function(a, b) {
                    return parseInt(a, 10) > parseInt(b, 10);
                });
                for (var i = 0; i < points.length; i++) {
                    point = points[i];
                    if (point >= window.innerWidth && !breakpoint) {
                        breakpoint = point;
                    }
                }
                return breakpoint || "max";
            };
            s.setBreakpoint = function() {
                var breakpoint = s.getActiveBreakpoint();
                if (breakpoint && s.currentBreakpoint !== breakpoint) {
                    var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                    var needsReLoop = s.params.loop && breakPointsParams.slidesPerView !== s.params.slidesPerView;
                    for (var param in breakPointsParams) {
                        s.params[param] = breakPointsParams[param];
                    }
                    s.currentBreakpoint = breakpoint;
                    if (needsReLoop && s.destroyLoop) {
                        s.reLoop(true);
                    }
                }
            };
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }
            s.container = $(container);
            if (s.container.length === 0) return;
            if (s.container.length > 1) {
                var swipers = [];
                s.container.each(function() {
                    var container = this;
                    swipers.push(new Swiper(this, params));
                });
                return swipers;
            }
            s.container[0].swiper = s;
            s.container.data("vux-swiper", s);
            s.classNames.push("vux-swiper-container-" + s.params.direction);
            if (s.params.freeMode) {
                s.classNames.push("vux-swiper-container-free-mode");
            }
            if (!s.support.flexbox) {
                s.classNames.push("vux-swiper-container-no-flexbox");
                s.params.slidesPerColumn = 1;
            }
            if (s.params.autoHeight) {
                s.classNames.push("vux-swiper-container-autoheight");
            }
            if (s.params.parallax || s.params.watchSlidesVisibility) {
                s.params.watchSlidesProgress = true;
            }
            if ([ "cube", "coverflow", "flip" ].indexOf(s.params.effect) >= 0) {
                if (s.support.transforms3d) {
                    s.params.watchSlidesProgress = true;
                    s.classNames.push("vux-swiper-container-3d");
                } else {
                    s.params.effect = "slide";
                }
            }
            if (s.params.effect !== "slide") {
                s.classNames.push("vux-swiper-container-" + s.params.effect);
            }
            if (s.params.effect === "cube") {
                s.params.resistanceRatio = 0;
                s.params.slidesPerView = 1;
                s.params.slidesPerColumn = 1;
                s.params.slidesPerGroup = 1;
                s.params.centeredSlides = false;
                s.params.spaceBetween = 0;
                s.params.virtualTranslate = true;
                s.params.setWrapperSize = false;
            }
            if (s.params.effect === "fade" || s.params.effect === "flip") {
                s.params.slidesPerView = 1;
                s.params.slidesPerColumn = 1;
                s.params.slidesPerGroup = 1;
                s.params.watchSlidesProgress = true;
                s.params.spaceBetween = 0;
                s.params.setWrapperSize = false;
                if (typeof initialVirtualTranslate === "undefined") {
                    s.params.virtualTranslate = true;
                }
            }
            if (s.params.grabCursor && s.support.touch) {
                s.params.grabCursor = false;
            }
            s.wrapper = s.container.children("." + s.params.wrapperClass);
            if (s.params.pagination) {
                s.paginationContainer = $(s.params.pagination);
                if (s.params.uniqueNavElements && typeof s.params.pagination === "string" && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                    s.paginationContainer = s.container.find(s.params.pagination);
                }
                if (s.params.paginationType === "bullets" && s.params.paginationClickable) {
                    s.paginationContainer.addClass("vux-swiper-pagination-clickable");
                } else {
                    s.params.paginationClickable = false;
                }
                s.paginationContainer.addClass("vux-swiper-pagination-" + s.params.paginationType);
            }
            if (s.params.nextButton || s.params.prevButton) {
                if (s.params.nextButton) {
                    s.nextButton = $(s.params.nextButton);
                    if (s.params.uniqueNavElements && typeof s.params.nextButton === "string" && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                        s.nextButton = s.container.find(s.params.nextButton);
                    }
                }
                if (s.params.prevButton) {
                    s.prevButton = $(s.params.prevButton);
                    if (s.params.uniqueNavElements && typeof s.params.prevButton === "string" && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                        s.prevButton = s.container.find(s.params.prevButton);
                    }
                }
            }
            s.isHorizontal = function() {
                return s.params.direction === "horizontal";
            };
            s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === "rtl" || s.container.css("direction") === "rtl");
            if (s.rtl) {
                s.classNames.push("vux-swiper-container-rtl");
            }
            if (s.rtl) {
                s.wrongRTL = s.wrapper.css("display") === "-webkit-box";
            }
            if (s.params.slidesPerColumn > 1) {
                s.classNames.push("vux-swiper-container-multirow");
            }
            if (s.device.android) {
                s.classNames.push("vux-swiper-container-android");
            }
            s.container.addClass(s.classNames.join(" "));
            s.translate = 0;
            s.progress = 0;
            s.velocity = 0;
            s.lockSwipeToNext = function() {
                s.params.allowSwipeToNext = false;
                if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
                    s.unsetGrabCursor();
                }
            };
            s.lockSwipeToPrev = function() {
                s.params.allowSwipeToPrev = false;
                if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
                    s.unsetGrabCursor();
                }
            };
            s.lockSwipes = function() {
                s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
                if (s.params.grabCursor) s.unsetGrabCursor();
            };
            s.unlockSwipeToNext = function() {
                s.params.allowSwipeToNext = true;
                if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
                    s.setGrabCursor();
                }
            };
            s.unlockSwipeToPrev = function() {
                s.params.allowSwipeToPrev = true;
                if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
                    s.setGrabCursor();
                }
            };
            s.unlockSwipes = function() {
                s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
                if (s.params.grabCursor) s.setGrabCursor();
            };
            function round(a) {
                return Math.floor(a);
            }
            s.setGrabCursor = function(moving) {
                s.container[0].style.cursor = "move";
                s.container[0].style.cursor = moving ? "-webkit-grabbing" : "-webkit-grab";
                s.container[0].style.cursor = moving ? "-moz-grabbin" : "-moz-grab";
                s.container[0].style.cursor = moving ? "grabbing" : "grab";
            };
            s.unsetGrabCursor = function() {
                s.container[0].style.cursor = "";
            };
            if (s.params.grabCursor) {
                s.setGrabCursor();
            }
            s.imagesToLoad = [];
            s.imagesLoaded = 0;
            s.loadImage = function(imgElement, src, srcset, checkForComplete, callback) {
                var image;
                function onReady() {
                    if (callback) callback();
                }
                if (!imgElement.complete || !checkForComplete) {
                    if (src) {
                        image = new window.Image();
                        image.onload = onReady;
                        image.onerror = onReady;
                        if (srcset) {
                            image.srcset = srcset;
                        }
                        if (src) {
                            image.src = src;
                        }
                    } else {
                        onReady();
                    }
                } else {
                    onReady();
                }
            };
            s.preloadImages = function() {
                s.imagesToLoad = s.container.find("img");
                function _onReady() {
                    if (typeof s === "undefined" || s === null) return;
                    if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                    if (s.imagesLoaded === s.imagesToLoad.length) {
                        if (s.params.updateOnImagesReady) s.update();
                        s.emit("onImagesReady", s);
                    }
                }
                for (var i = 0; i < s.imagesToLoad.length; i++) {
                    s.loadImage(s.imagesToLoad[i], s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute("src"), s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute("srcset"), true, _onReady);
                }
            };
            s.autoplayTimeoutId = undefined;
            s.autoplaying = false;
            s.autoplayPaused = false;
            function autoplay() {
                s.autoplayTimeoutId = setTimeout(function() {
                    if (s.params.loop) {
                        s.fixLoop();
                        s._slideNext();
                        s.emit("onAutoplay", s);
                    } else {
                        if (!s.isEnd) {
                            s._slideNext();
                            s.emit("onAutoplay", s);
                        } else {
                            if (!params.autoplayStopOnLast) {
                                s._slideTo(0);
                                s.emit("onAutoplay", s);
                            } else {
                                s.stopAutoplay();
                            }
                        }
                    }
                }, s.params.autoplay);
            }
            s.startAutoplay = function() {
                if (typeof s.autoplayTimeoutId !== "undefined") return false;
                if (!s.params.autoplay) return false;
                if (s.autoplaying) return false;
                s.autoplaying = true;
                s.emit("onAutoplayStart", s);
                autoplay();
            };
            s.stopAutoplay = function(internal) {
                if (!s.autoplayTimeoutId) return;
                if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
                s.autoplaying = false;
                s.autoplayTimeoutId = undefined;
                s.emit("onAutoplayStop", s);
            };
            s.pauseAutoplay = function(speed) {
                if (s.autoplayPaused) return;
                if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
                s.autoplayPaused = true;
                if (speed === 0) {
                    s.autoplayPaused = false;
                    autoplay();
                } else {
                    s.wrapper.transitionEnd(function() {
                        if (!s) return;
                        s.autoplayPaused = false;
                        if (!s.autoplaying) {
                            s.stopAutoplay();
                        } else {
                            autoplay();
                        }
                    });
                }
            };
            s.minTranslate = function() {
                return -s.snapGrid[0];
            };
            s.maxTranslate = function() {
                return -s.snapGrid[s.snapGrid.length - 1];
            };
            s.updateAutoHeight = function() {
                var slide = s.slides.eq(s.activeIndex)[0];
                if (typeof slide !== "undefined") {
                    var newHeight = slide.offsetHeight;
                    if (newHeight) s.wrapper.css("height", newHeight + "px");
                }
            };
            s.updateContainerSize = function() {
                var width, height;
                if (typeof s.params.width !== "undefined") {
                    width = s.params.width;
                } else {
                    width = s.container[0].clientWidth;
                }
                if (typeof s.params.height !== "undefined") {
                    height = s.params.height;
                } else {
                    height = s.container[0].clientHeight;
                }
                if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                    return;
                }
                width = width - parseInt(s.container.css("padding-left"), 10) - parseInt(s.container.css("padding-right"), 10);
                height = height - parseInt(s.container.css("padding-top"), 10) - parseInt(s.container.css("padding-bottom"), 10);
                s.width = width;
                s.height = height;
                s.size = s.isHorizontal() ? s.width : s.height;
            };
            s.updateSlidesSize = function() {
                s.slides = s.wrapper.children("." + s.params.slideClass);
                s.snapGrid = [];
                s.slidesGrid = [];
                s.slidesSizesGrid = [];
                var spaceBetween = s.params.spaceBetween, slidePosition = -s.params.slidesOffsetBefore, i, prevSlideSize = 0, index = 0;
                if (typeof s.size === "undefined") return;
                if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
                    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * s.size;
                }
                s.virtualSize = -spaceBetween;
                if (s.rtl) s.slides.css({
                    marginLeft: "",
                    marginTop: ""
                }); else s.slides.css({
                    marginRight: "",
                    marginBottom: ""
                });
                var slidesNumberEvenToRows;
                if (s.params.slidesPerColumn > 1) {
                    if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                        slidesNumberEvenToRows = s.slides.length;
                    } else {
                        slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                    }
                    if (s.params.slidesPerView !== "auto" && s.params.slidesPerColumnFill === "row") {
                        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                    }
                }
                var slideSize;
                var slidesPerColumn = s.params.slidesPerColumn;
                var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
                var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
                for (i = 0; i < s.slides.length; i++) {
                    slideSize = 0;
                    var slide = s.slides.eq(i);
                    if (s.params.slidesPerColumn > 1) {
                        var newSlideOrderIndex;
                        var column, row;
                        if (s.params.slidesPerColumnFill === "column") {
                            column = Math.floor(i / slidesPerColumn);
                            row = i - column * slidesPerColumn;
                            if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
                                if (++row >= slidesPerColumn) {
                                    row = 0;
                                    column++;
                                }
                            }
                            newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                            slide.css({
                                "-webkit-box-ordinal-group": newSlideOrderIndex,
                                "-moz-box-ordinal-group": newSlideOrderIndex,
                                "-ms-flex-order": newSlideOrderIndex,
                                "-webkit-order": newSlideOrderIndex,
                                order: newSlideOrderIndex
                            });
                        } else {
                            row = Math.floor(i / slidesPerRow);
                            column = i - row * slidesPerRow;
                        }
                        slide.css({
                            "margin-top": row !== 0 && s.params.spaceBetween && s.params.spaceBetween + "px"
                        }).attr("data-vux-swiper-column", column).attr("data-vux-swiper-row", row);
                    }
                    if (slide.css("display") === "none") continue;
                    if (s.params.slidesPerView === "auto") {
                        slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                        if (s.params.roundLengths) slideSize = round(slideSize);
                    } else {
                        slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                        if (s.params.roundLengths) slideSize = round(slideSize);
                        if (s.isHorizontal()) {
                            s.slides[i].style.width = slideSize + "px";
                        } else {
                            s.slides[i].style.height = slideSize + "px";
                        }
                    }
                    s.slides[i].swiperSlideSize = slideSize;
                    s.slidesSizesGrid.push(slideSize);
                    if (s.params.centeredSlides) {
                        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                        if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                        if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                        if (index % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                        s.slidesGrid.push(slidePosition);
                    } else {
                        if (index % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                        s.slidesGrid.push(slidePosition);
                        slidePosition = slidePosition + slideSize + spaceBetween;
                    }
                    s.virtualSize += slideSize + spaceBetween;
                    prevSlideSize = slideSize;
                    index++;
                }
                s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
                var newSlidesGrid;
                if (s.rtl && s.wrongRTL && (s.params.effect === "slide" || s.params.effect === "coverflow")) {
                    s.wrapper.css({
                        width: s.virtualSize + s.params.spaceBetween + "px"
                    });
                }
                if (!s.support.flexbox || s.params.setWrapperSize) {
                    if (s.isHorizontal()) s.wrapper.css({
                        width: s.virtualSize + s.params.spaceBetween + "px"
                    }); else s.wrapper.css({
                        height: s.virtualSize + s.params.spaceBetween + "px"
                    });
                }
                if (s.params.slidesPerColumn > 1) {
                    s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                    s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                    s.wrapper.css({
                        width: s.virtualSize + s.params.spaceBetween + "px"
                    });
                    if (s.params.centeredSlides) {
                        newSlidesGrid = [];
                        for (i = 0; i < s.snapGrid.length; i++) {
                            if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                        }
                        s.snapGrid = newSlidesGrid;
                    }
                }
                if (!s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] <= s.virtualSize - s.size) {
                            newSlidesGrid.push(s.snapGrid[i]);
                        }
                    }
                    s.snapGrid = newSlidesGrid;
                    if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                        s.snapGrid.push(s.virtualSize - s.size);
                    }
                }
                if (s.snapGrid.length === 0) s.snapGrid = [ 0 ];
                if (s.params.spaceBetween !== 0) {
                    if (s.isHorizontal()) {
                        if (s.rtl) s.slides.css({
                            marginLeft: spaceBetween + "px"
                        }); else s.slides.css({
                            marginRight: spaceBetween + "px"
                        });
                    } else s.slides.css({
                        marginBottom: spaceBetween + "px"
                    });
                }
                if (s.params.watchSlidesProgress) {
                    s.updateSlidesOffset();
                }
            };
            s.updateSlidesOffset = function() {
                for (var i = 0; i < s.slides.length; i++) {
                    s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
                }
            };
            s.updateSlidesProgress = function(translate) {
                if (typeof translate === "undefined") {
                    translate = s.translate || 0;
                }
                if (s.slides.length === 0) return;
                if (typeof s.slides[0].swiperSlideOffset === "undefined") s.updateSlidesOffset();
                var offsetCenter = -translate;
                if (s.rtl) offsetCenter = translate;
                s.slides.removeClass(s.params.slideVisibleClass);
                for (var i = 0; i < s.slides.length; i++) {
                    var slide = s.slides[i];
                    var slideProgress = (offsetCenter - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                    if (s.params.watchSlidesVisibility) {
                        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                        var slideAfter = slideBefore + s.slidesSizesGrid[i];
                        var isVisible = slideBefore >= 0 && slideBefore < s.size || slideAfter > 0 && slideAfter <= s.size || slideBefore <= 0 && slideAfter >= s.size;
                        if (isVisible) {
                            s.slides.eq(i).addClass(s.params.slideVisibleClass);
                        }
                    }
                    slide.progress = s.rtl ? -slideProgress : slideProgress;
                }
            };
            s.updateProgress = function(translate) {
                if (typeof translate === "undefined") {
                    translate = s.translate || 0;
                }
                var translatesDiff = s.maxTranslate() - s.minTranslate();
                var wasBeginning = s.isBeginning;
                var wasEnd = s.isEnd;
                if (translatesDiff === 0) {
                    s.progress = 0;
                    s.isBeginning = s.isEnd = true;
                } else {
                    s.progress = (translate - s.minTranslate()) / translatesDiff;
                    s.isBeginning = s.progress <= 0;
                    s.isEnd = s.progress >= 1;
                }
                if (s.isBeginning && !wasBeginning) s.emit("onReachBeginning", s);
                if (s.isEnd && !wasEnd) s.emit("onReachEnd", s);
                if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
                s.emit("onProgress", s, s.progress);
            };
            s.updateActiveIndex = function() {
                var translate = s.rtl ? s.translate : -s.translate;
                var newActiveIndex, i, snapIndex;
                for (i = 0; i < s.slidesGrid.length; i++) {
                    if (typeof s.slidesGrid[i + 1] !== "undefined") {
                        if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                            newActiveIndex = i;
                        } else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                            newActiveIndex = i + 1;
                        }
                    } else {
                        if (translate >= s.slidesGrid[i]) {
                            newActiveIndex = i;
                        }
                    }
                }
                if (newActiveIndex < 0 || typeof newActiveIndex === "undefined") newActiveIndex = 0;
                snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
                if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
                if (newActiveIndex === s.activeIndex) {
                    return;
                }
                s.snapIndex = snapIndex;
                s.previousIndex = s.activeIndex;
                s.activeIndex = newActiveIndex;
                s.updateClasses();
                s.updateRealIndex();
            };
            s.updateRealIndex = function() {
                s.realIndex = s.slides.eq(s.activeIndex).attr("data-vux-swiper-slide-index") || s.activeIndex;
            };
            s.updateClasses = function() {
                s.slides.removeClass(s.params.slideActiveClass + " " + s.params.slideNextClass + " " + s.params.slidePrevClass);
                var activeSlide = s.slides.eq(s.activeIndex);
                activeSlide.addClass(s.params.slideActiveClass);
                var nextSlide = activeSlide.next("." + s.params.slideClass).addClass(s.params.slideNextClass);
                if (s.params.loop && nextSlide.length === 0) {
                    s.slides.eq(0).addClass(s.params.slideNextClass);
                }
                var prevSlide = activeSlide.prev("." + s.params.slideClass).addClass(s.params.slidePrevClass);
                if (s.params.loop && prevSlide.length === 0) {
                    s.slides.eq(-1).addClass(s.params.slidePrevClass);
                }
                if (s.paginationContainer && s.paginationContainer.length > 0) {
                    var current, total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    if (s.params.loop) {
                        current = Math.ceil((s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup);
                        if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                            current = current - (s.slides.length - s.loopedSlides * 2);
                        }
                        if (current > total - 1) current = current - total;
                        if (current < 0 && s.params.paginationType !== "bullets") current = total + current;
                    } else {
                        if (typeof s.snapIndex !== "undefined") {
                            current = s.snapIndex;
                        } else {
                            current = s.activeIndex || 0;
                        }
                    }
                    if (s.params.paginationType === "bullets" && s.bullets && s.bullets.length > 0) {
                        s.bullets.removeClass(s.params.bulletActiveClass);
                        if (s.paginationContainer.length > 1) {
                            s.bullets.each(function() {
                                if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                            });
                        } else {
                            s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                        }
                    }
                    if (s.params.paginationType === "fraction") {
                        s.paginationContainer.find("." + s.params.paginationCurrentClass).text(current + 1);
                        s.paginationContainer.find("." + s.params.paginationTotalClass).text(total);
                    }
                    if (s.params.paginationType === "progress") {
                        var scale = (current + 1) / total, scaleX = scale, scaleY = 1;
                        if (!s.isHorizontal()) {
                            scaleY = scale;
                            scaleX = 1;
                        }
                        s.paginationContainer.find("." + s.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")").transition(s.params.speed);
                    }
                    if (s.params.paginationType === "custom" && s.params.paginationCustomRender) {
                        s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                        s.emit("onPaginationRendered", s, s.paginationContainer[0]);
                    }
                }
                if (!s.params.loop) {
                    if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                        if (s.isBeginning) {
                            s.prevButton.addClass(s.params.buttonDisabledClass);
                            if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                        } else {
                            s.prevButton.removeClass(s.params.buttonDisabledClass);
                            if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                        }
                    }
                    if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                        if (s.isEnd) {
                            s.nextButton.addClass(s.params.buttonDisabledClass);
                            if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                        } else {
                            s.nextButton.removeClass(s.params.buttonDisabledClass);
                            if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                        }
                    }
                }
            };
            s.updatePagination = function() {
                if (!s.params.pagination) return;
                if (s.paginationContainer && s.paginationContainer.length > 0) {
                    var paginationHTML = "";
                    if (s.params.paginationType === "bullets") {
                        var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                        for (var i = 0; i < numberOfBullets; i++) {
                            if (s.params.paginationBulletRender) {
                                paginationHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
                            } else {
                                paginationHTML += "<" + s.params.paginationElement + ' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + ">";
                            }
                        }
                        s.paginationContainer.html(paginationHTML);
                        s.bullets = s.paginationContainer.find("." + s.params.bulletClass);
                        if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                            s.a11y.initPagination();
                        }
                    }
                    if (s.params.paginationType === "fraction") {
                        if (s.params.paginationFractionRender) {
                            paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                        } else {
                            paginationHTML = '<span class="' + s.params.paginationCurrentClass + '"></span>' + " / " + '<span class="' + s.params.paginationTotalClass + '"></span>';
                        }
                        s.paginationContainer.html(paginationHTML);
                    }
                    if (s.params.paginationType === "progress") {
                        if (s.params.paginationProgressRender) {
                            paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                        } else {
                            paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                        }
                        s.paginationContainer.html(paginationHTML);
                    }
                    if (s.params.paginationType !== "custom") {
                        s.emit("onPaginationRendered", s, s.paginationContainer[0]);
                    }
                }
            };
            s.update = function(updateTranslate) {
                s.updateContainerSize();
                s.updateSlidesSize();
                s.updateProgress();
                s.updatePagination();
                s.updateClasses();
                if (s.params.scrollbar && s.scrollbar) {
                    s.scrollbar.set();
                }
                function forceSetTranslate() {
                    var translate = s.rtl ? -s.translate : s.translate;
                    newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                    s.setWrapperTranslate(newTranslate);
                    s.updateActiveIndex();
                    s.updateClasses();
                }
                if (updateTranslate) {
                    var translated, newTranslate;
                    if (s.controller && s.controller.spline) {
                        s.controller.spline = undefined;
                    }
                    if (s.params.freeMode) {
                        forceSetTranslate();
                        if (s.params.autoHeight) {
                            s.updateAutoHeight();
                        }
                    } else {
                        if ((s.params.slidesPerView === "auto" || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                            translated = s.slideTo(s.slides.length - 1, 0, false, true);
                        } else {
                            translated = s.slideTo(s.activeIndex, 0, false, true);
                        }
                        if (!translated) {
                            forceSetTranslate();
                        }
                    }
                } else if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            };
            s.onResize = function(forceUpdatePagination) {
                if (s.params.breakpoints) {
                    s.setBreakpoint();
                }
                var allowSwipeToPrev = s.params.allowSwipeToPrev;
                var allowSwipeToNext = s.params.allowSwipeToNext;
                s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
                s.updateContainerSize();
                s.updateSlidesSize();
                if (s.params.slidesPerView === "auto" || s.params.freeMode || forceUpdatePagination) s.updatePagination();
                if (s.params.scrollbar && s.scrollbar) {
                    s.scrollbar.set();
                }
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                var slideChangedBySlideTo = false;
                if (s.params.freeMode) {
                    var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                    s.setWrapperTranslate(newTranslate);
                    s.updateActiveIndex();
                    s.updateClasses();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                } else {
                    s.updateClasses();
                    if ((s.params.slidesPerView === "auto" || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                    } else {
                        slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                    }
                }
                if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                    s.lazy.load();
                }
                s.params.allowSwipeToPrev = allowSwipeToPrev;
                s.params.allowSwipeToNext = allowSwipeToNext;
            };
            s.touchEventsDesktop = {
                start: "mousedown",
                move: "mousemove",
                end: "mouseup"
            };
            if (window.navigator.pointerEnabled) s.touchEventsDesktop = {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            }; else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            };
            s.touchEvents = {
                start: s.support.touch || !s.params.simulateTouch ? "touchstart" : s.touchEventsDesktop.start,
                move: s.support.touch || !s.params.simulateTouch ? "touchmove" : s.touchEventsDesktop.move,
                end: s.support.touch || !s.params.simulateTouch ? "touchend" : s.touchEventsDesktop.end
            };
            if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
                (s.params.touchEventsTarget === "container" ? s.container : s.wrapper).addClass("vux-swiper-wp8-" + s.params.direction);
            }
            s.initEvents = function(detach) {
                var actionDom = detach ? "off" : "on";
                var action = detach ? "removeEventListener" : "addEventListener";
                var touchEventsTarget = s.params.touchEventsTarget === "container" ? s.container[0] : s.wrapper[0];
                var target = s.support.touch ? touchEventsTarget : document;
                var moveCapture = s.params.nested ? true : false;
                if (s.browser.ie) {
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                    target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    target[action](s.touchEvents.end, s.onTouchEnd, false);
                } else {
                    if (s.support.touch) {
                        touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                        touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                        touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
                    }
                    if (params.simulateTouch && !s.device.ios && !s.device.android) {
                        touchEventsTarget[action]("mousedown", s.onTouchStart, false);
                        document[action]("mousemove", s.onTouchMove, moveCapture);
                        document[action]("mouseup", s.onTouchEnd, false);
                    }
                }
                window[action]("resize", s.onResize);
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.nextButton[actionDom]("click", s.onClickNext);
                    if (s.params.a11y && s.a11y) s.nextButton[actionDom]("keydown", s.a11y.onEnterKey);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.prevButton[actionDom]("click", s.onClickPrev);
                    if (s.params.a11y && s.a11y) s.prevButton[actionDom]("keydown", s.a11y.onEnterKey);
                }
                if (s.params.pagination && s.params.paginationClickable) {
                    s.paginationContainer[actionDom]("click", "." + s.params.bulletClass, s.onClickIndex);
                    if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]("keydown", "." + s.params.bulletClass, s.a11y.onEnterKey);
                }
                if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]("click", s.preventClicks, true);
            };
            s.attachEvents = function() {
                s.initEvents();
            };
            s.detachEvents = function() {
                s.initEvents(true);
            };
            s.allowClick = true;
            s.preventClicks = function(e) {
                if (!s.allowClick) {
                    if (s.params.preventClicks) e.preventDefault();
                    if (s.params.preventClicksPropagation && s.animating) {
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                    }
                }
            };
            s.onClickNext = function(e) {
                e.preventDefault();
                if (s.isEnd && !s.params.loop) return;
                s.slideNext();
            };
            s.onClickPrev = function(e) {
                e.preventDefault();
                if (s.isBeginning && !s.params.loop) return;
                s.slidePrev();
            };
            s.onClickIndex = function(e) {
                e.preventDefault();
                var index = $(this).index() * s.params.slidesPerGroup;
                if (s.params.loop) index = index + s.loopedSlides;
                s.slideTo(index);
            };
            function findElementInEvent(e, selector) {
                var el = $(e.target);
                if (!el.is(selector)) {
                    if (typeof selector === "string") {
                        el = el.parents(selector);
                    } else if (selector.nodeType) {
                        var found;
                        el.parents().each(function(index, _el) {
                            if (_el === selector) found = selector;
                        });
                        if (!found) return undefined; else return selector;
                    }
                }
                if (el.length === 0) {
                    return undefined;
                }
                return el[0];
            }
            s.updateClickedSlide = function(e) {
                var slide = findElementInEvent(e, "." + s.params.slideClass);
                var slideFound = false;
                if (slide) {
                    for (var i = 0; i < s.slides.length; i++) {
                        if (s.slides[i] === slide) slideFound = true;
                    }
                }
                if (slide && slideFound) {
                    s.clickedSlide = slide;
                    s.clickedIndex = $(slide).index();
                } else {
                    s.clickedSlide = undefined;
                    s.clickedIndex = undefined;
                    return;
                }
                if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                    var slideToIndex = s.clickedIndex, realIndex, duplicatedSlides;
                    if (s.params.loop) {
                        if (s.animating) return;
                        realIndex = $(s.clickedSlide).attr("data-vux-swiper-slide-index");
                        if (s.params.centeredSlides) {
                            if (slideToIndex < s.loopedSlides - s.params.slidesPerView / 2 || slideToIndex > s.slides.length - s.loopedSlides + s.params.slidesPerView / 2) {
                                s.fixLoop();
                                slideToIndex = s.wrapper.children("." + s.params.slideClass + '[data-vux-swiper-slide-index="' + realIndex + '"]:not(.vux-swiper-slide-duplicate)').eq(0).index();
                                setTimeout(function() {
                                    s.slideTo(slideToIndex);
                                }, 0);
                            } else {
                                s.slideTo(slideToIndex);
                            }
                        } else {
                            if (slideToIndex > s.slides.length - s.params.slidesPerView) {
                                s.fixLoop();
                                slideToIndex = s.wrapper.children("." + s.params.slideClass + '[data-vux-swiper-slide-index="' + realIndex + '"]:not(.vux-swiper-slide-duplicate)').eq(0).index();
                                setTimeout(function() {
                                    s.slideTo(slideToIndex);
                                }, 0);
                            } else {
                                s.slideTo(slideToIndex);
                            }
                        }
                    } else {
                        s.slideTo(slideToIndex);
                    }
                }
            };
            var isTouched, isMoved, allowTouchCallbacks, touchStartTime, isScrolling, currentTranslate, startTranslate, allowThresholdMove, formElements = "input, select, textarea, button", lastClickTime = Date.now(), clickTimeout, velocities = [], allowMomentumBounce;
            s.animating = false;
            s.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var isTouchEvent, startMoving;
            s.onTouchStart = function(e) {
                if (e.originalEvent) e = e.originalEvent;
                isTouchEvent = e.type === "touchstart";
                if (!isTouchEvent && "which" in e && e.which === 3) return;
                if (s.params.noSwiping && findElementInEvent(e, "." + s.params.noSwipingClass)) {
                    s.allowClick = true;
                    return;
                }
                if (s.params.swipeHandler) {
                    if (!findElementInEvent(e, s.params.swipeHandler)) return;
                }
                var startX = s.touches.currentX = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
                var startY = s.touches.currentY = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
                if (s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                    return;
                }
                isTouched = true;
                isMoved = false;
                allowTouchCallbacks = true;
                isScrolling = undefined;
                startMoving = undefined;
                s.touches.startX = startX;
                s.touches.startY = startY;
                touchStartTime = Date.now();
                s.allowClick = true;
                s.updateContainerSize();
                s.swipeDirection = undefined;
                if (s.params.threshold > 0) allowThresholdMove = false;
                if (e.type !== "touchstart") {
                    var preventDefault = true;
                    if ($(e.target).is(formElements)) preventDefault = false;
                    if (document.activeElement && $(document.activeElement).is(formElements)) {
                        document.activeElement.blur();
                    }
                    if (preventDefault) {
                        e.preventDefault();
                    }
                }
                s.emit("onTouchStart", s, e);
            };
            s.onTouchMove = function(e) {
                if (e.originalEvent) e = e.originalEvent;
                if (isTouchEvent && e.type === "mousemove") return;
                if (e.preventedByNestedSwiper) {
                    s.touches.startX = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;
                    return;
                }
                if (s.params.onlyExternal) {
                    s.allowClick = false;
                    if (isTouched) {
                        s.touches.startX = s.touches.currentX = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX;
                        s.touches.startY = s.touches.currentY = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;
                        touchStartTime = Date.now();
                    }
                    return;
                }
                if (isTouchEvent && document.activeElement) {
                    if (e.target === document.activeElement && $(e.target).is(formElements)) {
                        isMoved = true;
                        s.allowClick = false;
                        return;
                    }
                }
                if (allowTouchCallbacks) {
                    s.emit("onTouchMove", s, e);
                }
                if (e.targetTouches && e.targetTouches.length > 1) return;
                s.touches.currentX = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX;
                s.touches.currentY = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === "undefined") {
                    var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : 90 - touchAngle > s.params.touchAngle;
                }
                if (isScrolling) {
                    s.emit("onTouchMoveOpposite", s, e);
                }
                if (typeof startMoving === "undefined" && s.browser.ieTouch) {
                    if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                        startMoving = true;
                    }
                }
                if (!isTouched) return;
                if (isScrolling) {
                    isTouched = false;
                    return;
                }
                if (!startMoving && s.browser.ieTouch) {
                    return;
                }
                s.allowClick = false;
                s.emit("onSliderMove", s, e);
                e.preventDefault();
                if (s.params.touchMoveStopPropagation && !s.params.nested) {
                    e.stopPropagation();
                }
                if (!isMoved) {
                    if (params.loop) {
                        s.fixLoop();
                    }
                    startTranslate = s.getWrapperTranslate();
                    s.setWrapperTransition(0);
                    if (s.animating) {
                        s.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd");
                    }
                    if (s.params.autoplay && s.autoplaying) {
                        if (s.params.autoplayDisableOnInteraction) {
                            s.stopAutoplay();
                        } else {
                            s.pauseAutoplay();
                        }
                    }
                    allowMomentumBounce = false;
                    if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                        s.setGrabCursor(true);
                    }
                }
                isMoved = true;
                var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                diff = diff * s.params.touchRatio;
                if (s.rtl) diff = -diff;
                s.swipeDirection = diff > 0 ? "prev" : "next";
                currentTranslate = diff + startTranslate;
                var disableParentSwiper = true;
                if (diff > 0 && currentTranslate > s.minTranslate()) {
                    disableParentSwiper = false;
                    if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
                } else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                    disableParentSwiper = false;
                    if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
                }
                if (disableParentSwiper) {
                    e.preventedByNestedSwiper = true;
                }
                if (!s.params.allowSwipeToNext && s.swipeDirection === "next" && currentTranslate < startTranslate) {
                    currentTranslate = startTranslate;
                }
                if (!s.params.allowSwipeToPrev && s.swipeDirection === "prev" && currentTranslate > startTranslate) {
                    currentTranslate = startTranslate;
                }
                if (!s.params.followFinger) return;
                if (s.params.threshold > 0) {
                    if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                        if (!allowThresholdMove) {
                            allowThresholdMove = true;
                            s.touches.startX = s.touches.currentX;
                            s.touches.startY = s.touches.currentY;
                            currentTranslate = startTranslate;
                            s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                            return;
                        }
                    } else {
                        currentTranslate = startTranslate;
                        return;
                    }
                }
                if (s.params.freeMode || s.params.watchSlidesProgress) {
                    s.updateActiveIndex();
                }
                if (s.params.freeMode) {
                    if (velocities.length === 0) {
                        velocities.push({
                            position: s.touches[s.isHorizontal() ? "startX" : "startY"],
                            time: touchStartTime
                        });
                    }
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? "currentX" : "currentY"],
                        time: new window.Date().getTime()
                    });
                }
                s.updateProgress(currentTranslate);
                s.setWrapperTranslate(currentTranslate);
            };
            s.onTouchEnd = function(e) {
                if (e.originalEvent) e = e.originalEvent;
                if (allowTouchCallbacks) {
                    s.emit("onTouchEnd", s, e);
                }
                allowTouchCallbacks = false;
                if (!isTouched) return;
                if (s.params.grabCursor && isMoved && isTouched && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                    s.setGrabCursor(false);
                }
                var touchEndTime = Date.now();
                var timeDiff = touchEndTime - touchStartTime;
                if (s.allowClick) {
                    s.updateClickedSlide(e);
                    s.emit("onTap", s, e);
                    if (timeDiff < 300 && touchEndTime - lastClickTime > 300) {
                        if (clickTimeout) clearTimeout(clickTimeout);
                        clickTimeout = setTimeout(function() {
                            if (!s) return;
                            if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                                s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                            }
                            s.emit("onClick", s, e);
                        }, 300);
                    }
                    if (timeDiff < 300 && touchEndTime - lastClickTime < 300) {
                        if (clickTimeout) clearTimeout(clickTimeout);
                        s.emit("onDoubleTap", s, e);
                    }
                }
                lastClickTime = Date.now();
                setTimeout(function() {
                    if (s) s.allowClick = true;
                }, 0);
                if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                    isTouched = isMoved = false;
                    return;
                }
                isTouched = isMoved = false;
                var currentPos;
                if (s.params.followFinger) {
                    currentPos = s.rtl ? s.translate : -s.translate;
                } else {
                    currentPos = -currentTranslate;
                }
                if (s.params.freeMode) {
                    if (currentPos < -s.minTranslate()) {
                        s.slideTo(s.activeIndex);
                        return;
                    } else if (currentPos > -s.maxTranslate()) {
                        if (s.slides.length < s.snapGrid.length) {
                            s.slideTo(s.snapGrid.length - 1);
                        } else {
                            s.slideTo(s.slides.length - 1);
                        }
                        return;
                    }
                    if (s.params.freeModeMomentum) {
                        if (velocities.length > 1) {
                            var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
                            var distance = lastMoveEvent.position - velocityEvent.position;
                            var time = lastMoveEvent.time - velocityEvent.time;
                            s.velocity = distance / time;
                            s.velocity = s.velocity / 2;
                            if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                                s.velocity = 0;
                            }
                            if (time > 150 || new window.Date().getTime() - lastMoveEvent.time > 300) {
                                s.velocity = 0;
                            }
                        } else {
                            s.velocity = 0;
                        }
                        velocities.length = 0;
                        var momentumDuration = 1e3 * s.params.freeModeMomentumRatio;
                        var momentumDistance = s.velocity * momentumDuration;
                        var newPosition = s.translate + momentumDistance;
                        if (s.rtl) newPosition = -newPosition;
                        var doBounce = false;
                        var afterBouncePosition;
                        var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                        if (newPosition < s.maxTranslate()) {
                            if (s.params.freeModeMomentumBounce) {
                                if (newPosition + s.maxTranslate() < -bounceAmount) {
                                    newPosition = s.maxTranslate() - bounceAmount;
                                }
                                afterBouncePosition = s.maxTranslate();
                                doBounce = true;
                                allowMomentumBounce = true;
                            } else {
                                newPosition = s.maxTranslate();
                            }
                        } else if (newPosition > s.minTranslate()) {
                            if (s.params.freeModeMomentumBounce) {
                                if (newPosition - s.minTranslate() > bounceAmount) {
                                    newPosition = s.minTranslate() + bounceAmount;
                                }
                                afterBouncePosition = s.minTranslate();
                                doBounce = true;
                                allowMomentumBounce = true;
                            } else {
                                newPosition = s.minTranslate();
                            }
                        } else if (s.params.freeModeSticky) {
                            var j = 0, nextSlide;
                            for (j = 0; j < s.snapGrid.length; j += 1) {
                                if (s.snapGrid[j] > -newPosition) {
                                    nextSlide = j;
                                    break;
                                }
                            }
                            if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === "next") {
                                newPosition = s.snapGrid[nextSlide];
                            } else {
                                newPosition = s.snapGrid[nextSlide - 1];
                            }
                            if (!s.rtl) newPosition = -newPosition;
                        }
                        if (s.velocity !== 0) {
                            if (s.rtl) {
                                momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                            } else {
                                momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                            }
                        } else if (s.params.freeModeSticky) {
                            s.slideReset();
                            return;
                        }
                        if (s.params.freeModeMomentumBounce && doBounce) {
                            s.updateProgress(afterBouncePosition);
                            s.setWrapperTransition(momentumDuration);
                            s.setWrapperTranslate(newPosition);
                            s.onTransitionStart();
                            s.animating = true;
                            s.wrapper.transitionEnd(function() {
                                if (!s || !allowMomentumBounce) return;
                                s.emit("onMomentumBounce", s);
                                s.setWrapperTransition(s.params.speed);
                                s.setWrapperTranslate(afterBouncePosition);
                                s.wrapper.transitionEnd(function() {
                                    if (!s) return;
                                    s.onTransitionEnd();
                                });
                            });
                        } else if (s.velocity) {
                            s.updateProgress(newPosition);
                            s.setWrapperTransition(momentumDuration);
                            s.setWrapperTranslate(newPosition);
                            s.onTransitionStart();
                            if (!s.animating) {
                                s.animating = true;
                                s.wrapper.transitionEnd(function() {
                                    if (!s) return;
                                    s.onTransitionEnd();
                                });
                            }
                        } else {
                            s.updateProgress(newPosition);
                        }
                        s.updateActiveIndex();
                    }
                    if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                        s.updateProgress();
                        s.updateActiveIndex();
                    }
                    return;
                }
                var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
                for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                    if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== "undefined") {
                        if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                            stopIndex = i;
                            groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                        }
                    } else {
                        if (currentPos >= s.slidesGrid[i]) {
                            stopIndex = i;
                            groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                        }
                    }
                }
                var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
                if (timeDiff > s.params.longSwipesMs) {
                    if (!s.params.longSwipes) {
                        s.slideTo(s.activeIndex);
                        return;
                    }
                    if (s.swipeDirection === "next") {
                        if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup); else s.slideTo(stopIndex);
                    }
                    if (s.swipeDirection === "prev") {
                        if (ratio > 1 - s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup); else s.slideTo(stopIndex);
                    }
                } else {
                    if (!s.params.shortSwipes) {
                        s.slideTo(s.activeIndex);
                        return;
                    }
                    if (s.swipeDirection === "next") {
                        s.slideTo(stopIndex + s.params.slidesPerGroup);
                    }
                    if (s.swipeDirection === "prev") {
                        s.slideTo(stopIndex);
                    }
                }
            };
            s._slideTo = function(slideIndex, speed) {
                return s.slideTo(slideIndex, speed, true, true);
            };
            s.slideTo = function(slideIndex, speed, runCallbacks, internal) {
                if (typeof runCallbacks === "undefined") runCallbacks = true;
                if (typeof slideIndex === "undefined") slideIndex = 0;
                if (slideIndex < 0) slideIndex = 0;
                s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
                if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
                var translate = -s.snapGrid[s.snapIndex];
                if (s.params.autoplay && s.autoplaying) {
                    if (internal || !s.params.autoplayDisableOnInteraction) {
                        s.pauseAutoplay(speed);
                    } else {
                        s.stopAutoplay();
                    }
                }
                s.updateProgress(translate);
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (-Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
                if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                    return false;
                }
                if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                    if ((s.activeIndex || 0) !== slideIndex) return false;
                }
                if (typeof speed === "undefined") speed = s.params.speed;
                s.previousIndex = s.activeIndex || 0;
                s.activeIndex = slideIndex;
                s.updateRealIndex();
                if (s.rtl && -translate === s.translate || !s.rtl && translate === s.translate) {
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                    s.updateClasses();
                    if (s.params.effect !== "slide") {
                        s.setWrapperTranslate(translate);
                    }
                    return false;
                }
                s.updateClasses();
                s.onTransitionStart(runCallbacks);
                if (speed === 0) {
                    s.setWrapperTranslate(translate);
                    s.setWrapperTransition(0);
                    s.onTransitionEnd(runCallbacks);
                } else {
                    s.setWrapperTranslate(translate);
                    s.setWrapperTransition(speed);
                    if (!s.animating) {
                        s.animating = true;
                        s.wrapper.transitionEnd(function() {
                            if (!s) return;
                            s.onTransitionEnd(runCallbacks);
                        });
                    }
                }
                return true;
            };
            s.onTransitionStart = function(runCallbacks) {
                if (typeof runCallbacks === "undefined") runCallbacks = true;
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                if (s.lazy) s.lazy.onTransitionStart();
                if (runCallbacks) {
                    s.emit("onTransitionStart", s);
                    if (s.activeIndex !== s.previousIndex) {
                        s.emit("onSlideChangeStart", s);
                        if (s.activeIndex > s.previousIndex) {
                            s.emit("onSlideNextStart", s);
                        } else {
                            s.emit("onSlidePrevStart", s);
                        }
                    }
                }
            };
            s.onTransitionEnd = function(runCallbacks) {
                s.animating = false;
                s.setWrapperTransition(0);
                if (typeof runCallbacks === "undefined") runCallbacks = true;
                if (s.lazy) s.lazy.onTransitionEnd();
                if (runCallbacks) {
                    s.emit("onTransitionEnd", s);
                    if (s.activeIndex !== s.previousIndex) {
                        s.emit("onSlideChangeEnd", s);
                        if (s.activeIndex > s.previousIndex) {
                            s.emit("onSlideNextEnd", s);
                        } else {
                            s.emit("onSlidePrevEnd", s);
                        }
                    }
                }
                if (s.params.hashnav && s.hashnav) {
                    s.hashnav.setHash();
                }
            };
            s.slideNext = function(runCallbacks, speed, internal) {
                if (s.params.loop) {
                    if (s.animating) return false;
                    s.fixLoop();
                    var clientLeft = s.container[0].clientLeft;
                    return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
                } else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            };
            s._slideNext = function(speed) {
                return s.slideNext(true, speed, true);
            };
            s.slidePrev = function(runCallbacks, speed, internal) {
                if (s.params.loop) {
                    if (s.animating) return false;
                    s.fixLoop();
                    var clientLeft = s.container[0].clientLeft;
                    return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
                } else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            };
            s._slidePrev = function(speed) {
                return s.slidePrev(true, speed, true);
            };
            s.slideReset = function(runCallbacks, speed, internal) {
                return s.slideTo(s.activeIndex, speed, runCallbacks);
            };
            s.disableTouchControl = function() {
                s.params.onlyExternal = true;
                return true;
            };
            s.enableTouchControl = function() {
                s.params.onlyExternal = false;
                return true;
            };
            s.setWrapperTransition = function(duration, byController) {
                s.wrapper.transition(duration);
                if (s.params.effect !== "slide" && s.effects[s.params.effect]) {
                    s.effects[s.params.effect].setTransition(duration);
                }
                if (s.params.parallax && s.parallax) {
                    s.parallax.setTransition(duration);
                }
                if (s.params.scrollbar && s.scrollbar) {
                    s.scrollbar.setTransition(duration);
                }
                if (s.params.control && s.controller) {
                    s.controller.setTransition(duration, byController);
                }
                s.emit("onSetTransition", s, duration);
            };
            s.setWrapperTranslate = function(translate, updateActiveIndex, byController) {
                var x = 0, y = 0, z = 0;
                if (s.isHorizontal()) {
                    x = s.rtl ? -translate : translate;
                } else {
                    y = translate;
                }
                if (s.params.roundLengths) {
                    x = round(x);
                    y = round(y);
                }
                if (!s.params.virtualTranslate) {
                    if (s.support.transforms3d) s.wrapper.transform("translate3d(" + x + "px, " + y + "px, " + z + "px)"); else s.wrapper.transform("translate(" + x + "px, " + y + "px)");
                }
                s.translate = s.isHorizontal() ? x : y;
                var progress;
                var translatesDiff = s.maxTranslate() - s.minTranslate();
                if (translatesDiff === 0) {
                    progress = 0;
                } else {
                    progress = (translate - s.minTranslate()) / translatesDiff;
                }
                if (progress !== s.progress) {
                    s.updateProgress(translate);
                }
                if (updateActiveIndex) s.updateActiveIndex();
                if (s.params.effect !== "slide" && s.effects[s.params.effect]) {
                    s.effects[s.params.effect].setTranslate(s.translate);
                }
                if (s.params.parallax && s.parallax) {
                    s.parallax.setTranslate(s.translate);
                }
                if (s.params.scrollbar && s.scrollbar) {
                    s.scrollbar.setTranslate(s.translate);
                }
                if (s.params.control && s.controller) {
                    s.controller.setTranslate(s.translate, byController);
                }
                s.emit("onSetTranslate", s, s.translate);
            };
            s.getTranslate = function(el, axis) {
                var matrix, curTransform, curStyle, transformMatrix;
                if (typeof axis === "undefined") {
                    axis = "x";
                }
                if (s.params.virtualTranslate) {
                    return s.rtl ? -s.translate : s.translate;
                }
                curStyle = window.getComputedStyle(el, null);
                if (window.WebKitCSSMatrix) {
                    curTransform = curStyle.transform || curStyle.webkitTransform;
                    if (curTransform.split(",").length > 6) {
                        curTransform = curTransform.split(", ").map(function(a) {
                            return a.replace(",", ".");
                        }).join(", ");
                    }
                    transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
                } else {
                    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                    matrix = transformMatrix.toString().split(",");
                }
                if (axis === "x") {
                    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
                }
                if (axis === "y") {
                    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
                }
                if (s.rtl && curTransform) curTransform = -curTransform;
                return curTransform || 0;
            };
            s.getWrapperTranslate = function(axis) {
                if (typeof axis === "undefined") {
                    axis = s.isHorizontal() ? "x" : "y";
                }
                return s.getTranslate(s.wrapper[0], axis);
            };
            s.observers = [];
            function initObserver(target, options) {
                options = options || {};
                var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                var observer = new ObserverFunc(function(mutations) {
                    mutations.forEach(function(mutation) {
                        s.onResize(true);
                        s.emit("onObserverUpdate", s, mutation);
                    });
                });
                observer.observe(target, {
                    attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                    childList: typeof options.childList === "undefined" ? true : options.childList,
                    characterData: typeof options.characterData === "undefined" ? true : options.characterData
                });
                s.observers.push(observer);
            }
            s.initObservers = function() {
                if (s.params.observeParents) {
                    var containerParents = s.container.parents();
                    for (var i = 0; i < containerParents.length; i++) {
                        initObserver(containerParents[i]);
                    }
                }
                initObserver(s.container[0], {
                    childList: false
                });
                initObserver(s.wrapper[0], {
                    attributes: false
                });
            };
            s.disconnectObservers = function() {
                for (var i = 0; i < s.observers.length; i++) {
                    s.observers[i].disconnect();
                }
                s.observers = [];
            };
            s.createLoop = function() {
                s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass).remove();
                var slides = s.wrapper.children("." + s.params.slideClass);
                if (s.params.slidesPerView === "auto" && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
                s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
                s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
                if (s.loopedSlides > slides.length) {
                    s.loopedSlides = slides.length;
                }
                var prependSlides = [], appendSlides = [], i;
                slides.each(function(index, el) {
                    var slide = $(this);
                    if (index < s.loopedSlides) appendSlides.push(el);
                    if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                    slide.attr("data-vux-swiper-slide-index", index);
                });
                for (i = 0; i < appendSlides.length; i++) {
                    s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
                }
                for (i = prependSlides.length - 1; i >= 0; i--) {
                    s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
                }
            };
            s.destroyLoop = function() {
                s.wrapper.children("." + s.params.slideClass + "." + s.params.slideDuplicateClass).remove();
                s.slides.removeAttr("data-vux-swiper-slide-index");
            };
            s.reLoop = function(updatePosition) {
                var oldIndex = s.activeIndex - s.loopedSlides;
                s.destroyLoop();
                s.createLoop();
                s.updateSlidesSize();
                if (updatePosition) {
                    s.slideTo(oldIndex + s.loopedSlides, 0, false);
                }
            };
            s.fixLoop = function() {
                var newIndex;
                if (s.activeIndex < s.loopedSlides) {
                    newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                    newIndex = newIndex + s.loopedSlides;
                    s.slideTo(newIndex, 0, false, true);
                } else if (s.params.slidesPerView === "auto" && s.activeIndex >= s.loopedSlides * 2 || s.activeIndex > s.slides.length - s.params.slidesPerView * 2) {
                    newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                    newIndex = newIndex + s.loopedSlides;
                    s.slideTo(newIndex, 0, false, true);
                }
            };
            s.appendSlide = function(slides) {
                if (s.params.loop) {
                    s.destroyLoop();
                }
                if ((typeof slides === "undefined" ? "undefined" : (0, _typeof3.default)(slides)) === "object" && slides.length) {
                    for (var i = 0; i < slides.length; i++) {
                        if (slides[i]) s.wrapper.append(slides[i]);
                    }
                } else {
                    s.wrapper.append(slides);
                }
                if (s.params.loop) {
                    s.createLoop();
                }
                if (!(s.params.observer && s.support.observer)) {
                    s.update(true);
                }
            };
            s.prependSlide = function(slides) {
                if (s.params.loop) {
                    s.destroyLoop();
                }
                var newActiveIndex = s.activeIndex + 1;
                if ((typeof slides === "undefined" ? "undefined" : (0, _typeof3.default)(slides)) === "object" && slides.length) {
                    for (var i = 0; i < slides.length; i++) {
                        if (slides[i]) s.wrapper.prepend(slides[i]);
                    }
                    newActiveIndex = s.activeIndex + slides.length;
                } else {
                    s.wrapper.prepend(slides);
                }
                if (s.params.loop) {
                    s.createLoop();
                }
                if (!(s.params.observer && s.support.observer)) {
                    s.update(true);
                }
                s.slideTo(newActiveIndex, 0, false);
            };
            s.removeSlide = function(slidesIndexes) {
                if (s.params.loop) {
                    s.destroyLoop();
                    s.slides = s.wrapper.children("." + s.params.slideClass);
                }
                var newActiveIndex = s.activeIndex, indexToRemove;
                if ((typeof slidesIndexes === "undefined" ? "undefined" : (0, _typeof3.default)(slidesIndexes)) === "object" && slidesIndexes.length) {
                    for (var i = 0; i < slidesIndexes.length; i++) {
                        indexToRemove = slidesIndexes[i];
                        if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                        if (indexToRemove < newActiveIndex) newActiveIndex--;
                    }
                    newActiveIndex = Math.max(newActiveIndex, 0);
                } else {
                    indexToRemove = slidesIndexes;
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                    newActiveIndex = Math.max(newActiveIndex, 0);
                }
                if (s.params.loop) {
                    s.createLoop();
                }
                if (!(s.params.observer && s.support.observer)) {
                    s.update(true);
                }
                if (s.params.loop) {
                    s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
                } else {
                    s.slideTo(newActiveIndex, 0, false);
                }
            };
            s.removeAllSlides = function() {
                var slidesIndexes = [];
                for (var i = 0; i < s.slides.length; i++) {
                    slidesIndexes.push(i);
                }
                s.removeSlide(slidesIndexes);
            };
            s.lazy = {
                initialImageLoaded: false,
                loadImageInSlide: function loadImageInSlide(index, loadInDuplicate) {
                    if (typeof index === "undefined") return;
                    if (typeof loadInDuplicate === "undefined") loadInDuplicate = true;
                    if (s.slides.length === 0) return;
                    var slide = s.slides.eq(index);
                    var img = slide.find("." + s.params.lazyLoadingClass + ":not(.vux-swiper-lazy-loaded):not(.vux-swiper-lazy-loading)");
                    if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass("vux-swiper-lazy-loaded") && !slide.hasClass("vux-swiper-lazy-loading")) {
                        img = img.add(slide[0]);
                    }
                    if (img.length === 0) return;
                    img.each(function() {
                        var _img = $(this);
                        _img.addClass("vux-swiper-lazy-loading");
                        var background = _img.attr("data-background");
                        var src = _img.attr("data-src"), srcset = _img.attr("data-srcset");
                        s.loadImage(_img[0], src || background, srcset, false, function() {
                            if (background) {
                                _img.css("background-image", 'url("' + background + '")');
                                _img.removeAttr("data-background");
                            } else {
                                if (srcset) {
                                    _img.attr("srcset", srcset);
                                    _img.removeAttr("data-srcset");
                                }
                                if (src) {
                                    _img.attr("src", src);
                                    _img.removeAttr("data-src");
                                }
                            }
                            _img.addClass("vux-swiper-lazy-loaded").removeClass("vux-swiper-lazy-loading");
                            slide.find(".vux-swiper-lazy-preloader, .preloader").remove();
                            if (s.params.loop && loadInDuplicate) {
                                var slideOriginalIndex = slide.attr("data-vux-swiper-slide-index");
                                if (slide.hasClass(s.params.slideDuplicateClass)) {
                                    var originalSlide = s.wrapper.children('[data-vux-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ")");
                                    s.lazy.loadImageInSlide(originalSlide.index(), false);
                                } else {
                                    var duplicatedSlide = s.wrapper.children("." + s.params.slideDuplicateClass + '[data-vux-swiper-slide-index="' + slideOriginalIndex + '"]');
                                    s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                                }
                            }
                            s.emit("onLazyImageReady", s, slide[0], _img[0]);
                        });
                        s.emit("onLazyImageLoad", s, slide[0], _img[0]);
                    });
                },
                load: function load() {
                    var i;
                    if (s.params.watchSlidesVisibility) {
                        s.wrapper.children("." + s.params.slideVisibleClass).each(function() {
                            s.lazy.loadImageInSlide($(this).index());
                        });
                    } else {
                        if (s.params.slidesPerView > 1) {
                            for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView; i++) {
                                if (s.slides[i]) s.lazy.loadImageInSlide(i);
                            }
                        } else {
                            s.lazy.loadImageInSlide(s.activeIndex);
                        }
                    }
                    if (s.params.lazyLoadingInPrevNext) {
                        if (s.params.slidesPerView > 1 || s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1) {
                            var amount = s.params.lazyLoadingInPrevNextAmount;
                            var spv = s.params.slidesPerView;
                            var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                            var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                            for (i = s.activeIndex + s.params.slidesPerView; i < maxIndex; i++) {
                                if (s.slides[i]) s.lazy.loadImageInSlide(i);
                            }
                            for (i = minIndex; i < s.activeIndex; i++) {
                                if (s.slides[i]) s.lazy.loadImageInSlide(i);
                            }
                        } else {
                            var nextSlide = s.wrapper.children("." + s.params.slideNextClass);
                            if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
                            var prevSlide = s.wrapper.children("." + s.params.slidePrevClass);
                            if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                        }
                    }
                },
                onTransitionStart: function onTransitionStart() {
                    if (s.params.lazyLoading) {
                        if (s.params.lazyLoadingOnTransitionStart || !s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded) {
                            s.lazy.load();
                        }
                    }
                },
                onTransitionEnd: function onTransitionEnd() {
                    if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                        s.lazy.load();
                    }
                }
            };
            function normalizeEventName(eventName) {
                if (eventName.indexOf("on") !== 0) {
                    if (eventName[0] !== eventName[0].toUpperCase()) {
                        eventName = "on" + eventName[0].toUpperCase() + eventName.substring(1);
                    } else {
                        eventName = "on" + eventName;
                    }
                }
                return eventName;
            }
            s.emitterEventListeners = {};
            s.emit = function(eventName) {
                if (s.params[eventName]) {
                    s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
                var i;
                if (s.emitterEventListeners[eventName]) {
                    for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                        s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    }
                }
                if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            };
            s.on = function(eventName, handler) {
                eventName = normalizeEventName(eventName);
                if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
                s.emitterEventListeners[eventName].push(handler);
                return s;
            };
            s.off = function(eventName, handler) {
                var i;
                eventName = normalizeEventName(eventName);
                if (typeof handler === "undefined") {
                    s.emitterEventListeners[eventName] = [];
                    return s;
                }
                if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    if (s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
                }
                return s;
            };
            s.once = function(eventName, handler) {
                eventName = normalizeEventName(eventName);
                var _handler = function _handler() {
                    handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                    s.off(eventName, _handler);
                };
                s.on(eventName, _handler);
                return s;
            };
            s.init = function() {
                if (s.params.loop) s.createLoop();
                s.updateContainerSize();
                s.updateSlidesSize();
                s.updatePagination();
                if (s.params.scrollbar && s.scrollbar) {
                    s.scrollbar.set();
                    if (s.params.scrollbarDraggable) {
                        s.scrollbar.enableDraggable();
                    }
                }
                if (s.params.effect !== "slide" && s.effects[s.params.effect]) {
                    if (!s.params.loop) s.updateProgress();
                    s.effects[s.params.effect].setTranslate();
                }
                if (s.params.loop) {
                    s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
                } else {
                    s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                    if (s.params.initialSlide === 0) {
                        if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                        if (s.lazy && s.params.lazyLoading) {
                            s.lazy.load();
                            s.lazy.initialImageLoaded = true;
                        }
                    }
                }
                s.attachEvents();
                if (s.params.observer && s.support.observer) {
                    s.initObservers();
                }
                if (s.params.preloadImages && !s.params.lazyLoading) {
                    s.preloadImages();
                }
                if (s.params.autoplay) {
                    s.startAutoplay();
                }
                if (s.params.keyboardControl) {
                    if (s.enableKeyboardControl) s.enableKeyboardControl();
                }
                if (s.params.mousewheelControl) {
                    if (s.enableMousewheelControl) s.enableMousewheelControl();
                }
                if (s.params.hashnav) {
                    if (s.hashnav) s.hashnav.init();
                }
                if (s.params.a11y && s.a11y) s.a11y.init();
                s.emit("onInit", s);
            };
            s.cleanupStyles = function() {
                s.container.removeClass(s.classNames.join(" ")).removeAttr("style");
                s.wrapper.removeAttr("style");
                if (s.slides && s.slides.length) {
                    s.slides.removeClass([ s.params.slideVisibleClass, s.params.slideActiveClass, s.params.slideNextClass, s.params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-vux-swiper-column").removeAttr("data-vux-swiper-row");
                }
                if (s.paginationContainer && s.paginationContainer.length) {
                    s.paginationContainer.removeClass(s.params.paginationHiddenClass);
                }
                if (s.bullets && s.bullets.length) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                }
                if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
                if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
                if (s.params.scrollbar && s.scrollbar) {
                    if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr("style");
                    if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr("style");
                }
            };
            s.destroy = function(deleteInstance, cleanupStyles) {
                s.detachEvents();
                s.stopAutoplay();
                if (s.params.scrollbar && s.scrollbar) {
                    if (s.params.scrollbarDraggable) {
                        s.scrollbar.disableDraggable();
                    }
                }
                if (s.params.loop) {
                    s.destroyLoop();
                }
                if (cleanupStyles) {
                    s.cleanupStyles();
                }
                s.disconnectObservers();
                if (s.params.keyboardControl) {
                    if (s.disableKeyboardControl) s.disableKeyboardControl();
                }
                if (s.params.mousewheelControl) {
                    if (s.disableMousewheelControl) s.disableMousewheelControl();
                }
                if (s.params.a11y && s.a11y) s.a11y.destroy();
                s.emit("onDestroy");
                if (deleteInstance !== false) s = null;
            };
            s.init();
            return s;
        };
        Swiper.prototype = {
            isSafari: function() {
                var ua = navigator.userAgent.toLowerCase();
                return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
            }(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
            isArray: function isArray(arr) {
                return Object.prototype.toString.apply(arr) === "[object Array]";
            },
            browser: {
                ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
                ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
            },
            device: function() {
                var ua = navigator.userAgent;
                var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
                var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
                var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
                var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
                return {
                    ios: ipad || iphone || ipod,
                    android: android
                };
            }(),
            support: {
                touch: window.Modernizr && Modernizr.touch === true || function() {
                    return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
                }(),
                transforms3d: window.Modernizr && Modernizr.csstransforms3d === true || function() {
                    var div = document.createElement("div").style;
                    return "webkitPerspective" in div || "MozPerspective" in div || "OPerspective" in div || "MsPerspective" in div || "perspective" in div;
                }(),
                flexbox: function() {
                    var div = document.createElement("div").style;
                    var styles = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" ");
                    for (var i = 0; i < styles.length; i++) {
                        if (styles[i] in div) return true;
                    }
                }(),
                observer: function() {
                    return "MutationObserver" in window || "WebkitMutationObserver" in window;
                }()
            },
            plugins: {}
        };
        var Dom7 = function() {
            var Dom7 = function Dom7(arr) {
                var _this = this, i = 0;
                for (i = 0; i < arr.length; i++) {
                    _this[i] = arr[i];
                }
                _this.length = arr.length;
                return this;
            };
            var $ = function $(selector, context) {
                var arr = [], i = 0;
                if (selector && !context) {
                    if (selector instanceof Dom7) {
                        return selector;
                    }
                }
                if (selector) {
                    if (typeof selector === "string") {
                        var els, tempParent, html = selector.trim();
                        if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                            var toCreate = "div";
                            if (html.indexOf("<li") === 0) toCreate = "ul";
                            if (html.indexOf("<tr") === 0) toCreate = "tbody";
                            if (html.indexOf("<td") === 0 || html.indexOf("<th") === 0) toCreate = "tr";
                            if (html.indexOf("<tbody") === 0) toCreate = "table";
                            if (html.indexOf("<option") === 0) toCreate = "select";
                            tempParent = document.createElement(toCreate);
                            tempParent.innerHTML = selector;
                            for (i = 0; i < tempParent.childNodes.length; i++) {
                                arr.push(tempParent.childNodes[i]);
                            }
                        } else {
                            if (!context && selector[0] === "#" && !selector.match(/[ .<>:~]/)) {
                                els = [ document.getElementById(selector.split("#")[1]) ];
                            } else {
                                els = (context || document).querySelectorAll(selector);
                            }
                            for (i = 0; i < els.length; i++) {
                                if (els[i]) arr.push(els[i]);
                            }
                        }
                    } else if (selector.nodeType || selector === window || selector === document) {
                        arr.push(selector);
                    } else if (selector.length > 0 && selector[0].nodeType) {
                        for (i = 0; i < selector.length; i++) {
                            arr.push(selector[i]);
                        }
                    }
                }
                return new Dom7(arr);
            };
            Dom7.prototype = {
                addClass: function addClass(className) {
                    console.log("classname", className);
                    if (typeof className === "undefined") {
                        return this;
                    }
                    var classes = className.split(" ");
                    for (var i = 0; i < classes.length; i++) {
                        for (var j = 0; j < this.length; j++) {
                            this[j].classList.add(classes[i]);
                        }
                    }
                    return this;
                },
                removeClass: function removeClass(className) {
                    var classes = className.split(" ");
                    for (var i = 0; i < classes.length; i++) {
                        for (var j = 0; j < this.length; j++) {
                            this[j].classList.remove(classes[i]);
                        }
                    }
                    return this;
                },
                hasClass: function hasClass(className) {
                    if (!this[0]) return false; else return this[0].classList.contains(className);
                },
                toggleClass: function toggleClass(className) {
                    var classes = className.split(" ");
                    for (var i = 0; i < classes.length; i++) {
                        for (var j = 0; j < this.length; j++) {
                            this[j].classList.toggle(classes[i]);
                        }
                    }
                    return this;
                },
                attr: function attr(attrs, value) {
                    if (arguments.length === 1 && typeof attrs === "string") {
                        if (this[0]) return this[0].getAttribute(attrs); else return undefined;
                    } else {
                        for (var i = 0; i < this.length; i++) {
                            if (arguments.length === 2) {
                                this[i].setAttribute(attrs, value);
                            } else {
                                for (var attrName in attrs) {
                                    this[i][attrName] = attrs[attrName];
                                    this[i].setAttribute(attrName, attrs[attrName]);
                                }
                            }
                        }
                        return this;
                    }
                },
                removeAttr: function removeAttr(attr) {
                    for (var i = 0; i < this.length; i++) {
                        this[i].removeAttribute(attr);
                    }
                    return this;
                },
                data: function data(key, value) {
                    if (typeof value === "undefined") {
                        if (this[0]) {
                            var dataKey = this[0].getAttribute("data-" + key);
                            if (dataKey) return dataKey; else if (this[0].dom7ElementDataStorage && key in this[0].dom7ElementDataStorage) return this[0].dom7ElementDataStorage[key]; else return undefined;
                        } else return undefined;
                    } else {
                        for (var i = 0; i < this.length; i++) {
                            var el = this[i];
                            if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                            el.dom7ElementDataStorage[key] = value;
                        }
                        return this;
                    }
                },
                transform: function transform(_transform) {
                    for (var i = 0; i < this.length; i++) {
                        var elStyle = this[i].style;
                        elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = _transform;
                    }
                    return this;
                },
                transition: function transition(duration) {
                    if (typeof duration !== "string") {
                        duration = duration + "ms";
                    }
                    for (var i = 0; i < this.length; i++) {
                        var elStyle = this[i].style;
                        elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                    }
                    return this;
                },
                on: function on(eventName, targetSelector, listener, capture) {
                    function handleLiveEvent(e) {
                        var target = e.target;
                        if ($(target).is(targetSelector)) listener.call(target, e); else {
                            var parents = $(target).parents();
                            for (var k = 0; k < parents.length; k++) {
                                if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                            }
                        }
                    }
                    var events = eventName.split(" ");
                    var i, j;
                    for (i = 0; i < this.length; i++) {
                        if (typeof targetSelector === "function" || targetSelector === false) {
                            if (typeof targetSelector === "function") {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            for (j = 0; j < events.length; j++) {
                                this[i].addEventListener(events[j], listener, capture);
                            }
                        } else {
                            for (j = 0; j < events.length; j++) {
                                if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                                this[i].dom7LiveListeners.push({
                                    listener: listener,
                                    liveListener: handleLiveEvent
                                });
                                this[i].addEventListener(events[j], handleLiveEvent, capture);
                            }
                        }
                    }
                    return this;
                },
                off: function off(eventName, targetSelector, listener, capture) {
                    var events = eventName.split(" ");
                    for (var i = 0; i < events.length; i++) {
                        for (var j = 0; j < this.length; j++) {
                            if (typeof targetSelector === "function" || targetSelector === false) {
                                if (typeof targetSelector === "function") {
                                    listener = arguments[1];
                                    capture = arguments[2] || false;
                                }
                                this[j].removeEventListener(events[i], listener, capture);
                            } else {
                                if (this[j].dom7LiveListeners) {
                                    for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                        if (this[j].dom7LiveListeners[k].listener === listener) {
                                            this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return this;
                },
                once: function once(eventName, targetSelector, listener, capture) {
                    var dom = this;
                    if (typeof targetSelector === "function") {
                        targetSelector = false;
                        listener = arguments[1];
                        capture = arguments[2];
                    }
                    function proxy(e) {
                        listener(e);
                        dom.off(eventName, targetSelector, proxy, capture);
                    }
                    dom.on(eventName, targetSelector, proxy, capture);
                },
                trigger: function trigger(eventName, eventData) {
                    for (var i = 0; i < this.length; i++) {
                        var evt;
                        try {
                            evt = new window.CustomEvent(eventName, {
                                detail: eventData,
                                bubbles: true,
                                cancelable: true
                            });
                        } catch (e) {
                            evt = document.createEvent("Event");
                            evt.initEvent(eventName, true, true);
                            evt.detail = eventData;
                        }
                        this[i].dispatchEvent(evt);
                    }
                    return this;
                },
                transitionEnd: function transitionEnd(callback) {
                    var events = [ "webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd" ], i, j, dom = this;
                    function fireCallBack(e) {
                        if (e.target !== this) return;
                        callback.call(this, e);
                        for (i = 0; i < events.length; i++) {
                            dom.off(events[i], fireCallBack);
                        }
                    }
                    if (callback) {
                        for (i = 0; i < events.length; i++) {
                            dom.on(events[i], fireCallBack);
                        }
                    }
                    return this;
                },
                width: function width() {
                    if (this[0] === window) {
                        return window.innerWidth;
                    } else {
                        if (this.length > 0) {
                            return parseFloat(this.css("width"));
                        } else {
                            return null;
                        }
                    }
                },
                outerWidth: function outerWidth(includeMargins) {
                    if (this.length > 0) {
                        if (includeMargins) return this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")); else return this[0].offsetWidth;
                    } else return null;
                },
                height: function height() {
                    if (this[0] === window) {
                        return window.innerHeight;
                    } else {
                        if (this.length > 0) {
                            return parseFloat(this.css("height"));
                        } else {
                            return null;
                        }
                    }
                },
                outerHeight: function outerHeight(includeMargins) {
                    if (this.length > 0) {
                        if (includeMargins) return this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")); else return this[0].offsetHeight;
                    } else return null;
                },
                offset: function offset() {
                    if (this.length > 0) {
                        var el = this[0];
                        var box = el.getBoundingClientRect();
                        var body = document.body;
                        var clientTop = el.clientTop || body.clientTop || 0;
                        var clientLeft = el.clientLeft || body.clientLeft || 0;
                        var scrollTop = window.pageYOffset || el.scrollTop;
                        var scrollLeft = window.pageXOffset || el.scrollLeft;
                        return {
                            top: box.top + scrollTop - clientTop,
                            left: box.left + scrollLeft - clientLeft
                        };
                    } else {
                        return null;
                    }
                },
                css: function css(props, value) {
                    var i;
                    if (arguments.length === 1) {
                        if (typeof props === "string") {
                            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                        } else {
                            for (i = 0; i < this.length; i++) {
                                for (var prop in props) {
                                    this[i].style[prop] = props[prop];
                                }
                            }
                            return this;
                        }
                    }
                    if (arguments.length === 2 && typeof props === "string") {
                        for (i = 0; i < this.length; i++) {
                            this[i].style[props] = value;
                        }
                        return this;
                    }
                    return this;
                },
                each: function each(callback) {
                    for (var i = 0; i < this.length; i++) {
                        callback.call(this[i], i, this[i]);
                    }
                    return this;
                },
                html: function html(_html) {
                    if (typeof _html === "undefined") {
                        return this[0] ? this[0].innerHTML : undefined;
                    } else {
                        for (var i = 0; i < this.length; i++) {
                            this[i].innerHTML = _html;
                        }
                        return this;
                    }
                },
                text: function text(_text) {
                    if (typeof _text === "undefined") {
                        if (this[0]) {
                            return this[0].textContent.trim();
                        } else return null;
                    } else {
                        for (var i = 0; i < this.length; i++) {
                            this[i].textContent = _text;
                        }
                        return this;
                    }
                },
                is: function is(selector) {
                    if (!this[0]) return false;
                    var compareWith, i;
                    if (typeof selector === "string") {
                        var el = this[0];
                        if (el === document) return selector === document;
                        if (el === window) return selector === window;
                        if (el.matches) return el.matches(selector); else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector); else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector); else if (el.msMatchesSelector) return el.msMatchesSelector(selector); else {
                            compareWith = $(selector);
                            for (i = 0; i < compareWith.length; i++) {
                                if (compareWith[i] === this[0]) return true;
                            }
                            return false;
                        }
                    } else if (selector === document) return this[0] === document; else if (selector === window) return this[0] === window; else {
                        if (selector.nodeType || selector instanceof Dom7) {
                            compareWith = selector.nodeType ? [ selector ] : selector;
                            for (i = 0; i < compareWith.length; i++) {
                                if (compareWith[i] === this[0]) return true;
                            }
                            return false;
                        }
                        return false;
                    }
                },
                index: function index() {
                    if (this[0]) {
                        var child = this[0];
                        var i = 0;
                        while ((child = child.previousSibling) !== null) {
                            if (child.nodeType === 1) i++;
                        }
                        return i;
                    } else return undefined;
                },
                eq: function eq(index) {
                    if (typeof index === "undefined") return this;
                    var length = this.length;
                    var returnIndex;
                    if (index > length - 1) {
                        return new Dom7([]);
                    }
                    if (index < 0) {
                        returnIndex = length + index;
                        if (returnIndex < 0) return new Dom7([]); else return new Dom7([ this[returnIndex] ]);
                    }
                    return new Dom7([ this[index] ]);
                },
                append: function append(newChild) {
                    var i, j;
                    for (i = 0; i < this.length; i++) {
                        if (typeof newChild === "string") {
                            var tempDiv = document.createElement("div");
                            tempDiv.innerHTML = newChild;
                            while (tempDiv.firstChild) {
                                this[i].appendChild(tempDiv.firstChild);
                            }
                        } else if (newChild instanceof Dom7) {
                            for (j = 0; j < newChild.length; j++) {
                                this[i].appendChild(newChild[j]);
                            }
                        } else {
                            this[i].appendChild(newChild);
                        }
                    }
                    return this;
                },
                prepend: function prepend(newChild) {
                    var i, j;
                    for (i = 0; i < this.length; i++) {
                        if (typeof newChild === "string") {
                            var tempDiv = document.createElement("div");
                            tempDiv.innerHTML = newChild;
                            for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                                this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                            }
                        } else if (newChild instanceof Dom7) {
                            for (j = 0; j < newChild.length; j++) {
                                this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                            }
                        } else {
                            this[i].insertBefore(newChild, this[i].childNodes[0]);
                        }
                    }
                    return this;
                },
                insertBefore: function insertBefore(selector) {
                    var before = $(selector);
                    for (var i = 0; i < this.length; i++) {
                        if (before.length === 1) {
                            before[0].parentNode.insertBefore(this[i], before[0]);
                        } else if (before.length > 1) {
                            for (var j = 0; j < before.length; j++) {
                                before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                            }
                        }
                    }
                },
                insertAfter: function insertAfter(selector) {
                    var after = $(selector);
                    for (var i = 0; i < this.length; i++) {
                        if (after.length === 1) {
                            after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                        } else if (after.length > 1) {
                            for (var j = 0; j < after.length; j++) {
                                after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                            }
                        }
                    }
                },
                next: function next(selector) {
                    if (this.length > 0) {
                        if (selector) {
                            if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([ this[0].nextElementSibling ]); else return new Dom7([]);
                        } else {
                            if (this[0].nextElementSibling) return new Dom7([ this[0].nextElementSibling ]); else return new Dom7([]);
                        }
                    } else return new Dom7([]);
                },
                nextAll: function nextAll(selector) {
                    var nextEls = [];
                    var el = this[0];
                    if (!el) return new Dom7([]);
                    while (el.nextElementSibling) {
                        var next = el.nextElementSibling;
                        if (selector) {
                            if ($(next).is(selector)) nextEls.push(next);
                        } else nextEls.push(next);
                        el = next;
                    }
                    return new Dom7(nextEls);
                },
                prev: function prev(selector) {
                    if (this.length > 0) {
                        if (selector) {
                            if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([ this[0].previousElementSibling ]); else return new Dom7([]);
                        } else {
                            if (this[0].previousElementSibling) return new Dom7([ this[0].previousElementSibling ]); else return new Dom7([]);
                        }
                    } else return new Dom7([]);
                },
                prevAll: function prevAll(selector) {
                    var prevEls = [];
                    var el = this[0];
                    if (!el) return new Dom7([]);
                    while (el.previousElementSibling) {
                        var prev = el.previousElementSibling;
                        if (selector) {
                            if ($(prev).is(selector)) prevEls.push(prev);
                        } else prevEls.push(prev);
                        el = prev;
                    }
                    return new Dom7(prevEls);
                },
                parent: function parent(selector) {
                    var parents = [];
                    for (var i = 0; i < this.length; i++) {
                        if (selector) {
                            if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                        } else {
                            parents.push(this[i].parentNode);
                        }
                    }
                    return $($.unique(parents));
                },
                parents: function parents(selector) {
                    var parents = [];
                    for (var i = 0; i < this.length; i++) {
                        var parent = this[i].parentNode;
                        while (parent) {
                            if (selector) {
                                if ($(parent).is(selector)) parents.push(parent);
                            } else {
                                parents.push(parent);
                            }
                            parent = parent.parentNode;
                        }
                    }
                    return $($.unique(parents));
                },
                find: function find(selector) {
                    var foundElements = [];
                    for (var i = 0; i < this.length; i++) {
                        var found = this[i].querySelectorAll(selector);
                        for (var j = 0; j < found.length; j++) {
                            foundElements.push(found[j]);
                        }
                    }
                    return new Dom7(foundElements);
                },
                children: function children(selector) {
                    var children = [];
                    for (var i = 0; i < this.length; i++) {
                        var childNodes = this[i].childNodes;
                        for (var j = 0; j < childNodes.length; j++) {
                            if (!selector) {
                                if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                            } else {
                                if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                            }
                        }
                    }
                    return new Dom7($.unique(children));
                },
                remove: function remove() {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                    }
                    return this;
                },
                add: function add() {
                    var dom = this;
                    var i, j;
                    for (i = 0; i < arguments.length; i++) {
                        var toAdd = $(arguments[i]);
                        for (j = 0; j < toAdd.length; j++) {
                            dom[dom.length] = toAdd[j];
                            dom.length++;
                        }
                    }
                    return dom;
                }
            };
            $.fn = Dom7.prototype;
            $.unique = function(arr) {
                var unique = [];
                for (var i = 0; i < arr.length; i++) {
                    if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
                }
                return unique;
            };
            return $;
        }();
        var swiperDomPlugins = [ "jQuery", "Zepto", "Dom7" ];
        for (var i = 0; i < swiperDomPlugins.length; i++) {
            if (window[swiperDomPlugins[i]]) {
                addLibraryPlugin(window[swiperDomPlugins[i]]);
            }
        }
        var domLib;
        if (typeof Dom7 === "undefined") {
            domLib = window.Dom7 || window.Zepto || window.jQuery;
        } else {
            domLib = Dom7;
        }
        function addLibraryPlugin(lib) {
            lib.fn.swiper = function(params) {
                var firstInstance;
                lib(this).each(function() {
                    var s = new Swiper(this, params);
                    if (!firstInstance) firstInstance = s;
                });
                return firstInstance;
            };
        }
        if (domLib) {
            if (!("transitionEnd" in domLib.fn)) {
                domLib.fn.transitionEnd = function(callback) {
                    var events = [ "webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd" ], i, j, dom = this;
                    function fireCallBack(e) {
                        if (e.target !== this) return;
                        callback.call(this, e);
                        for (i = 0; i < events.length; i++) {
                            dom.off(events[i], fireCallBack);
                        }
                    }
                    if (callback) {
                        for (i = 0; i < events.length; i++) {
                            dom.on(events[i], fireCallBack);
                        }
                    }
                    return this;
                };
            }
            if (!("transform" in domLib.fn)) {
                domLib.fn.transform = function(transform) {
                    for (var i = 0; i < this.length; i++) {
                        var elStyle = this[i].style;
                        elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                    }
                    return this;
                };
            }
            if (!("transition" in domLib.fn)) {
                domLib.fn.transition = function(duration) {
                    if (typeof duration !== "string") {
                        duration = duration + "ms";
                    }
                    for (var i = 0; i < this.length; i++) {
                        var elStyle = this[i].style;
                        elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                    }
                    return this;
                };
            }
        }
        window.Swiper = Swiper;
    })();
    if (true) {
        module.exports = window.Swiper;
    } else if (typeof define === "function" && define.amd) {
        define([], function() {
            "use strict";
            return window.Swiper;
        });
    }
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(47),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(48),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(49),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(50),
        __esModule: true
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = true;
    var _iterator = __webpack_require__(45);
    var _iterator2 = _interopRequireDefault(_iterator);
    var _symbol = __webpack_require__(44);
    var _symbol2 = _interopRequireDefault(_symbol);
    var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj;
    };
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function(obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof(obj);
    } : function(obj) {
        return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(72);
    module.exports = __webpack_require__(4).Object.assign;
}, function(module, exports, __webpack_require__) {
    __webpack_require__(73);
    module.exports = __webpack_require__(4).Object.keys;
}, function(module, exports, __webpack_require__) {
    __webpack_require__(76);
    __webpack_require__(74);
    __webpack_require__(77);
    __webpack_require__(78);
    module.exports = __webpack_require__(4).Symbol;
}, function(module, exports, __webpack_require__) {
    __webpack_require__(75);
    __webpack_require__(79);
    module.exports = __webpack_require__(29).f("iterator");
}, function(module, exports) {
    module.exports = function(it) {
        if (typeof it != "function") throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports) {
    module.exports = function() {};
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(3), toLength = __webpack_require__(70), toIndex = __webpack_require__(69);
    module.exports = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
            var O = toIObject($this), length = toLength(O.length), index = toIndex(fromIndex, length), value;
            if (IS_INCLUDES && el != el) while (length > index) {
                value = O[index++];
                if (value != value) return true;
            } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
                if (O[index] === el) return IS_INCLUDES || index || 0;
            }
            return !IS_INCLUDES && -1;
        };
    };
}, function(module, exports, __webpack_require__) {
    var aFunction = __webpack_require__(51);
    module.exports = function(fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;
        switch (length) {
          case 1:
            return function(a) {
                return fn.call(that, a);
            };

          case 2:
            return function(a, b) {
                return fn.call(that, a, b);
            };

          case 3:
            return function(a, b, c) {
                return fn.call(that, a, b, c);
            };
        }
        return function() {
            return fn.apply(that, arguments);
        };
    };
}, function(module, exports, __webpack_require__) {
    var getKeys = __webpack_require__(9), gOPS = __webpack_require__(21), pIE = __webpack_require__(14);
    module.exports = function(it) {
        var result = getKeys(it), getSymbols = gOPS.f;
        if (getSymbols) {
            var symbols = getSymbols(it), isEnum = pIE.f, i = 0, key;
            while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
        }
        return result;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(1).document && document.documentElement;
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(30);
    module.exports = Array.isArray || function isArray(arg) {
        return cof(arg) == "Array";
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var create = __webpack_require__(35), descriptor = __webpack_require__(15), setToStringTag = __webpack_require__(22), IteratorPrototype = {};
    __webpack_require__(7)(IteratorPrototype, __webpack_require__(10)("iterator"), function() {
        return this;
    });
    module.exports = function(Constructor, NAME, next) {
        Constructor.prototype = create(IteratorPrototype, {
            next: descriptor(1, next)
        });
        setToStringTag(Constructor, NAME + " Iterator");
    };
}, function(module, exports) {
    module.exports = function(done, value) {
        return {
            value: value,
            done: !!done
        };
    };
}, function(module, exports, __webpack_require__) {
    var getKeys = __webpack_require__(9), toIObject = __webpack_require__(3);
    module.exports = function(object, el) {
        var O = toIObject(object), keys = getKeys(O), length = keys.length, index = 0, key;
        while (length > index) if (O[key = keys[index++]] === el) return key;
    };
}, function(module, exports, __webpack_require__) {
    var META = __webpack_require__(16)("meta"), isObject = __webpack_require__(13), has = __webpack_require__(2), setDesc = __webpack_require__(8).f, id = 0;
    var isExtensible = Object.isExtensible || function() {
        return true;
    };
    var FREEZE = !__webpack_require__(6)(function() {
        return isExtensible(Object.preventExtensions({}));
    });
    var setMeta = function(it) {
        setDesc(it, META, {
            value: {
                i: "O" + ++id,
                w: {}
            }
        });
    };
    var fastKey = function(it, create) {
        if (!isObject(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
        if (!has(it, META)) {
            if (!isExtensible(it)) return "F";
            if (!create) return "E";
            setMeta(it);
        }
        return it[META].i;
    };
    var getWeak = function(it, create) {
        if (!has(it, META)) {
            if (!isExtensible(it)) return true;
            if (!create) return false;
            setMeta(it);
        }
        return it[META].w;
    };
    var onFreeze = function(it) {
        if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
        return it;
    };
    var meta = module.exports = {
        KEY: META,
        NEED: false,
        fastKey: fastKey,
        getWeak: getWeak,
        onFreeze: onFreeze
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var getKeys = __webpack_require__(9), gOPS = __webpack_require__(21), pIE = __webpack_require__(14), toObject = __webpack_require__(26), IObject = __webpack_require__(33), $assign = Object.assign;
    module.exports = !$assign || __webpack_require__(6)(function() {
        var A = {}, B = {}, S = Symbol(), K = "abcdefghijklmnopqrst";
        A[S] = 7;
        K.split("").forEach(function(k) {
            B[k] = k;
        });
        return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join("") != K;
    }) ? function assign(target, source) {
        var T = toObject(target), aLen = arguments.length, index = 1, getSymbols = gOPS.f, isEnum = pIE.f;
        while (aLen > index) {
            var S = IObject(arguments[index++]), keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S), length = keys.length, j = 0, key;
            while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
        }
        return T;
    } : $assign;
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(8), anObject = __webpack_require__(11), getKeys = __webpack_require__(9);
    module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var keys = getKeys(Properties), length = keys.length, i = 0, P;
        while (length > i) dP.f(O, P = keys[i++], Properties[P]);
        return O;
    };
}, function(module, exports, __webpack_require__) {
    var pIE = __webpack_require__(14), createDesc = __webpack_require__(15), toIObject = __webpack_require__(3), toPrimitive = __webpack_require__(27), has = __webpack_require__(2), IE8_DOM_DEFINE = __webpack_require__(32), gOPD = Object.getOwnPropertyDescriptor;
    exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P) {
        O = toIObject(O);
        P = toPrimitive(P, true);
        if (IE8_DOM_DEFINE) try {
            return gOPD(O, P);
        } catch (e) {}
        if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(3), gOPN = __webpack_require__(36).f, toString = {}.toString;
    var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    var getWindowNames = function(it) {
        try {
            return gOPN(it);
        } catch (e) {
            return windowNames.slice();
        }
    };
    module.exports.f = function getOwnPropertyNames(it) {
        return windowNames && toString.call(it) == "[object Window]" ? getWindowNames(it) : gOPN(toIObject(it));
    };
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(2), toObject = __webpack_require__(26), IE_PROTO = __webpack_require__(23)("IE_PROTO"), ObjectProto = Object.prototype;
    module.exports = Object.getPrototypeOf || function(O) {
        O = toObject(O);
        if (has(O, IE_PROTO)) return O[IE_PROTO];
        if (typeof O.constructor == "function" && O instanceof O.constructor) {
            return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectProto : null;
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(12), core = __webpack_require__(4), fails = __webpack_require__(6);
    module.exports = function(KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function() {
            fn(1);
        }), "Object", exp);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(25), defined = __webpack_require__(17);
    module.exports = function(TO_STRING) {
        return function(that, pos) {
            var s = String(defined(that)), i = toInteger(pos), l = s.length, a, b;
            if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
            a = s.charCodeAt(i);
            return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536;
        };
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(25), max = Math.max, min = Math.min;
    module.exports = function(index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(25), min = Math.min;
    module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var addToUnscopables = __webpack_require__(52), step = __webpack_require__(59), Iterators = __webpack_require__(19), toIObject = __webpack_require__(3);
    module.exports = __webpack_require__(34)(Array, "Array", function(iterated, kind) {
        this._t = toIObject(iterated);
        this._i = 0;
        this._k = kind;
    }, function() {
        var O = this._t, kind = this._k, index = this._i++;
        if (!O || index >= O.length) {
            this._t = undefined;
            return step(1);
        }
        if (kind == "keys") return step(0, index);
        if (kind == "values") return step(0, O[index]);
        return step(0, [ index, O[index] ]);
    }, "values");
    Iterators.Arguments = Iterators.Array;
    addToUnscopables("keys");
    addToUnscopables("values");
    addToUnscopables("entries");
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(12);
    $export($export.S + $export.F, "Object", {
        assign: __webpack_require__(62)
    });
}, function(module, exports, __webpack_require__) {
    var toObject = __webpack_require__(26), $keys = __webpack_require__(9);
    __webpack_require__(67)("keys", function() {
        return function keys(it) {
            return $keys(toObject(it));
        };
    });
}, function(module, exports) {}, function(module, exports, __webpack_require__) {
    "use strict";
    var $at = __webpack_require__(68)(true);
    __webpack_require__(34)(String, "String", function(iterated) {
        this._t = String(iterated);
        this._i = 0;
    }, function() {
        var O = this._t, index = this._i, point;
        if (index >= O.length) return {
            value: undefined,
            done: true
        };
        point = $at(O, index);
        this._i += point.length;
        return {
            value: point,
            done: false
        };
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var global = __webpack_require__(1), has = __webpack_require__(2), DESCRIPTORS = __webpack_require__(5), $export = __webpack_require__(12), redefine = __webpack_require__(38), META = __webpack_require__(61).KEY, $fails = __webpack_require__(6), shared = __webpack_require__(24), setToStringTag = __webpack_require__(22), uid = __webpack_require__(16), wks = __webpack_require__(10), wksExt = __webpack_require__(29), wksDefine = __webpack_require__(28), keyOf = __webpack_require__(60), enumKeys = __webpack_require__(55), isArray = __webpack_require__(57), anObject = __webpack_require__(11), toIObject = __webpack_require__(3), toPrimitive = __webpack_require__(27), createDesc = __webpack_require__(15), _create = __webpack_require__(35), gOPNExt = __webpack_require__(65), $GOPD = __webpack_require__(64), $DP = __webpack_require__(8), $keys = __webpack_require__(9), gOPD = $GOPD.f, dP = $DP.f, gOPN = gOPNExt.f, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, PROTOTYPE = "prototype", HIDDEN = wks("_hidden"), TO_PRIMITIVE = wks("toPrimitive"), isEnum = {}.propertyIsEnumerable, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), OPSymbols = shared("op-symbols"), ObjectProto = Object[PROTOTYPE], USE_NATIVE = typeof $Symbol == "function", QObject = global.QObject;
    var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
    var setSymbolDesc = DESCRIPTORS && $fails(function() {
        return _create(dP({}, "a", {
            get: function() {
                return dP(this, "a", {
                    value: 7
                }).a;
            }
        })).a != 7;
    }) ? function(it, key, D) {
        var protoDesc = gOPD(ObjectProto, key);
        if (protoDesc) delete ObjectProto[key];
        dP(it, key, D);
        if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
    } : dP;
    var wrap = function(tag) {
        var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
        sym._k = tag;
        return sym;
    };
    var isSymbol = USE_NATIVE && typeof $Symbol.iterator == "symbol" ? function(it) {
        return typeof it == "symbol";
    } : function(it) {
        return it instanceof $Symbol;
    };
    var $defineProperty = function defineProperty(it, key, D) {
        if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
        anObject(it);
        key = toPrimitive(key, true);
        anObject(D);
        if (has(AllSymbols, key)) {
            if (!D.enumerable) {
                if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
                it[HIDDEN][key] = true;
            } else {
                if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
                D = _create(D, {
                    enumerable: createDesc(0, false)
                });
            }
            return setSymbolDesc(it, key, D);
        }
        return dP(it, key, D);
    };
    var $defineProperties = function defineProperties(it, P) {
        anObject(it);
        var keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length, key;
        while (l > i) $defineProperty(it, key = keys[i++], P[key]);
        return it;
    };
    var $create = function create(it, P) {
        return P === undefined ? _create(it) : $defineProperties(_create(it), P);
    };
    var $propertyIsEnumerable = function propertyIsEnumerable(key) {
        var E = isEnum.call(this, key = toPrimitive(key, true));
        if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
        return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
    };
    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
        it = toIObject(it);
        key = toPrimitive(key, true);
        if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
        var D = gOPD(it, key);
        if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
        return D;
    };
    var $getOwnPropertyNames = function getOwnPropertyNames(it) {
        var names = gOPN(toIObject(it)), result = [], i = 0, key;
        while (names.length > i) {
            if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
        }
        return result;
    };
    var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
        var IS_OP = it === ObjectProto, names = gOPN(IS_OP ? OPSymbols : toIObject(it)), result = [], i = 0, key;
        while (names.length > i) {
            if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
        }
        return result;
    };
    if (!USE_NATIVE) {
        $Symbol = function Symbol() {
            if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
            var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
            var $set = function(value) {
                if (this === ObjectProto) $set.call(OPSymbols, value);
                if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                setSymbolDesc(this, tag, createDesc(1, value));
            };
            if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {
                configurable: true,
                set: $set
            });
            return wrap(tag);
        };
        redefine($Symbol[PROTOTYPE], "toString", function toString() {
            return this._k;
        });
        $GOPD.f = $getOwnPropertyDescriptor;
        $DP.f = $defineProperty;
        __webpack_require__(36).f = gOPNExt.f = $getOwnPropertyNames;
        __webpack_require__(14).f = $propertyIsEnumerable;
        __webpack_require__(21).f = $getOwnPropertySymbols;
        if (DESCRIPTORS && !__webpack_require__(20)) {
            redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, true);
        }
        wksExt.f = function(name) {
            return wrap(wks(name));
        };
    }
    $export($export.G + $export.W + $export.F * !USE_NATIVE, {
        Symbol: $Symbol
    });
    for (var symbols = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), i = 0; symbols.length > i; ) wks(symbols[i++]);
    for (var symbols = $keys(wks.store), i = 0; symbols.length > i; ) wksDefine(symbols[i++]);
    $export($export.S + $export.F * !USE_NATIVE, "Symbol", {
        "for": function(key) {
            return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
        },
        keyFor: function keyFor(key) {
            if (isSymbol(key)) return keyOf(SymbolRegistry, key);
            throw TypeError(key + " is not a symbol!");
        },
        useSetter: function() {
            setter = true;
        },
        useSimple: function() {
            setter = false;
        }
    });
    $export($export.S + $export.F * !USE_NATIVE, "Object", {
        create: $create,
        defineProperty: $defineProperty,
        defineProperties: $defineProperties,
        getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
        getOwnPropertyNames: $getOwnPropertyNames,
        getOwnPropertySymbols: $getOwnPropertySymbols
    });
    $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function() {
        var S = $Symbol();
        return _stringify([ S ]) != "[null]" || _stringify({
            a: S
        }) != "{}" || _stringify(Object(S)) != "{}";
    })), "JSON", {
        stringify: function stringify(it) {
            if (it === undefined || isSymbol(it)) return;
            var args = [ it ], i = 1, replacer, $replacer;
            while (arguments.length > i) args.push(arguments[i++]);
            replacer = args[1];
            if (typeof replacer == "function") $replacer = replacer;
            if ($replacer || !isArray(replacer)) replacer = function(key, value) {
                if ($replacer) value = $replacer.call(this, key, value);
                if (!isSymbol(value)) return value;
            };
            args[1] = replacer;
            return _stringify.apply($JSON, args);
        }
    });
    $Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
    setToStringTag($Symbol, "Symbol");
    setToStringTag(Math, "Math", true);
    setToStringTag(global.JSON, "JSON", true);
}, function(module, exports, __webpack_require__) {
    __webpack_require__(28)("asyncIterator");
}, function(module, exports, __webpack_require__) {
    __webpack_require__(28)("observable");
}, function(module, exports, __webpack_require__) {
    __webpack_require__(71);
    var global = __webpack_require__(1), hide = __webpack_require__(7), Iterators = __webpack_require__(19), TO_STRING_TAG = __webpack_require__(10)("toStringTag");
    for (var collections = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], i = 0; i < 5; i++) {
        var NAME = collections[i], Collection = global[NAME], proto = Collection && Collection.prototype;
        if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = Iterators.Array;
    }
}, function(module, exports) {}, function(module, exports) {
    module.exports = "<div class=vux-swiper-slide> <slot></slot> </div>";
}, function(module, exports) {
    module.exports = "<div class=vux-swiper-container> <div class=vux-swiper-wrapper> <slot></slot> </div> <div v-if=pagination class=vux-swiper-pagination></div> <div v-if=prevButton class=vux-swiper-button-prev></div> <div v-if=nextButton class=vux-swiper-button-next></div> </div>";
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __vue_template__ = __webpack_require__(81);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
}, function(module, exports, __webpack_require__) {
    var __vue_script__, __vue_template__;
    __webpack_require__(80);
    __vue_script__ = __webpack_require__(39);
    __vue_template__ = __webpack_require__(82);
    module.exports = __vue_script__ || {};
    if (module.exports.__esModule) module.exports = module.exports.default;
    if (__vue_template__) {
        (typeof module.exports === "function" ? module.exports.options || (module.exports.options = {}) : module.exports).template = __vue_template__;
    }
} ]);