import { Link } from 'react-router-dom';
import { Sneaker } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface SneakerCardProps {
  sneaker: Sneaker;
  onDelete?: (id: string) => void;
}

export function SneakerCard({ sneaker, onDelete }: SneakerCardProps) {
  const { isAuthenticated } = useAuth();

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gray-700 flex items-center justify-center overflow-hidden">
        <img
          src={sneaker.image}
          alt={sneaker.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Sneaker';
          }}
        />
      </div>

      <div className="p-4">
        <span className="text-accent text-sm font-medium">{sneaker.brand}</span>
        <h3 className="text-white text-lg font-semibold mt-1">{sneaker.name}</h3>
        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{sneaker.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-white text-xl font-bold">{formatPrice(sneaker.price)}</span>
          <span className={`text-sm ${sneaker.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {sneaker.stock > 0 ? `${sneaker.stock} em estoque` : 'Esgotado'}
          </span>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            to={`/sneakers/${sneaker.id}`}
            className="flex-1 text-center bg-accent text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Ver detalhes
          </Link>

          {isAuthenticated && onDelete && (
            <>
              <Link
                to={`/sneakers/edit/${sneaker.id}`}
                className="px-3 py-2 bg-secondary border border-gray-600 text-white rounded-lg hover:bg-primary transition"
              >
                Editar
              </Link>
              <button
                onClick={() => onDelete(sneaker.id)}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
