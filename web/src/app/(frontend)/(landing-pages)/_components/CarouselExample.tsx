"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// LISTA FIXA DAS NOTÍCIAS REAIS QUE VOCÊ MANDOU
const news = [
  {
    title: "soso careca largou a faculdade?",
    description: "A maior notícia do momento, sera que ela vai largar tudo e morar com o paiva?",
    image: "/noticias/soso.jpeg",
  },
  {
    title: "Dicas de culinária",
    description: "venha conferir a melhor receita de pipoca de microondas do mundo!",
    image: "/noticias/pipoca.jpeg",
  },
  {
    title: "meninas boudadas arrasando!",
    description: "nova equipe de hunters reclama de abusos piscologicos da LO manu",
    image: "/noticias/manu.jpeg",
  }
]

export default function CarouselExample() {
  // Removemos a prop 'data' para fixar as notícias aqui dentro de novo.

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 py-6 px-4">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative group"
      >
        <CarouselContent className="-ml-4">
          {news.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              {/* === ESTA É A ESTRUTURA BONITINHA QUE RECUPERAMOS DO ANTES === */}
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                
                {/* Holder da Imagem com o placeholder original */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Conteúdo do Card com a formatação original */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-blue-600 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              {/* === FIM DA ESTRUTURA BONITINHA === */}
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Botões de navegação */}
        <CarouselPrevious className="hidden group-hover:flex -left-4 bg-white text-blue-600 border-gray-200 shadow-lg" />
        <CarouselNext className="hidden group-hover:flex -right-4 bg-white text-blue-600 border-gray-200 shadow-lg" />
      </Carousel>
    </div>
  )
}