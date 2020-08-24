# react-mobx-routing
[![NPM](https://img.shields.io/npm/v/react-mobx-routing.svg)](https://github.com/d8corp/react-mobx-routing/blob/master/CHANGELOG.md)
[![downloads](https://img.shields.io/npm/dm/react-mobx-routing.svg)](https://www.npmjs.com/package/react-mobx-routing)
[![license](https://img.shields.io/npm/l/react-mobx-routing)](https://github.com/d8corp/react-mobx-routing/blob/master/LICENSE)  
This package provides you the browser routing for:  
- [React](https://reactjs.org/) v16.3+  
- [Mobx](https://mobx.js.org/) v3+
### Installation
npm
```bash
npm i react-mobx-routing
```
yarn
```bash
yarn add react-mobx-routing
```
The simplest way of using is [Create React App](https://create-react-app.dev/).  
## Router
Use `Router` anywhere to show content by URL matching.
```typescript jsx
import Router, {history} from 'react-mobx-routing'
// or
// import Router, {history} from 'react-mobx-routing/Router'

const App = () => (
  <div>
    <button onClick={() => history.push('/')}>home</button> |
    <button onClick={() => history.push('/test')}>test</button>
    <div>
      This is
      <Router path='/'>
         home
      </Router>
      <Router path='/test'>
        test
      </Router>
      page
    </div>
  </div>
)
```
The `history` is [mobx-history-api](https://github.com/d8corp/mobx-history-api).
### path ![string](https://img.shields.io/badge/-string-green)
Use `path` to show router content by URL path
```typescript jsx
const Test = () => <Router path='/test'>test</Router>
```
> `test` will be shown when url equals `/test` or `/test?key=value#test` but not for `/test/420` or `/user/test`.

You can use it as regexp.
```typescript jsx
const Test = () => <Router path='/(foo|bar)'>test</Router>
```
> `test` will be shown when url path equals `/foo` or `/bar`.  

You can get `foo` or `bar` by children function
```typescript jsx
const Test = () => <Router path='/(foo|bar)'>{get => get(1)}</Router>
```
> `/foo` returns `foo` and `/bar` returns `bar`.

The number in the `get` function says which brackets you want to use.
```typescript jsx
const Test = () => <Router path='/(foo|bar)/(\d+)'>{get => get(2)}</Router>
```
> `/foo/13` returns `13` and `/bar/420` returns `420`.

### match ![string](https://img.shields.io/badge/-string-green)
Use `match` if you want to match URL by custom regexp
```typescript jsx
const Test = () => <Router match='^/(foo|bar)'>FOOBAR</Router>
```
> `/foo/13` returns `FOOBAR` and `/bar` returns `FOOBAR`.

If you use `match` then `path`, `search`, `hash`, `ish`, `pathIsh`, `searchIsh` and `hashIsh` are not be used.  
You can use a function as a child to get the value of the matching like for `path`.

### pathIsh ![boolean](https://img.shields.io/badge/-boolean-orange)
Use `pathIsh` to make the soft routing by path. That means the path should start with `path` property.
```typescript jsx
const Test = () => <Router path='/(foo|bar)' pathIsh>FOOBAR</Router>
```
> `/foo/13` returns `FOOBAR` and `/bar/420/test?key=value#test` returns `FOOBAR`.  
> Starts with `/foo` or `/bar`.

### ish ![boolean](https://img.shields.io/badge/-boolean-orange)
Use `ish` instead of `pathIsh`, `searchIsh` and `hashIsh` equal `true`
```typescript jsx
const Test = () => <Router path='/(foo|bar)' ish>FOOBAR</Router>
```
> The same as pathIsh

### search ![string](https://img.shields.io/badge/-string-green)
Use `search` if you want to show content by search query of URL.
```typescript jsx
const Test = () => <Router search='key=value'>test</Router>
```
> `/foo/13?key=value#420` returns `test` but `/foo/13?key=value&test` returns empty content.

### searchIsh ![boolean](https://img.shields.io/badge/-boolean-orange)
Use `searchIsh` or `ish` to make a soft search.
```typescript jsx
const Test = () => <Router search='key=value' ish>test</Router>
```
> now `/foo/13?key=value&test` and `/foo/13?test=1&key=value&foo=bar` returns `test`.

Also, you can use only key for search
```typescript jsx
const Test = () => <Router search='key' ish>test</Router>
```
> `/?key&value` and `/?value&key` returns `test` but `/?key=1` and `/?key1` returns nothing.

### hash ![string](https://img.shields.io/badge/-string-green)
Use `hash` if you want to show content by hash of URL.
```typescript jsx
const Test = () => <Router hash='test'>test</Router>
```
> `/any/path?any=search#test` returns `test` but `/#test1` returns empty content.

### hashIsh ![boolean](https://img.shields.io/badge/-boolean-orange)
Use `hashIsh` or `ish` to fix it.
```typescript jsx
const Test = () => <Router hash='test' ish>test</Router>
```
> now `/#test1` and `/#sometextwiththetestword` returns `test`.

### other ![boolean](https://img.shields.io/badge/-boolean-orange)
This is an alternative of react `Switch`.  
`Router` with `other` shows content only if all routers without `other` in the same `Router` are not matched.
 ```typescript jsx
const Test = () => (
  <Router>
    <Router path='/'>home</Router>
    <Router path='/user'>user</Router>
    <Router other>other</Router>
  </Router>
)
 ```
> will show `home` for `/`, `user` for `/user` and `other` for any other url

You may use any structure inside `Router` and several `other` routers with any props.  
 ```typescript jsx
const Test = () => (
  <Router>
    <div>
      <Router path='/'>home</Router>
      <div>
        content
        <Router path='/user'>user</Router>
      </div>
      <Router search='modal' other>modal</Router>
      <Router other>
        <Router path='/test'>test</Router>
        <Router other><div>other</div></Router>
      </Router>
    </div>
  </Router>
)
 ```
### showDelay ![number](https://img.shields.io/badge/-number-blue)
You can show content of router with delay.
```typescript jsx
const Test = () => <Router path='/test' showDelay={1000}>test</Router>
 ```
> when URL became `/test` the content be not shown, `test` will be shown in a second after that.

### hideDelay ![number](https://img.shields.io/badge/-number-blue)
This is the same `showDelay` but for hiding.
```typescript jsx
const Test = () => <Router path='/test' hideDelay={1000}>test</Router>
 ```
> when URL became `/test` the content be shown immediately, but when URL is changed after that, `test` will be hidden in a second.

### delay ![number](https://img.shields.io/badge/-number-blue)
This is the combine of `showDelay` and `hideDelay`.
```typescript jsx
const Test = () => <Router path='/test' delay={1000}>test</Router>
```
> `test` will be shown or hidden in a second.

### onShow ![function-void](https://img.shields.io/badge/function-void-orange)
It calls any time when the content will be shown
```typescript jsx
const Test = () => (
  <Router
    path='/test'
    onShow={() => console.log('test')}>
    test
  </Router>
)
```

### onShown ![function-void](https://img.shields.io/badge/function-void-orange)
It calls any time when the content has shown
```typescript jsx
const Test = () => (
  <Router
    path='/test'
    delay={1000}
    onShown={() => console.log('test')}>
    test
  </Router>
)
```

### onHide ![function-void](https://img.shields.io/badge/function-void-orange)
It calls any time when the content will be hidden
```typescript jsx
const Test = () => (
  <Router
    path='/test'
    onHide={() => console.log('test')}>
    test
  </Router>
)
```

### onHidden ![function-void](https://img.shields.io/badge/function-void-orange)
It calls any time when the content has hidden
```typescript jsx
const Test = () => (
  <Router
    path='/test'
    delay={1000}
    onHidden={() => console.log('test')}>
    test
  </Router>
)
```
## Redirect
Use the component for comfortable redirection
```javascript
import {Redirect} from 'react-mobx-routing'
```
### url ![string](https://img.shields.io/badge/-string-green)
Use the prop to redirect at the url.
```typescript jsx
const RedirectToHome = () => (
  <Redirect url='/' />
)

const RedirectToLogin = () => (
  <Redirect url='?modal=login' />
)

const RedirectToHeader = () => (
  <Redirect url='#root' />
)

const RedirectToRepo = () => (
  <Redirect url='https://github.com/d8corp/react-mobx-routing' />
)
```
### path ![string](https://img.shields.io/badge/-string-green)
The same as `url` but works only with path.
```typescript jsx
const RedirectToHome = () => (
  <Redirect path='/' />
)
```
You may combine with `url`
```typescript jsx
const RedirectToHome = () => (
  <Redirect url='/foo#bar' path='/' />
)
// redirects to /#bar
```
### search ![string](https://img.shields.io/badge/-string-green) ![object](https://img.shields.io/badge/-object-orange)
The same as `path` but works with search and you may combine with `url`
```typescript jsx
const RedirectToLoginModal = () => (
  <Redirect search='modal=login' />
)
// redirects to ?modal=login
```
You may use an object of search keys and values
```typescript jsx
const RedirectToLoginModal = () => (
  <Redirect search={{modal: 'login'}} />
)
// redirects to ?modal=login
```
`undefined` value removes the key
```typescript jsx
history.push('/test?key=value')

render (
  <Redirect search={{key: undefined}} />
)
// redirects to /test
```
### hash ![string](https://img.shields.io/badge/-string-green)
The same as `path` but works with hash and you may combine with `url`
```typescript jsx
const RedirectToRoot = () => (
  <Redirect hash='root' />
)
// redirects to #root
```
### push ![boolean](https://img.shields.io/badge/-boolean-orange)
By default `Redirect` replaces url. If you wanna push the redirection to history use the property.
```typescript jsx
const RedirectToHome = () => (
  <Redirect path='/' push />
)
```
### position ![number](https://img.shields.io/badge/-number-blue) ![string](https://img.shields.io/badge/-string-green)
By default the page scrolls up during redirection. You may change the scroll position by the property.
```typescript jsx
const RedirectToHome = () => (
  <Redirect path='/' position={60} />
)
```
You may scroll to any element by selector query
```typescript jsx
const RedirectToHome = () => (
  <Redirect path='/' position='#root' />
)
```
### scrollFirst ![boolean](https://img.shields.io/badge/-boolean-orange)
When you use smooth scroll you can wait while the scrolling finished and then make the redirection.
```typescript jsx
const RedirectToHome = () => (
  <Redirect path='/' scrollFirst />
)
```
## Link
Use the component instance of `a`.
> `rel="noreferrer"` and `target="_blank"` are default for external links.
### href ![string](https://img.shields.io/badge/-string-green)
If `href` starts from `/` then the `Link` will use History API.  
`/` is default value of `href`.
```typescript jsx
const App = () => (
  <>
    <div>
      <Link>Home</Link>
      <Link href='/test'>Test</Link>
    </div>
    <Router path='/'>Home</Router>
    <Router path='/test'>Test</Router>
  </>
)
```
When `href` starts from `?` the `Link` will keep the pathname and change the search and hash.
```typescript jsx
const App = () => (
  <>
    <div>
      <Link>Home</Link>
      <Link href='/test'>Test</Link>
      <Link href='?modal=test'>Test Modal</Link>
    </div>
    <Router path='/'>Home</Router>
    <Router path='/test'>Test</Router>
    <Router search='modal=test'><div>Test Modal</div></Router>
  </>
)
```
When `href` starts from `#` the `Link` will keep the whole URL except for hash.  
### replace ![boolean](https://img.shields.io/badge/-boolean-orange)
By default `Link` pushes to history but you may use `replace` to replace current history state.
```typescript jsx
const Agree = () => (
  <Link replace href='?'>I agree</Link>
)
```
`href='?'` means clearing of search and hash
### activeClass ![string](https://img.shields.io/badge/-string-green)
If you set `activeClass` then the link will have the class if url starts from `href`
```typescript jsx
const Test = () => (
  <Link activeClass='active' href='/test'>test</Link>
)
```
When you click the link html will be equal  
```html
<a class="active" href="/test">test</a>
```
### exact ![boolean](https://img.shields.io/badge/-boolean-orange)
By default `activeClass` will be applied when url starts from `href` but use `exact` to compare exactly.
```typescript jsx
const Test = () => (
  <Link activeClass='active' href='/test' exact>test</Link>
)
```
### scrollTo ![number](https://img.shields.io/badge/-number-blue) ![string](https://img.shields.io/badge/-string-green)
If you wanna scroll the page to custom position (by default it's up of the page) use `scrollTo`
```typescript jsx
const To100 = () => (
  <Link scrollTo={100} href='/test'>test</Link>
)

const ToRoot = () => (
  <Link scrollTo='#root' href='/test'>test</Link>
)
```
Negative value keep the page on the same scroll position.
```typescript jsx
const NoScroll = () => (
  <Link scrollTo={-1} href='/test'>test</Link>
)
```
### scrollFirst ![boolean](https://img.shields.io/badge/-boolean-orange)
When you use smooth scroll you can wait while the scrolling finished and then make the redirection.
```typescript jsx
const Test = () => (
  <Link scrollFirst href='/test'>test</Link>
)
```
### onMove ![function](https://img.shields.io/badge/function-void-orange)
If you wanna wait for something before the move by the link then the property for you.
```typescript jsx
const Test = () => (
  <Link href='/test' onMove={move => setTimeout(move, 100)}>test</Link>
)
```
## links
- [mobx-history-api](https://github.com/d8corp/mobx-history-api) - routing with [Mobx](https://mobx.js.org/) and [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [package content](https://github.com/d8corp/react-mobx-routing/tree/master/lib)
- [changelog](https://github.com/d8corp/react-mobx-routing/blob/master/CHANGELOG.md)
## issues
If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/react-mobx-routing/issues)  
[![issues](https://img.shields.io/github/issues-raw/d8corp/react-mobx-routing)](https://github.com/d8corp/react-mobx-routing/issues)    
> ---
[![stars](https://img.shields.io/github/stars/d8corp/react-mobx-routing?style=social)](https://github.com/d8corp/react-mobx-routing/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/react-mobx-routing?style=social)](https://github.com/d8corp/react-mobx-routing/watchers)


