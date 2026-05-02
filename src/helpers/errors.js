export const getApiErrorMessage = (error, fallbackMessage) => (
  error?.response?.data?.error || fallbackMessage
);

export const isUnauthorizedError = (error) => error?.response?.status === 401;
