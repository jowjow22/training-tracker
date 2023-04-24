import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient, Exercice } from "@prisma/client";

const prisma = new PrismaClient();

export default async function exerciceHandler(
  req: NextApiRequest,
  res: NextApiResponse<Exercice[] | Exercice>
) {
  const { query, body, method } = req;
  const id = parseInt(query.id as string, 10);

  switch (method) {
    case "GET":
      const exercices = await prisma.exercice.findMany();

      res.status(200).json(exercices);
      break;
    case "POST":
      const createExercice = await prisma.exercice.create({
        data: {
          name: body.name,
        },
      });

      res.status(201).json(createExercice);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
