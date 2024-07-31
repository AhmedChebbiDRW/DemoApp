export type SearchPhotoResponse = {
  status: boolean;
  path: string;
  statusCode: number;
  result: {
    brand: string | null;
    model: string | null;
    color: string | null;
    referenceNumber: string | null;
  };
};
