import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog/>', () => {

    let simpleBlog
    let mockHandler
    const blog = {
        title: 'Komponenttitestaus',
        author: 'Devin Developer',
        likes: 1
    }
    
    const clickElement = (element, clicks) => {
        for (let i=0; i<clicks; i++) {
            element.simulate('click')
        }
    }

    beforeEach(() => {
        mockHandler = jest.fn()
        simpleBlog = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    })

    it('renders blog title', () => {
        const blogTitle = simpleBlog.find('.blog-title')
        expect(blogTitle.text()).toContain(blog.title) 
    })

    it('renders blog author', () => {
        const blogTitle = simpleBlog.find('.blog-title')
        expect(blogTitle.text()).toContain(blog.author)
    })

    it('renders number of blog likes', () => {
        const blogLikes = simpleBlog.find('.blog-likes')
        expect(blogLikes.text()).toContain(`blog has ${blog.likes} likes`)
    })

    it('clicking the button twice calls onClick twice', () => {
        const likeButton = simpleBlog.find('button')
        clickElement(likeButton, 2)
        expect(mockHandler.mock.calls.length).toBe(2)
    })

})
