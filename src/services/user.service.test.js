import userService from './user.service.js'
import bcrypt from 'bcryptjs'
import dao from '../dao/factory.js'
import { generateToken } from '../config/jsonwebtoken.config.js'

jest.mock('bcryptjs')
jest.mock('../dao/factory.js')
jest.mock('../config/jsonwebtoken.config.js')

describe('userService', () => {
  
  describe('createUser', () => {
    it('deve retornar um token após a criação do usuário', async () => {
      const userMock = {
        _id: 'user1',
        email: 'user@example.com',
        password: 'password123',
      }
      generateToken.mockReturnValue('mockToken')

      const result = await userService.createUser(userMock)

      expect(result).toBe('mockToken')
      expect(generateToken).toHaveBeenCalledWith(userMock)
    })
  })

  describe('logoutUser', () => {
    it('deve retornar uma mensagem de sucesso', () => {
      const result = userService.logoutUser()

      expect(result).toEqual({ message: 'Usuário deslogado com sucesso.' })
    })
  })
})