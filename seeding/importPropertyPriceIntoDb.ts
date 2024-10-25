import { AppDataSource } from "../src/data-source";
import { PropertyPrice } from "../src/entity/PropertyPrice";
import { SAL } from "../src/entity/SAL";
import csv from "csv-parser";
import * as fs from "fs";
import * as path from "path";

const stateNameMapping: { [key: string]: string } = {
  NSW: "New South Wales",
  VIC: "Victoria",
  QLD: "Queensland",
  SA: "South Australia",
  WA: "Western Australia",
  TAS: "Tasmania",
  NT: "Northern Territory",
  ACT: "Australian Capital Territory",
};

async function importPropertyPrices() {
  await AppDataSource.initialize();
  const manager = AppDataSource.manager;

  const csvFilePath = path.resolve(
    __dirname,
    "../datasets/suburb-median-price-victoria-data.csv",
  );

  const results: any[] = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      const today = new Date();
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(today.getMonth() - 12);

      for (const row of results) {
        const sal = await manager.findOne(SAL, {
          where: {
            name: row.suburb,
            stateName: stateNameMapping[row.state],
          },
        });

        if (sal) {
          const propertyPrice = new PropertyPrice();
          propertyPrice.bedrooms = parseInt(row.bedrooms, 10);
          propertyPrice.type = row.type.toLowerCase() as "house" | "unit";
          propertyPrice.value = parseFloat(row.price);
          propertyPrice.fromDate = twelveMonthsAgo;
          propertyPrice.toDate = today;
          propertyPrice.sal = sal;

          await manager.save(propertyPrice);
        }
      }
      console.log("CSV data has been successfully imported into the database.");
      await AppDataSource.destroy();
    });
}

importPropertyPrices().catch((error) =>
  console.error("Error importing CSV data:", error),
);
