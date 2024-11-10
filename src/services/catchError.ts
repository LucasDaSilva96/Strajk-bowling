export const catchError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    return error.message;
  }
  console.error(error);
  return 'An error occurred. See console for more details.';
};
