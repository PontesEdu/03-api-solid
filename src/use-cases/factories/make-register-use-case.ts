import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-respository'
import { RegisterUseCase } from '@/use-cases/register'

export function makeRegisterUseCase() {
  const userRespository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(userRespository)

  return registerUseCase
}
