import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
    const blog = {
        title: 'Component testing tutorial',
        author: 'John',
        likes: 0
    }

    const component = render(
        <SimpleBlog blog={ blog } />
    )

    const elementOne = component.getByText(
        'Component testing tutorial John'
    )

    const elementTwo = component.getByText(
        'blog has 0 likes'
    )

    expect(elementOne).toBeDefined()
    expect(elementTwo).toBeDefined()
})

test('clicking the button calls event handler once', () => {
    const blog = {
        title: 'Component testing tutorial',
        author: 'John',
        likes: 0
    }

    const mockHandler = jest.fn()

    const component = render(
        <SimpleBlog blog={ blog } onClick={ mockHandler } />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})