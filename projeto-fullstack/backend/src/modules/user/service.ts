import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from './model';
import { CreateUserDTO, LoginDTO, UserResponseDTO } from './dto';

export class UserService {
  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      ...data,
      password: hashedPassword
    });

    return this.toResponseDTO(user);
  }

  async login(data: LoginDTO): Promise<{ user: UserResponseDTO; token: string }> {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    return {
      user: this.toResponseDTO(user),
      token
    };
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const users = await User.find();
    return users.map(user => this.toResponseDTO(user));
  }

  async findById(id: string): Promise<UserResponseDTO | null> {
    const user = await User.findById(id);
    return user ? this.toResponseDTO(user) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return !!result;
  }

  private toResponseDTO(user: IUser): UserResponseDTO {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
  }
}
