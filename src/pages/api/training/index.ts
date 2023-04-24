import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient, Training } from "@prisma/client";

const prisma = new PrismaClient();

export default async function trainingsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Training[] | Training>
) {
  const { query, body, method } = req;
  const id = parseInt(query.id as string, 10);
  const name = query.name as string;

  switch (method) {
    case "GET":
      const trainings = await prisma.training.findMany();

      res.status(200).json(trainings);
      break;
    case "POST":
      const createTraining = await prisma.training.create({
        data: {
          title: body.title,
        },
      });
      res.status(201).json(createTraining);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
