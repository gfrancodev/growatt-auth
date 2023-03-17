export interface IPrisma {
    findOne(id: string): Promise<unknown | null>;
    findAll(params?: {
      skip?: number;
      take?: number;
      cursor?: {
        id: string;
      };
      where?: Record<string, unknown>;
      orderBy?: Record<string, unknown>;
    }): Promise<unknown[]>;
    create(data: unknown): Promise<unknown>;
    update(params: {
      where?: Record<string, unknown>;
      data: unknown;
    }): Promise<unknown>;
    updateMany(params: {
      where?: Record<string, unknown>;
      data: unknown;
    }): Promise<unknown>;
    delete(where: Record<string, unknown>): Promise<unknown>;
    deleteMany(where: Record<string, unknown>): Promise<unknown>;
  }
  