import { AppDataSource } from "../src/data-source";
import { LocationType } from "../src/entity/LocationType";
import { Coles } from "../src/entity/Coles";
import { Location } from "../src/entity/Location";
import * as fs from 'fs';

async function importColesLocations() {
  await AppDataSource.initialize();
  const manager = AppDataSource.manager;

  let groceryStoreType = await manager.findOne(LocationType, { where: { name: 'grocery_store' } });
  if (!groceryStoreType) {
    groceryStoreType = manager.create(LocationType, { name: 'grocery_store' });
    await manager.save(groceryStoreType);
  }

  const csvData = fs.readFileSync('datasets/coles-locations-enriched.csv', 'utf-8');
  const rows = csvData.split('\n').slice(1); // Skip header row

  for (const row of rows) {
    const [brand, name, number, address , storeType, contact, ,latitude, longitude] = row.split(',');

    const location = manager.create(Location, {
      geom: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
      locationType: groceryStoreType,
    });

    const coles = manager.create(Coles, {
      name,
      address,
      location,
    });

    await manager.save(coles);
  }

  console.log('CSV file successfully processed');
}

importColesLocations().catch((error) => console.error('Error importing Coles locations:', error));