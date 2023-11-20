import type RequestById from '$lib/models/request/requestById';
import type ProductResponse from '$lib/models/product/productResponse';
import type Product from '$lib/models/product/product';
import type SearchRequest from '$lib/models/request/searchRequest';
import type ProductListResponse from '$lib/models/product/productListResponse';
import type CreateProductRequest from '$lib/models/product/createProductRequest';
import { SendRequest } from '$lib/helpers/requestHelper';

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
