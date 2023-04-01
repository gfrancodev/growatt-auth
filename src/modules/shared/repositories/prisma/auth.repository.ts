import { IAuth } from '../../interfaces/iauth';
import { IPrisma } from '../../interfaces/iprisma';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaHelper } from '../../helpers/prisma.helper';

@Injectable()
export class AuthRepository implements IPrisma, IAuth {
  constructor(private readonly prisma: PrismaHelper) {}

  async findByEmail(email: string): Promise<Auth.Response> {
    return (await this.findAll({ where: { email } }))[0] as any;
  }

  async findById(id: string): Promise<Auth.Response> {
    return (await this.findOne(id)) as any;
  }

  async updateAuth(
    id: string,
    data: Record<string, unknown>,
  ): Promise<Auth.Response> {
    return (await this.update({ where: { id }, data })) as any;
  }

  async createAuth(data: Auth.Data): Promise<Auth.Response> {
    return (await this.create(data)) as any;
  }

  async findOneAuth({
    email,
    username,
  }: Auth.Credentials): Promise<Auth.Response> {
    return (
      await this.findAll({
        where: {
          OR: [
            {
              email: {
                contains: email,
              },
            },
            {
              username: {
                contains: username,
              },
            },
          ],
        },
      })
    )[0] as any;
  }

  async findAllAuth(page) {
    return await this.findAll({ skip: 0 });
  }

  async findOne(id: string): Promise<unknown> {
    try {
      return await this.prisma.auth.findUnique({
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
      return await this.prisma.auth.findMany(params);
    } catch (error) {
      return [];
    }
  }

  async create(data: any): Promise<unknown> {
    try {
      return await this.prisma.auth.create({ data });
    } catch (error) {
      console.error(error);
      debugger;
      throw new InternalServerErrorException(error);
    }
  }

  async update(params: {
    where: Record<string, unknown>;
    data: unknown;
  }): Promise<unknown> {
    try {
      return await this.prisma.auth.update(params);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateMany(params: {
    where?: Record<string, unknown>;
    data: unknown;
  }): Promise<unknown> {
    try {
      return await this.prisma.auth.updateMany(params);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(where: Record<string, unknown>): Promise<unknown> {
    try {
      return await this.prisma.auth.delete({ where });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteMany(where: Record<string, unknown>): Promise<unknown> {
    try {
      return await this.prisma.auth.deleteMany({ where });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
