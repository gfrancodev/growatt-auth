import { IPrisma } from '../../interfaces/iprisma';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IProfile } from '../../interfaces/iprofile';
import { PrismaHelper } from '../../helpers/prisma.helper';

@Injectable()
export class ProfileRepository implements IPrisma, IProfile {
  constructor(private readonly prisma: PrismaHelper) {}

  async createProfile(data) {
    return await this.create(data);
  }

  async findOneProfileById(user_id: string) {
    return (await this.findOne(user_id)) as any;
  }

  async findAllProfile(page) {
    return await this.findAll({ skip: 20, take: page });
  }

  async findOneProfile(user_id: string) {
    return (
      await this.findAll({
        where: {
          user_id,
        },
      })
    )[0];
  }

  async updateProfile(user_id: string, data: Record<string, any>) {
    return (
      await this.updateMany({
        where: {
          user_id,
        },
        data,
      })
    )[0];
  }

  async deleteProfile(user_id: string) {
    return await this.deleteMany({
      where: {
        user_id,
      },
    });
  }

  async findOne(id: string): Promise<unknown> {
    try {
      return await this.prisma.profile.findUnique({
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
      return await this.prisma.profile.findMany(params);
    } catch (error) {
      return [];
    }
  }

  async create(data: Profile.Data): Promise<unknown> {
    try {
      return await this.prisma.profile.create({ data });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(params: {
    where: Record<string, unknown>;
    data: unknown;
  }): Promise<unknown> {
    try {
      return await this.prisma.profile.update(params);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateMany(params: {
    where?: Record<string, unknown>;
    data: unknown;
  }): Promise<unknown> {
    try {
      return await this.prisma.profile.updateMany(params);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(where: Record<string, unknown>): Promise<unknown> {
    try {
      return await this.prisma.profile.delete({ where });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteMany(where: Record<string, unknown>): Promise<unknown> {
    try {
      return await this.prisma.profile.deleteMany({ where });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
