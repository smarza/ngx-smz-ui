import { GetEmployeeDetails } from '@models/get-employee-details';
import { UpdateEmployee as UpdateEmployeeRequest } from '@models/update-employee';

export namespace ProteusActions {

  export class GetCaEmployee {
    public static readonly type = '[Proteus Ft] Get Ca Employee';
    constructor(public data: GetEmployeeDetails) {}
  }

  export class ClearCaEmployee {
    public static readonly type = '[Proteus Ft] Clear Ca Employee';
  }

  export class UpdateEmployee {
    public static readonly type = '[Proteus Ft] Update Employee';
    constructor(public data: UpdateEmployeeRequest) {}
  }

}
