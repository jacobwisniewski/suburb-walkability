import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Location } from "./Location";

@Entity("ptv_station")
export class PtvStation {
  @PrimaryColumn("integer")
  id: number;

  @JoinColumn({ name: "id" })
  @OneToOne(() => Location, { cascade: true })
  location: Location;

  @Column("varchar")
  stopId: string;

  @Column("varchar")
  stopName: string;

  @Column("varchar")
  lineName: string;
}
