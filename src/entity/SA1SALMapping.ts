import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { SA1 } from "./SA1";
import { SAL } from "./SAL";

@Entity("sa1_sal_mapping")
@Unique(["sa1"])
export class SA1SALMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SA1, (sa1) => sa1.code)
  @JoinColumn({ name: "sa1_code" })
  sa1: SA1;

  @ManyToOne(() => SAL, (sal) => sal.code)
  @JoinColumn({ name: "sal_code" })
  sal: SAL;
}
