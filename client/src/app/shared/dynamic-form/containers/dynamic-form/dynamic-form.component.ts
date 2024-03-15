import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormConfig, ControlConfig, ControlValidation, Table, GridColumn } from 'src/app/models/renderer';
import { RendererService } from 'src/app/services/renderer.service';


@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  styleUrls: ['dynamic-form.component.less'],
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges, OnInit {
  @Input()
  config!: FormConfig;
 @Input() parentId:string;
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();
  //Table within form
  // table: Table;
  // listOfColumn: GridColumn[] = [];
  // gridData: any[] = [];
  // gridDataSource: string = '';
  form!: FormGroup;
  errors: any;
  public _controls: ControlConfig[] = [];
  get controls() {
    return this._controls.filter(({ type }) => type !== 'button');
  }
  get changes() { return this.form?.valueChanges; }
  get valid() { return this.form?.valid; }
  get value() { return this.form?.value; }

  constructor(private fb: FormBuilder, private rendererService: RendererService) { }

  ngOnInit() {
    
    this.rendererService.clickSubjectObservableStream$.subscribe((e:any) => {
      console.log('clickSubjectObservableStream',e)
      this.handleSubmit(e);

    });
  }

  ngOnChanges() {
    if (this.config) {
      console.log('DDDDD', this.config);
      this._controls=[];
      this.config.rows.forEach(row => {
        row.columns.forEach(column => {
          column.controls.forEach(ctrl => {

            ctrl.value = ctrl.value ? ctrl.value : null;
            this._controls.push(ctrl);
          });
        });
      });
      //this.bindgrid()
      this.bindDropDownList();
      if(this._controls.length>0){
        console.log('this._controls',this._controls)
        this.form = this.createGroup();
        this.initializeForm();
      }
      
    }

  }
// bindgrid(){
//   this._controls.filter(x=>x.type=='editable_table').forEach(cntl=>
//     {
//       if (cntl.type == 'editable_table' && cntl.table && cntl.table.tableColumns.length > 0) {
//         this.table = cntl.table;
//         this.listOfColumn = cntl.table.tableColumns;
//         this.gridDataSource = cntl.table.dataSource;
//         if (this.listOfColumn && this.listOfColumn.length > 0 && this.gridDataSource && this.gridDataSource.length > 0) {
//           this.errors = null;
//     let url = this.gridDataSource;
//     let selector = this.gridDataSource.substring(this.gridDataSource.indexOf("[") + 1, this.gridDataSource.lastIndexOf("]"));
//     if (selector && selector.length > 0 && selector == '_id') {
//       url = url.replace('[' + selector + ']', this.parentId);
//     }
//     if (selector && selector.length > 0 && selector == 'parentId') {
//       url = url.replace('[' + selector + ']', this.parentId);
//     }
//     this.rendererService.getData(url).subscribe(data => {
//       this.gridData = data.data;
//     }, err => {
//       this.errors = err.error.msg;
//     });
//         }
//       }

//     })
// }
  bindDropDownList() {
    this._controls.filter(x => x.type == 'select' ||x.type=='checkboxlist'|| x.type == 'multiselect' || x.type == 'radiobutton').forEach(ctrl => {
      if (ctrl.options?.dataSourceType == 'json') {
        this.rendererService.getDefaultData(ctrl.options?.dataSource).subscribe(x => {
          if (ctrl.options) {
            ctrl.options.list = x;
          }

        })
      }
      else if (ctrl.options?.dataSourceType == 'api') {
        const regexPattern = /\[[^\]]+\]|\S+/g;
        this.rendererService.getData(ctrl.options?.dataSource).subscribe(x => {
          if (ctrl.options) {
            if (ctrl.options?.textField && (ctrl.options?.textField.indexOf('[') >= 0 && ctrl.options?.textField.indexOf(']') >= 0)||
            (ctrl.options?.valueField.indexOf('[') >= 0 && ctrl.options?.valueField.indexOf(']') >= 0)) {
              ctrl.options.list = x.data.map(x => {
                const textFieldArray = ctrl.options?.textField.match(regexPattern).map(m => {
                  if (m.startsWith('[') && m.endsWith(']')) {
                    return x[m.replace('[', '').replace(']', '')]
                  } else {
                    return x[m];
                  }
                });
                const valueFieldArray = ctrl.options?.valueField.match(regexPattern).map(m => {
                  if (m.startsWith('[') && m.endsWith(']')) {
                    return x[m.replace('[', '').replace(']', '')]
                  } else {
                    return x[m];
                  }
                });
                return { textField: textFieldArray.join(' '), valueField: valueFieldArray.join(' ') };



              });
              ctrl.options.textField = 'textField';
              ctrl.options.valueField = 'valueField';
            }
            
            else {
              ctrl.options.list = x.data;
            }

          }
        })
      }
      else if (ctrl.options?.dataSourceType == 'counter') {
        const tempArr = ctrl.options?.dataSource.split('-');
        if (tempArr.length == 2) {
          ctrl.options.list = [];
          let start = parseInt(tempArr[0]);
          let end = parseInt(tempArr[1]);
          for (let index = start; index <= end; index++) {
            ctrl.options.list.push({ textField: index, valueField: index });
          }
          ctrl.options.textField = 'textField';
          ctrl.options.valueField = 'valueField';

        }
        //DO Nothing
      }
      else if (ctrl.options?.dataSourceType == 'static') {
        //DO Nothing
      }
    });
  }

  initializeForm() {
    if (this.form && this.config) {
      //All form Controls Keys
      const controls = Object.keys(this.form?.controls);

      //All Control Config Keys
      const configControls = this.controls.map((item) => item.fieldId);

      //Find FormControls which not incuded in Control Config Keys and removed from Form
      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form?.removeControl(control));

      // find all configcontrols which not included in form
      configControls
        .filter((control) => !controls.includes(control))
        .forEach((fieldId) => {
          const config = this.controls.find((control) => control.fieldId === fieldId) ?? {} as ControlConfig;
          this.form?.addControl(fieldId, this.createControl(config));
        });

    }
    console.log('test',this.form);
  }
  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.fieldId, this.createControl(control)));
    return group;
  }

  createControl(config: ControlConfig) {
    const { isDisabled, validations, value } = config;
    //return this.fb.control({ isDisabled, value }, this.getValidations(validations));
    return this.fb.control(value, this.getValidations(validations));
  }

  handleSubmit(event: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.form.valid) {
      this.submit.emit(this.value);
    } else {
      this.validateAllFormFields(this.form);
    }


  }

  setDisabled(fieldId: string, disable: boolean) {
    if (this.form?.controls[fieldId]) {
      const method = disable ? 'disable' : 'enable';
      this.form?.controls[fieldId][method]();
      return;
    }

    this._controls = this._controls.map((item) => {
      if (item.fieldId === fieldId) {
        item.isDisabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form?.controls[name].setValue(value, { emitEvent: true });
  }

  getValidations(valString?: ControlValidation[]): ValidatorFn[] {
    const _validations: ValidatorFn[] = [];
    valString?.forEach(val => {
      if (val.type == 'required')
        _validations.push(Validators.required);
      if (val.type == 'email')
        _validations.push(Validators.email);
      if (val.type == 'minlength') {
        _validations.push(Validators.minLength(parseInt(val.length)));
      }
      if (val.type == 'maxlength') {
        _validations.push(Validators.maxLength(parseInt(val.length)));
      }
      if (val.type == 'pattern') {
        _validations.push(Validators.pattern(val.pattern));
      }
    });
    return _validations;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      //console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
