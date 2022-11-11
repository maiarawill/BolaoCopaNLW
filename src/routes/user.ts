import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import {prisma} from '../lib/prisma'

export async function userRoutes(fastify: FastifyInstance){
    fastify.get('/users/count', async () => {

        const count = await prisma.user.count()
        return { count }
    })


    fastify.post('/users/create', async(request, reply) =>{
        const createUserBody = z.object({
            name: z.string(),
            email: z.string(),
        })

        const {name} = createUserBody.parse(request.body)
        const {email} = createUserBody.parse(request.body)

        await prisma.user.create({
            data:{
                name,
                email
            }
        })

        const user = {name, email}
        return reply.status(201).send(user)
    })
}