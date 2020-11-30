import { Client } from "./client.model";

export const clientsProvider = [
  {
    provide: 'CLIENTS_REPOSITORY',
    useValue: Client,
  }
];