import { expect, test, describe, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGmysRepository } from '@/repositories/in-mamory/in-mamory-gyms-repository'

let gymsRepository: InMemoryGmysRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGmysRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  test('should be able to Search for Gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: 12.2260579,
      longitude: -69.0630512,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: 12.2260579,
      longitude: -69.0630512,
    })

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'TypeScript Gym' })])
  })

  test('should be able to Fetch paginated Gym Search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: 12.2260579,
        longitude: -69.0630512,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2) // obs:ele so acha os 2 ultimos depois que o for contar os 20
  })
})
