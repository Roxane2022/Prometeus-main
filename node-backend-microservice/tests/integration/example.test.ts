import request from 'supertest'
import server from '../../src/index'

afterAll(() => {
  server.close()
})

describe('GET /steven', () => {
  it('should return 200 OK and return JSON', async () => {
    const response = await request(server).get('/steven')
    expect(response.body).toEqual({
      "username": "steven",
      "rgb": "#c7c084",
      "hsl": {
        "hue": 54,
        "saturation": 0.37430167597765357,
        "lightness": 0.6490196078431373
      }
    })
  })
})
