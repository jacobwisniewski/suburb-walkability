import { Entity, PrimaryColumn, Column, type MultiPolygon } from "typeorm";

@Entity("sal")
export class SAL {
  @PrimaryColumn("varchar")
  code: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  stateCode: string;

  @Column("varchar")
  stateName: string;

  @Column("varchar")
  countryCode: string;

  @Column("varchar")
  countryName: string;

  @Column("float")
  areaSqKm: number;

  @Column("varchar")
  lociUri: string;

  @Column("float")
  shapeLength: number;

  @Column("float")
  shapeArea: number;

  @Column("geometry", { spatialFeatureType: "MultiPolygon", srid: 4326 })
  geometry: MultiPolygon;
}
