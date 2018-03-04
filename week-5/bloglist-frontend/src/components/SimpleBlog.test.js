import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog/>', () => {

    let simpleBlog
    const blog = {
        title: 'Komponenttitestaus',
        author: 'Devin Developer',
        likes: 1
    }
    
    beforeEach(() => {
        simpleBlog = shallow(<SimpleBlog blog={blog}/>)
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

})
