import request from 'supertest'
import server from '../../src/index'

afterAll(() => {
  server.close()
})

describe('GET /', () => {
  it('should return 200 OK and return html', async () => {
    const response = await request(server).get('/')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('text/html')
  })
})
