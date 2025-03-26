import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-respository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const userRespository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(userRespository)

  return useCase
}
