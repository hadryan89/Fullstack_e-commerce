import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sneaker } from '../../types';
import { sneakerService } from '../../services/sneakerService';
import { SneakerCard } from '../../components/SneakerCard';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';

export function Sneakers() {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchBrand, setSearchBrand] = useState('');
  const { isAuthenticated } = useAuth();

  const loadSneakers = async () => {
    try {
      setLoading(true);
      const data = searchBrand
        ? await sneakerService.getByBrand(searchBrand)
        : await sneakerService.getAll();
      setSneakers(data);
    } catch (error) {
      console.error('Erro ao carregar tênis:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSneakers();
  }, []);

  const handleSearch = () => {
    loadSneakers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este tênis?')) return;

    try {
      await sneakerService.delete(id);
      setSneakers(sneakers.filter(s => s.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tênis:', error);
    }
  };

  return (
    <div className="min-h-screen bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">
            Catálogo de <span className="text-accent">Sneakers</span>
          </h1>

          <div className="flex gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
                placeholder="Filtrar por marca..."
                className="bg-secondary border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
              />
              <Button variant="secondary" onClick={handleSearch}>
                Buscar
              </Button>
            </div>

            {isAuthenticated && (
              <Link to="/sneakers/new">
                <Button>Adicionar</Button>
              </Link>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : sneakers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Nenhum tênis encontrado.</p>
            {isAuthenticated && (
              <Link to="/sneakers/new" className="text-accent hover:underline mt-2 inline-block">
                Adicionar o primeiro tênis
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sneakers.map(sneaker => (
              <SneakerCard
                key={sneaker.id}
                sneaker={sneaker}
                onDelete={isAuthenticated ? handleDelete : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
