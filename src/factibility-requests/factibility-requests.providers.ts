import { FactibilityRequest } from './factibility-request.model';

export const factibilityRequest = [
    {
        provide: 'FACTIBILITY_REQUESTS_REPOSITORY',
        useValue: FactibilityRequest,
    },
];