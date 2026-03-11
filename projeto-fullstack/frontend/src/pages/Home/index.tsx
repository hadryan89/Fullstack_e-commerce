import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';

export function Home() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Os melhores <span className="text-accent">tênis</span> você encontra aqui
            </h1>
            <p className="text-gray-400 text-lg mt-6">
              Descubra nossa coleção exclusiva de sneakers das melhores marcas.
              Qualidade, estilo e conforto em um só lugar.
            </p>
            <div className="flex gap-4 mt-8">
              <Link to="/sneakers">
                <Button>Ver Catálogo</Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary">Criar Conta</Button>
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-accent rounded-full opacity-20 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600"
                alt="Sneaker"
                className="relative z-10 rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Por que escolher a <span className="text-accent">VARD Store</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Produtos Originais</h3>
              <p className="text-gray-400">Todos os produtos são 100% originais e com garantia.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Entrega Rápida</h3>
              <p className="text-gray-400">Entregamos em todo o Brasil com agilidade.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Pagamento Seguro</h3>
              <p className="text-gray-400">Diversas formas de pagamento com total segurança.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Pronto para encontrar seu <span className="text-accent">sneaker perfeito</span>?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Navegue pelo nosso catálogo e encontre o tênis ideal para você.
        </p>
        <Link to="/sneakers">
          <Button>Explorar Catálogo</Button>
        </Link>
      </section>
    </div>
  );
}
