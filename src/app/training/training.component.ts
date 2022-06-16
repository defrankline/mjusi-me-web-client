import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Training} from "./training";
import {TrainingService} from "./training.service";
import {Router} from "@angular/router";
import {CustomResponse} from "../custom-response";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  itemListSubject: BehaviorSubject<Training[]> = new BehaviorSubject([{} as Training]);

  constructor(private trainingService: TrainingService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadTrainings();
  }

  loadTrainings(): void {
    this.trainingService.getAll().subscribe((response: CustomResponse) => {
      this.itemListSubject.next(response.data)
    })
  }

  getItems(): Observable<Training[]> {
    return this.itemListSubject.asObservable();
  }

  form(training?: Training): void {
    if (training) {
      this.router.navigate(['/trainings/edit', btoa(String(training.id))]);
    } else {
      this.router.navigate(['/trainings/create']);
    }
  }

  delete(training: Training): void {
    this.router.navigate(['/trainings/delete', btoa(String(training.id))]);
  }
}
