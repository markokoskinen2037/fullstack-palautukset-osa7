import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    test('renders title and author', () => {
        const testBlog = {
            title: "hassunhaauska vitsiblogi",
            author: "reiska pekkanen",
            likes: 0
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={testBlog} />)

        const contentDiv = simpleBlogComponent.find('.content')


        expect(contentDiv.text()).toContain(testBlog.title)
        expect(contentDiv.text()).toContain(testBlog.author)
    })

    test('renders likes', () => {
        const testBlog = {
            title: "hassunhauska vitsiblogi",
            author: "reiska pekskanen",
            likes: 6
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={testBlog} />)

        const contentDiv = simpleBlogComponent.find('.likes')


        expect(contentDiv.text()).toContain(testBlog.likes)
    })

    test('clicking the button calls event handler twice', () => {
        const testBlog = {
            title: "hassunhauska vitsiblogi",
            author: "reiska pekkanen",
            likes: 6
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <SimpleBlog
                blog={testBlog}
                onClick={mockHandler}
            />
        )

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })

})