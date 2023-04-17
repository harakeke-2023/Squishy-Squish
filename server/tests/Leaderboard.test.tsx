import { render, screen, waitFor, act } from '@testing-library/react'
import Leaderboard from '../../client/components/Leaderboard'
import { getLeaderboard } from '../../client/apiClient'
import '@testing-library/jest-dom'
// import { act } from 'react-dom/test-utils'

jest.mock('../../client/apiClient')

const mockLeaderboard = [
  { id: 1, name: 'John', score: 100 },
  { id: 2, name: 'Jane', score: 90 },
  { id: 3, name: 'Bob', score: 80 },
]

describe('Leaderboard', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    jest
      .mocked(getLeaderboard)
      .mockImplementation(() => Promise.resolve(mockLeaderboard))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders the leaderboard table with correct headers', async () => {
    await act(async () =>
      render(
        <Leaderboard
          updateViewToRender={function (view: string): void {
            throw new Error('Function not implemented.')
          }}
        />
      )
    )

    const rankHeader = screen.getByText('Rank')
    const nameHeader = screen.getByText('Name')
    const scoreHeader = screen.getByText('Score')

    expect(rankHeader).toBeInTheDocument()
    expect(nameHeader).toBeInTheDocument()
    expect(scoreHeader).toBeInTheDocument()
  })

  it('renders the leaderboard with correct data and ranking order', async () => {
    render(
      <Leaderboard
        updateViewToRender={function (view: string): void {
          throw new Error('Function not implemented.')
        }}
      />
    )

    await waitFor(() => {
      const leaderboardRows = screen.getAllByRole('row')

      expect(leaderboardRows[1]).toHaveTextContent('1')
      expect(leaderboardRows[1]).toHaveTextContent('John')
      expect(leaderboardRows[1]).toHaveTextContent('100')

      expect(leaderboardRows[2]).toHaveTextContent('2')
      expect(leaderboardRows[2]).toHaveTextContent('Jane')
      expect(leaderboardRows[2]).toHaveTextContent('90')

      expect(leaderboardRows[3]).toHaveTextContent('3')
      expect(leaderboardRows[3]).toHaveTextContent('Bob')
      expect(leaderboardRows[3]).toHaveTextContent('80')
    })
  })
})
