import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient, Execution, Exercice, Prisma } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

type TrainingSchedule = {
  title: string;
  exercices: {
    exercice: {
      name: string;
    };
  }[];
}[];

type Schedule = {
  sets: number;
  reps: number;
  week: number;
  weight: number;
  training: {
    title: string;
  };
  exercice: {
    name: string;
  };
};

export default async function trainScheduleHandler(
  req: NextApiRequest,
  res: NextApiResponse<Execution | Schedule[]>
) {
  const { query, body, method } = req;
  const id = parseInt(query.trainingId as string, 10);

  switch (method) {
    case "GET":
      const trainingSchedule = await prisma.execution.findMany({
        where: {
          trainingId: id,
        },
        select: {
          training: {
            select: {
              title: true,
            },
          },
          sets: true,
          reps: true,
          week: true,
          weight: true,
          exercice: {
            select: {
              name: true,
            },
          },
        },
      });
      res.status(200).json(trainingSchedule);
      break;
    case "PUT":
      await prisma.execution.updateMany({
        where: {
          trainingId: id,
        },
        data: {
          sets: body.sets,
          reps: body.reps,
          week: body.week,
          exerciceId: body.exerciceId,
          trainingId: body.trainingId,
        },
      });

      const updatedTrainingSchedule = await prisma.execution.findMany({
        where: {
          trainingId: id,
        },
        include: {
          exercice: true,
        },
      });
      //res.status(200).json(updatedTrainingSchedule);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
