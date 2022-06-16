import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {User} from "./user";
import {BehaviorSubject, Observable} from "rxjs";
import {CustomResponse} from "../custom-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  itemListSubject: BehaviorSubject<User[]> = new BehaviorSubject([{} as User]);

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe((response: CustomResponse) => {
      this.itemListSubject.next(response.data)
    })
  }

  getItems(): Observable<User[]> {
    return this.itemListSubject.asObservable();
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
}
