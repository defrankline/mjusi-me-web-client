import {Training} from "../training/training";
import {User} from "../user/user";

export interface DataCollection {
  id: number;
  training: Training;
  user: User;
}

export interface UserTrainingCreateDto {
  user: User
  trainings: Training;
}
