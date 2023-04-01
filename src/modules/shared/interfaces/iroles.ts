export interface IRoles {
  createRole(data: Role.Data): Promise<Role.Response>;
  findAllRole(page: any): Promise<unknown[]>;
  findAllRolesByUserId(user_id): Promise<Role.Response>;
  findOneRole(user_id: string): Promise<any>;
  updateRole(user_id: string, data: Record<string, any>): Promise<any>;
  deleteRole(user_id: string): Promise<any>;
}
