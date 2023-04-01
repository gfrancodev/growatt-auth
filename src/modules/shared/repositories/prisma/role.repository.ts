import { IPrisma } from '../../interfaces/iprisma';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IRoles } from '../../interfaces/iroles';
import { PrismaHelper } from '../../helpers/prisma.helper';

@Injectable()
export class RoleRepository implements IPrisma, IRoles {
  constructor(private readonly prisma: PrismaHelper) {}

  async createRole(data) {
    return await this.create(data);
  }

  async findOneRoleById(user_id: string) {
    return await this.findAll({ where: { user_id }}) as any;
  }

  async findAllRole(page) {
    return await this.findAll({ skip: 20, take: page });
  }

  async findOneRole(user_id: string) {
    return (
      await this.findAll({
        where: {
          user_id,
        },
      })
    )[0];
  }

  async updateRole(user_id: string, data: Record<string, any>) {
    return (
      await this.updateMany({
        where: {
          user_id,
        },
        data,
      })
    )[0];
  }

  async deleteRole(user_id: string) {
    return await this.deleteMany({
      where: {
        user_id,
      },
    });
  }

  async findAllRolesByUserId(user_id): Promise<Role.Response> {
    return (await this.findAll({ where: { userId: user_id } }))[0] as any;
  }

  async findOne(id: string): Promise<unknown> {
    try {
      return await this.prisma.roles.findUnique({
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
      return await this.prisma.roles.findMany(params);
    } catch (error) {
      return [];
    }
  }

  async create(data: Role.Data): Promise<any> {
    try {
      return await this.prisma.roles.create({ data });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(params: {
    where: Record<string, unknown>;
    data: unknown;
  }): Promise<unknown> {
    try {
      return await this.prisma.roles.update(params);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateMany(params: {
    where?: Record<string, unknown>;
    data: unknown;
  }): Promise<unknown> {
    try {
      return await this.prisma.roles.updateMany(params);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(where: Record<string, unknown>): Promise<unknown> {
    try {
      return await this.prisma.roles.delete({ where });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteMany(where: Record<string, unknown>): Promise<unknown> {
    try {
      return await this.prisma.roles.deleteMany({ where });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
