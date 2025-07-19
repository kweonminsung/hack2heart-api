import { Language, Package } from '@prisma/client';

export class CommonPackageResponseDto {
  id: number;
  name: string;

  constructor(package_: Package) {
    this.id = package_.id;
    this.name = package_.name;
  }
}
