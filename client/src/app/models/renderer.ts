
export interface Page {
    pageTitle: string;
    pageTitlePrefix: string;
    breadcrumbs: Breadcrumb[],
    pageActions: PageAction,
    filter: FilterControls[],
    table: Table,
    formConfig: FormConfig;
    editable_table:Table;
    pageConfig: PageConfig;
    tabs: Tab[];
}

export interface Tab {
    tabName: string;
    contentType: string;
    content: string;
    page:Page;
}

export interface PageConfig {
    parentPageJson: string;
    onPopupClose: string;
    defaultData?: string;
    api:string;
    footerActions: PageAction;
}

export interface Breadcrumb {
    menuName: string;
    url?: string;
}

export interface PageAction {
    id?: any;
    action: string;
    options?: any;
    type: string;
    label?: string;
    icon?: string;
    isDisabled: boolean;
    event?: PageActionEvent;

}
export interface PageActionEvent {
    type: string;
    onevent?: string;
    popupJson?: string;
    api: string;
    popupwidth: string;
    postSchema: any;
    expression?: string;
}


export interface Table {
    type: string;
    dataSource: string;
    tableColumns: GridColumn[];
    data: any;
    selectionType?: string;
}

export interface FormConfig {
    rows: Row[]
}

export interface Row {
    columns: Column[];
    css?: string;
}
export interface Column {
    width: number;
    controls: ControlConfig[];
}

export interface ControlConfig {
    id: string,
    label?: string,
    type: string,
    fieldId: string,
    placeholder?: string,
    tooltip?: string,
    validations?: ControlValidation[],
    isDisabled?: boolean,
    isVisible?: boolean,
    isChangeHandle?: boolean,
    css?: string;
    value?: any;
    options?: Option;
    properties?: ControlProperties;
    table?: Table;
    event?: PageActionEvent[]
}
export interface ControlProperties {
    multiple: boolean;
}

export interface ControlValidation {
    type: string;
    length: string;
    pattern?: string;
    message: string;
}
export interface Option {
    dataSource: string;
    dataSourceType: string;
    textField: string;
    valueField: string;
    list: any[];
    expandable: boolean; // for checkbox list
    direction: 'row' | 'column';//for checkbox list- row|column
    groupField: string; // for grouped data - Identify which field is used to bind group
    dataField: string;// for grouped data - Identify which field is used to bind iterative items


}
export interface GridColumn {
    key: string;
    type:string;
    title: string;
    compare?: any;
    priority?: number | boolean;
    dataType?: string;
    format?: string;
    control?: ControlConfig;
    statusColumn?: boolean;
    actions?: PageAction[];
    restrictText?: boolean;
    options?: any;
    screen?: any;
    moreActionItems?: any[];
}

export interface FilterControls {
    name: string;
    placeholder: string | string[] | null;
    type: string;
    options?: DropDownOptions[];
    value?: string;
    defaultValue?: string;
    format?: string;
}
export interface DropDownOptions {
    text: string;
    value: string;
    selected?: boolean;
}
export interface NavItem {
    menuName: string;
    url: string;
}

// export interface PageAction {
//     action: string;
//     options?: any;
// }

export interface GridPagination {
    total: number,
    page: number,
    pageSize: number;
}

