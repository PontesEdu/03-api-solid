import { makeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-check-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = createCheckInParamsSchema.parse(req.params)

  const checkInUsecase = makeValidateCheckInsUseCase()

  await checkInUsecase.execute({
    checkInId,
  })

  return res.status(204).send()
}
