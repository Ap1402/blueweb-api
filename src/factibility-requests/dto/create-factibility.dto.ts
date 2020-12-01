
export interface createFactibilityDto {
    coordenades: string;
    requesterName: string;
    requesterPhone: string;
    requesterEmail: string;
    wasEvaluated?: boolean;
    isFactible: boolean;
    supportMessage: string;
}