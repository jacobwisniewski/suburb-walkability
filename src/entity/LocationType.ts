import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class LocationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;
}