import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../user";
import {UserService} from "../user.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Role} from "../../role/role";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  id!: number;
  userSubject: BehaviorSubject<User> = new BehaviorSubject({} as User);
  constructor(private router: Router,
              private userService:UserService,
              private activatedRoute: ActivatedRoute) {
    this.id = Number(atob(this.activatedRoute.snapshot.params['id']));
  }

  ngOnInit(): void {
    this.loadUser(this.id)
  }

  loadUser(id: number | undefined): void {
    this.userService.find(id).subscribe(response => {
      this.userSubject.next(response.data);
    });
  }

  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  close(): void {
    this.router.navigate(['/students']);
  }

  delete():void {
    this.userService.delete(this.id).subscribe(response => {
      this.router.navigate(['/students']);
    });
  }
}
