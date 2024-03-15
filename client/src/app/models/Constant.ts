export class Constant {
    static apiUrl = 'http://localhost:3000/';
   
    static phoneMask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    static emailRegX = /^\s*(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])\s*$/;
    static phoneRegex = /^(\(\d{3}\) )?(\d{3})-(\d{4})$/;
    static getBaseLocation() {
      if (location.host != 'localhost:4200') {
        const paths: string[] = location.pathname.split('/').splice(1, 1);
        const basePath: string = (paths && paths[0]) || '/';
        return '/' + basePath + '/';
      } else {
        return '/';
      }
    }
    static encryptionKey = '7061737323313233';
   

    
  }

  export enum Buttons {
    Ok,
    YesNo
  }
  
  export enum Button {
    Ok,
    Yes,
    No
  }