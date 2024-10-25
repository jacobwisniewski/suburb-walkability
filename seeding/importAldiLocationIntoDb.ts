import { AppDataSource } from "../src/data-source";
import { LocationType } from "../src/entity/LocationType";
import { Location } from "../src/entity/Location";
import * as fs from "fs";
import { parse } from "csv-parse/sync";
import { Aldi as AldiEntity } from "../src/entity/Aldi";
import { Aldi } from "../datasets/types/aldi";

async function importAldiLocations() {
  await AppDataSource.initialize();
  const manager = AppDataSource.manager;

  let groceryStoreType = await manager.findOne(LocationType, {
    where: { name: "grocery_store" },
  });
  if (!groceryStoreType) {
    groceryStoreType = manager.create(LocationType, { name: "grocery_store" });
    await manager.save(groceryStoreType);
  }

  const csvData = fs.readFileSync("datasets/aldi-locations.csv", "utf-8");
  const results: Aldi[] = parse(csvData, { columns: true });

  for (const {
    name,
    street,
    suburb,
    state,
    postcode,
    latitude,
    longitude,
  } of results) {
    if (!latitude || !longitude) return;
    const location = manager.create(Location, {
      geom: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      locationType: groceryStoreType,
    });

    const coles = manager.create(AldiEntity, {
      location,
      name,
      street,
      suburb,
      state,
      postcode,
    });

    await manager.save(coles);
  }

  console.log("CSV file successfully processed");
}

importAldiLocations().catch((error) =>
  console.error("Error importing Coles locations:", error),
);
