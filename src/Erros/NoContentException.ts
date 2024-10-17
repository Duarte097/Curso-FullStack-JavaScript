import HttpStatusCode from '../Responses/HttpStatusCode';
import HttpException from './HttpException';

class NoContentException extends HttpException {
  constructor() {
    super(HttpStatusCode.NO_CONTENT, 'Não foi localizado ');
  }
}
export default NoContentException;
