import React, { AnchorHTMLAttributes, Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
interface LinkProps<T = any> extends AnchorHTMLAttributes<T> {
    activeClass?: string;
    exact?: boolean;
    replace?: boolean;
    scrollFirst?: boolean;
    scrollTo?: number | string;
    children?: ReactNode;
}
declare const LinkTypes: {
    activeClass: PropTypes.Requireable<string>;
    exact: PropTypes.Requireable<boolean>;
    replace: PropTypes.Requireable<boolean>;
    scrollFirst: PropTypes.Requireable<boolean>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    scrollTo: PropTypes.Requireable<React.ReactText>;
};
declare const LinkDefaultProps: {
    href: string;
};
declare class Link<P extends LinkProps = LinkProps, C = any> extends Component<LinkProps, C> {
    static propTypes: {
        activeClass: PropTypes.Requireable<string>;
        exact: PropTypes.Requireable<boolean>;
        replace: PropTypes.Requireable<boolean>;
        scrollFirst: PropTypes.Requireable<boolean>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        scrollTo: PropTypes.Requireable<React.ReactText>;
    };
    static defaultProps: {
        href: string;
    };
    onClick(e: any): void;
    get isLocal(): boolean;
    get isActive(): boolean;
    get className(): string;
    render(): JSX.Element;
}
export default Link;
export { LinkProps, LinkDefaultProps, LinkTypes };
