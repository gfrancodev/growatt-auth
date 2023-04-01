import { Inject, Injectable } from '@nestjs/common';
import { IRoles } from 'src/modules/shared/interfaces/iroles';

@Injectable()
export class CreateService {
  constructor(
    @Inject('Role')
    private readonly role: IRoles,
  ) {}

  async execute(data) {
    return await this.role.createRole(data);
  }
}
