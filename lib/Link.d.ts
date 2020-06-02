import { AnchorHTMLAttributes, Component } from 'react';
import PropTypes from 'prop-types';
interface LinkProps<T = any> extends AnchorHTMLAttributes<T> {
    activeClass?: string;
    exact?: boolean;
    replace?: boolean;
    scrollFirst?: boolean;
    scrollTo?: number | string;
}
declare const LinkTypes: {
    activeClass: PropTypes.Requireable<string>;
    exact: PropTypes.Requireable<boolean>;
    replace: PropTypes.Requireable<boolean>;
    scrollFirst: PropTypes.Requireable<boolean>;
    scrollTo: PropTypes.Requireable<string | number>;
};
declare class Link<P extends LinkProps = LinkProps, C = any> extends Component<LinkProps, C> {
    static propTypes: {
        activeClass: PropTypes.Requireable<string>;
        exact: PropTypes.Requireable<boolean>;
        replace: PropTypes.Requireable<boolean>;
        scrollFirst: PropTypes.Requireable<boolean>;
        scrollTo: PropTypes.Requireable<string | number>;
    };
    onClick(e: any): void;
    get isActive(): boolean;
    get className(): string;
    render(): JSX.Element;
}
export default Link;
export { LinkProps, LinkTypes };
