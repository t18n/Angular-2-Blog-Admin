import { DatePipe } from '@angular/common';

export class CustomFunctions {
    public transformDateforview(value: string) {
        var datePipe = new DatePipe("en-US");
        value = datePipe.transform(value, 'yyyy-MM-ddTHH:MM');
        return value;
    }
    public transformDateforupdate(value: string) {
        var datePipe = new DatePipe("en-US");
        value = datePipe.transform(value, 'yyyy-MM-dd HH:MM:ss');
        return value;
    }
}
