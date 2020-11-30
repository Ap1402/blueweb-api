import { User } from './user.model';

export const usersProvider = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];