import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'

import App from './App'

jest.mock('./services/blogs')
afterEach(cleanup)

let savedItems = {}

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item
    },
    getItem: (key) => savedItems[key],
    clear: () => {
        savedItems = {}
    }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('<App /> - no user logged', () => {
    test('if no user logged, blogs are not rendered', async () => {
        const component = render(
            <App />
        )

        await waitForElement(
            () => component.getByText('Log In')
        )

        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(0)
    })
})

describe('<App /> - user logged', () => {
    test('if user logged in, blogs are rendered', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJuYW1lIjoiSm9obnNvbiIsImlkIjoiNWQ2MGM0MzM3M2FhM2IxZmJhMGM3ZjFlIiwiaWF0IjoxNTY2ODg5NTQ4fQ.qEK4lap9oj-XHS8084vo9hvPdIDP1yrGC5cNpWH8ZSk'

        localStorage.setItem('token', JSON.stringify(token))

        const component = render(
            <App />
        )

        await waitForElement(
            () => component.getByText('Singapore Laksa - Hot')
        )

        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(3)

    })
})