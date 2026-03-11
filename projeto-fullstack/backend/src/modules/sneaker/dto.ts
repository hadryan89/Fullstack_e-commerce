export interface CreateSneakerDTO {
  name: string;
  brand: string;
  price: number;
  size: number[];
  color: string;
  description: string;
  image: string;
  stock: number;
}

export interface UpdateSneakerDTO {
  name?: string;
  brand?: string;
  price?: number;
  size?: number[];
  color?: string;
  description?: string;
  image?: string;
  stock?: number;
}

export interface SneakerResponseDTO {
  id: string;
  name: string;
  brand: string;
  price: number;
  size: number[];
  color: string;
  description: string;
  image: string;
  stock: number;
  createdAt: Date;
}
