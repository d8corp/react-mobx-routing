import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import History from 'mobx-history-api';
declare const history: History;
declare const RouterContext: React.Context<Router>;
declare type RouterProps = {
    match?: string;
    path?: string;
    search?: string;
    hash?: string;
    other?: boolean;
    ish?: boolean;
    pathIsh?: boolean;
    searchIsh?: boolean;
    hashIsh?: boolean;
    delay?: number;
    showDelay?: number;
    hideDelay?: number;
    onShow?: () => void;
    onShown?: () => void;
    onHide?: () => void;
    onHidden?: () => void;
    children?: ((get: (id?: number, defaultValue?: string) => string) => ReactNode) | ReactNode;
};
declare const RouterTypes: {
    match: PropTypes.Requireable<string>;
    path: PropTypes.Requireable<string>;
    search: PropTypes.Requireable<string>;
    hash: PropTypes.Requireable<string>;
    other: PropTypes.Requireable<boolean>;
    ish: PropTypes.Requireable<boolean>;
    pathIsh: PropTypes.Requireable<boolean>;
    searchIsh: PropTypes.Requireable<boolean>;
    hashIsh: PropTypes.Requireable<boolean>;
    delay: PropTypes.Requireable<number>;
    showDelay: PropTypes.Requireable<number>;
    hideDelay: PropTypes.Requireable<number>;
    onShow: PropTypes.Requireable<(...args: any[]) => any>;
    onShown: PropTypes.Requireable<(...args: any[]) => any>;
    onHide: PropTypes.Requireable<(...args: any[]) => any>;
    onHidden: PropTypes.Requireable<(...args: any[]) => any>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
};
declare function getMatchReg(props: RouterProps): string;
declare class Router extends Component<RouterProps> {
    static propTypes: {
        match: PropTypes.Requireable<string>;
        path: PropTypes.Requireable<string>;
        search: PropTypes.Requireable<string>;
        hash: PropTypes.Requireable<string>;
        other: PropTypes.Requireable<boolean>;
        ish: PropTypes.Requireable<boolean>;
        pathIsh: PropTypes.Requireable<boolean>;
        searchIsh: PropTypes.Requireable<boolean>;
        hashIsh: PropTypes.Requireable<boolean>;
        delay: PropTypes.Requireable<number>;
        showDelay: PropTypes.Requireable<number>;
        hideDelay: PropTypes.Requireable<number>;
        onShow: PropTypes.Requireable<(...args: any[]) => any>;
        onShown: PropTypes.Requireable<(...args: any[]) => any>;
        onHide: PropTypes.Requireable<(...args: any[]) => any>;
        onHidden: PropTypes.Requireable<(...args: any[]) => any>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        match: string;
        path: string;
        search: string;
        hash: string;
        ish: boolean;
        pathIsh: boolean;
        searchIsh: boolean;
        hashIsh: boolean;
    };
    static contextType: React.Context<Router>;
    timer: any;
    reaction: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    get children(): any;
    unmount: boolean;
    show: boolean;
    childRouterCount: number;
    get showOther(): boolean;
    get matched(): boolean;
    get matchReg(): string;
    onShow(): void;
    onShown(): void;
    onHide(): void;
    onHidden(): void;
    render(): JSX.Element;
}
export default Router;
export * from 'mobx-history-api';
export { history, RouterContext, RouterProps, RouterTypes, getMatchReg };
