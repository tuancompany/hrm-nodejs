export class IActionRequestResponse {
  expirationDate: Date;
  type: string;
  approved: boolean;
  employeeId: string;
  managerId: string;
}

export class ActionRequestResponse {
  public expirationDate: Date = new Date();
  public type: string = "";
  public approved: boolean = false;
  public employeeId: string = "";
  public managerId: string = "";

  constructor(instanceData?: IActionRequestResponse) {
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData?.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      } else {
        delete this[key];
      }
    }
  }
}
