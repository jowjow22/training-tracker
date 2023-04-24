/*
  Warnings:

  - You are about to drop the column `reps` on the `TrainingOnExercices` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `TrainingOnExercices` table. All the data in the column will be lost.
  - Added the required column `executionId` to the `Exercice` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Execution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "executionId" INTEGER NOT NULL,
    CONSTRAINT "Exercice_executionId_fkey" FOREIGN KEY ("executionId") REFERENCES "Execution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Exercice" ("id", "name") SELECT "id", "name" FROM "Exercice";
DROP TABLE "Exercice";
ALTER TABLE "new_Exercice" RENAME TO "Exercice";
CREATE TABLE "new_TrainingOnExercices" (
    "exerciceId" INTEGER NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,

    PRIMARY KEY ("trainingId", "exerciceId"),
    CONSTRAINT "TrainingOnExercices_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Exercice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TrainingOnExercices_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TrainingOnExercices" ("exerciceId", "trainingId", "week") SELECT "exerciceId", "trainingId", "week" FROM "TrainingOnExercices";
DROP TABLE "TrainingOnExercices";
ALTER TABLE "new_TrainingOnExercices" RENAME TO "TrainingOnExercices";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
