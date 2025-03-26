import { expect, test, describe, beforeEach } from 'vitest'
import { InMemoryGmysRepository } from '@/repositories/in-mamory/in-mamory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let usersRepository: InMemoryGmysRepository
let sut: CreateGymUseCase

describe('Create Gyms Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryGmysRepository()
    sut = new CreateGymUseCase(usersRepository)
  })

  test('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: 12.2260579,
      longitude: -69.0630512,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
