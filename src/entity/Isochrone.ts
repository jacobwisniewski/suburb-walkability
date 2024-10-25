import { Entity, PrimaryGeneratedColumn, Column, type Polygon } from "typeorm";

@Entity()
export class Isochrone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("integer")
  locationId: number;

  @Column("varchar")
  transportType: "foot-walking" | "driving-car";

  @Column("varchar")
  method: "distance" | "time";

  @Column("integer")
  value: number;

  @Column("geometry", { spatialFeatureType: "Polygon", srid: 4326 })
  geom: Polygon;
}
