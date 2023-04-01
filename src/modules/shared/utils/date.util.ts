import { Injectable } from '@nestjs/common';
import { IDate } from '../interfaces/idate';

@Injectable()
export class DateUtil implements IDate {
  isExpired(date: string, expired: string): boolean {
    if (new Date(date) > new Date(expired)) {
      return true;
    }
    return false;
  }

  set2hours(date: string): string {
    const receive = new Date(date);
    return new Date(receive.setHours(receive.getHours() + 2)).toISOString();
  }
}
