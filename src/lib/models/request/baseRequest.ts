export interface BaseRequest {
	body: any;
	headers: Headers;
	route: string;
	type: string;
}

type Headers = {
	[key: string]: string;
};
