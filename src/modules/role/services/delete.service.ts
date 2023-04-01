import { Inject, Injectable } from '@nestjs/common';
import { IRoles } from 'src/modules/shared/interfaces/iroles';

@Injectable()
export class DeleteService {
  constructor(
    @Inject('Role')
    private readonly role: IRoles,
  ) {}

  async execute({ user_id }) {
    return await this.role.deleteRole(user_id);
  }
}
