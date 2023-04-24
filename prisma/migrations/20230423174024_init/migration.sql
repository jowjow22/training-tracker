/*
  Warnings:

  - You are about to drop the `TrainingOnExercices` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Execution` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Execution` table. All the data in the column will be lost.
  - You are about to drop the column `executionId` on the `Exercice` table. All the data in the column will be lost.
  - Added the required column `exerciceId` to the `Execution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingId` to the `Execution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `week` to the `Execution` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TrainingOnExercices";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Execution" (
    "week" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "exerciceId" INTEGER NOT NULL,
    "trainingId" INTEGER NOT NULL,

    PRIMARY KEY ("trainingId", "exerciceId"),
    CONSTRAINT "Execution_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Exercice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Execution_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Execution" ("reps", "sets", "weight") SELECT "reps", "sets", "weight" FROM "Execution";
DROP TABLE "Execution";
ALTER TABLE "new_Execution" RENAME TO "Execution";
CREATE TABLE "new_Exercice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Exercice" ("id", "name") SELECT "id", "name" FROM "Exercice";
DROP TABLE "Exercice";
ALTER TABLE "new_Exercice" RENAME TO "Exercice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
