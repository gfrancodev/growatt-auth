export interface IProfile {
  createProfile(data: any): Promise<any>;
  findAllProfile(page: any): Promise<unknown[]>;
  findOneProfileById(user_id: string): Promise<any>;
  findOneProfile(user_id: string): Promise<any>;
  updateProfile(user_id: string, data: Record<string, any>): Promise<any>;
  deleteProfile(user_id: string): Promise<any>;
  countProfiles(): Promise<number>
}
