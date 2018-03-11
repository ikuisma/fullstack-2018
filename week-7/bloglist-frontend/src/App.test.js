import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App/>', () => {

    let app

    describe('when user is not logged in', () => {

        beforeEach(() => {
            app = mount(<App/>)
        })

        it('shows login form and no blogs when user has not yet logged in. ', () => {
            app.update()
            const blogComponents = app.find(Blog)
            const loginFormComponents = app.find(LoginForm)
            expect(blogComponents.length).toBe(0)
            expect(loginFormComponents.length).toBe(1)
        })

    })

    describe('when user is logged in', () => {

        beforeAll(() => {
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }
            localStorage.setItem('user', JSON.stringify(user))
            app = mount(<App/>)
        })

        it('page contains correct amount of Blog elements', () => {
            app.update()
            const blogElements = app.find(Blog)
            expect(blogElements.length).toBe(blogService.blogs.length)
        })

    })

})
