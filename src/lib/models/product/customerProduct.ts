import type Product from '$lib/models/product/product';

export default interface CustomerProduct extends Product {
	dailySubscription: boolean;
	hourlySubscription: boolean;
}
