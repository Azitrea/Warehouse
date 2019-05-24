import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class CustomerOrder {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  customerAddress: string;

  @Column()
  orderDate: string;

  @Column()
  orderedPart: string;

  @Column()
  amount: number;
}
