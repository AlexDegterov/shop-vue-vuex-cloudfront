import axios from 'axios';

import { API_PATHS } from '@/constants/api-paths';
import { Order, ORDER_STATUS } from '@/models/order';

const deleteOrderById = (id: string) => {
	console.info(`DELETE deleteOrderById: ${id}`);

	return axios.delete(`${API_PATHS.order}/order/${id}`);
};

const fetchOrderById = (id: string): Promise<Order> => {
	return axios.get(`${API_PATHS.order}/order/${id}`);
};

const fetchOrders = async (): Promise<Order[]> => {
	return axios
		.get(`${API_PATHS.order}/order`)
		.then(res => res.data)
		.catch(e => {
			console.error(e);
		});
};

type ChangeOrderStatusParams = {
	status: ORDER_STATUS;
	comment: string;
};

const changeOrderStatus = (orderId: string, data: ChangeOrderStatusParams) => {
	return axios
		.put(`${API_PATHS.order}/order/${orderId}/status`, data)
		.then(res => res.data);
};

const create = (order: Omit<Order, 'statusHistory'>) => {
	return axios.put(`${API_PATHS.order}/order`, order);
};

export const ordersApi = {
	changeOrderStatus,
	deleteOrderById,
	fetchOrderById,
	fetchOrders,
	create,
};
