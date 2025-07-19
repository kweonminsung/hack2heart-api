import { Language, Package, Tmi } from '@prisma/client';

export class CommonTmiResponseDto {
  id: number;
  name: string;

  constructor(tmi: Tmi) {
    this.id = tmi.id;
    this.name = tmi.name;
  }
}
