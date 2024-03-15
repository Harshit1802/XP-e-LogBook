import { FormGroup } from '@angular/forms';
import { ControlConfig } from 'src/app/models/renderer';

export interface Field {
  config: ControlConfig,
  group: FormGroup,
  parentId:string
}
