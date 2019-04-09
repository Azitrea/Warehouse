import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { FormField } from './decorator';


@Entity()
export class PartsNumbers {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partID: string;

  @Column()
  unitID: string;

  @Column()
  unitAmount: string;
}
