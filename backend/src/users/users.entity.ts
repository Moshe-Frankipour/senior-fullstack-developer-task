import { UserStatus } from '../enums/userStatus.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column('simple-json', { default: ['User'] })
  roles: string[];

  @Column({ type: 'simple-enum', enum: UserStatus, default: UserStatus.Enabled })
  status: UserStatus;
}
