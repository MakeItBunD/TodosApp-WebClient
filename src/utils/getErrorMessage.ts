import { ICustomError } from '@/interfaces/ICustomError';

const getErrorMessage = (error: ICustomError) => {
  if (error) {
    return error.data.message;
  }
  return String(error);
};

export default getErrorMessage;
