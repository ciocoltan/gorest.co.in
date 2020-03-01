import { UserModel } from "./UserModel";

export class UsersObjResModel {
  result: UserModel;
  _meta: {
    success: boolean;
    code: number;
    message: string;
    totalCount: number;
    pageCount: number;
    currentPage: number;
    perPage: number;
    rateLimit: { limit: number; remaining: number; reset: number };
  };
}
