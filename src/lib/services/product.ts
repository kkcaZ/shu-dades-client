import type RequestById from '$lib/models/request/requestById';
import type ProductResponse from '$lib/models/product/productResponse';
import type Product from '$lib/models/product/product';
import type SearchRequest from '$lib/models/request/searchRequest';
import type ProductListResponse from '$lib/models/product/productListResponse';
import type CreateProductRequest from '$lib/models/product/createProductRequest';
import { SendRequest } from '$lib/helpers/requestHelper';
import type ProductSubscriptionRequest from '$lib/models/product/productSubscriptionRequest';
import type ProductSubscription from '$lib/models/product/productSubscription';
import type ProductSubscriptionListResponse from '$lib/models/product/productSubscriptionListResponse';

export async function GetProduct(id: string): Promise<Product> {
	const body: RequestById = {
		id: id
	};

	const response = await SendRequest(body, 'GET', '/product');
	let productResponse = response as ProductResponse;
	return productResponse.product;
}

export async function SearchProducts(
	pageNumber: number,
	pageSize: number,
	sortBy: string,
	order: string
): Promise<Product[]> {
	const body: SearchRequest = {
		pageNumber: pageNumber,
		pageSize: pageSize,
		sortBy: sortBy,
		order: order
	};

	const response = await SendRequest(body, 'GET', '/product/search');
	let productListResponse = response as ProductListResponse;
	return productListResponse.products;
}

export async function CreateProduct(product: CreateProductRequest): Promise<void> {
	await SendRequest(product, 'POST', '/product');
}

export async function DeleteProduct(id: string): Promise<void> {
	const body: RequestById = {
		id: id
	};

	await SendRequest(body, 'DELETE', '/product');
}

export async function UpdateProduct(product: Product) {
	await SendRequest(product, 'PUT', '/product');
}

export async function SubscribeToProduct(productId: string, subType: string) {
	const body: ProductSubscriptionRequest = {
		productId: productId,
		subType: subType
	};

	await SendRequest(body, 'POST', '/product/subscribe');
}

export async function UnsubscribeFromProduct(productId: string, subType: string) {
	const body: ProductSubscriptionRequest = {
		productId: productId,
		subType: subType
	};

	await SendRequest(body, 'POST', '/product/unsubscribe');
}

export async function GetProductSubscriptions(): Promise<ProductSubscription[]> {
	const response = await SendRequest({}, 'GET', '/product/subscriptions');
	let productListResponse = response as ProductSubscriptionListResponse;
	return productListResponse.subscriptions;
}
