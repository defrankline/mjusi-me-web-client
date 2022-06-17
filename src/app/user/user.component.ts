import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";
import {BehaviorSubject, Observable} from "rxjs";
import {CustomResponse} from "../custom-response";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment.prod";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  page = environment.page;
  size = environment.size;
  totalItems = 0;
  maxSize = environment.maxSize;
  perPageOptions = environment.perPageOptions;
  perPageControl = new FormControl(this.size);
  itemListSubject: BehaviorSubject<User[]> = new BehaviorSubject([{} as User]);

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadUsers(this.size, this.page);
  }

  loadUsers(size: number, page: number): void {
    this.userService.getAll(size, page).subscribe((response: CustomResponse) => {
      this.itemListSubject.next(response.data.content)
      this.totalItems = response.data.totalElements;
    })
  }

  getItems(): Observable<User[]> {
    return this.itemListSubject.asObservable();
  }

  pageChanged(page: number): void {
    this.page = page - 1;
    this.loadUsers(this.size, this.page);
  }

  form(user?: User): void {
    if (user) {
      this.router.navigate(['/students/edit', btoa(String(user.id))]);
    } else {
      this.router.navigate(['/students/create']);
    }
  }

  delete(user: User): void {
    this.router.navigate(['/students/delete', btoa(String(user.id))]);
  }

  download(): void {

  }

  pageSizeChanged() {
    this.size = this.perPageControl.value;
    this.loadUsers(this.size, this.page);
  }
}
