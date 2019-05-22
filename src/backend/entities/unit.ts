import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { FormField } from './decorator';


@Entity()
export class Unit {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column({ nullable: true, default: 0 })
  onStorage: number;

  @Column()
  type: string;

}
