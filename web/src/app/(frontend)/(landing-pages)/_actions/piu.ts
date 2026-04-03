"use server"

import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Ação para criar um Piu
export async function createPiuAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) return;

  const text = formData.get("piu-text") as string;

  if (!text || text.length > 140) return;

  await prisma.piu.create({
    data: {
      text: text,
      userId: session.user.id,
    },
  });

  revalidatePath("/");
}

// Busca os Pius para o Feed (embaixo)
export async function getPiusAction() {
  try {
    return await prisma.piu.findMany({
      include: {
        user: true, 
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar pius:", error);
    return [];
  }
}

// Busca as Matérias para o Carrossel (as notícias bonitas)
export async function getMateriasAction() {
  try {
    return await prisma.materia.findMany();
  } catch (error) {
    console.error("Erro ao buscar matérias:", error);
    return [];
  }
}