import fs from "fs";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import ProgressBar from "progress";
import { getCoordinates } from "../src/helpers/api/googleMapsApi/googleMapsApi";
import { WoolworthsStore } from "../datasets/types/woolworthsStore";
import { Coles } from "../datasets/types/coles";

const enrichCsvWithCoordinates = async <T extends Coles>(
  inputFilePath: string,
  outputFilePath: string,
) => {
  const fileContent = fs.readFileSync(inputFilePath, "utf-8");
  const results: T[] = parse(fileContent, { columns: true });

  const progressBar = new ProgressBar("Processing [:bar] :percent :etas", {
    total: results.length,
    width: 40,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_index, row] of results.entries()) {
    if (row.address) {
      try {
        const response = await getCoordinates(`${row.address} Australia`);
        if (response.results && response.results.length > 0) {
          const coordinates = response.results[0].geometry.location;
          row.latitude = coordinates.lat;
          row.longitude = coordinates.lng;
        } else {
          row.latitude = null;
          row.longitude = null;
        }
      } catch (error) {
        console.error(
          `Failed to fetch coordinates for address: ${row.address}`,
          error,
        );
        row.latitude = null;
        row.longitude = null;
      }
    }
    progressBar.tick();
  }

  const csvOutput = stringify(results, { header: true });
  fs.writeFileSync(outputFilePath, csvOutput);
};

enrichCsvWithCoordinates<Coles>(
  "datasets/coles-locations.csv",
  "datasets/coles-locations-enriched.csv",
);
