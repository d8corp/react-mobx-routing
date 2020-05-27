import { __decorate } from 'tslib';
import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import History from 'mobx-history-api';
import { observable, computed, action, reaction } from 'mobx';

const history = new History();
const RouterContext = createContext(null);
const RouterTypes = {
    match: PropTypes.string,
    path: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    other: PropTypes.bool,
    ish: PropTypes.bool,
    pathIsh: PropTypes.bool,
    searchIsh: PropTypes.bool,
    hashIsh: PropTypes.bool,
    delay: PropTypes.number,
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
    onShow: PropTypes.func,
    onShown: PropTypes.func,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ])
};
function getMatchReg(props) {
    const { match } = props;
    if (match) {
        return match;
    }
    else {
        let { search, pathIsh, searchIsh, ish, path, hash, hashIsh } = props;
        return `^${path ? `${path}${ish || pathIsh ? '(/[^?#]*)?' : ''}` : '[^?#]*'}${search ?
            `\\?${ish || searchIsh ? '([^#]*\\&)?' : ''}${search}${ish || searchIsh ? '(\\&[^#]*)?' : ''}` :
            '(\\?[^#]*)?'}${hash ? `\\#${ish || hashIsh ? '.*' : ''}${hash}${ish || hashIsh ? '.*' : ''}` : '(\\#.*)?'}$`;
    }
}
let Router = /** @class */ (() => {
    let Router = class Router extends Component {
        constructor() {
            super(...arguments);
            this.show = this.matched && !this.props.showDelay && !this.props.delay;
            this.childRouterCount = 0;
        }
        componentDidMount() {
            this.reaction = reaction(() => this.matched, matched => {
                if (matched) {
                    this.onShow();
                }
                else {
                    this.onHide();
                }
            }, {
                fireImmediately: true
            });
        }
        componentWillUnmount() {
            this.reaction();
        }
        get children() {
            const { matchReg } = this;
            if (!matchReg)
                return null;
            let { children } = this.props;
            if (typeof children === 'function') {
                let { match, search, searchIsh, ish, path } = this.props;
                // @ts-ignore
                return children((id, defaultValue) => {
                    if (id && !match && search && (searchIsh || ish)) {
                        let start = 0;
                        let end = start + search.split('(').length + 1;
                        if (path) {
                            const { length } = path.split('(');
                            start += length - 1;
                            end += length - 1;
                        }
                        if (id > start) {
                            id++;
                            if (id >= end) {
                                id++;
                            }
                        }
                    }
                    return history.get(matchReg, id, defaultValue) || defaultValue;
                });
            }
            else {
                return children;
            }
        }
        get showOther() {
            return !this.childRouterCount;
        }
        get matched() {
            var _a;
            const { props } = this;
            if (props.other && !((_a = this.context) === null || _a === void 0 ? void 0 : _a.showOther)) {
                return false;
            }
            if (!props.path && !props.search && !props.hash && !props.match) {
                return true;
            }
            return history.is(this.matchReg);
        }
        get matchReg() {
            return getMatchReg(this.props);
        }
        onShow() {
            const { onShow, showDelay, delay } = this.props;
            if (onShow) {
                onShow();
            }
            if (showDelay || delay) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => this.onShown(), showDelay || delay);
            }
            else {
                this.onShown();
            }
        }
        onShown() {
            const { onShown } = this.props;
            if (!this.show && !this.props.other && this.context) {
                this.context.childRouterCount++;
            }
            this.show = true;
            if (onShown) {
                onShown();
            }
        }
        onHide() {
            const { onHide, hideDelay, delay } = this.props;
            if (onHide) {
                onHide();
            }
            if (hideDelay || delay) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => this.onHidden(), hideDelay || delay);
            }
            else {
                this.onHidden();
            }
        }
        onHidden() {
            if (this.show && !this.props.other && this.context) {
                this.context.childRouterCount--;
            }
            this.show = false;
            if (this.props.onHidden) {
                this.props.onHidden();
            }
        }
        render() {
            return this.show ? (React.createElement(RouterContext.Provider, { value: this }, this.children)) : null;
        }
    };
    Router.propTypes = RouterTypes;
    Router.defaultProps = {
        match: '',
        path: '',
        search: '',
        hash: '',
        ish: false,
        pathIsh: false,
        searchIsh: false,
        hashIsh: false
    };
    Router.contextType = RouterContext;
    __decorate([
        observable
    ], Router.prototype, "show", void 0);
    __decorate([
        observable
    ], Router.prototype, "childRouterCount", void 0);
    __decorate([
        computed
    ], Router.prototype, "showOther", null);
    __decorate([
        computed
    ], Router.prototype, "matched", null);
    __decorate([
        computed
    ], Router.prototype, "matchReg", null);
    __decorate([
        action
    ], Router.prototype, "onShow", null);
    __decorate([
        action
    ], Router.prototype, "onShown", null);
    __decorate([
        action
    ], Router.prototype, "onHide", null);
    __decorate([
        action
    ], Router.prototype, "onHidden", null);
    Router = __decorate([
        observer
    ], Router);
    return Router;
})();

export default Router;
export { RouterContext, RouterTypes, getMatchReg, history };
