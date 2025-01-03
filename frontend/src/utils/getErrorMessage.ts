import { AxiosError } from "axios";

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data.error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return error as string;
};
export default getErrorMessage;
