import {Component, OnInit} from '@angular/core';
import {User} from "../../user/user";
import {FormControl, Validators} from "@angular/forms";
import {
  BehaviorSubject, catchError,
  debounceTime,
  distinctUntilChanged,
  filter, finalize,
  map,
  Observable, of,
  OperatorFunction, switchMap,
  tap
} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";
import {CustomResponse} from "../../custom-response";
import {DataCollection, UserTrainingCreateDto} from "../data-collection";
import {Training} from "../../training/training";
import {TrainingService} from "../../training/training.service";
import {DataCollectionService} from "../data-collection.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  searching = false;
  searchFailed = false;

  formatter = (user: User) => user.name;

  userControl = new FormControl(null, [Validators.required]);
  userListSubject: BehaviorSubject<User[]> = new BehaviorSubject([{} as User]);

  trainingControl = new FormControl(null, [Validators.required]);
  trainingListSubject: BehaviorSubject<Training[]> = new BehaviorSubject([{} as Training]);

  constructor(private router: Router,
              private dataCollectionService: DataCollectionService,
              private userService: UserService,
              private trainingService: TrainingService) {

  }

  public ngOnInit(): void {
    this.loadUsers();
    this.loadTrainings();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe((response: CustomResponse) => {
      this.userListSubject.next(response.data)
    })
  }

  // @ts-ignore
  search: OperatorFunction<string, readonly User[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.userService.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  getUsers(): Observable<User[]> {
    return this.userListSubject.asObservable();
  }

  loadTrainings(): void {
    this.trainingService.getAll().subscribe((response: CustomResponse) => {
      this.trainingListSubject.next(response.data)
    })
  }

  getTrainings(): Observable<Training[]> {
    return this.trainingListSubject.asObservable();
  }

  close(): void {
    this.router.navigate(['/data-collection']);
  }

  save(): void {
    const user = this.userControl.value as User;
    const userPayload = {
      id: user.id
    } as User;
    const payload = {
      user: userPayload,
      trainings: this.trainingControl.value
    } as UserTrainingCreateDto;
    this.create(payload);
  }

  private create(payload: UserTrainingCreateDto) {
    this.dataCollectionService.create(payload).subscribe((response: CustomResponse) => {
      this.close();
    })
  }

  bindTraining(c1: Training, c2: Training): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  setUser(event: any) {
    console.log(event);
  }

  trackUserId(index: number, item: User): number {
    return <number>item.id;
  }
}
