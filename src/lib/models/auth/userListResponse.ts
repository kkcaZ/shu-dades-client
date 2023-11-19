import type UserInfo from '$lib/models/auth/userInfo';
import type { BaseResponse } from '$lib/models/request/baseResponse';

export default interface UserListResponse extends BaseResponse {
	users: UserInfo[];
}
