export interface IGetManagerResponse {
  id: string;
  name: string;
  gender: string;
  dob: Date;
  phoneNumber: string;
  email: string;
  dateJoined: Date;
  dateLeft: Date;
  active: boolean;
  departmentId: string;
  partId: string;
  positionId: string;
  degreeId: string;
}

export class GetManagerResponse {
  public id: string = "";
  public name: string = "";
  public gender: string = "";
  public dob: Date = new Date();
  public phoneNumber: string = "";
  public email: string = "";
  public dateJoined: Date = new Date();
  public dateLeft: Date = new Date();
  public active: boolean = false;
  public departmentId?: string = "";
  public partId?: string = "";
  public positionId?: string = "";
  public degreeId?: string = "";

  constructor(instanceData?: IGetManagerResponse) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData?: IGetManagerResponse) {
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
