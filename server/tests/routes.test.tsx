import request from 'supertest'
import server from '../server'
import { getReadData, getWriteData } from '../dataService'
jest.mock('../dataService')

describe('GET /', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('should return the leaderboard data', async () => {
    const leaderboard = [
      { id: 1, name: 'Alice', score: 100 },
      { id: 2, name: 'Bob', score: 90 },
    ]
    jest.mocked(getReadData).mockResolvedValue({ leaderboard })

    const response = await request(server).get('/api/leaderboard')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(leaderboard)
    // expect(getReadData).toHaveBeenCalledTimes(1)
  })

  test('should return an error message when failed to fetch data', async () => {
    const errorMessage = 'Failed to fetch leaderboard data'
    jest.mocked(getReadData).mockRejectedValue('error message')

    const response = await request(server).get('/api/leaderboard')

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ error: errorMessage })
    expect(getReadData).toHaveBeenCalledTimes(1)
  })
})

describe('POST /', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('should add a new score to the leaderboard', async () => {
    const newScore = { name: 'Charlie', score: 80 }
    const maxId = 5
    const newId = 6

    const updatedLeaderboard = [
      { id: 1, name: 'Alice', score: 100 },
      { id: 2, name: 'Bob', score: 90 },
      { id: 3, name: 'Charlie', score: 80 },
    ]
    jest
      .mocked(getReadData)
      .mockResolvedValue({ leaderboard: updatedLeaderboard })
    jest.mocked(getWriteData).mockResolvedValue()

    const response = await request(server)
      .post('/api/leaderboard')
      .send(newScore)

    expect(response.body.message).toMatch(/added successfully/i)
    expect(getWriteData).toHaveBeenCalledTimes(1)
    expect(getWriteData).toHaveBeenCalledWith({
      leaderboard: updatedLeaderboard,
    })
  })

  test('should return an error message when failed to add score', async () => {
    const newScore = { name: 'Charlie', score: 80 }
    const errorMessage = 'Failed to add score to leaderboard'
    const response = await request(server)
      .post('/api/leaderboard')
      .send(newScore)

    expect(response.status).toBe(500)
    expect(response.body).toEqual({ error: errorMessage })
    expect(getWriteData).toHaveBeenCalledTimes(0)
  })
})
