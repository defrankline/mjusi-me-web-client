import { Component, OnInit } from '@angular/core';
import {Training} from "../training";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingService} from "../training.service";
import {DatePipe} from "@angular/common";
import {CustomResponse} from "../../custom-response";
import {Role} from "../../role/role";
import {User} from "../../user/user";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id: number | undefined;
  training: Training | undefined;
  dateControl = new FormControl(this.datePipe.transform(Date.now(),'yyyy-MM-dd'), [Validators.required]);
  nameControl = new FormControl('', [Validators.required]);
  instituteControl = new FormControl('', [Validators.required]);

  constructor(private router: Router,
              private trainingService: TrainingService,
              private datePipe: DatePipe,
              private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.id = Number(atob(this.activatedRoute.snapshot.params['id']));
    }
  }

  public ngOnInit(): void {
    if (this.id !== undefined) {
      this.loadTraining(this.id);
    }
  }


  loadTraining(id: number | undefined): void {
    this.trainingService.find(id).subscribe(response => {
      this.training = response.data;
      this.nameControl.setValue(this.training?.name);
      this.instituteControl.setValue(this.training?.institute);
      this.dateControl.setValue(this.datePipe.transform(this.training?.date,'yyyy-MM-dd'));
    });
  }

  close(): void {
    this.router.navigate(['/trainings']);
  }

  save(): void {
    if (this.id !== undefined) {
      const payload = {
        id: this.id,
        name: this.nameControl.value,
        institute: this.instituteControl.value,
        date: this.datePipe.transform(this.dateControl.value,'yyyy-MM-dd')
      } as Training;
      this.update(payload);
    } else {
      const payload = {
        name: this.nameControl.value,
        institute: this.instituteControl.value,
        date: this.datePipe.transform(this.dateControl.value,'yyyy-MM-dd')
      } as Training;
      this.create(payload);
    }
  }

  private create(payload: Training) {
    this.trainingService.create(payload).subscribe((response: CustomResponse) => {
      this.close();
    })
  }

  private update(payload: Training) {
    this.trainingService.update(this.id, payload).subscribe((response: CustomResponse) => {
      this.close();
    })
  }

  bindUser(c1: User, c2: User): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
