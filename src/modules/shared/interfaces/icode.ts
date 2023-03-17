export interface ICode {
    createCode(data): Promise<unknown>
    findOneCodeByUserId(user_id): Promise<unknown>
}