// import React from 'react'
// import { renderIntoeDocument } from 'react-testing-library'
// import { render, fireEvent, screen, waitFor } from '@testing-library/react'
// import Name from '../../client/components/Name'
// import server from '../server'
// import request from 'supertest'
// import { addToLeaderboard } from '../../client/apiClient'

// // import { setName, setScore } from '../../client/components/Name'
// // Mocking the API function
// jest.mock = require('react')('../apiClient')

// describe('Get /', () => {
//   beforeEach(() => {
//     jest.resetAllMocks()
//   })

//   test('should render the component', async () => {
//     render(<Name />)
//     const response = request(server).get('/api/leaderboard')

//     expect(screen.getByLabelText('Name:')).renderIntoeDocument()
//     expect(screen.getByLabelText('Score:')).renderIntoDocument()
//     expect(screen.getByRole('button')).renderIntoDocument()
//   })

//   test('should update the name and score fields when the user types', async () => {
//     render(<Name />)
//     const nameInput = screen.getByLabelText('Name:')
//     const scoreInput = screen.getByLabelText('Score:')
//     // fireEvent.change(nameInput, { target: { value: 'John' } })
//     // fireEvent.change(scoreInput, { target: { value: '200' } })
//     expect(nameInput).toHaveValue('John')
//     expect(scoreInput).toHaveValue('200')
//   })

//   test('should call the API with the correct data when the form is submitted', async () => {
//     render(<Name />)
//     const nameInput = screen.getByLabelText('Name:')
//     const scoreInput = screen.getByLabelText('Score:')
//     fireEvent.change(nameInput, { target: { value: 'John' } })
//     fireEvent.change(scoreInput, { target: { value: '200' } })
//     fireEvent.submit(screen.getByRole('button'))
//     await waitFor(() => expect(addToLeaderboard).toHaveBeenCalledTimes(1))
//     expect(addToLeaderboard).toHaveBeenCalledWith({
//       name: 'John',
//       score: '200',
//     })
//   })

//   test('should display an error message if the API call fails', async () => {
//     render(<Name />)
//     const nameInput = screen.getByLabelText('Name:')
//     const scoreInput = screen.getByLabelText('Score:')
//     fireEvent.change(nameInput, { target: { value: 'John' } })
//     fireEvent.change(scoreInput, { target: { value: '200' } })
//     fireEvent.submit(screen.getByRole('button'))
//     const response = await request(server).get('/api/leaderboard')

//     expect(response.status).toBe(500)
//     await waitFor(() =>
//       expect(screen.getByText('Error adding score')).toBeInTheDocument()
//     )
//   })
// })
