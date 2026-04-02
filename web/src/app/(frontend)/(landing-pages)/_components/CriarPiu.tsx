"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createPiuAction } from "../_actions/piu";

export default function CriarPiu() {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublicar = async () => {
    if (!texto.trim()) {
      toast.error("Escreva algo antes de piar!");
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("piu-text", texto);

      await createPiuAction(formData);

      toast.success("Piu publicado com sucesso!");
      setTexto("");
    } catch (error) {
      toast.error("Erro ao publicar o Piu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-8">
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="O que está acontecendo?"
        className="w-full resize-none border-none focus:ring-0 text-xl text-black placeholder-gray-400 min-h-[100px] outline-none"
        maxLength={140}
      />
      
      <div className="flex justify-between items-center border-t pt-3 mt-2">
        <span className={`text-sm ${texto.length >= 140 ? "text-red-500 font-bold" : "text-gray-400"}`}>
          {texto.length}/140
        </span>
        
        <button
          onClick={handlePublicar}
          disabled={loading || !texto.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          {loading ? "Piando..." : "Piar"}
        </button>
      </div>
    </div>
  );
}