import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sneakerService } from '../../services/sneakerService';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

export function EditSneaker() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadSneaker = async () => {
      if (!id) return;

      try {
        const sneaker = await sneakerService.getById(id);
        setName(sneaker.name);
        setBrand(sneaker.brand);
        setPrice(sneaker.price.toString());
        setSizes(sneaker.size.join(', '));
        setColor(sneaker.color);
        setDescription(sneaker.description);
        setImage(sneaker.image);
        setStock(sneaker.stock.toString());
      } catch (err) {
        setError('Erro ao carregar dados do tênis');
      } finally {
        setLoadingData(false);
      }
    };

    loadSneaker();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setError('');
    setLoading(true);

    try {
      const sizeArray = sizes.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));

      await sneakerService.update(id, {
        name,
        brand,
        price: parseFloat(price),
        size: sizeArray,
        color,
        description,
        image,
        stock: parseInt(stock)
      });

      navigate('/sneakers');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao atualizar tênis');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <h1 className="text-3xl font-bold text-white mb-8">
            Editar <span className="text-accent">Sneaker</span>
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Marca</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Estoque</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Tamanhos</label>
                <input
                  type="text"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Cor</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-400 mb-2">URL da Imagem</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-400 mb-2">Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none resize-none"
                rows={4}
                required
              />
            </div>

            <div className="flex gap-4 mt-6">
              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                fullWidth
                onClick={() => navigate('/sneakers')}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
