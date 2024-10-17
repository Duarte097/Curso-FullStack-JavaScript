import HttpStatusCode from '../Responses/HttpStatusCode';
import HttpException from './HttpException';

class ServerErrorException extends HttpException {
  constructor(error: any) {
    super(getStatus(error), getMessage(error));
  }
}

function getStatus(error: any): number {
  if (isMongoException(error)) return HttpStatusCode.BAD_REQUEST;
  return HttpStatusCode.INTERNAL_SERVER_ERROR;
}

function isMongoException(error: any): boolean {
  if (isMongoError(error) || isValidationError(error)) return true;
  return false;
}

function isMongoError(error: { name: string; }): boolean {
  return error.name === 'MongoError';
}

function isValidationError(error: { name: string; }): boolean {
  return error.name === 'ValidationError';
}

function getMessage(error: { name: string; }): string {
  try {
    if (isMongoException(error)) {
      if (isKeyUniqueError(error)) return getMessageKeyUnique(error);
      if (isValidationError(error)) return getMessageValidationError(error);
    } else return getMessageGeneric();
  } catch (error) {
    return getMessageGeneric();
  }
  return '';
}

function isKeyUniqueError(error) {
  return isMongoError(error) && error.code === 11000;
}

function getMessageKeyUnique(error: { name?: string; keyPattern?: any; }): string {
  const { keyPattern } = error;

  const listFormatedErros: string[] = [];
  Object.keys(keyPattern).forEach((field) => {
    listFormatedErros.push(`${field} deve ser único`);
  });
  return listFormatedErros.join(' | ');
}

function getMessageValidationError(error: { name?: string; errors?: any; }): string {
  const { errors } = error;

  const listFormatedErros: string[] = [];
  Object.keys(errors).forEach((field) => {
    listFormatedErros.push(errors[field].message);
  });

  return listFormatedErros.join(' | ');
}

function getMessageGeneric(): string {
  return 'Erro interno no servidor.';
}

export default ServerErrorException;
