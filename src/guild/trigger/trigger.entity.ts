import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Guild } from "../guild.entity";

@Entity()
export class Trigger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
  
  @Column({ type: "jsonb"} )
  payload: object;   

  @ManyToOne(type => Guild, guild => guild.triggers)
  @JoinColumn({
    name: "guildId"
  })
  guild: Guild;
}