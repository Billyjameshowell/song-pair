-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userId_fkey";

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_UserSelectedSongs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserSelectedSongs_AB_unique" ON "_UserSelectedSongs"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSelectedSongs_B_index" ON "_UserSelectedSongs"("B");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSelectedSongs" ADD CONSTRAINT "_UserSelectedSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSelectedSongs" ADD CONSTRAINT "_UserSelectedSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
