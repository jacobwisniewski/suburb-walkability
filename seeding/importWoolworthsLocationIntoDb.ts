import { AppDataSource } from "../src/data-source";
import { LocationType } from "../src/entity/LocationType";
import { Location } from "../src/entity/Location";
import * as fs from "fs";
import { WoolworthsStore } from "../src/entity/WoolworthsStore";
import { parse } from "csv-parse/sync";
import { WoolworthsStoreEnriched } from "../datasets/types/woolworthsStore";

async function importColesLocations() {
  await AppDataSource.initialize();
  const manager = AppDataSource.manager;

  let groceryStoreType = await manager.findOne(LocationType, {
    where: { name: "grocery_store" },
  });
  if (!groceryStoreType) {
    groceryStoreType = manager.create(LocationType, { name: "grocery_store" });
    await manager.save(groceryStoreType);
  }

  const csvData = fs.readFileSync(
    "datasets/woolworths-victoria-enriched.csv",
    "utf-8",
  );
  const results: WoolworthsStoreEnriched[] = parse(csvData, { columns: true });

  for (const {
    site_name,
    street_name,
    town,
    postcode,
    state,
    latitude,
    longitude,
  } of results) {
    const location = manager.create(Location, {
      geom: { type: "Point", coordinates: [longitude, latitude] },
      locationType: groceryStoreType,
    });

    const coles = manager.create(WoolworthsStore, {
      name: site_name,
      streetName: street_name,
      town: town,
      postcode: postcode,
      state: state,
      location,
    });

    await manager.save(coles);
  }

  console.log("CSV file successfully processed");
}

importColesLocations().catch((error) =>
  console.error("Error importing Coles locations:", error),
);
