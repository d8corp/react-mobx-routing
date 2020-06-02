'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib = require('tslib');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var mobxReact = require('mobx-react');
require('mobx-history-api');
var mobx = require('mobx');
var Router = require('./Router.js');

var LinkTypes = {
    activeClass: PropTypes.string,
    exact: PropTypes.bool,
    replace: PropTypes.bool,
    scrollFirst: PropTypes.bool,
    scrollTo: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};
var Link = /** @class */ (function (_super) {
    tslib.__extends(Link, _super);
    function Link() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Link.prototype.onClick = function (e) {
        var _a = this.props, _b = _a.href, href = _b === void 0 ? '/' : _b, scrollTo = _a.scrollTo, scrollFirst = _a.scrollFirst, replace = _a.replace;
        var url = href;
        if (href.startsWith('?')) {
            url = Router.history.path + (href === '?' ? '' : href);
        }
        else if (href.startsWith('#')) {
            url = Router.history.path + location.search + (href === '#' ? '' : href);
        }
        else if (!href.startsWith('/')) {
            return;
        }
        e === null || e === void 0 ? void 0 : e.preventDefault();
        Router.history[replace ? 'replace' : 'push'](url, scrollTo, scrollFirst);
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    };
    Object.defineProperty(Link.prototype, "isActive", {
        get: function () {
            var _a = this.props.href, href = _a === void 0 ? '/' : _a;
            var prefix = '';
            if (href.startsWith('?')) {
                prefix = '[^?]*';
            }
            else if (href.startsWith('#')) {
                prefix = '[^#]*';
            }
            else if (!href.startsWith('/')) {
                return false;
            }
            return Router.history.is("^" + prefix + this.props.href + (this.props.exact ? '$' : ''));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "className", {
        get: function () {
            var _a = this.props, className = _a.className, activeClass = _a.activeClass;
            if (activeClass && this.isActive) {
                if (className) {
                    className += ' ' + activeClass;
                }
                else {
                    className = activeClass;
                }
            }
            return className;
        },
        enumerable: false,
        configurable: true
    });
    Link.prototype.render = function () {
        var _this = this;
        var _a = this.props, activeClass = _a.activeClass, exact = _a.exact, scrollTo = _a.scrollTo, scrollFirst = _a.scrollFirst, replace = _a.replace, props = tslib.__rest(_a, ["activeClass", "exact", "scrollTo", "scrollFirst", "replace"]);
        return React__default.createElement("a", tslib.__assign({}, props, { onClick: function (e) { return _this.onClick(e); }, className: this.className }));
    };
    Link.propTypes = LinkTypes;
    tslib.__decorate([
        mobx.action
    ], Link.prototype, "onClick", null);
    Link = tslib.__decorate([
        mobxReact.observer
    ], Link);
    return Link;
}(React.Component));

exports.Link = Link;
exports.LinkTypes = LinkTypes;
exports.default = Link;
