import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { Button, Buttons } from "src/app/models/Constant";

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.less']
})
export class MessageBoxComponent {
  title = '';
  message = '';
  buttons: Buttons = Buttons.Ok;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message
    this.buttons = data.buttons;
  }

  dialogResultSubject = new Subject<Button>();
  dialogResult$ = this.dialogResultSubject.asObservable();

  public get Buttons(): typeof Buttons {
    return Buttons;
  }

  public get Button(): typeof Button {
    return Button;
  }

  click(button: Button) {
    this.dialogResultSubject.next(button);
  }
}


