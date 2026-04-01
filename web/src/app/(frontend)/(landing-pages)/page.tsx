import LandingPagesNav from "@/components/base/nav/InitialNav";
import { headers } from "next/headers";
import { auth } from "@/auth";
import CarouselExample from "./_components/CarouselExample";
import CriarPiu from "./_components/CriarPiu";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  const isLogged = !!session?.user;

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingPagesNav isLogged={isLogged} />
      
      <main className="max-w-2xl mx-auto pt-24 px-4 pb-20">
        <header className="mb-8 text-center text-blue-600">
          <h1 className="font-bold text-4xl">PiuPiwer</h1>
        </header>

        <section className="mb-8">
          <CarouselExample />
        </section>

        {isLogged ? (
          <CriarPiu />
        ) : (
          <div className="bg-blue-100 border border-blue-200 p-6 rounded-xl text-center mb-8">
            <p className="text-blue-800 font-medium">
              Faça login para começar a piar!
            </p>
          </div>
        )}

        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-gray-500 text-sm uppercase px-2">Pius recentes</h2>
          <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center text-gray-400 italic">
            Ninguém piou nada ainda... seja o primeiro!
          </div>
        </section>
      </main>
    </div>
  );
}