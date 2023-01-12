export class IActionRequestResponse<T> {
  expirationDate: Date;
  type: string;
  approved: boolean;
  information: T;
  employeeId: string;
  managerId: string;
}
export class IActionRequestEntity {
  expirationDate: Date;
  type: string;
  approved: boolean;
  information: string;
  employeeId: string;
  managerId: string;
}

export class ActionRequestResponse {
  public expirationDate: Date = new Date();
  public type: string = "";
  public approved: boolean = false;
  public information: string = "";
  public employeeId: string = "";
  public managerId: string = "";

  constructor(instanceData?: IActionRequestEntity) {
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData?.hasOwnProperty(key)) {
        if (key === "information") {
          this[key] = JSON.parse(instanceData[key]);
        } else {
          this[key] = instanceData[key];
        }
      } else {
        delete this[key];
      }
    }
  }
}
