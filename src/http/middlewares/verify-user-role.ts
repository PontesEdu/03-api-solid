import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const { role } = req.user

    // para nao entrar no if e passar os dois tem que ser admin
    if (role !== roleToVerify) {
      return res.status(401).send({ messege: 'Unauthorized.' })
    }
  }
}
