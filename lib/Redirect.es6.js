import { Component } from 'react';
import 'tslib';
import PropTypes from 'prop-types';
import 'mobx-react';
import { parseUrl, setSearch } from 'mobx-history-api';
import 'mobx';
import { history } from './Router.es6.js';

const RedirectTypes = {
    url: PropTypes.string,
    path: PropTypes.string,
    search: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    hash: PropTypes.string,
    push: PropTypes.bool,
    scrollFirst: PropTypes.bool,
    position: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};
const RedirectDefaultProp = {
    url: '',
    path: '',
    hash: ''
};
let Redirect = /** @class */ (() => {
    class Redirect extends Component {
        static redirect() {
            if (Redirect.data) {
                const { path, search, hash, position, scrollFirst, push } = Redirect.data;
                const url = (path + search + hash) || '/';
                delete Redirect.data;
                history[push ? 'push' : 'replace'](url, position, scrollFirst);
            }
        }
        componentDidMount() {
            Redirect.redirect();
        }
        componentDidUpdate() {
            Redirect.redirect();
        }
        get data() {
            let { url, path, search, hash, push, position, scrollFirst } = this.props;
            if (url.startsWith('http')) {
                location.href = url;
            }
            const { data = { path: '', search: '', hash: '', position: 0, push: false, scrollFirst: false } } = Redirect;
            if (url) {
                const parsedUrl = parseUrl(url);
                if (!path) {
                    path = parsedUrl.path;
                }
                if (!search) {
                    search = parsedUrl.search;
                }
                if (!hash) {
                    hash = parsedUrl.hash;
                }
            }
            if (path) {
                data.path = path;
            }
            if (typeof search === 'object') {
                for (const key in search) {
                    const value = search[key];
                    data.search = setSearch(data.search, key, value);
                }
            }
            else if (search) {
                data.search = '?' + search;
            }
            if (hash) {
                data.hash = '#' + hash;
            }
            if (push !== undefined) {
                data.push = push;
            }
            if (position !== undefined) {
                data.position = position;
            }
            if (scrollFirst !== undefined) {
                data.scrollFirst = scrollFirst;
            }
            return data;
        }
        render() {
            Redirect.data = this.data;
            return null;
        }
    }
    Redirect.propTypes = RedirectTypes;
    Redirect.defaultProps = RedirectDefaultProp;
    return Redirect;
})();

export default Redirect;
export { RedirectDefaultProp, RedirectTypes };