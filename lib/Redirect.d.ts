import { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
interface RedirectData {
    path: string;
    search: string;
    hash: string;
    push: boolean;
    scrollFirst: boolean;
    position: string | number;
}
interface RedirectProps {
    url?: string;
    path?: string;
    search?: {
        [key: string]: string | undefined;
    } | string;
    hash?: string;
    push?: boolean;
    scrollFirst?: boolean;
    position?: string | number;
    children?: ReactNode;
}
declare const RedirectTypes: {
    url: PropTypes.Requireable<string>;
    path: PropTypes.Requireable<string>;
    search: PropTypes.Requireable<string | {
        [x: string]: string;
    }>;
    hash: PropTypes.Requireable<string>;
    push: PropTypes.Requireable<boolean>;
    scrollFirst: PropTypes.Requireable<boolean>;
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    position: PropTypes.Requireable<string | number>;
};
declare const RedirectDefaultProp: {
    url: string;
    path: string;
    hash: string;
    children: any;
};
declare class Redirect<P extends RedirectProps = RedirectProps, C = any> extends Component<P, C> {
    static data: RedirectData;
    static propTypes: {
        url: PropTypes.Requireable<string>;
        path: PropTypes.Requireable<string>;
        search: PropTypes.Requireable<string | {
            [x: string]: string;
        }>;
        hash: PropTypes.Requireable<string>;
        push: PropTypes.Requireable<boolean>;
        scrollFirst: PropTypes.Requireable<boolean>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        position: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        url: string;
        path: string;
        hash: string;
        children: any;
    };
    static redirect(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    get data(): RedirectData;
    render(): (P["children"] & string) | (P["children"] & number) | (P["children"] & false) | (P["children"] & true) | (P["children"] & {}) | (P["children"] & import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)>) | (new (props: any) => Component<any, any, any>)>) | (P["children"] & import("react").ReactNodeArray) | (P["children"] & import("react").ReactPortal);
}
export default Redirect;
export { RedirectProps, RedirectDefaultProp, RedirectTypes };
