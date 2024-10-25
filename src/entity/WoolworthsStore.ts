import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Location } from "./Location";

@Entity()
export class WoolworthsStore {
  @PrimaryColumn("integer")
  id: number;

  @JoinColumn({ name: "id" })
  @OneToOne(() => Location, { cascade: true })
  location: Location;

  @Column("varchar")
  name: string;

  @Column("varchar")
  streetName: string;

  @Column("varchar")
  town: string;

  @Column("varchar")
  state: string;

  @Column("varchar")
  postcode: string;
}
