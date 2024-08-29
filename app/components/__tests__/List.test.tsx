import { fireEvent, render, screen } from '@testing-library/react'
import { ListWithPagination } from '../ListWithPagination'
import { MockedProvider } from '@apollo/client/testing'
import { getPage } from '@/app/lib/graphql/pages'

describe('List Component', () => {
  const mocks = [
    {
      request: {
        query: getPage,
        variables: { page: 1, perPage: 20 },
      },
      result: {
        data: {
          Page: {
            __typename: 'Page', // need to add __typename since fragments are used in the query
            pageInfo: {
              __typename: 'PageInfo',
              total: 10,
            },
            media: [
              {
                __typename: 'Media',
                id: '1',
                title: { english: 'Anime 1' },
                coverImage: {
                  __typename: 'MediaCoverImage',
                  medium: 'http://images.anime1.jpg',
                },
                genres: ['Action', 'Adventure'],
                averageScore: 85,
              },
              {
                __typename: 'Media',
                id: '2',
                title: { english: 'Anime 2' },
                coverImage: {
                  __typename: 'MediaCoverImage',
                  medium: 'http://images.anime2.jpg',
                },
                genres: ['Drama', 'Fantasy'],
                averageScore: 90,
              },
            ],
          },
        },
      },
    },
    {
      request: {
        query: getPage,
        variables: { page: 2, perPage: 20 },
      },
      result: {
        data: {
          Page: {
            __typename: 'Page',
            pageInfo: {
              __typename: 'PageInfo',
              total: 10,
            },
            media: [
              {
                __typename: 'Media',
                id: '1',
                title: { english: 'Anime 3' },
                coverImage: {
                  __typename: 'MediaCoverImage',
                  medium: 'http://images.anime1.jpg',
                },
                genres: ['Action', 'Adventure'],
                averageScore: 85,
              },
              {
                __typename: 'Media',
                id: '2',
                title: { english: 'Anime 4' },
                coverImage: {
                  __typename: 'MediaCoverImage',
                  medium: 'http://images.anime2.jpg',
                },
                genres: ['Drama', 'Fantasy'],
                averageScore: 90,
              },
            ],
          },
        },
      },
    },
  ]

  it('renders items correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <ListWithPagination />
      </MockedProvider>,
    )

    // verify text data is correctly rendered
    expect(await screen.findByText('Anime 1')).toBeVisible()
    expect(screen.getByText('Anime 2')).toBeVisible()
    expect(screen.getByText('Action, Adventure')).toBeVisible()
    expect(screen.getByText('Drama, Fantasy')).toBeVisible()
    expect(screen.getByText('Rating: 85')).toBeVisible()
    expect(screen.getByText('Rating: 90')).toBeVisible()

    // Verify the images are correctly rendered
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute(
      'src',
      expect.stringMatching(/anime1.jpg/),
    )
    expect(images[1]).toHaveAttribute(
      'src',
      expect.stringMatching(/anime2.jpg/),
    )
  })

  it('a new page is rendered when next if clicked', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <ListWithPagination />
      </MockedProvider>,
    )

    await screen.findByText('Anime 1')
    const nextPageButton = screen.getByText('Next')
    fireEvent.click(nextPageButton)

    expect(await screen.findByText('Anime 3')).toBeVisible()
  })
})
