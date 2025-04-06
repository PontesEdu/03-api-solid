import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await res.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
      },
    },
  )

  const refreshToken = await res.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return res
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // colocando secure como true nos avisamos que e e http e o front-end nao cosegue ler ele
      sameSite: true, // o cookie so e acessivel dentro desse dominio
      httpOnly: true, // so pode ser acessado pelo back e não pelo front
    })
    .status(200)
    .send({
      token,
    })
}
