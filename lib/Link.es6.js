import { __decorate, __rest } from 'tslib';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import 'mobx-history-api';
import { action } from 'mobx';
import { history } from './Router.es6.js';

const LinkTypes = {
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
const LinkDefaultProps = {
    href: '/',
};
let Link = /** @class */ (() => {
    let Link = class Link extends Component {
        move(url) {
            const { scrollTo, scrollFirst, replace } = this.props;
            history[replace ? 'replace' : 'push'](url, scrollTo, scrollFirst);
        }
        onMove(url) {
            const { onMove } = this.props;
            if (onMove) {
                onMove(() => this.move(url));
            }
            else {
                this.move(url);
            }
        }
        onClick(e) {
            const { href } = this.props;
            let url = href;
            if (href.startsWith('?')) {
                url = history.path + (href === '?' ? '' : href);
            }
            else if (href.startsWith('#')) {
                url = history.path + location.search + (href === '#' ? '' : href);
            }
            else if (!href.startsWith('/')) {
                return;
            }
            e === null || e === void 0 ? void 0 : e.preventDefault();
            this.onMove(url);
            if (this.props.onClick) {
                this.props.onClick(e);
            }
        }
        get isLocal() {
            return /^[#?\/]/.test(this.props.href);
        }
        get isActive() {
            const { href = '/' } = this.props;
            let prefix = '';
            if (href.startsWith('?')) {
                prefix = '[^?]*';
            }
            else if (href.startsWith('#')) {
                prefix = '[^#]*';
            }
            else if (!href.startsWith('/')) {
                return false;
            }
            return history.is(`^${prefix}${this.props.href}${this.props.exact ? '$' : ''}`);
        }
        get className() {
            let { className, activeClass } = this.props;
            if (activeClass && this.isActive) {
                if (className) {
                    className += ' ' + activeClass;
                }
                else {
                    className = activeClass;
                }
            }
            return className;
        }
        render() {
            const { isLocal } = this;
            const _a = this.props, { activeClass, exact, scrollTo, scrollFirst, replace, rel = isLocal ? undefined : 'noreferrer', target = isLocal ? undefined : '_blank' } = _a, props = __rest(_a, ["activeClass", "exact", "scrollTo", "scrollFirst", "replace", "rel", "target"]);
            return React.createElement("a", Object.assign({}, props, { rel: rel, target: target, onClick: e => this.onClick(e), className: this.className }));
        }
    };
    Link.propTypes = LinkTypes;
    Link.defaultProps = LinkDefaultProps;
    __decorate([
        action
    ], Link.prototype, "move", null);
    Link = __decorate([
        observer
    ], Link);
    return Link;
})();

export default Link;
export { LinkDefaultProps, LinkTypes };
