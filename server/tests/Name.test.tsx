import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Name from '../../client/components/Name'
import { addToLeaderboard } from '../../client/apiClient'

jest.mock('../../client/apiClient')

describe('Name', () => {
  test('renders the name and score inputs', () => {
    render(<Name />)
    expect(screen.getByLabelText('Name:')).toBeInTheDocument()
    expect(screen.getByLabelText('Score:')).toBeInTheDocument()
  })

  test('submits the name and score', async () => {
    const newName = 'Test Name'
    const newScore = '123'
    ;(addToLeaderboard as jest.Mock).mockResolvedValueOnce({ id: 1 })

    render(<Name />)

    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: newName },
    })

    fireEvent.change(screen.getByLabelText('Score:'), {
      target: { value: newScore },
    })

    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() =>
      expect(addToLeaderboard).toHaveBeenCalledWith({
        name: newName,
        score: newScore,
      })
    )

    expect(screen.getByText('Score added successfully')).toBeInTheDocument()
  })

  test('displays an error message when the score submission fails', async () => {
    ;(addToLeaderboard as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to add score')
    )

    render(<Name />)

    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => expect(addToLeaderboard).toHaveBeenCalled())

    expect(screen.getByText('Error adding score')).toBeInTheDocument()
  })
})
