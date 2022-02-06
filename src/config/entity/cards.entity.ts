import { Entity, BaseEntity, PrimaryGeneratedColumn, Column,Unique } from "typeorm";

@Entity({name:'cards'})
@Unique('my_unique_constraint', ['code']) 
export class Cards extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  value!: string;

  @Column()
  suit!: string;
  

  @Column({unique: true})
  code!: string;

  @Column({ name: "created_at", default:() => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
  
}