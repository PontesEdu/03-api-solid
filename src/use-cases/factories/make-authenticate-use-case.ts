import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-respository'
import { AuthenticateUseCase } from './../authenticate'

export function makeAuthenticateUseCase() {
  const userRespository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(userRespository)

  return authenticateUseCase
}
