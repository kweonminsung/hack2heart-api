import { Language } from '@prisma/client';

export class CommonLanguageResponseDto {
  id: number;
  name: string;

  constructor(language: Language) {
    this.id = language.id;
    this.name = language.name;
  }
}
