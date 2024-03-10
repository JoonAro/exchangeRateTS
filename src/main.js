"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _env_ts_1 = require("./.env.ts");
var FetchWrapper = /** @class */ (function () {
    function FetchWrapper(baseURL) {
        this.baseURL = baseURL;
    }
    FetchWrapper.prototype.get = function (endpoint) {
        return fetch(this.baseURL + endpoint).then(function (response) { return response.json(); });
    };
    FetchWrapper.prototype.put = function (endpoint, body) {
        return this._send('put', endpoint, body);
    };
    FetchWrapper.prototype.post = function (endpoint, body) {
        return this._send('post', endpoint, body);
    };
    FetchWrapper.prototype.delete = function (endpoint, body) {
        return this._send('delete', endpoint, body);
    };
    FetchWrapper.prototype._send = function (method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) { return response.json(); });
    };
    return FetchWrapper;
}());
var baseCurrency = document.getElementById('base-currency');
var targetCurrency = document.getElementById('target-currency');
var conversionResult = document.getElementById('conversion-result');
var baseUrl = "https://v6.exchangerate-api.com/v6/".concat(_env_ts_1.API_KEY, "/");
var fetcher = new FetchWrapper(baseUrl);
var conversionRates = [];
fetcher.get('latest/USD')
    .then(function (data) { return Object.entries(data.conversion_rates).forEach(function (rate) { return conversionRates.push(rate); }); });
var getConversionRates = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, conversionRates_1, rate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                conversionRates = [];
                return [4 /*yield*/, fetcher.get("latest/".concat(baseCurrency.value))
                        .then(function (data) { return Object.entries(data.conversion_rates).forEach(function (rate) { return conversionRates.push(rate); }); })];
            case 1:
                _a.sent();
                for (_i = 0, conversionRates_1 = conversionRates; _i < conversionRates_1.length; _i++) {
                    rate = conversionRates_1[_i];
                    if (targetCurrency.value == rate[0]) {
                        conversionResult.textContent = rate[1].toString();
                    }
                }
                ;
                return [2 /*return*/];
        }
    });
}); };
baseCurrency.addEventListener('change', getConversionRates);
targetCurrency.addEventListener('change', getConversionRates);
