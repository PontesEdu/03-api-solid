import { expect, test, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-mamory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  test('should be able to register', async () => {

    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should hash user password upon resgitration', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test('sas', async () => {
    const email = 'jhondoe@gmail.com'

    await sut.execute({
      name: 'Jhon Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
