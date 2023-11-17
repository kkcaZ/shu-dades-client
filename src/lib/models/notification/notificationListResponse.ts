import type Notif from '$lib/models/notification/notif';
import type { BaseResponse } from '$lib/models/request/baseResponse';

export default interface NotificationListResponse extends BaseResponse {
	notifications: Notif[];
}
