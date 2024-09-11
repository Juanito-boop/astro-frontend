import axios from 'axios';

const dominio = "https://bd30m61r-8088.use2.devtunnels.ms/";

function getAuthHeaders() {
	return {
		'Authorization': `Bearer ${localStorage.getItem('token')}`,
	};
}

async function request<T>(method: 'get' | 'post', endpoint: string, data?: Record<string, any> | Record<string, any>[]): Promise<T> {
	try {
		const response = await axios({
			method,
			url: `${dominio + endpoint}`,
			headers: getAuthHeaders(),
			data,
		});

		return response.data as T;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export function getData<T>(endpoint: string, parameters?: Record<string, any>): Promise<T[]> {
	return request<T[]>('get', endpoint, parameters);
}

export function postData<T>(endpoint: string, body: Record<string, any>): Promise<T> {
	return request<T>('post', endpoint, body);
}

export function postManyData<T>(endpoint: string, body: Record<string, any>[]): Promise<T> {
	return request<T>('post', endpoint, body);
}