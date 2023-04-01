import { Inject, Injectable } from '@nestjs/common';
import { IRoles } from 'src/modules/shared/interfaces/iroles';

@Injectable()
export class UpdateService {
  constructor(
    @Inject('Role')
    private readonly role: IRoles,
  ) {}

  async execute({ user_id, ...rest }) {
    return await this.role.updateRole(user_id, rest);
  }
}
