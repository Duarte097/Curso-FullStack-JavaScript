import HttpStatusCode from '../Responses/HttpStatusCode';
import HttpException from './HttpException';

class IdInvalidException extends HttpException {
  constructor() {
    super(HttpStatusCode.BAD_REQUEST, 'Id inválido, Favor verificar');
  }
}
export default IdInvalidException;
