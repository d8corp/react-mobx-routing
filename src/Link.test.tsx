import React from 'react'
import {Link, history} from '.'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Link', () => {
  test('simple', () => {
    const link = shallow(<Link />)

    expect(link.html()).toBe('<a href="/"></a>')
  })
  test('child', () => {
    const link = shallow(<Link>test</Link>)

    expect(link.html()).toBe('<a href="/">test</a>')
  })
  test('child and href', () => {
    const link = shallow(<Link href='/test'>test</Link>)

    expect(link.html()).toBe('<a href="/test">test</a>')
  })
  test('active', () => {
    const link = shallow(<Link activeClass='active' href='/test'>test</Link>)

    expect(link.html()).toBe('<a href="/test">test</a>')
    history.replace('/test')
    expect(link.html()).toBe('<a href="/test" class="active">test</a>')
    history.replace('/test/1')
    expect(link.html()).toBe('<a href="/test" class="active">test</a>')
  })
  test('exact', () => {
    const link = shallow(<Link activeClass='active' exact href='/'>home</Link>)

    expect(link.html()).toBe('<a href="/">home</a>')
    history.replace('/')
    expect(link.html()).toBe('<a href="/" class="active">home</a>')
  })
  test('search', () => {
    history.replace('/test')
    const link = shallow(<Link href='?key=value'>test</Link>)

    expect(history.url).toBe('/test')
    link.simulate('click')
    expect(history.url).toBe('/test?key=value')
  })
  test('clear search', () => {
    history.replace('/test?test=1')
    const link = shallow(<Link href='?'>test</Link>)

    expect(history.url).toBe('/test?test=1')
    link.simulate('click')
    expect(history.url).toBe('/test')
  })
  test('hash', () => {
    history.replace('/test')
    const link = shallow(<Link href='#success'>test</Link>)

    expect(history.url).toBe('/test')
    link.simulate('click')
    expect(history.url).toBe('/test#success')
  })
  test('clear hash', () => {
    history.replace('/test#test1')
    const link = shallow(<Link href='#'>test</Link>)

    expect(history.url).toBe('/test#test1')
    link.simulate('click')
    expect(history.url).toBe('/test')
  })
  test('push', () => {
    history.replace('/')
    const {length} = history.state.steps
    const link = shallow(<Link href='/test'>test</Link>)

    link.simulate('click')
    expect(history.state.steps.length).toBe(length + 1)
  })
  test('replace', () => {
    history.replace('/')
    const {length} = history.state.steps
    const link = shallow(<Link href='/test' replace>test</Link>)

    link.simulate('click')
    expect(history.state.steps.length).toBe(length)
  })
  test('external link', () => {
    const link = shallow(<Link href='https://github.com/d8corp/react-mobx-routing'>test</Link>)

    expect(link.html()).toBe('<a href="https://github.com/d8corp/react-mobx-routing" rel="noreferrer" target="_blank">test</a>')
  })
})
