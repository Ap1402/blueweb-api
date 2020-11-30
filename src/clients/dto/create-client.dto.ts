
export interface createClientDto {

    names: string;
    lastNames: string;
    address: string;

    isEnterprise:number;
    commercialReason?: string;
    socialReason?:string;

    identification: string;
    dni: string;
    state: string;
    city:string;
    municipality:string;
    phone: string;
    email:string;

}