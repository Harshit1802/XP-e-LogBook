// import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Component, HostListener, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';

// @AutoUnsubscribe()
@Component({
    selector: 'spinner',
    styleUrls: ['./spinner.component.scss'],
    templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit, OnDestroy {
    color = 'primary';
    value = 50;
    pageWidthCenter = 0;
    pageHeightCenter = 0;
    hideSpinner: boolean = true;
    hideSpinnerSubscription!: Subscription;
    showSpinner!: boolean;
    showSpinnerSharedSubscription!: Subscription;
    showSpinnerSubscription!: Subscription;
    loading = false;
    loadingChain: boolean[] = [];

    constructor(
        private spinnerService: SpinnerService) { }
    ngOnInit(): void {
        this.spinnerService.isLoading.subscribe(data=>{
            this.loading=data;
        })
    }
    ngOnDestroy(): void {
    }

    isLoading: Subject<boolean> = this.spinnerService.isLoading;

}