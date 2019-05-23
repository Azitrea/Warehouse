import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { FormField } from './decorator';


@Entity()
export class Parts {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  type: string;
}
