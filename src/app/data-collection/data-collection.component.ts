import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {CustomResponse} from "../custom-response";
import {DataCollection} from "./data-collection";
import {DataCollectionService} from "./data-collection.service";
import {environment} from "../../environments/environment.prod";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-data-collection',
  templateUrl: './data-collection.component.html',
  styleUrls: ['./data-collection.component.scss']
})
export class DataCollectionComponent implements OnInit {
  page = environment.page;
  size = environment.size;
  totalItems = 0;
  maxSize = environment.maxSize;
  perPageOptions = environment.perPageOptions;
  perPageControl = new FormControl(this.size);

  itemListSubject: BehaviorSubject<DataCollection[]> = new BehaviorSubject([{} as DataCollection]);

  constructor(private dataCollectionService: DataCollectionService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadData(this.size, this.page);
  }

  loadData(size: number, page: number): void {
    this.dataCollectionService.getAll(size, page).subscribe((response: CustomResponse) => {
      this.itemListSubject.next(response.data.content);
      this.totalItems = response.data.totalElements;
    })
  }

  pageChanged(page: number): void {
    this.page = page - 1;
    this.loadData(this.size, this.page);
  }

  pageSizeChanged() {
    this.size = this.perPageControl.value;
    this.loadData(this.size, this.page);
  }

  getItems(): Observable<DataCollection[]> {
    return this.itemListSubject.asObservable();
  }

  form(training?: DataCollection): void {
    if (training) {
      this.router.navigate(['/data-collection/edit', btoa(String(training.id))]);
    } else {
      this.router.navigate(['/data-collection/create']);
    }
  }

  delete(training: DataCollection): void {
    this.router.navigate(['/data-collection/delete', btoa(String(training.id))]);
  }
}
