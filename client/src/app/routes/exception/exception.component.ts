import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exception',
  template: ` <div> Exception Page </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExceptionComponent {
  // get type(): ExceptionType {
  //   return this.route.snapshot.data['type'];
  // }

  constructor(private route: ActivatedRoute) {}
}
