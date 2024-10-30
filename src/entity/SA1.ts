import { Entity, PrimaryColumn, Column, type MultiPolygon } from "typeorm";

@Entity("sa1")
export class SA1 {
  @PrimaryColumn("varchar")
  code: string;

  @Column("varchar")
  changeFlag: string;

  @Column("varchar")
  changeLabel: string;

  @Column("varchar")
  sa2Code: string;

  @Column("varchar")
  sa2Name: string;

  @Column("varchar")
  sa3Code: string;

  @Column("varchar")
  sa3Name: string;

  @Column("varchar")
  sa4Code: string;

  @Column("varchar")
  sa4Name: string;

  @Column("varchar")
  gccCode: string;

  @Column("varchar")
  gccName: string;

  @Column("varchar")
  stateCode: string;

  @Column("varchar")
  stateName: string;

  @Column("varchar")
  countryCode: string;

  @Column("varchar")
  countryName: string;

  @Column("float", { nullable: true })
  areaSqKm: number;

  @Column("varchar")
  lociUri: string;

  @Column("geometry", { spatialFeatureType: "MultiPolygon", srid: 4326 })
  geometry: MultiPolygon;
}
