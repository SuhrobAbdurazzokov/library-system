import { IResponse } from 'src/infrastructure/interface/resonse.interface';

export const getSuccessRes = (
  data: object,
  statusCode: number = 200,
  message: string = 'success',
): IResponse => {
  return {
    statusCode,
    message,
    data,
  };
};
