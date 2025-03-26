import { expect, test, describe, beforeEach } from 'vitest'
import { InMemoryGmysRepository } from '@/repositories/in-mamory/in-mamory-gyms-repository'
import { FetchNearbyUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGmysRepository
let sut: FetchNearbyUseCase

describe('Fetch nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGmysRepository()
    sut = new FetchNearbyUseCase(gymsRepository)
  })

  test('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: 20.2260579,
      longitude: -20.0630512,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: 12.2260579,
      longitude: -69.0630512,
    })

    const { gyms } = await sut.execute({
      userLatitude: 12.2260579,
      userLongitude: -69.0630512,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Far Gym' })])
  })
})
