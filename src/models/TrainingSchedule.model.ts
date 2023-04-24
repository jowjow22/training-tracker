import { Training, Exercice } from "@prisma/client";

export interface TrainingSchedule {
  id: number;
  training: Training;
  exercices: Exercice[];
  sets: number;
  reps: number;
  week: number;
}
