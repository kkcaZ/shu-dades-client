import type RequestById from '$lib/models/request/requestById';
import type { BaseRequest } from '$lib/models/request/baseRequest';
import { invoke } from '@tauri-apps/api/tauri';
import type { ErrorResponse } from '$lib/models/request/errorResponse';
import type { BaseResponse } from '$lib/models/request/baseResponse';
import type ProductResponse from '$lib/models/product/productResponse';
import type Product from '$lib/models/product/product';
import type SearchRequest from '$lib/models/request/searchRequest';
import type ProductListResponse from '$lib/models/product/productListResponse';
import type CreateProductRequest from '$lib/models/product/createProductRequest';

export async function GetProduct(id: number): Promise<Product> {
	const body: RequestById = {
		id: id
	};

	let request: BaseRequest = {
		body: body,
		type: 'GET',
		route: '/product',
		headers: "{'Content-Type': 'application/json'}"
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}

	let successResponse = parsedResponse as ProductResponse;
	return successResponse.product;
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

	let request: BaseRequest = {
		body: body,
		type: 'GET',
		route: '/product/search',
		headers: "{'Content-Type': 'application/json'}"
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if (
		(parsedResponse as BaseResponse).statusCode != 200 &&
		(parsedResponse as BaseResponse).statusCode != 404
	) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	} else if ((parsedResponse as BaseResponse).statusCode == 404) {
		return [];
	}

	let successResponse = parsedResponse as ProductListResponse;
	return successResponse.products;
}

export async function CreateProduct(product: CreateProductRequest): Promise<void> {
	let request: BaseRequest = {
		body: product,
		type: 'POST',
		route: '/product',
		headers: "{'Content-Type': 'application/json'}"
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}

	return;
}
