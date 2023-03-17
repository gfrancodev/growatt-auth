export interface IRoles {
    createRole(data: Role.Data): Promise<unknown>
    findAllRolesByUserId(user_id): Promise<unknown>
}