import { Inject, Injectable } from '@nestjs/common';
import { IRoles } from 'src/modules/shared/interfaces/iroles';

@Injectable()
export class FindAllService {
  constructor(
    @Inject('Role')
    private readonly role: IRoles,
  ) {}

  async execute(page) {
    return (await this.role.findAllRole(page ?? 1)) as any;
  }
}
