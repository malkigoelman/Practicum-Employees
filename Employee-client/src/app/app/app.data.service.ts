import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    dataChanged = new EventEmitter<void>();

    constructor() { }

    getDataFromSessionStorage(): any {
        return {
            name: sessionStorage.getItem('userName'),
            role: sessionStorage.getItem('role')
        };
    }

    updateDataInLocalStorage(): void {
        this.dataChanged.emit();
    }
}
