(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Expression = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function count(arr, item) {
	var c = 0;

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === item) c++;
	}

	return c;
}

function compare(arr0, arr1) {
	if (arr0.length !== arr1.length) return false;

	arr0 = arr0.slice().sort();
	arr1 = arr1.slice().sort();

	for (var i = 0; i < arr0.length; i++) {
		if (arr0[i] !== arr1[i]) return false;
	}

	return true;
}

function add(arr) {
	var n = 0;

	arr.forEach(function (a) {
		return n += a;
	});

	return n;
}

function times(arr) {
	var n = 1;

	arr.forEach(function (a) {
		return n *= a;
	});

	return n;
}

var isNumeric = function isNumeric(a) {
	return typeof a === "number";
};
var isSymbolic = function isSymbolic(a) {
	return typeof a === "string";
};

module.exports = function () {
	function Expression(str) {
		_classCallCheck(this, Expression);

		this.terms = str.replace(new RegExp(" ", "g"), "").split("+").map(function (str) {
			var i = void 0;
			var n = 0;
			var co = [];

			for (i = 0; parseInt(str[i]) > -1; i++) {
				n *= 10;
				n += parseInt(str[i]);
			}

			co.push(n);

			var c = str[i];
			if (c) co.push(c);

			return co;
		});
	}

	_createClass(Expression, [{
		key: "factorize",
		value: function factorize() {
			var _this = this;

			this.terms.forEach(function (term) {
				var n = 1;

				term.filter(isNumeric).forEach(function (a, i) {
					n *= a;
					term.splice(i, 1);
				});

				term.unshift(n);
			});

			this.terms.forEach(function (a) {
				_this.terms.forEach(function (b, i) {
					if (a === b) return;

					if (compare(a.filter(isSymbolic), b.filter(isSymbolic))) {
						var n = b.filter(isNumeric)[0];

						console.log(n);

						a[a.indexOf(a.filter(isNumeric)[0])] += n;

						_this.terms.splice(i, 1);
					}
				});
			});
		}
	}, {
		key: "multiply",
		value: function multiply(n) {
			this.terms.forEach(function (term) {
				term.push(n);
			});

			this.factorize();
		}

		/*
  differentiate(c) {
  	this.terms.forEach(term => {
  		if(term.indexOf(c) > -1) {
  			term.splice(term.indexOf(c), 1);
  			term.push()
  		}

  	});
  }
  */

	}, {
		key: "stringify",
		value: function stringify() {
			return this.terms.map(function (t) {
				return t.join("");
			}).join(" + ");
		}
	}]);

	return Expression;
}();

},{}]},{},[1])(1)
});
