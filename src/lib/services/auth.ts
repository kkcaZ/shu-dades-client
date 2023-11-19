import { invoke } from '@tauri-apps/api/tauri';
import type { AuthRequest } from '$lib/models/auth/auth';
import type { BaseRequest } from '$lib/models/request/baseRequest';
import type { BaseResponse } from '$lib/models/request/baseResponse';
import type { ErrorResponse } from '$lib/models/request/errorResponse';
import type { AuthResponse } from '$lib/models/auth/authResponse';
import type UserClaim from '$lib/models/auth/userClaim';
import type UserInfo from '$lib/models/auth/userInfo';
import type UserListResponse from '$lib/models/auth/userListResponse';

export async function Authenticate(username: string, password: string): Promise<UserClaim> {
	let body: AuthRequest = {
		username: username,
		password: password
	};

	let request: BaseRequest = {
		body: body,
		type: 'POST',
		route: '/auth',
		headers: {}
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}

	let successResponse = parsedResponse as AuthResponse;
	return successResponse.userClaim;
}

export async function GetUsers(): Promise<UserInfo[]> {
	let request: BaseRequest = {
		body: {},
		type: 'GET',
		route: '/auth/users',
		headers: {}
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}

	let successResponse = parsedResponse as UserListResponse;
	return successResponse.users;
}
