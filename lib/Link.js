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
    children: PropTypes.node,
    onMove: PropTypes.func,
    scrollTo: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};
var LinkDefaultProps = {
    href: '/',
};
var Link = /** @class */ (function (_super) {
    tslib.__extends(Link, _super);
    function Link() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Link.prototype.move = function (url) {
        var _a = this.props, scrollTo = _a.scrollTo, scrollFirst = _a.scrollFirst, replace = _a.replace;
        Router.history[replace ? 'replace' : 'push'](url, scrollTo, scrollFirst);
    };
    Link.prototype.onMove = function (url) {
        var _this = this;
        var onMove = this.props.onMove;
        if (onMove) {
            onMove(function () { return _this.move(url); });
        }
        else {
            this.move(url);
        }
    };
    Link.prototype.onClick = function (e) {
        var href = this.props.href;
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
        this.onMove(url);
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    };
    Object.defineProperty(Link.prototype, "isLocal", {
        get: function () {
            return !this.props.href.startsWith('http');
        },
        enumerable: false,
        configurable: true
    });
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
        var isLocal = this.isLocal;
        var _a = this.props, activeClass = _a.activeClass, exact = _a.exact, scrollTo = _a.scrollTo, scrollFirst = _a.scrollFirst, replace = _a.replace, href = _a.href, onMove = _a.onMove, _b = _a.rel, rel = _b === void 0 ? isLocal ? undefined : 'noopener noreferrer nofollow' : _b, _c = _a.target, target = _c === void 0 ? isLocal ? undefined : '_blank' : _c, props = tslib.__rest(_a, ["activeClass", "exact", "scrollTo", "scrollFirst", "replace", "href", "onMove", "rel", "target"]);
        var locale = Router.history.locale;
        return React__default.createElement("a", tslib.__assign({}, props, { href: !this.isLocal || !locale ? href : href === '/' ? "/" + locale : "/" + locale + href, rel: rel, target: target, onClick: function (e) { return _this.onClick(e); }, className: this.className }));
    };
    Link.propTypes = LinkTypes;
    Link.defaultProps = LinkDefaultProps;
    tslib.__decorate([
        mobx.action
    ], Link.prototype, "move", null);
    Link = tslib.__decorate([
        mobxReact.observer
    ], Link);
    return Link;
}(React.Component));

exports.LinkDefaultProps = LinkDefaultProps;
exports.LinkTypes = LinkTypes;
exports.default = Link;
