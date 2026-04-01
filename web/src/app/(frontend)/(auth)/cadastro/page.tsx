import CadastroForm from './_components/CadastroForm';

function CadastroPage() {
  return ( 
    <main className="lg:h-screen flex">
      <div className="w-full lg:w-[55%] h-full flex flex-col gap-8 items-center justify-center p-8">
        <CadastroForm />
      </div>

      <div className="bg-blue-600 h-full hidden lg:flex w-[45%] flex-col items-center justify-center py-32">
        <div className="text-white flex flex-col items-center gap-4">
          <h1 className='font-bold text-[64px]'>PiuPiwer</h1>
          <p className='text-xl'>Crie sua conta e comece a piar!</p>
        </div>
      </div>
    </main>
   );
}

export default CadastroPage;