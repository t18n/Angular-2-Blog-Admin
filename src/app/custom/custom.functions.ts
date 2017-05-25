import { DatePipe } from '@angular/common';

export class CustomFunctions {
    public transformDate(value: string) {
        var datePipe = new DatePipe("en-US");
        value = datePipe.transform(value, 'yyyy-MM-dd HH:MM:ss');
        return value;
    }
}
