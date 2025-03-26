import { expect, test, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-mamory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-erros'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  test('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Jhon doe')
  })

  test('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
