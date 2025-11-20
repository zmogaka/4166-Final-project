/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `portfolios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `watchlists` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "portfolios_name_key";

-- DropIndex
DROP INDEX "watchlists_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_userId_name_key" ON "portfolios"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "watchlists_userId_name_key" ON "watchlists"("userId", "name");
