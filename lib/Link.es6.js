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
    scrollTo: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};
let Link = /** @class */ (() => {
    let Link = class Link extends Component {
        onClick(e) {
            const { href = '/', scrollTo, scrollFirst, replace } = this.props;
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
            history[replace ? 'replace' : 'push'](url, scrollTo, scrollFirst);
            if (this.props.onClick) {
                this.props.onClick(e);
            }
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
            const _a = this.props, props = __rest(_a, ["activeClass", "exact", "scrollTo", "scrollFirst", "replace"]);
            return React.createElement("a", Object.assign({}, props, { onClick: e => this.onClick(e), className: this.className }));
        }
    };
    Link.propTypes = LinkTypes;
    __decorate([
        action
    ], Link.prototype, "onClick", null);
    Link = __decorate([
        observer
    ], Link);
    return Link;
})();

export default Link;
export { LinkTypes };
