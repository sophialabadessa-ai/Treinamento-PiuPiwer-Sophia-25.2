"use server"

import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

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