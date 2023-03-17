import { PrismaClient } from "@prisma/client";
import { IPrisma } from "../../interfaces/iprisma";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ICode } from "../../interfaces/icode";

@Injectable()
export class CodeRepository implements IPrisma, ICode {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async createCode(data: Code.Data): Promise<Code.Response> {
        return await this.create(data) as any
    }

    async findOneCodeByUserId(user_id): Promise<Code.Response> {
        return (await this.findAll({ where: { userId: user_id }}))[0] as any
    }

    async findOne(id: string): Promise<unknown> {
        try {
            return await this.prisma.code.findUnique({
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
            return await this.prisma.code.findMany(params)
        } catch (error) {
            return []
        }
    }

    async create(data: Code.Data): Promise<unknown> {
        try {
            return await this.prisma.code.create({ data })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async update(params: { where: Record<string, unknown>; data: unknown }): Promise<unknown> {
        try {
            return await this.prisma.code.update(params)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async updateMany(params: { where?: Record<string, unknown>; data: unknown; }): Promise<unknown> {
        try {
            return await this.prisma.code.updateMany(params)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async delete(where: Record<string, unknown>): Promise<unknown> {
        try {
            return await this.prisma.code.delete({ where })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async deleteMany(where: Record<string, unknown>): Promise<unknown> {
        try {
            return await this.prisma.code.deleteMany({ where })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

}