import type UserClaim from '$lib/models/auth/userClaim';

export interface AuthResponse {
	statusCode: number;
	userClaim: UserClaim;
}
