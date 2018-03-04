import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
jest.mock('./services/blogs')

describe.only('<App/>', () => {

    let app

    beforeAll(() => {
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
