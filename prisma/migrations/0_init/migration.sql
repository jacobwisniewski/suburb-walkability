-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA "public";

-- CreateTable
CREATE TABLE "isochrone" (
    "id" SERIAL NOT NULL,
    "transportType" VARCHAR NOT NULL,
    "method" VARCHAR NOT NULL,
    "value" INTEGER NOT NULL,
    "geom" geometry NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "PK_d113eacff60341fb0b5a78b99b9" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "geom" geometry NOT NULL,

    CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_with_isochrone" (
    "id" SERIAL NOT NULL,
    "isochroneId" INTEGER,

    CONSTRAINT "PK_03c2727c633f935e3430af23c90" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ptv_station" (
    "stopId" VARCHAR NOT NULL,
    "stopName" VARCHAR NOT NULL,
    "lineName" VARCHAR NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "PK_4190e8461dafeeb904af92c999b" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sa1" (
    "code" VARCHAR NOT NULL,
    "changeFlag" VARCHAR NOT NULL,
    "changeLabel" VARCHAR NOT NULL,
    "sa2Code" VARCHAR NOT NULL,
    "sa2Name" VARCHAR NOT NULL,
    "sa3Code" VARCHAR NOT NULL,
    "sa3Name" VARCHAR NOT NULL,
    "sa4Code" VARCHAR NOT NULL,
    "sa4Name" VARCHAR NOT NULL,
    "gccCode" VARCHAR NOT NULL,
    "gccName" VARCHAR NOT NULL,
    "stateCode" VARCHAR NOT NULL,
    "stateName" VARCHAR NOT NULL,
    "countryCode" VARCHAR NOT NULL,
    "countryName" VARCHAR NOT NULL,
    "areaSqKm" DOUBLE PRECISION,
    "lociUri" VARCHAR NOT NULL,
    "geometry" geometry NOT NULL,

    CONSTRAINT "PK_4ca1da08c5658c4497ce92cfe8c" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "sal" (
    "code" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "stateCode" VARCHAR NOT NULL,
    "stateName" VARCHAR NOT NULL,
    "countryCode" VARCHAR NOT NULL,
    "countryName" VARCHAR NOT NULL,
    "areaSqKm" DOUBLE PRECISION NOT NULL,
    "lociUri" VARCHAR NOT NULL,
    "shapeLength" DOUBLE PRECISION NOT NULL,
    "shapeArea" DOUBLE PRECISION NOT NULL,
    "geometry" geometry NOT NULL,

    CONSTRAINT "PK_0c749f9af14b005fe392e5528b3" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "woolworths_store" (
    "name" VARCHAR NOT NULL,
    "streetName" VARCHAR NOT NULL,
    "town" VARCHAR NOT NULL,
    "state" VARCHAR NOT NULL,
    "postcode" VARCHAR NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "PK_183ed4350c426220f1635350440" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "location_with_isochrone" ADD CONSTRAINT "FK_3f08538140207107ae0ee855e07" FOREIGN KEY ("isochroneId") REFERENCES "isochrone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ptv_station" ADD CONSTRAINT "FK_4190e8461dafeeb904af92c999b" FOREIGN KEY ("id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "woolworths_store" ADD CONSTRAINT "FK_183ed4350c426220f1635350440" FOREIGN KEY ("id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

