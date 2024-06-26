import NoDataFoundError from "../../errors/NotFoundError";

// Example function that checks data existence
export const checkDataExistence = (data: any) => {
  if (!data || data.length === 0) {
    throw new NoDataFoundError("No data found");
  }
  // Continue processing if data exists
};
