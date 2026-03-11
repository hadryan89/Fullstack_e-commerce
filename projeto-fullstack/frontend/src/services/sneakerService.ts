import api from '../api/api';
import { Sneaker } from '../types';

interface CreateSneakerData {
  name: string;
  brand: string;
  price: number;
  size: number[];
  color: string;
  description: string;
  image: string;
  stock: number;
}

export const sneakerService = {
  async getAll(): Promise<Sneaker[]> {
    const response = await api.get('/sneakers');
    return response.data;
  },

  async getById(id: string): Promise<Sneaker> {
    const response = await api.get(`/sneakers/${id}`);
    return response.data;
  },

  async getByBrand(brand: string): Promise<Sneaker[]> {
    const response = await api.get(`/sneakers?brand=${brand}`);
    return response.data;
  },

  async create(data: CreateSneakerData): Promise<Sneaker> {
    const response = await api.post('/sneakers', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateSneakerData>): Promise<Sneaker> {
    const response = await api.put(`/sneakers/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/sneakers/${id}`);
  }
};
