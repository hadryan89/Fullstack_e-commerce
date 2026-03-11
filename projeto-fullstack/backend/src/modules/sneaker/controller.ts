import { Request, Response } from 'express';
import { SneakerService } from './service';

const sneakerService = new SneakerService();

export class SneakerController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const sneaker = await sneakerService.create(req.body);
      res.status(201).json(sneaker);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { brand } = req.query;
      let sneakers;

      if (brand && typeof brand === 'string') {
        sneakers = await sneakerService.findByBrand(brand);
      } else {
        sneakers = await sneakerService.findAll();
      }

      res.json(sneakers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const sneaker = await sneakerService.findById(req.params.id);
      if (!sneaker) {
        res.status(404).json({ error: 'Tênis não encontrado' });
        return;
      }
      res.json(sneaker);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const sneaker = await sneakerService.update(req.params.id, req.body);
      if (!sneaker) {
        res.status(404).json({ error: 'Tênis não encontrado' });
        return;
      }
      res.json(sneaker);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await sneakerService.delete(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: 'Tênis não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
