import { ApiDailyBreakdown } from "./apiDailyBreakdown";
import { ApiCurrentConditions } from "./apiCurrentConditions";

export interface FullApiResponse {
     queryCost: number,
     latitude: number,
     longitude: number,
     resolvedAddress: string,
     address: string,
     timezone: string,
     tzoffset: number,
     description: string,
     days: Array<ApiDailyBreakdown>,
     alerts: Array<string> | null,
     stations: Record<string, unknown>,
     currentConditions: ApiCurrentConditions
}