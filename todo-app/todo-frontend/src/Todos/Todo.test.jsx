import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from './Todo'

test('renders todo text', () => {
    render(<Todo todo={{ text: 'Testiteksti' }} />)
    expect(screen.getByText('Testiteksti')).toBeInTheDocument()
})

test('renders todo text with different text', () => {
    render(<Todo todo={{ text: 'Testiteksti 2' }} />)
    expect(screen.getByText('Testiteksti 2')).toBeInTheDocument()
})