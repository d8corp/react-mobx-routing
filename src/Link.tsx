import React, {AnchorHTMLAttributes, Component, ReactNode} from 'react'
import {history} from './Router'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import {action} from 'mobx'

interface LinkProps<T = any> extends AnchorHTMLAttributes<T> {
  activeClass?: string
  exact?: boolean
  replace?: boolean
  scrollFirst?: boolean
  scrollTo?: number | string
  children?: ReactNode
  onMove?: (move: () => void) => any
}

const LinkTypes = {
  activeClass: PropTypes.string,
  exact: PropTypes.bool,
  replace: PropTypes.bool,
  scrollFirst: PropTypes.bool,
  children: PropTypes.node,
  onMove: PropTypes.func,
  scrollTo: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}
const LinkDefaultProps = {
  href: '/',
}

@observer
class Link <P extends LinkProps = LinkProps, C = any> extends Component<LinkProps, C> {
  static propTypes = LinkTypes
  static defaultProps = LinkDefaultProps
  @action move (url) {
    const {scrollTo, scrollFirst, replace} = this.props
    history[replace ? 'replace' : 'push'](url, scrollTo, scrollFirst)
  }
  onMove (url: string) {
    const {onMove} = this.props
    if (onMove) {
      onMove(() => this.move(url))
    } else {
      this.move(url)
    }
  }
  onClick (e) {
    const {href} = this.props
    let url = href
    if (href.startsWith('?')) {
      url = history.path + (href === '?' ? '' : href)
    } else if (href.startsWith('#')) {
      url = history.path + location.search + (href === '#' ? '' : href)
    } else if (!href.startsWith('/')) {
      return
    }
    e?.preventDefault()
    this.onMove(url)
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
  get isLocal (): boolean {
    return /^[#?\/]/.test(this.props.href)
  }
  get isActive (): boolean {
    const {href = '/'} = this.props
    let prefix = ''
    if (href.startsWith('?')) {
      prefix = '[^?]*'
    } else if (href.startsWith('#')) {
      prefix = '[^#]*'
    } else if (!href.startsWith('/')) {
      return false
    }
    return history.is(`^${prefix}${this.props.href}${this.props.exact ? '$' : ''}`)
  }
  get className (): string {
    let {className, activeClass} = this.props
    if (activeClass && this.isActive) {
      if (className) {
        className += ' ' + activeClass
      } else {
        className = activeClass
      }
    }
    return className
  }
  render () {
    const {isLocal} = this
    const {
      activeClass,
      exact,
      scrollTo,
      scrollFirst,
      replace,
      rel = isLocal ? undefined : 'noreferrer',
      target = isLocal ? undefined : '_blank',
      ...props
    } = this.props

    return <a
      {...props}
      rel={rel}
      target={target}
      onClick={e => this.onClick(e)}
      className={this.className}
    />
  }
}

export default Link

export {
  LinkProps,
  LinkDefaultProps,
  LinkTypes
}
