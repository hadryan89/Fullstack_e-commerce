import { Request, Response } from 'express';
import { UserService } from './service';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await userService.login(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await userService.delete(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
