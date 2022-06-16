import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {Training} from "../training";
import {TrainingService} from "../training.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  id!: number;
  userSubject: BehaviorSubject<Training> = new BehaviorSubject({} as Training);
  constructor(private router: Router,
              private userService:TrainingService,
              private activatedRoute: ActivatedRoute) {
    this.id = Number(atob(this.activatedRoute.snapshot.params['id']));
  }

  ngOnInit(): void {
    this.loadTraining(this.id)
  }

  loadTraining(id: number | undefined): void {
    this.userService.find(id).subscribe(response => {
      this.userSubject.next(response.data);
    });
  }

  getTraining(): Observable<Training> {
    return this.userSubject.asObservable();
  }

  close(): void {
    this.router.navigate(['/trainings']);
  }

  delete():void {
    this.userService.delete(this.id).subscribe(response => {
      this.router.navigate(['/trainings']);
    });
  }
}
