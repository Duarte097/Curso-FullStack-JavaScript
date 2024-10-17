import HttpStatusCode from '../Responses/HttpStatusCode';
import HttpException from './HttpException';

class UserContainTaskException extends HttpException {
  constructor() {
    super(HttpStatusCode.CONFLICT, 'Impossivel excluir, pois o usuario contém tarefas relacionadas.');
  }
}
export default UserContainTaskException;
