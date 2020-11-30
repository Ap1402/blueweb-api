import { Client } from "../client.model";

export interface getClients {
    data:Client[];
    totalItems: number;
    totalPages: number;
    currentPage:number;
}