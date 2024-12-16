/*
  Warnings:

  - Added the required column `ImagenRuta` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "ImagenRuta" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "caracteristicas" TEXT NOT NULL,
    "priceProduct" TEXT NOT NULL,
    "cantidadBoletonumeros" INTEGER NOT NULL,
    "priceBoleto" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Product" ("cantidadBoletonumeros", "caracteristicas", "createdAt", "description", "id", "priceBoleto", "priceProduct", "title") SELECT "cantidadBoletonumeros", "caracteristicas", "createdAt", "description", "id", "priceBoleto", "priceProduct", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
