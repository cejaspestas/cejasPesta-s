/*
  Warnings:

  - Added the required column `datosPaginaId` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datosPaginaId` to the `Equipo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datosPaginaId` to the `Imagen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datosPaginaId` to the `Precio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datosPaginaId` to the `Promocion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datosPaginaId` to the `Servicio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datosPaginaId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rutaImagen" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoServicio" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Cliente_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cliente" ("id", "nombre", "rutaImagen", "tipoServicio") SELECT "id", "nombre", "rutaImagen", "tipoServicio" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE TABLE "new_Equipo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rutaImagen" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Equipo_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipo" ("cargo", "id", "rutaImagen") SELECT "cargo", "id", "rutaImagen" FROM "Equipo";
DROP TABLE "Equipo";
ALTER TABLE "new_Equipo" RENAME TO "Equipo";
CREATE TABLE "new_Imagen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ruta" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Imagen_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Imagen" ("id", "ruta") SELECT "id", "ruta" FROM "Imagen";
DROP TABLE "Imagen";
ALTER TABLE "new_Imagen" RENAME TO "Imagen";
CREATE TABLE "new_Precio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoServicio" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Precio_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Precio" ("descripcion", "id", "precio", "tipoServicio") SELECT "descripcion", "id", "precio", "tipoServicio" FROM "Precio";
DROP TABLE "Precio";
ALTER TABLE "new_Precio" RENAME TO "Precio";
CREATE TABLE "new_Promocion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rutaImagen" TEXT NOT NULL,
    "tipoServicio" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Promocion_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Promocion" ("descripcion", "id", "rutaImagen", "tipoServicio") SELECT "descripcion", "id", "rutaImagen", "tipoServicio" FROM "Promocion";
DROP TABLE "Promocion";
ALTER TABLE "new_Promocion" RENAME TO "Promocion";
CREATE TABLE "new_Servicio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagenRuta" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Servicio_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Servicio" ("descripcion", "id", "imagenRuta", "titulo") SELECT "descripcion", "id", "imagenRuta", "titulo" FROM "Servicio";
DROP TABLE "Servicio";
ALTER TABLE "new_Servicio" RENAME TO "Servicio";
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "videoRuta" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Video_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("descripcion", "id", "titulo", "videoRuta") SELECT "descripcion", "id", "titulo", "videoRuta" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
