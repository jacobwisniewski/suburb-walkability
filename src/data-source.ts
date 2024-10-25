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

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "jacob.wisniewski",
  password: "",
  database: "geo_db",
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
  ],
  // migrations: ["src/migration/*{.ts,.js}"],
});
