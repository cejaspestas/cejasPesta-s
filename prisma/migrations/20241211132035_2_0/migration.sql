-- CreateTable
CREATE TABLE "datosPagina" (
    "idhome" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ruta" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Imagen_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Servicio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagenRuta" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Servicio_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "videoRuta" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Video_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rutaImagen" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoServicio" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Cliente_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Precio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoServicio" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Precio_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Promocion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rutaImagen" TEXT NOT NULL,
    "tipoServicio" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Promocion_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rutaImagen" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "datosPaginaId" INTEGER NOT NULL,
    CONSTRAINT "Equipo_datosPaginaId_fkey" FOREIGN KEY ("datosPaginaId") REFERENCES "datosPagina" ("idhome") ON DELETE RESTRICT ON UPDATE CASCADE
);
