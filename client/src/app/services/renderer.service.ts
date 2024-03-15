import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Constant } from '../models/Constant';
import { Menu } from '../models/menu';
import { Page } from '../models/renderer';

@Injectable({
  providedIn: 'root'
})
export class RendererService {
  assetsPath: string = "assets/forms/";
  defaultDataPath: string = "assets/default-data/";
  baseUrl = Constant.apiUrl;

  private clickSubjectObservable = new Subject();
  clickSubjectObservableStream$ = this.clickSubjectObservable.asObservable();
  constructor(private http: HttpClient) { }

  clickSubject(data: any) {
    this.clickSubjectObservable.next(data);
    }

  getMenus() {
    return this.http.get<Menu[]>(this.assetsPath + 'menu.json');
  }

  getPageJson(json: string) {
    return this.http.get<Page>(this.assetsPath + json);
  }
  getDefaultData(json: string) {
    return this.http.get<any>(this.defaultDataPath + json);
  }
  getData(url: string) {
    return this.http.get<any>(this.baseUrl + url);
  }

  postData(url: string, data: any) {
    if (data['_id'] && data['_id'].length > 0) {
      return this.http.put<any>(this.baseUrl + url + '?_id=' + data['_id'], data);
    } else {
      return this.http.post<any>(this.baseUrl + url, data);
    }
  }

  deleteData(url: string, id: string) {
    return this.http.delete<any>(this.baseUrl + url + '?_id=' + id);
  }
 
  checkCondition(conditionString, obj) {
    const sanitizedConditionString = conditionString.toString().replace(/ /g, ''); // Remove spaces for easier parsing

    if (sanitizedConditionString == 'true' || sanitizedConditionString == 'false')
      return sanitizedConditionString == 'true' ? true : false;

    const isEnable = this.evaluateExpression(sanitizedConditionString, obj);
    return isEnable;
  }

  evaluateExpression(expression: string, obj: any): boolean {
    const orGroups = expression.split('||');

    for (const orGroup of orGroups) {
      const andConditions = orGroup.split('&&');
      let isOrGroupTrue = true;

      for (const andCondition of andConditions) {
        if (!this.evaluateSingleCondition(andCondition, obj)) {
          isOrGroupTrue = false;
          break;
        }
      }

      if (isOrGroupTrue) {
        return true;
      }
    }

    return false;
  }

  evaluateSingleCondition(condition: string, obj: any): boolean {
    let [variable, operator, value] = condition.split(/(==|===|!=|!==)/);
    if (value == 'true' || value == 'false')
      value = JSON.parse(value)
    switch (operator) {
      case '==':
        return obj[variable] == value;
      case '===':
        return obj[variable] === value;
      case '!=':
        return obj[variable] != value;
      case '!==':
        return obj[variable] !== value;
      default:
        // Handle unsupported operators here
        return false;
    }
  }
}
