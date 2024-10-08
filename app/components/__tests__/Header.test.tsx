import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Header } from '../Header'

jest.mock('../../lib/actions', () => ({
  logOut: jest.fn(),
}))
jest.mock('next/navigation')
jest.mock('../../lib/providers/UserContextProvider', () => ({
  useUserContext: jest.fn().mockReturnValue({
    user: {
      username: 'animefan',
      jobTitle: 'Watching anime',
    },
  }),
}))

describe('Header', () => {
  it('shows the site title', () => {
    render(<Header />)

    expect(screen.getByText(/AniRealm/i)).toBeVisible()
  })

  it('shows the username and job title when a user is logged in', () => {
    render(<Header />)

    expect(screen.getByText(/animefan/i)).toBeVisible()
    expect(screen.getByText(/Watching anime/i)).toBeVisible()
  })

  it('shows dropdown with Edit Details and Log out when avatar is clicked', async () => {
    render(<Header />)

    const avatar = screen.getByRole('button', { name: /animefan/i })
    fireEvent.click(avatar)

    await waitFor(() => {
      expect(screen.getByText(/Edit details/i)).toBeVisible()
      expect(screen.getByText(/Behind the scenes/i)).toBeVisible()
      expect(screen.getByText(/Log out/i)).toBeVisible()
    })
  })
})
