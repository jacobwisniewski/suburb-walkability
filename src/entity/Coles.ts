import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Location } from "./Location";

@Entity("coles")
export class Coles {
  @PrimaryColumn("integer")
  id: number;

  @JoinColumn({ name: "id" })
  @OneToOne(() => Location, { cascade: true })
  location: Location;

  @Column("varchar")
  name: string;

  @Column("varchar")
  address: string;
}
