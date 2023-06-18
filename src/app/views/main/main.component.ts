import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject, takeUntil, timer} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit, OnInit, OnDestroy {
  private destroy = new Subject<boolean>();
  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    timer(10000)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.modalService.open(this.popup);
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
