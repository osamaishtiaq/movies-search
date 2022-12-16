import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RequestTrailerForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  movie_name: string;

  @Column({ type: 'text', nullable: true })
  phone_number?: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'int', nullable: true })
  year?: number | null;
}
