/*
  Warnings:

  - You are about to drop the column `rutaImagen` on the `Promocion` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Promocion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoServicio" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL
);
INSERT INTO "new_Promocion" ("descripcion", "id", "tipoServicio") SELECT "descripcion", "id", "tipoServicio" FROM "Promocion";
DROP TABLE "Promocion";
ALTER TABLE "new_Promocion" RENAME TO "Promocion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
