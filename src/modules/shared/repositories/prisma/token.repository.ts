import { IPrisma } from '../../interfaces/iprisma';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IToken } from '../../interfaces/itoken';
import { PrismaHelper } from '../../helpers/prisma.helper';

@Injectable()
export class TokenRepository implements IPrisma, IToken {
  constructor(private readonly prisma: PrismaHelper) {}

  async createToken(data) {
    return await this.create(data);
  }

  async findOneToken(user_id: string, token: string) {
    return (
      await this.findAll({
        where: {
          user_id,
          value: token,
          status: false,
        },
      })
    )[0];
  }

  async updateStatusToken(user_id: string, status: boolean) {
    return (
      await this.updateMany({
        where: {
          user_id,
        },
        data: {
          status,
        },
      })
    )[0];
  }

  async deleteToken(user_id: string, token: string) {
    return await this.deleteMany({
      where: {
        user_id,
        token,
      },
    });
  }

  async findOne(id: string): Promise<unknown> {
    try {
      return await this.prisma.token.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: { id: string };
    where?: Record<string, unknown>;
    orderBy?: Record<string, unknown>;
  }): Promise<unknown[]> {
    try {
      return await this.prisma.token.findMany(params);
    } catch (error) {
      return [];
    }
  }

  async create(data: Token.Data): Promise<unknown> {
    try {
      return await this.prisma.token.create({ data });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(params: {
    where: Record<string, unknown>;
    data: unknown;
  }): Promise<unknown> {
    try {
      return await this.prisma.token.update(params);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateMany(params: {
    where?: Record<string, unknown>;
    data: unknown;
  }): Promise<unknown> {
    try {
      return await this.prisma.token.updateMany(params);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(where: Record<string, unknown>): Promise<unknown> {
    try {
      return await this.prisma.token.delete({ where });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteMany(where: Record<string, unknown>): Promise<unknown> {
    try {
      return await this.prisma.token.deleteMany({ where });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
