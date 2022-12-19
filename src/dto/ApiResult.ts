import { UserViewDto } from "./users/UserViewDto";

export interface ApiResult {
  success: boolean;
  message: string;
  data?: UserViewDto | string;
}
