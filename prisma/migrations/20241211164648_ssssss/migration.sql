/*
  Warnings:

  - You are about to drop the `datosPagina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `datosPaginaId` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `datosPaginaId` on the `Equipo` table. All the data in the column will be lost.
  - You are about to drop the column `datosPaginaId` on the `Imagen` table. All the data in the column will be lost.
  - You are about to drop the column `datosPaginaId` on the `Precio` table. All the data in the column will be lost.
  - You are about to drop the column `datosPaginaId` on the `Promocion` table. All the data in the column will be lost.
  - You are about to drop the column `datosPaginaId` on the `Servicio` table. All the data in the column will be lost.
  - You are about to drop the column `datosPaginaId` on the `Video` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "datosPagina";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rutaImagen" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoServicio" TEXT NOT NULL
);
INSERT INTO "new_Cliente" ("id", "nombre", "rutaImagen", "tipoServicio") SELECT "id", "nombre", "rutaImagen", "tipoServicio" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE TABLE "new_Equipo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rutaImagen" TEXT NOT NULL,
    "cargo" TEXT NOT NULL
);
INSERT INTO "new_Equipo" ("cargo", "id", "rutaImagen") SELECT "cargo", "id", "rutaImagen" FROM "Equipo";
DROP TABLE "Equipo";
ALTER TABLE "new_Equipo" RENAME TO "Equipo";
CREATE TABLE "new_Imagen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ruta" TEXT NOT NULL
);
INSERT INTO "new_Imagen" ("id", "ruta") SELECT "id", "ruta" FROM "Imagen";
DROP TABLE "Imagen";
ALTER TABLE "new_Imagen" RENAME TO "Imagen";
CREATE TABLE "new_Precio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoServicio" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" REAL NOT NULL
);
INSERT INTO "new_Precio" ("descripcion", "id", "precio", "tipoServicio") SELECT "descripcion", "id", "precio", "tipoServicio" FROM "Precio";
DROP TABLE "Precio";
ALTER TABLE "new_Precio" RENAME TO "Precio";
CREATE TABLE "new_Promocion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rutaImagen" TEXT NOT NULL,
    "tipoServicio" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL
);
INSERT INTO "new_Promocion" ("descripcion", "id", "rutaImagen", "tipoServicio") SELECT "descripcion", "id", "rutaImagen", "tipoServicio" FROM "Promocion";
DROP TABLE "Promocion";
ALTER TABLE "new_Promocion" RENAME TO "Promocion";
CREATE TABLE "new_Servicio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagenRuta" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL
);
INSERT INTO "new_Servicio" ("descripcion", "id", "imagenRuta", "titulo") SELECT "descripcion", "id", "imagenRuta", "titulo" FROM "Servicio";
DROP TABLE "Servicio";
ALTER TABLE "new_Servicio" RENAME TO "Servicio";
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "videoRuta" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL
);
INSERT INTO "new_Video" ("descripcion", "id", "titulo", "videoRuta") SELECT "descripcion", "id", "titulo", "videoRuta" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
