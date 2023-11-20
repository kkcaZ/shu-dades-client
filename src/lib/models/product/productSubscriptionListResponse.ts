import type { BaseResponse } from '$lib/models/request/baseResponse';
import type ProductSubscription from '$lib/models/product/productSubscription';

export default interface ProductSubscriptionListResponse extends BaseResponse {
	subscriptions: ProductSubscription[];
}
