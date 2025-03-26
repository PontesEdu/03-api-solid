import { expect, test, describe, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-mamory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-erros'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  test('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jhondoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhondoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
