import { Injectable } from '@nestjs/common';
import { IGenerateCode } from '../interfaces/igenerate-code';
import { randomBytes } from 'crypto';

@Injectable()
export class GenerateCodeUtil implements IGenerateCode {
  six(): string {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
  }

  opac() {
    return randomBytes(16).toString('hex');
  }
}
