import { Entity, PrimaryGeneratedColumn, Index, Column } from "typeorm";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  discordId: string;

  @Column()
  avatar: string;
  
}