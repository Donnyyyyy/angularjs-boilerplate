/**
 * Minified by jsDelivr using UglifyJS v3.1.10.
 * Original file: /npm/simple-graphql-client@0.1.0/dist/index.js
 * 
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";
var __assign = this && this.__assign || Object.assign || function (e) {
	for (var t, n = 1, r = arguments.length; n < r; n++) {
		t = arguments[n];
		for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o])
	}
	return e
};
var client = function (e, t) {
	var n = (void 0 === t ? {} : t).headers,
		r = void 0 === n ? {} : n;
	return function (t, n) {
		if ("function" != typeof fetch) throw new Error("fetch is not defined. Perhaps you need a polyfill.");
		return fetch(e, {
			method: "POST",
			headers: __assign({
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json;charset=utf-8"
			}, r),
			body: JSON.stringify({
				query: t,
				variables: n
			})
		}).then(function (e) {
			var iter = e.headers.keys();
			return e.json()
		}).then(function (e) {
			var t = e.data,
				n = e.errors;
			return n && n.length ? Promise.reject(n[0].message) : t
		})
	}
};
//# sourceMappingURL=/sm/37fbf05b998c568b9da89a097c8d8d1eb4f4c670a3e35c36878724bfd55b915c.map