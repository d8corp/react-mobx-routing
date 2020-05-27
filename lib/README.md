# react-mobx-routing
[![NPM](https://img.shields.io/npm/v/react-mobx-routing.svg)](https://www.npmjs.com/package/react-mobx-routing)
![downloads](https://img.shields.io/npm/dm/react-mobx-routing.svg)
![license](https://img.shields.io/npm/l/react-mobx-routing)  
Use `Router` anywhere to show content by URL matching.  
 
[React](https://reactjs.org/) v16.3+  
[Mobx](https://mobx.js.org/) v3+
### Installation
npm
```bash
npm i react-mobx-routing
```
yarn
```bash
yarn add react-mobx-routing
```
### Using
The simplest way of using is [Create React App](https://create-react-app.dev/).    
```typescript jsx
import Router, {history} from 'react-mobx-routing'

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
## Props
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
## Issues
  
If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/react-mobx-routing/issues)  
[![issues](https://img.shields.io/github/issues-raw/d8corp/react-mobx-routing)](https://github.com/d8corp/react-mobx-routing/issues)    
> ---
[![stars](https://img.shields.io/github/stars/d8corp/react-mobx-routing?style=social)](https://github.com/d8corp/react-mobx-routing/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/react-mobx-routing?style=social)](https://github.com/d8corp/react-mobx-routing/watchers)


