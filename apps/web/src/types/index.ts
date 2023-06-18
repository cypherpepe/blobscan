import type { RouterOutputs } from "~/api-client";

export type Block = RouterOutputs["block"]["getByHash"];

export type Transaction = RouterOutputs["tx"]["getByHash"];

export type Blob = RouterOutputs["blob"]["getByIndex"];

export type DailyBlobStats = RouterOutputs["stats"]["blob"]["getDailyStats"];

export type SingleDailyBlobStats = DailyBlobStats[number];

export type DailyBlockStats = RouterOutputs["stats"]["block"]["getDailyStats"];

export type SingleDailyBlockStats = DailyBlockStats[number];

export type DailyTransactionStats =
  RouterOutputs["stats"]["transaction"]["getDailyStats"];

export type SingleDailyTransactionStats = DailyTransactionStats[number];
