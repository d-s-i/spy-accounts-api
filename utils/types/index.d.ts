
import { QueryWithHelpers, EnforceDocument } from "mongoose";

export type AnyMongooseQuery = QueryWithHelpers<
    EnforceDocument<any, { toObject: () => object }> | null, EnforceDocument<any, { toObject: () => object }>, any, any
>;