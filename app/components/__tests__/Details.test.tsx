import { render, screen } from '@testing-library/react'
import { Details } from '../Details'
import { MockedProvider } from '@apollo/client/testing'
import { getMedia } from '@/app/lib/graphql/pages'
import { Suspense } from 'react'

describe('Details Component', () => {
  const mocks = [
    {
      request: {
        query: getMedia,
        variables: { id: '1' },
      },
      result: {
        data: {
          Media: {
            __typename: 'Media', // typenames are required since Framgents are used in the query
            id: '1',
            title: { english: 'Anime 1' },
            coverImage: {
              __typename: 'MediaCoverImage',
              medium: 'http://images.anime1.jpg',
            },
            genres: ['Action', 'Adventure'],
            averageScore: 85,
            bannerImage: 'http://images.anime1banner.jpg',
            seasonYear: 2021,
            description: 'Some description.<br>And line breaks.',
            episodes: 12,
            duration: 24,
          },
        },
      },
    },
  ]

  it('renders items correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <Suspense fallback={<div>Loading...</div>}>
          <Details id='1' />
        </Suspense>
      </MockedProvider>,
    )

    // verify text data is correctly rendered
    expect(await screen.findByText('Anime 1')).toBeVisible()
    expect(screen.getByText('Some description.')).toBeVisible()
    expect(screen.getByText('And line breaks.')).toBeVisible()
    expect(screen.getByLabelText('Year')).toHaveTextContent('2021')
    expect(screen.getByLabelText('Episodes')).toHaveTextContent('12')
    expect(screen.getByLabelText('Duration')).toHaveTextContent('24m')

    // Verify the images are correctly rendered
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute(
      'src',
      expect.stringMatching(/anime1banner.jpg/),
    )
  })
})
