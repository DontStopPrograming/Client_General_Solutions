import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from './Navbar'
import { describe, test, expect } from '@jest/globals'

describe('Navbar Component', () => {
    test('renders Navbar and navigate correctly', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        )

        expect(screen.getByText('JYM')).toBeInTheDocument()

        const homeButton = screen.getByText('Home')
        fireEvent.click(homeButton)
    })

    test('does not render Navbar on /home', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        )
        expect(screen.queryByText('JYM')).not.toBeInTheDocument()
    })

})