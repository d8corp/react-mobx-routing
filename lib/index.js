'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('tslib');
require('react');
require('prop-types');
require('mobx-react');
var History = require('mobx-history-api');
var History__default = _interopDefault(History);
require('mobx');
var Router = require('./Router.js');
var Redirect = require('./Redirect.js');
var Link = require('./Link.js');



Object.keys(History).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return History[k];
		}
	});
});
exports.History = History;
exports.RouterContext = Router.RouterContext;
exports.RouterDefaultProps = Router.RouterDefaultProps;
exports.RouterPropTypes = Router.RouterPropTypes;
exports.default = Router.default;
exports.getMatchReg = Router.getMatchReg;
exports.history = Router.history;
exports.Redirect = Redirect.default;
exports.RedirectDefaultProp = Redirect.RedirectDefaultProp;
exports.RedirectTypes = Redirect.RedirectTypes;
exports.Link = Link.default;
exports.LinkTypes = Link.LinkTypes;
