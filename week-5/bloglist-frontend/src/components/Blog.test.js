import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog/>', () => {

    const blog = {
        title: 'Blog title',
        author: 'Author',
        url: 'www.google.com',
        likes: 1,
        user: {
            name: 'John Doe'
        }
    }
    let blogElement

    beforeEach(() => {
        blogElement = shallow(<Blog blog={blog} />)
    })

    it('Title and author of blog are visible before expanding', () => {
        const blogTitle = blogElement.find('.blog-title')
        expect(blogTitle.text()).toContain(blog.title)
        expect(blogTitle.text()).toContain(blog.author)
    })

    it('Togglable content is not visible before clicking', () => {
        const expandedDiv = blogElement.find('.blog-expanded')
        expect(expandedDiv.getElement().props.style).toEqual({display: 'none'})
    })

    it('Togglable content is visible after clicking', () => {
        const blogTitle = blogElement.find('.blog-title')
        blogTitle.simulate('click')
        const expandedDiv = blogElement.find('.blog-expanded')
        expect(expandedDiv.getElement().props.style).toEqual({display: ''})
        expect(expandedDiv.find('a').text()).toContain(blog.url)
    })
})
