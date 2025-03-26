import { expect, test, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from './../repositories/in-mamory/in-memory-checki-ins-repository'
import { CheckinUseCase } from './checkin'
import { InMemoryGmysRepository } from '@/repositories/in-mamory/in-mamory-gyms-repository'
import { MaxNumberOfCheckInError } from './errors/max-number-of-check-ins'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGmysRepository
let sut: CheckinUseCase

describe('Checkin Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGmysRepository()
    sut = new CheckinUseCase(checkInRepository, gymsRepository)

    gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: 12.2260579,
      longitude: -69.0630512,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 12.2260579,
      userLongitude: -69.0630512,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 12.2260579,
      userLongitude: -69.0630512,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 12.2260579,
        userLongitude: -69.0630512,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
  })

  test('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 12.2260579,
      userLongitude: -69.0630512,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 12.2260579,
      userLongitude: -69.0630512,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('should not be able to check in on distant gym', async () => {
    gymsRepository.create({
      id: 'gym-02',
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: 12.3741088,
      longitude: -69.1490143,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: 12.3741088,
        userLongitude: -68.1490143,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
