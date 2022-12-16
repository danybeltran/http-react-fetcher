"use strict";
/**
 * @license http-react-fetcher
 * Copyright (c) Dany Beltran
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetcher = exports.setURLParams = void 0;
/**
 *
 * @param str The target string
 * @param $params The params to parse in the url
 *
 * Params should be separated by `"/"`, (e.g. `"/api/[resource]/:id"`)
 *
 * URL search params will not be affected
 */
function setURLParams(str, $params) {
    if (str === void 0) { str = ''; }
    if ($params === void 0) { $params = {}; }
    var hasQuery = str.includes('?');
    var queryString = '?' +
        str
            .split('?')
            .filter(function (_, i) { return i > 0; })
            .join('?');
    return (str
        .split('/')
        .map(function ($segment) {
        var segment = $segment.split('?')[0];
        if (segment.startsWith('[') && segment.endsWith(']')) {
            var paramName = segment.replace(/\[|\]/g, '');
            if (!(paramName in $params)) {
                console.warn("Param '".concat(paramName, "' does not exist in params configuration for '").concat(str, "'"));
                return paramName;
            }
            return $params[segment.replace(/\[|\]/g, '')];
            // return $params[segment.replace(/\[|\]/g, '')] + hasQ ? '?' + hasQ : ''
        }
        else if (segment.startsWith(':')) {
            var paramName = segment.split('').slice(1).join('');
            if (!(paramName in $params)) {
                console.warn("Param '".concat(paramName, "' does not exist in params configuration for '").concat(str, "'"));
                return paramName;
            }
            return $params[paramName];
        }
        else {
            return segment;
        }
    })
        .join('/') + (hasQuery ? queryString : ''));
}
exports.setURLParams = setURLParams;
/**
 * Creates a new request function. This is for usage with fetcher and fetcher.extend
 */
function createRequestFn(method, baseUrl, $headers, q) {
    return function (url, init) {
        if (init === void 0) { init = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var def, _a, resolver, _b, c, _c, onResolve, _d, onError, _e, params, query, rawUrl, _f, _g, qp, reqQueryString, _h, headers, body, formatBody, reqConfig, r, req, data, err_1;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        def = init.default, _a = init.resolver, resolver = _a === void 0 ? function (e) { return e.json(); } : _a, _b = init.config, c = _b === void 0 ? {} : _b, _c = init.onResolve, onResolve = _c === void 0 ? function () { } : _c, _d = init.onError, onError = _d === void 0 ? function () { } : _d;
                        _e = (c || {}).params, params = _e === void 0 ? {} : _e;
                        query = __assign(__assign({}, q), c.query);
                        rawUrl = setURLParams(url, params);
                        _f = rawUrl.split('?'), _g = _f[1], qp = _g === void 0 ? '' : _g;
                        qp.split('&').forEach(function (q) {
                            var _a;
                            var _b = q.split('='), key = _b[0], value = _b[1];
                            if (query[key] !== value) {
                                query = __assign(__assign({}, query), (_a = {}, _a[key] = value, _a));
                            }
                        });
                        reqQueryString = Object.keys(query)
                            .map(function (q) { return [q, query[q]].join('='); })
                            .join('&');
                        _h = c.headers, headers = _h === void 0 ? {} : _h, body = c.body, formatBody = c.formatBody;
                        reqConfig = {
                            method: method,
                            headers: __assign(__assign({ 'Content-Type': 'application/json' }, $headers), headers),
                            body: (method === null || method === void 0 ? void 0 : method.match(/(POST|PUT|DELETE|PATCH)/))
                                ? typeof formatBody === 'function'
                                    ? formatBody((typeof FormData !== 'undefined' && body instanceof FormData
                                        ? body
                                        : body))
                                    : formatBody === false ||
                                        (typeof FormData !== 'undefined' && body instanceof FormData)
                                        ? body
                                        : JSON.stringify(body)
                                : undefined
                        };
                        r = undefined;
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("".concat(baseUrl || '').concat(rawUrl).concat(url.includes('?') ? "&".concat(reqQueryString) : "?".concat(reqQueryString)), reqConfig)];
                    case 2:
                        req = _j.sent();
                        r = req;
                        return [4 /*yield*/, resolver(req)];
                    case 3:
                        data = _j.sent();
                        if ((req === null || req === void 0 ? void 0 : req.status) >= 400) {
                            onError(true);
                            return [2 /*return*/, {
                                    res: req,
                                    data: def,
                                    error: true,
                                    code: req === null || req === void 0 ? void 0 : req.status,
                                    config: __assign(__assign({ url: "".concat(baseUrl || '').concat(rawUrl) }, reqConfig), { query: query })
                                }];
                        }
                        else {
                            onResolve(data, req);
                            return [2 /*return*/, {
                                    res: req,
                                    data: data,
                                    error: false,
                                    code: req === null || req === void 0 ? void 0 : req.status,
                                    config: __assign(__assign({ url: "".concat(baseUrl || '').concat(rawUrl) }, reqConfig), { query: query })
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _j.sent();
                        onError(err_1);
                        return [2 /*return*/, {
                                res: r,
                                data: def,
                                error: true,
                                code: r === null || r === void 0 ? void 0 : r.status,
                                config: __assign(__assign({ url: "".concat(baseUrl || '').concat(rawUrl) }, reqConfig), { query: query })
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
}
/**
 * Fetcher object
 */
var fetcher = function () { };
exports.fetcher = fetcher;
// Create a method for each request
fetcher.get = createRequestFn('GET', '', {});
fetcher.delete = createRequestFn('DELETE', '', {});
fetcher.head = createRequestFn('HEAD', '', {});
fetcher.options = createRequestFn('OPTIONS', '', {});
fetcher.post = createRequestFn('POST', '', {});
fetcher.put = createRequestFn('PUT', '', {});
fetcher.patch = createRequestFn('PATCH', '', {});
fetcher.purge = createRequestFn('PURGE', '', {});
fetcher.link = createRequestFn('LINK', '', {});
fetcher.unlink = createRequestFn('UNLINK', '', {});
/**
 * Extend the fetcher object
 */
fetcher.extend = function extendFetcher(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.baseUrl, baseUrl = _c === void 0 ? '' : _c, _d = _b.headers, headers = _d === void 0 ? {} : _d, _e = _b.body, body = _e === void 0 ? {} : _e, _f = _b.query, query = _f === void 0 ? {} : _f, 
    // json by default
    _g = _b.resolver, 
    // json by default
    resolver = _g === void 0 ? function (d) { return d.json(); } : _g;
    function customFetcher() { }
    customFetcher.config = {
        baseUrl: baseUrl,
        headers: headers,
        body: body,
        query: query
    };
    // Creating methods for fetcher.extend
    customFetcher.get = createRequestFn('GET', baseUrl, headers, query);
    customFetcher.delete = createRequestFn('DELETE', baseUrl, headers, query);
    customFetcher.head = createRequestFn('HEAD', baseUrl, headers, query);
    customFetcher.options = createRequestFn('OPTIONS', baseUrl, headers, query);
    customFetcher.post = createRequestFn('POST', baseUrl, headers, query);
    customFetcher.put = createRequestFn('PUT', baseUrl, headers, query);
    customFetcher.patch = createRequestFn('PATCH', baseUrl, headers, query);
    customFetcher.purge = createRequestFn('PURGE', baseUrl, headers, query);
    customFetcher.link = createRequestFn('LINK', baseUrl, headers, query);
    customFetcher.unlink = createRequestFn('UNLINK', baseUrl, headers, query);
    return customFetcher;
};
