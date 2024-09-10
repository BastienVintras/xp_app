/*
  Warnings:

  - You are about to drop the `PossibleAnswer` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionText` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Question` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Response` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `possibleAnswerId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `textAnswer` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Response` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Response` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `questionId` on the `Response` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PossibleAnswer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "Choice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL DEFAULT 'Default Question'
);
INSERT INTO "new_Question" ("id") SELECT "id" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questionId" INTEGER NOT NULL,
    "selectedAnswer" TEXT NOT NULL DEFAULT 'Default Answer',
    CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Response" ("id", "questionId") SELECT "id", "questionId" FROM "Response";
DROP TABLE "Response";
ALTER TABLE "new_Response" RENAME TO "Response";
CREATE TABLE "new_Subscription" (
    "stripeSubscriptionId" TEXT NOT NULL PRIMARY KEY,
    "interval" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "currentPeriodStart" INTEGER NOT NULL,
    "currentPeriodEnd" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Subscription" ("createdAt", "currentPeriodEnd", "currentPeriodStart", "interval", "planId", "status", "stripeSubscriptionId", "updatedAt", "userId") SELECT "createdAt", "currentPeriodEnd", "currentPeriodStart", "interval", "planId", "status", "stripeSubscriptionId", "updatedAt", "userId" FROM "Subscription";
DROP TABLE "Subscription";
ALTER TABLE "new_Subscription" RENAME TO "Subscription";
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
