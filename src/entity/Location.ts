import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  type Point,
  OneToMany, ManyToOne,
} from "typeorm";
import { Isochrone } from "./Isochrone";
import {LocationType} from "./LocationType";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("geometry", { spatialFeatureType: "Point", srid: 4326 })
  geom: Point;

  @ManyToOne(() => LocationType)
  locationType: LocationType;

  @OneToMany(() => Isochrone, (isochrone) => isochrone.locationId)
  isochrones: Isochrone[];
}
