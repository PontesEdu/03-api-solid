import { makeFetchCheckInHistoryUseCase } from '@/use-cases/factories/make-fatch-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(req.query)

  const FetUserCheckInsHistoryUseCase = makeFetchCheckInHistoryUseCase()

  const { checkIns } = await FetUserCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  })

  return res.status(200).send({
    checkIns,
  })
}
