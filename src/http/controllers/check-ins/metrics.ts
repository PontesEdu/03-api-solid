import { makeMetricsUseCase } from '@/use-cases/factories/make-matrecs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(req: FastifyRequest, res: FastifyReply) {
  const getUserMetricsUseCase = makeMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: req.user.sub,
  })

  return res.status(200).send({
    checkInsCount,
  })
}
