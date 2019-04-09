import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { FormField } from './decorator';


@Entity()
export class CustomerOrder {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  customerAdress: string;

  @Column()
  orderDate: string;

  @Column()
  orderedPart: string;

  @Column()
  amount: number;
}
