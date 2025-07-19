import { UserCode } from '@prisma/client';

export class GetUserCodeResponseDto {
  id: number;
  content: string;
  index: number | null;
  created_at: Date;

  constructor(userCode: UserCode) {
    this.id = userCode.id;
    this.content = userCode.content;
    this.index = userCode.index;
    this.created_at = userCode.created_at;
  }
}
