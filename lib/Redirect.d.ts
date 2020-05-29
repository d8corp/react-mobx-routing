import { Component } from 'react';
import PropTypes from "prop-types";
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
}
declare const RedirectTypes: {
    url: PropTypes.Requireable<string>;
    path: PropTypes.Requireable<string>;
    search: PropTypes.Requireable<string | object>;
    hash: PropTypes.Requireable<string>;
    push: PropTypes.Requireable<boolean>;
    scrollFirst: PropTypes.Requireable<boolean>;
    position: PropTypes.Requireable<string | number>;
};
declare const RedirectDefaultProp: {
    url: string;
    path: string;
    hash: string;
};
declare class Redirect extends Component<RedirectProps> {
    static data: RedirectData;
    static propTypes: {
        url: PropTypes.Requireable<string>;
        path: PropTypes.Requireable<string>;
        search: PropTypes.Requireable<string | object>;
        hash: PropTypes.Requireable<string>;
        push: PropTypes.Requireable<boolean>;
        scrollFirst: PropTypes.Requireable<boolean>;
        position: PropTypes.Requireable<string | number>;
    };
    static defaultProps: {
        url: string;
        path: string;
        hash: string;
    };
    static redirect(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    get data(): RedirectData;
    render(): any;
}
export default Redirect;
export { RedirectProps, RedirectDefaultProp, RedirectTypes };
