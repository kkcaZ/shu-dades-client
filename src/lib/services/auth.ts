import type { AuthRequest } from '$lib/models/auth/auth';
import type { AuthResponse } from '$lib/models/auth/authResponse';
import type UserClaim from '$lib/models/auth/userClaim';
import type UserInfo from '$lib/models/auth/userInfo';
import type UserListResponse from '$lib/models/auth/userListResponse';
import { SendRequest } from '$lib/helpers/requestHelper';

export async function Authenticate(username: string, password: string): Promise<UserClaim> {
	let body: AuthRequest = {
		username: username,
		password: password
	};

	const response = await SendRequest(body, 'POST', '/auth');
	let authResponse = response as AuthResponse;
	return authResponse.userClaim;
}

export async function GetUsers(): Promise<UserInfo[]> {
	const response = await SendRequest({}, 'GET', '/auth/users');
	let userListResponse = response as UserListResponse;
	return userListResponse.users;
}
