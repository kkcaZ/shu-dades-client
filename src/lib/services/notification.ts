import type RequestById from '$lib/models/request/requestById';
import type NotificationListResponse from '$lib/models/notification/notificationListResponse';
import type Notif from '$lib/models/notification/notif';
import { SendRequest } from '$lib/helpers/requestHelper';

export async function GetNotifications(): Promise<Notif[]> {
	const response = await SendRequest({}, 'GET', '/notification');

	let notificationsResponse = response as NotificationListResponse;
	return notificationsResponse.notifications;
}

export async function DeleteNotification(id: string): Promise<void> {
	const body: RequestById = {
		id: id
	};

	await SendRequest(body, 'DELETE', `/notification`);
}
