import ReactDom from 'react-dom'
import React, {ReactElement} from 'react'
import Router, {history} from '.'

function render (component: ReactElement): HTMLDivElement {
  const div = document.createElement('div')
  ReactDom.render(component, div)
  return div
}

describe('Router', () => {
  describe('default', () => {
    test('text', () => {
      const div = render(<Router>test</Router>)
      expect(div.innerHTML).toBe('test')
    })
    test('elements', () => {
      const div = render(<Router><div></div><span></span></Router>)
      expect(div.innerHTML).toBe('<div></div><span></span>')
    })
    test('null', () => {
      const div = render(<Router>{null}</Router>)
      expect(div.innerHTML).toBe('')
    })
    test('number', () => {
      const div = render(<Router>{13}</Router>)
      expect(div.innerHTML).toBe('13')
    })
    test('string', () => {
      const div = render(<Router>{'13'}</Router>)
      expect(div.innerHTML).toBe('13')
    })
    test('function', () => {
      const div = render(<Router>{get => get(0)}</Router>)
      expect(div.innerHTML).toBe('/')
      history.push('/test')
      expect(div.innerHTML).toBe('/test')
    })
  })
  describe('match', () => {
    test('simple', () => {
      const div = render(<Router match='test'>test</Router>)

      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/test')
      expect(div.innerHTML).toBe('test')
      history.push('/test/value')
      expect(div.innerHTML).toBe('test')
      history.push('/value/test/')
      expect(div.innerHTML).toBe('test')
      history.push('/?test=1')
      expect(div.innerHTML).toBe('test')
      history.push('/#test=1')
      expect(div.innerHTML).toBe('test')
    })
    test('starts with', () => {
      const div = render(<Router match='^/test'>test</Router>)

      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/test')
      expect(div.innerHTML).toBe('test')
      history.push('/test/value')
      expect(div.innerHTML).toBe('test')
      history.push('/value/test/')
      expect(div.innerHTML).toBe('')
      history.push('/?test=1')
      expect(div.innerHTML).toBe('')
      history.push('/#test=1')
      expect(div.innerHTML).toBe('')
    })
  })
  describe('path', () => {
    test('simple', () => {
      const div = render(<Router path='/test'>test</Router>)

      history.push('/test')
      expect(div.innerHTML).toBe('test')
      history.push('/test?key=value')
      expect(div.innerHTML).toBe('test')
      history.push('/test#anchore')
      expect(div.innerHTML).toBe('test')
      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/abc')
      expect(div.innerHTML).toBe('')
      history.push('/test1')
      expect(div.innerHTML).toBe('')
      history.push('/test/test1')
      expect(div.innerHTML).toBe('')
      history.push('/test1/test')
      expect(div.innerHTML).toBe('')
    })
    test('pathIsh', () => {
      const div = render(<Router path='/test' pathIsh>test</Router>)

      history.push('/test')
      expect(div.innerHTML).toBe('test')
      history.push('/test?key=value')
      expect(div.innerHTML).toBe('test')
      history.push('/test#anchore')
      expect(div.innerHTML).toBe('test')
      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/abc')
      expect(div.innerHTML).toBe('')
      history.push('/test1')
      expect(div.innerHTML).toBe('')
      history.push('/test/test1')
      expect(div.innerHTML).toBe('test')
      history.push('/test1/test')
      expect(div.innerHTML).toBe('')
    })
    test('ish', () => {
      const div = render(<Router path='/test' ish>test</Router>)

      history.push('/test')
      expect(div.innerHTML).toBe('test')
      history.push('/test?key=value')
      expect(div.innerHTML).toBe('test')
      history.push('/test#anchore')
      expect(div.innerHTML).toBe('test')
      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/abc')
      expect(div.innerHTML).toBe('')
      history.push('/test1')
      expect(div.innerHTML).toBe('')
      history.push('/test/test1')
      expect(div.innerHTML).toBe('test')
      history.push('/test1/test')
      expect(div.innerHTML).toBe('')
    })
  })
  describe('search', () => {
    test('simple', () => {
      const div = render(<Router search='test'>test</Router>)

      history.push('?test')
      expect(div.innerHTML).toBe('test')
      history.push('?test1')
      expect(div.innerHTML).toBe('')
      history.push('?test&value')
      expect(div.innerHTML).toBe('')
      history.push('?value&test')
      expect(div.innerHTML).toBe('')
      history.push('?test=value')
      expect(div.innerHTML).toBe('')
      history.push('?value=test')
      expect(div.innerHTML).toBe('')
      history.push('?key=value&test=value')
      expect(div.innerHTML).toBe('')
      history.push('/')
      expect(div.innerHTML).toBe('')
    })
    test('simple with value', () => {
      const div = render(<Router search='test=value'>test</Router>)

      history.push('/?test')
      expect(div.innerHTML).toBe('')
      history.push('?test=value')
      expect(div.innerHTML).toBe('test')
      history.push('?value=test')
      expect(div.innerHTML).toBe('')
      history.push('?key=value&test=value')
      expect(div.innerHTML).toBe('')
      history.push('?test=value&key=value')
      expect(div.innerHTML).toBe('')
      history.push('/')
      expect(div.innerHTML).toBe('')
    })
    test('only key', () => {
      const div = render(<Router search='test'>test</Router>)

      history.push('/?test')
      expect(div.innerHTML).toBe('test')
      history.push('/?test=1')
      expect(div.innerHTML).toBe('')
      history.push('/?test1')
      expect(div.innerHTML).toBe('')
      history.push('?test&test2')
      expect(div.innerHTML).toBe('')
      history.push('?test2&test')
      expect(div.innerHTML).toBe('')
    })
    test('only key ish', () => {
      const div = render(<Router search='test' ish>test</Router>)

      history.push('/?test')
      expect(div.innerHTML).toBe('test')
      history.push('/?test=1')
      expect(div.innerHTML).toBe('')
      history.push('/?test1')
      expect(div.innerHTML).toBe('')
      history.push('?test&test2')
      expect(div.innerHTML).toBe('test')
      history.push('?test2&test')
      expect(div.innerHTML).toBe('test')
    })
    test('combine', () => {
      const div = render(<Router search='test1&test2'>test</Router>)

      history.push('/?test1')
      expect(div.innerHTML).toBe('')
      history.push('?test1&test2')
      expect(div.innerHTML).toBe('test')
      history.push('?test2&test1')
      expect(div.innerHTML).toBe('') //? 'test'
    })
    test('searchIsh', () => {
      const div = render(<Router search='test' searchIsh>test</Router>)

      history.push('?test')
      expect(div.innerHTML).toBe('test')
      history.push('?test1')
      expect(div.innerHTML).toBe('')
      history.push('?test&value')
      expect(div.innerHTML).toBe('test')
      history.push('?value&test')
      expect(div.innerHTML).toBe('test')
      history.push('?test=value')
      expect(div.innerHTML).toBe('')
      history.push('?value=test')
      expect(div.innerHTML).toBe('')
      history.push('?key=value&test=value')
      expect(div.innerHTML).toBe('')
      history.push('/')
      expect(div.innerHTML).toBe('')
    })
    test('searchIsh with value', () => {
      const div = render(<Router search='test=value' searchIsh>test</Router>)

      history.push('/?test')
      expect(div.innerHTML).toBe('')
      history.push('?test=value')
      expect(div.innerHTML).toBe('test')
      history.push('?value=test')
      expect(div.innerHTML).toBe('')
      history.push('?key=value&test=value')
      expect(div.innerHTML).toBe('test')
      history.push('?test=value&key=value')
      expect(div.innerHTML).toBe('test')
      history.push('/')
      expect(div.innerHTML).toBe('')
    })
    test('searchIsh combine', () => {
      const div = render(<Router search='test1&test2' searchIsh>test</Router>)

      history.push('/?test')
      expect(div.innerHTML).toBe('')
      history.push('?test1&test21')
      expect(div.innerHTML).toBe('')
      history.push('?test1&test2')
      expect(div.innerHTML).toBe('test')
      history.push('?test2&test1')
      expect(div.innerHTML).toBe('')
      history.push('?test3&test1&test2')
      expect(div.innerHTML).toBe('test')
      history.push('?test1&test2&test3')
      expect(div.innerHTML).toBe('test')
      history.push('?test4&test1&test2&test3')
      expect(div.innerHTML).toBe('test')
      history.push('/')
      expect(div.innerHTML).toBe('')
    })
  })
  describe('hash', () => {
    test('simple', () => {
      const div = render(<Router hash='test'>test</Router>)

      history.push('#test')
      expect(div.innerHTML).toBe('test')
      history.push('#test1')
      expect(div.innerHTML).toBe('')
      history.push('#1test')
      expect(div.innerHTML).toBe('')
      history.push('#tes')
      expect(div.innerHTML).toBe('')
      history.push('/')
      expect(div.innerHTML).toBe('')
    })
    test('hashIsh', () => {
      const div = render(<Router hash='test' hashIsh>test</Router>)

      history.push('#test')
      expect(div.innerHTML).toBe('test')
      history.push('#test1')
      expect(div.innerHTML).toBe('test')
      history.push('#1test')
      expect(div.innerHTML).toBe('test')
      history.push('#tes')
      expect(div.innerHTML).toBe('')
      history.push('/')
      expect(div.innerHTML).toBe('')
    })
    test('ish', () => {
      const div = render(<Router hash='test' ish>test</Router>)

      history.push('#test')
      expect(div.innerHTML).toBe('test')
      history.push('#test1')
      expect(div.innerHTML).toBe('test')
      history.push('#1test')
      expect(div.innerHTML).toBe('test')
      history.push('#tes')
      expect(div.innerHTML).toBe('')
      history.push('/')
      expect(div.innerHTML).toBe('')
    })
  })
  describe('get', () => {
    test('simple', () => {
      const div = render(<Router>{get => get()}</Router>)

      history.push('/')
      expect(div.innerHTML).toBe('/')
      history.push('/test')
      expect(div.innerHTML).toBe('/test')
    })
    test('with conditions', () => {
      const div = render(<Router path='/test/\d+'>{get => get()}</Router>)

      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/test')
      expect(div.innerHTML).toBe('')
      history.push('/test/asd')
      expect(div.innerHTML).toBe('')
      history.push('/test/13')
      expect(div.innerHTML).toBe('/test/13')
    })
    test('get value', () => {
      const div = render(<Router path='/test/(\d+)'>{get => get(1)}</Router>)

      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/test')
      expect(div.innerHTML).toBe('')
      history.push('/test/asd')
      expect(div.innerHTML).toBe('')
      history.push('/test/13')
      expect(div.innerHTML).toBe('13')
    })
    test('get some values', () => {
      const div = render(<Router path='/test/(\d+)/(demo|real)'>{get => get(1) + ': ' + get(2)}</Router>)

      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/test')
      expect(div.innerHTML).toBe('')
      history.push('/test/asd')
      expect(div.innerHTML).toBe('')
      history.push('/test/13')
      expect(div.innerHTML).toBe('')
      history.push('/test/13/demo')
      expect(div.innerHTML).toBe('13: demo')
    })
    test('get some values ish', () => {
      const div = render(<Router path='/test/(\d+)/(demo|real)' ish>{get => get(1) + ': ' + get(2)}</Router>)

      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/test')
      expect(div.innerHTML).toBe('')
      history.push('/test/asd')
      expect(div.innerHTML).toBe('')
      history.push('/test/13')
      expect(div.innerHTML).toBe('')
      history.push('/test/13/demo')
      expect(div.innerHTML).toBe('13: demo')
      history.push('/test/13/real')
      expect(div.innerHTML).toBe('13: real')
      history.push('/test/13/real/asd')
      expect(div.innerHTML).toBe('13: real')
    })
    test('default value', () => {
      const div = render(<Router path='/test/?(\d*)'>{get => get(1, '0')}</Router>)
      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/test')
      expect(div.innerHTML).toBe('0')
      history.push('/test/')
      expect(div.innerHTML).toBe('0')
      history.push('/test/asd')
      expect(div.innerHTML).toBe('')
      history.push('/test/13')
      expect(div.innerHTML).toBe('13')
      history.push('/test/13/demo')
      expect(div.innerHTML).toBe('')
    })
    test('mix', () => {
      const div = render(<Router path='/test/?(\d*)' search='modal=([^&]+)'>{get => `${get(1)}: ${get(2)}`}</Router>)
      history.push('/')
      expect(div.innerHTML).toBe('')
      history.push('/test')
      expect(div.innerHTML).toBe('')
      history.push('/test/')
      expect(div.innerHTML).toBe('')
      history.push('/test/asd')
      expect(div.innerHTML).toBe('')
      history.push('/test/13')
      expect(div.innerHTML).toBe('')
      history.push('/test/13/demo')
      expect(div.innerHTML).toBe('')
      history.push('/test/13?modal=test')
      expect(div.innerHTML).toBe('13: test')
    })
  })
  describe('other', () => {
    test('simple', () => {
      history.push('/')

      const div = render(
        <Router>
          <Router other>all</Router>
          <Router path='/'>test</Router>
        </Router>
      )

      expect(div.innerHTML).toBe('test')
      history.push('/test')
      expect(div.innerHTML).toBe('all')
    })
    test('no one', () => {
      const div = render(
        <Router>
          <Router path='/test1'>test1</Router>
          <Router path='/test2'>test2</Router>
        </Router>
      )

      history.push('/test1')
      expect(div.innerHTML).toBe('test1')
      history.push('/test2')
      expect(div.innerHTML).toBe('test2')
      history.push('/')
      expect(div.innerHTML).toBe('')
    })
    test('render', () => {
      const log: string[] = []
      history.push('/')
      const div = render(
        <Router>
          <Router path='/test/(\d+)'>{get => {
            const value = get(1)
            log.push(value)
            return value
          }}</Router>
          <Router other>test</Router>
        </Router>
      )

      expect(log.length).toBe(0)
      expect(div.innerHTML).toBe('test')

      history.push('/test/1')
      expect(div.innerHTML).toBe('1')
      history.push('/test/2')
      expect(div.innerHTML).toBe('2')
      history.push('/test')
      expect(div.innerHTML).toBe('test')
      history.push('/test1')
      expect(div.innerHTML).toBe('test')
      history.push('/test/1/real')
      expect(div.innerHTML).toBe('test')
      expect(log).toEqual(['1', '2'])
    })
    test('couple', () => {
      history.push('/')
      const div = render(
        <Router>
          <Router path='/test'>test</Router>
          <Router path='/user' other>user </Router>
          <Router other>other</Router>
        </Router>
      )

      expect(div.innerHTML).toBe('other')

      history.push('/test')
      expect(div.innerHTML).toBe('test')

      history.push('/test/2')
      expect(div.innerHTML).toBe('other')

      history.push('/user')
      expect(div.innerHTML).toBe('user other')
    })
  })
  describe('delay', () => {
    test('onShow', () => {
      let count = 0
      history.push('/')
      const div = render(
        <Router onShow={() => count++} path='/test' ish>test</Router>
      )
      expect(div.innerHTML).toBe('')
      expect(count).toBe(0)
      history.push('/test')
      expect(div.innerHTML).toBe('test')
      expect(count).toBe(1)
      history.push('/test/123')
      expect(div.innerHTML).toBe('test')
      expect(count).toBe(1)
      history.push('/text')
      expect(div.innerHTML).toBe('')
      expect(count).toBe(1)
      history.push('/test/test')
      expect(div.innerHTML).toBe('test')
      expect(count).toBe(2)
    })
    test('onHide', () => {
      let count = 0
      history.push('/')
      const div = render(
        <Router onHide={() => count++} path='/test' ish>test</Router>
      )
      expect(div.innerHTML).toBe('')
      expect(count).toBe(1)
      history.push('/test')
      expect(div.innerHTML).toBe('test')
      expect(count).toBe(1)
      history.push('/test/123')
      expect(div.innerHTML).toBe('test')
      expect(count).toBe(1)
      history.push('/text')
      expect(div.innerHTML).toBe('')
      expect(count).toBe(2)
      history.push('/test/test')
      expect(div.innerHTML).toBe('test')
      expect(count).toBe(2)
    })
    test('showDelay', async () => {
      history.push('/test')

      const div = render(
        <Router showDelay={100} path='/test'>test</Router>
      )
      expect(div.innerHTML).toBe('')
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(div.innerHTML).toBe('')
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(div.innerHTML).toBe('test')
    })
    test('hideDelay', async () => {
      history.push('/test')

      const div = render(
        <Router hideDelay={100} path='/test'>test</Router>
      )
      expect(div.innerHTML).toBe('test')
      history.push('/')
      expect(div.innerHTML).toBe('test')
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(div.innerHTML).toBe('test')
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(div.innerHTML).toBe('')
    })
    test('delay', async () => {
      history.push('/test')

      const div = render(
        <Router delay={100} path='/test'>test</Router>
      )
      expect(div.innerHTML).toBe('')
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(div.innerHTML).toBe('test')
      history.push('/')
      expect(div.innerHTML).toBe('test')
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(div.innerHTML).toBe('test')
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(div.innerHTML).toBe('')
    })
    test('actions', async () => {
      history.push('/test')
      const log = []

      const div = render(
        <Router hideDelay={100} onHide={() => log.push('onHide')} onHidden={() => log.push('onHidden')} path='/test'>test</Router>
      )
      expect(div.innerHTML).toBe('test')
      expect(log).toEqual([])

      history.push('/')
      expect(div.innerHTML).toBe('test')
      expect(log).toEqual(['onHide'])

      await new Promise(resolve => setTimeout(resolve, 50))
      expect(div.innerHTML).toBe('test')
      expect(log).toEqual(['onHide'])

      await new Promise(resolve => setTimeout(resolve, 50))
      expect(div.innerHTML).toBe('')
      expect(log).toEqual(['onHide', 'onHidden'])
    })
  })
  describe('locale', () => {
    test('simple', () => {
      history.push('/')
      history.locales = 'ru'
      history.locale = 'ru'

      const div = render(
        <Router path='/test'>test</Router>
      )
      expect(location.pathname).toBe('/ru')
      expect(div.innerHTML).toBe('')

      history.push('/test')
      expect(location.pathname).toBe('/ru/test')
      expect(div.innerHTML).toBe('test')

      history.push('/ru/test')
      expect(location.pathname).toBe('/ru/ru/test')
      expect(div.innerHTML).toBe('')

      history.push('/test')
      expect(location.pathname).toBe('/ru/test')
      expect(div.innerHTML).toBe('test')

      history.locale = ''
      expect(location.pathname).toBe('/test')
      expect(div.innerHTML).toBe('test')
    })
  })
  describe('bugs', () => {
    test('delay', async () => {
      history.push('/test')
      const div = render(
        <Router path='/test' delay={50}>test</Router>
      )

      await new Promise(resolve => setTimeout(resolve, 50))

      expect(div.innerHTML).toBe('test')

      history.push('/')
      await new Promise(resolve => setTimeout(resolve, 30))
      history.push('/test')

      expect(div.innerHTML).toBe('test')
      await new Promise(resolve => setTimeout(resolve, 50))
      expect(div.innerHTML).toBe('test')
    })
    test('path', () => {
      history.push('/')
      const div = render(
        <Router>
          <Router path='/(test)?'>test</Router>
        </Router>
      )

      expect(div.innerHTML).toBe('test')

      history.push('/test')

      expect(div.innerHTML).toBe('test')

      history.push('/test1')

      expect(div.innerHTML).toBe('')
    })
  })
})
