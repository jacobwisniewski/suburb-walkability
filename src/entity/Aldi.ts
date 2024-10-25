import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Location } from "./Location";

@Entity()
export class Aldi {
  @PrimaryColumn("integer")
  id: number;

  @JoinColumn({ name: "id" })
  @OneToOne(() => Location, { cascade: true })
  location: Location;

  @Column("varchar")
  name: string;

  @Column("varchar")
  street: string;

  @Column("varchar")
  suburb: string;

  @Column("varchar")
  state: string;

  @Column("varchar")
  postcode: string;
}
