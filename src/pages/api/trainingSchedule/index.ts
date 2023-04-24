import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient, Execution } from "@prisma/client";

const prisma = new PrismaClient();

export default async function trainScheduleHandler(
  req: NextApiRequest,
  res: NextApiResponse<Execution | Execution[]>
) {
  const { body, method } = req;
  switch (method) {
    case "GET":
      const trainingSchedule = await prisma.execution.findMany({
        include: {
          exercice: true,
        },
      });
      res.status(200).json(trainingSchedule);
      break;
    case "POST":
      const createTrainingSchedule = await prisma.execution.create({
        data: {
          sets: body.sets,
          reps: body.reps,
          week: body.week,
          weight: body.weight,
          exerciceId: body.exerciceId,
          trainingId: body.trainingId,
        },
      });

      res.status(201).json(createTrainingSchedule);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
