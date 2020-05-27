import React, {Component, ReactNode, createContext} from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import History from 'mobx-history-api'
import {action, computed, observable, reaction} from 'mobx'

const history = new History()

const RouterContext = createContext<Router>(null)

type RouterProps = {
  match?: string
  path?: string
  search?: string
  hash?: string
  other?: boolean
  ish?: boolean
  pathIsh?: boolean
  searchIsh?: boolean
  hashIsh?: boolean
  delay?: number
  showDelay?: number
  hideDelay?: number
  onShow?: () => void
  onShown?: () => void
  onHide?: () => void
  onHidden?: () => void
  children?: ((get: (id?: number, defaultValue?: string) => string) => ReactNode) | ReactNode
}
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
}

function getMatchReg (props: RouterProps) {
  const {match} = props
  if (match) {
    return match
  } else {
    let {search, pathIsh, searchIsh, ish, path, hash, hashIsh} = props
    return `^${path ? `${path}${ish || pathIsh ? '(/[^?#]*)?' : ''}` : '[^?#]*'}${search ?
      `\\?${ish || searchIsh ? '([^#]*\\&)?' : ''}${search}${ish || searchIsh ? '(\\&[^#]*)?' : ''}` :
      '(\\?[^#]*)?'}${hash ? `\\#${ish || hashIsh ? '.*' : ''}${hash}${ish || hashIsh ? '.*' : ''}` : '(\\#.*)?'}$`
  }
}

@observer
class Router extends Component<RouterProps> {
  static propTypes = RouterTypes
  static defaultProps = {
    match: '',
    path: '',
    search: '',
    hash: '',
    ish: false,
    pathIsh: false,
    searchIsh: false,
    hashIsh: false
  }
  static contextType = RouterContext

  timer: any
  reaction: () => void

  componentDidMount () {
    this.reaction = reaction(() => this.matched, matched => {
      if (matched) {
        this.onShow()
      } else {
        this.onHide()
      }
    }, {
      fireImmediately: true
    })
  }
  componentWillUnmount () {
    this.reaction()
  }

  get children () {
    const {matchReg} = this
    if (!matchReg) return null
    let {children} = this.props

    if (typeof children === 'function') {
      let {match, search, searchIsh, ish, path} = this.props
      // @ts-ignore
      return children((id: 0, defaultValue) => {
        if (id && !match && search && (searchIsh || ish)) {
          let start = 0
          let end = start + search.split('(').length + 1
          if (path) {
            const {length} = path.split('(')
            start += length - 1
            end += length - 1
          }
          if (id > start) {
            id++
            if (id >= end) {
              id++
            }
          }
        }
        return history.get(matchReg, id, defaultValue) || defaultValue
      })
    } else {
      return children
    }
  }

  @observable show = this.matched && !this.props.showDelay && !this.props.delay
  @observable childRouterCount = 0

  @computed get showOther (): boolean {
    return !this.childRouterCount
  }
  @computed get matched (): boolean {
    const {props} = this
    if (props.other && !this.context?.showOther) {
      return false
    }
    if (!props.path && !props.search && !props.hash && !props.match) {
      return true
    }
    return history.is(this.matchReg)
  }
  @computed get matchReg (): string {
    return getMatchReg(this.props)
  }

  @action onShow () {
    const {onShow, showDelay, delay} = this.props
    if (onShow) {
      onShow()
    }
    if (showDelay || delay) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.onShown(), showDelay || delay)
    } else {
      this.onShown()
    }
  }
  @action onShown () {
    const {onShown} = this.props
    if (!this.show && !this.props.other && this.context) {
      this.context.childRouterCount++
    }
    this.show = true
    if (onShown) {
      onShown()
    }
  }
  @action onHide () {
    const {onHide, hideDelay, delay} = this.props
    if (onHide) {
      onHide()
    }
    if (hideDelay || delay) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.onHidden(), hideDelay || delay)
    } else {
      this.onHidden()
    }
  }
  @action onHidden () {
    if (this.show && !this.props.other && this.context) {
      this.context.childRouterCount--
    }
    this.show = false
    if (this.props.onHidden) {
      this.props.onHidden()
    }
  }

  render () {
    return this.show ? (
      <RouterContext.Provider value={this}>
        {this.children}
      </RouterContext.Provider>
    ) : null
  }
}

export default Router
export * from 'mobx-history-api'
export {
  history,
  RouterContext,
  RouterProps,
  RouterTypes,
  getMatchReg
}
