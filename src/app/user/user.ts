import {Role} from "../role/role";
import {Training} from "../training/training";

export interface User {
  id?: number;
  username: string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  dob: string;
  roles: Role[];
  trainings: Training[];
  maritalStatus: string;
}
