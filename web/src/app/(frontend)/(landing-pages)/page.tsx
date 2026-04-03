import { getPiusAction } from "./_actions/piu";
import CarouselExample from "./_components/CarouselExample";
import CriarPiu from "./_components/CriarPiu";

// Como é uma página dentro da pasta (landing-pages), ela é um Server Component por padrão
export default async function LandingPage() {
  // 1. Busca apenas os Pius reais para o Feed dinâmico embaixo
  const piusDoBanco = await getPiusAction();

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* RESTORED HEADER: Removed "Gnomo Alquimista" and added PiuPiwer News */}
      <div className="text-center pt-10 mb-6 px-4">
        <h1 className="text-4xl font-extrabold text-blue-900">PiuPiwer News</h1>
        <p className="text-gray-500 mt-2">Destaques da Poli Júnior</p>
      </div>

      {/* CARROSSEL: Agora com as notícias fixas Soso, Pipoca, Manu */}
      <CarouselExample />

      <div className="max-w-2xl mx-auto px-4 mt-12">
        {/* INPUT: Mantemos o seu Criar Piu */}
        <CriarPiu />

        {/* FEED: Lista de Pius embaixo dinâmico */}
        <section className="mt-10">
           <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-blue-900">Feed Recente</h2>
           
           {piusDoBanco.length === 0 ? (
             <p className="text-gray-400 text-center">Nenhum Piu por aqui ainda...</p>
           ) : (
             piusDoBanco.map((piu) => (
               <div key={piu.id} className="mb-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-900">{piu.user.name}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{piu.text}</p>
               </div>
             ))
           )}
        </section>
      </div>
    </div>
  );
}