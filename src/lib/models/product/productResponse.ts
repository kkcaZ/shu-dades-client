import type { BaseResponse } from '$lib/models/request/baseResponse';
import type Product from '$lib/models/product/product';

export default interface ProductResponse extends BaseResponse {
	product: Product;
}
