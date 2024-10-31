import { DataSource } from "typeorm";
import { WoolworthsStore } from "./entity/WoolworthsStore";
import { Location } from "./entity/Location";
import { Isochrone } from "./entity/Isochrone";
import { PtvStation } from "./entity/PtvStation";
import { SAL } from "./entity/SAL";
import { SA1 } from "./entity/SA1";
import { LocationType } from "./entity/LocationType";
import { Coles } from "./entity/Coles";
import { Aldi } from "./entity/Aldi";
import { PropertyPrice } from "./entity/PropertyPrice";
import dotenv from "dotenv";
import { SA1SALMapping } from "@/entity/SA1SALMapping";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "", 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [
    WoolworthsStore,
    Location,
    Isochrone,
    PtvStation,
    SAL,
    SA1,
    LocationType,
    Coles,
    Aldi,
    PropertyPrice,
    SA1SALMapping,
  ],
  // migrations: ["src/migration/*{.ts,.js}"],
});
