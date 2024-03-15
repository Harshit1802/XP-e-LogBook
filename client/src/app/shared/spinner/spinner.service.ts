
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {

    isLoading = new Subject<boolean>();

    constructor() {
    }

    show() {
        this.isLoading.next(true);
    }

    hide() {
        this.isLoading.next(false);
    }
}
