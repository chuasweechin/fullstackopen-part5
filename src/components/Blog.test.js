import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)


describe('Togglable blog details', () => {
    let component
    const mockHandler = jest.fn()

    const blog = {
        title: 'Component testing tutorial',
        author: 'John',
        likes: 0,
        user: ['']
    }

    const user = {
        token: '',
        claim: {
            id: '',
            username: '',
            name: ''
        }
    }

    beforeEach(() => {
        component = render(
            <Blog
                blog={ blog }
                user={ user }
                handleBlogLike={ mockHandler }
                handleBlogRemove={ mockHandler }
            />
        )
    })

    test('renders content', () => {
        const element = component.getByText(
            'Component testing tutorial - John'
        )

        expect(element).toBeDefined()
    })

    test('at start, blog details are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('blog details are displayed after clicking on the blog', () => {
        const button = component.getByText('Component testing tutorial - John')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('blog details are hidden after clicking on the blog twice', () => {
        const button = component.getByText('Component testing tutorial - John')
        fireEvent.click(button)
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})