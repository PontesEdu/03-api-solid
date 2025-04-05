import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-Authenticate'
import { prisma } from '@/lib/prisma'

describe('Validate Check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to Validate a Check-In', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: 12.2260579,
        longitude: -69.0630512,
      },
    })

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    // Validate na função ele coloca uma Data no checkin criado.
    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    const MesmoCheckInDepoisDoValidate = await prisma.checkIn.findUniqueOrThrow(
      {
        where: { id: checkIn.id },
      },
    )

    expect(MesmoCheckInDepoisDoValidate.validated_at).toEqual(expect.any(Date))
  })
})
