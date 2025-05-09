import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeMetricsUseCase() {
  const checkInsrepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsrepository)

  return useCase
}
