import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DataCollectionService} from "../data-collection.service";
import {DataCollection} from "../data-collection";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  id!: number;
  itemSubject: BehaviorSubject<DataCollection> = new BehaviorSubject({} as DataCollection);
  constructor(private router: Router,
              private service:DataCollectionService,
              private activatedRoute: ActivatedRoute) {
    this.id = Number(atob(this.activatedRoute.snapshot.params['id']));
  }

  ngOnInit(): void {
    this.loadItem(this.id)
  }

  loadItem(id: number | undefined): void {
    this.service.find(id).subscribe(response => {
      this.itemSubject.next(response.data);
    });
  }

  getUser(): Observable<DataCollection> {
    return this.itemSubject.asObservable();
  }

  close(): void {
    this.router.navigate(['/data-collection']);
  }

  delete():void {
    this.service.delete(this.id).subscribe(response => {
      this.router.navigate(['/data-collection']);
    });
  }
}
