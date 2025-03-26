import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>

  findById(id: string): Promise<CheckIn | null>

  save(checkin: CheckIn): Promise<CheckIn>

  countByUserId(userId: string): Promise<number>

  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
}
