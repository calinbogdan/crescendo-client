import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import { Trigger } from "./trigger/trigger.entity";

@Entity()
export class Guild {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  discordId: string;

  @OneToMany(type => Trigger, trigger => trigger.guild)
  triggers: Trigger[];
}