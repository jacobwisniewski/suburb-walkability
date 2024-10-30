import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("location_type")
export class LocationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;
}
