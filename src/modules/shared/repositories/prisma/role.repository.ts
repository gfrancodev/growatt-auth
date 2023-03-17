import { PrismaClient } from "@prisma/client";
import { IPrisma } from "../../interfaces/iprisma";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { IRoles } from "../../interfaces/iroles";

@Injectable()
export class RoleRepository implements IPrisma, IRoles {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async createRole(data: Role.Data): Promise<Code.Response> {
        return await this.create(data) as any
    }

    async findAllRolesByUserId(user_id): Promise<Role.Response> {
        return (await this.findAll({ where: { userId: user_id }}))[0] as any
    }

    async findOne(id: string): Promise<unknown> {
        try {
            return await this.prisma.roles.findUnique({
                where: {
                    id
                }
            })
        } catch (error) {
            return null
        }
    }

    async findAll(params?: { skip?: number; take?: number; cursor?: { id: string; }; where?: Record<string, unknown>; orderBy?: Record<string, unknown>; }): Promise<unknown[]> {
        try {
            return await this.prisma.roles.findMany(params)
        } catch (error) {
            return []
        }
    }

    async create(data: Role.Data): Promise<unknown> {
        try {
            return await this.prisma.roles.create({ data })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async update(params: { where: Record<string, unknown>; data: unknown }): Promise<unknown> {
        try {
            return await this.prisma.roles.update(params)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async updateMany(params: { where?: Record<string, unknown>; data: unknown; }): Promise<unknown> {
        try {
            return await this.prisma.roles.updateMany(params)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async delete(where: Record<string, unknown>): Promise<unknown> {
        try {
            return await this.prisma.roles.delete({ where })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async deleteMany(where: Record<string, unknown>): Promise<unknown> {
        try {
            return await this.prisma.roles.deleteMany({ where })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

}