import "reflect-metadata";
import * as fs from "fs";
import { SA1 } from "../src/entity/SA1";
import { SAL } from "../src/entity/SAL";
import { AppDataSource } from "../src/data-source";

const sa1Mapping = {
  SA1_CODE21: "code",
  CHG_FLAG21: "changeFlag",
  CHG_LBL21: "changeLabel",
  SA2_CODE21: "sa2Code",
  SA2_NAME21: "sa2Name",
  SA3_CODE21: "sa3Code",
  SA3_NAME21: "sa3Name",
  SA4_CODE21: "sa4Code",
  SA4_NAME21: "sa4Name",
  GCC_CODE21: "gccCode",
  GCC_NAME21: "gccName",
  STE_CODE21: "stateCode",
  STE_NAME21: "stateName",
  AUS_CODE21: "countryCode",
  AUS_NAME21: "countryName",
  AREASQKM21: "areaSqKm",
  LOCI_URI21: "lociUri",
};

const salMapping = {
  SAL_CODE21: "code",
  SAL_NAME21: "name",
  STE_CODE21: "stateCode",
  STE_NAME21: "stateName",
  AUS_CODE21: "countryCode",
  AUS_NAME21: "countryName",
  AREASQKM21: "areaSqKm",
  LOCI_URI21: "lociUri",
  SHAPE_Leng: "shapeLength",
  SHAPE_Area: "shapeArea",
};

async function importGeoJson(filePath: string, entity: any, mapping: any) {
  await AppDataSource.initialize();
  const repository = AppDataSource.getRepository(entity);

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const features = data.features;

  for (const feature of features) {
    const properties = feature.properties;
    const geometry = feature.geometry;

    const record = repository.create({
      ...Object.keys(mapping).reduce((acc, key) => {
        acc[mapping[key]] = properties[key];
        return acc;
      }, {}),
      geometry,
    });

    try {
      await repository.save(record);
    } catch (error) {
      console.error(error);
      console.log(record);
    }
  }

  await AppDataSource.destroy();
}

importGeoJson("./datasets/sa1_geojson.geojson", SA1, sa1Mapping);
importGeoJson("./datasets/sal_geojson.geojson", SAL, salMapping);
