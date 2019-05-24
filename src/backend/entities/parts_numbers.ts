import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class PartsNumbers {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partID: string;

  @Column()
  unitID: string;

  @Column()
  name: string;

  @Column()
  unitAmount: string;

  @Column()
  type: string;
}
