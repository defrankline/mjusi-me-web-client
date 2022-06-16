import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../user";
import {CustomResponse} from "../../custom-response";
import {BehaviorSubject, Observable} from "rxjs";
import {RoleService} from "../../role/role.service";
import {Role} from "../../role/role";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  id: number | undefined;
  user: User | undefined;
  dobControl = new FormControl(this.datePipe.transform(Date.now(),'yyyy-MM-dd'), [Validators.required]);
  nameControl = new FormControl('', [Validators.required]);
  usernameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  mobileControl = new FormControl('', [Validators.required]);
  roleControl = new FormControl(null, [Validators.required]);
  sexControl = new FormControl('MALE', [Validators.required]);
  maritalStatusControl = new FormControl('SINGLE', [Validators.required]);
  roleListSubject: BehaviorSubject<Role[]> = new BehaviorSubject([{} as Role]);

  constructor(private router: Router,
              private userService: UserService,
              private roleService: RoleService,
              private datePipe: DatePipe,
              private activatedRoute: ActivatedRoute) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.id = Number(atob(this.activatedRoute.snapshot.params['id']));
    }
  }

  public ngOnInit(): void {
    this.loadRoles();
    if (this.id !== undefined) {
      this.loadUser(this.id);
    }
  }

  loadRoles(): void {
    this.roleService.getAll().subscribe((response: CustomResponse) => {
      this.roleListSubject.next(response.data)
    })
  }

  getRoles(): Observable<Role[]> {
    return this.roleListSubject.asObservable();
  }

  loadUser(id: number | undefined): void {
    this.userService.find(id).subscribe(response => {
      this.user = response.data;
      this.nameControl.setValue(this.user?.name);
      this.usernameControl.setValue(this.user?.username);
      this.emailControl.setValue(this.user?.email);
      this.mobileControl.setValue(this.user?.mobile);
      this.roleControl.setValue(this.user?.roles);
      this.sexControl.setValue(this.user?.gender);
      this.maritalStatusControl.setValue(this.user?.maritalStatus);
      this.dobControl.setValue(this.datePipe.transform(this.user?.dob,'yyyy-MM-dd'));
    });
  }

  close(): void {
    this.router.navigate(['/students']);
  }

  save(): void {
    if (this.id !== undefined) {
      const payload = {
        id: this.id,
        name: this.nameControl.value,
        email: this.emailControl.value,
        mobile: this.mobileControl.value,
        username: this.usernameControl.value,
        gender: this.sexControl.value,
        maritalStatus: this.maritalStatusControl.value,
        roles: this.roleControl.value as Role[],
        dob: this.datePipe.transform(this.dobControl.value,'yyyy-MM-dd')
      } as User;
      this.update(payload);
    } else {
      const payload = {
        name: this.nameControl.value,
        email: this.emailControl.value,
        mobile: this.mobileControl.value,
        username: this.usernameControl.value,
        gender: this.sexControl.value,
        maritalStatus: this.maritalStatusControl.value,
        roles: this.roleControl.value as Role[],
        dob: this.datePipe.transform(this.dobControl.value,'yyyy-MM-dd')
      } as User;
      this.create(payload);
    }
  }

  private create(payload: User) {
    this.userService.create(payload).subscribe((response: CustomResponse) => {
      this.close();
    })
  }

  private update(payload: User) {
    this.userService.update(this.id, payload).subscribe((response: CustomResponse) => {
      this.close();
    })
  }

  bindRole(c1: Role, c2: Role): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
