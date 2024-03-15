import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { ControlConfig } from 'src/app/models/renderer';
import { FormTypeTextComponent } from '../form-type-text/form-type-text.component';
import { FormThumbnailComponent } from 'src/app/shared/components/form-thumbnail/form-thumbnail.component';
import { EditableTableComponent } from 'src/app/shared/editable-table/editable-table.component';

const components: { [type: string]: Type<Field> } = {
  hidden: FormTypeTextComponent,
  text: FormTypeTextComponent,
  number: FormTypeTextComponent,
  select: FormTypeTextComponent,
  multiselect: FormTypeTextComponent,
  textarea: FormTypeTextComponent,
  fileupload: FormTypeTextComponent,
  radiobutton: FormTypeTextComponent,
  date: FormTypeTextComponent,
  time: FormTypeTextComponent,
  imageupload: FormTypeTextComponent,
  label:FormTypeTextComponent,
  checkbox:FormTypeTextComponent,
  table:EditableTableComponent,
  checkboxlist:FormTypeTextComponent,
  rangecalender:FormTypeTextComponent,
  editable_table:EditableTableComponent,
  button:FormTypeTextComponent,
  schedularCalender:FormTypeTextComponent,
  matCards:FormTypeTextComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input()
  config!: ControlConfig;

  @Input()
  group!: FormGroup;
@Input() parentId!:string;
  component!: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
      this.component.instance.parentId=this.parentId;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.component.instance.parentId=this.parentId;
  }
}
