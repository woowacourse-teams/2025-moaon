export const typeSafeError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  return new Error(String(error));
};
