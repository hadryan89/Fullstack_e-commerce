import { Sneaker, ISneaker } from './model';
import { CreateSneakerDTO, UpdateSneakerDTO, SneakerResponseDTO } from './dto';

export class SneakerService {
  async create(data: CreateSneakerDTO): Promise<SneakerResponseDTO> {
    const sneaker = await Sneaker.create(data);
    return this.toResponseDTO(sneaker);
  }

  async findAll(): Promise<SneakerResponseDTO[]> {
    const sneakers = await Sneaker.find().sort({ createdAt: -1 });
    return sneakers.map(sneaker => this.toResponseDTO(sneaker));
  }

  async findById(id: string): Promise<SneakerResponseDTO | null> {
    const sneaker = await Sneaker.findById(id);
    return sneaker ? this.toResponseDTO(sneaker) : null;
  }

  async findByBrand(brand: string): Promise<SneakerResponseDTO[]> {
    const sneakers = await Sneaker.find({
      brand: { $regex: brand, $options: 'i' }
    });
    return sneakers.map(sneaker => this.toResponseDTO(sneaker));
  }

  async update(id: string, data: UpdateSneakerDTO): Promise<SneakerResponseDTO | null> {
    const sneaker = await Sneaker.findByIdAndUpdate(id, data, { new: true });
    return sneaker ? this.toResponseDTO(sneaker) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await Sneaker.findByIdAndDelete(id);
    return !!result;
  }

  private toResponseDTO(sneaker: ISneaker): SneakerResponseDTO {
    return {
      id: sneaker._id.toString(),
      name: sneaker.name,
      brand: sneaker.brand,
      price: sneaker.price,
      size: sneaker.size,
      color: sneaker.color,
      description: sneaker.description,
      image: sneaker.image,
      stock: sneaker.stock,
      createdAt: sneaker.createdAt
    };
  }
}
