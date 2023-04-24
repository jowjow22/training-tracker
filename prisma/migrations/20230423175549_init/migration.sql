/*
  Warnings:

  - The primary key for the `Execution` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Execution" (
    "week" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "exerciceId" INTEGER NOT NULL,
    "trainingId" INTEGER NOT NULL,

    PRIMARY KEY ("trainingId", "exerciceId", "week"),
    CONSTRAINT "Execution_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Exercice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Execution_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Execution" ("exerciceId", "reps", "sets", "trainingId", "week", "weight") SELECT "exerciceId", "reps", "sets", "trainingId", "week", "weight" FROM "Execution";
DROP TABLE "Execution";
ALTER TABLE "new_Execution" RENAME TO "Execution";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
