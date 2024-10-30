import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SAL } from "./SAL";

@Entity("property_price")
export class PropertyPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  type: "house" | "unit";

  @Column("int")
  bedrooms: number;

  @Column("float")
  value: number;

  @Column("date")
  fromDate: Date;

  @Column("date")
  toDate: Date;

  @ManyToOne(() => SAL)
  sal: SAL;
}
