const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return error as string;
};
export default getErrorMessage;
