import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-thumbnail',
  templateUrl: './form-thumbnail.component.html',
  styleUrls: ['./form-thumbnail.component.less']
})
export class FormThumbnailComponent {

  registrationForm: FormGroup;
  @Output() onUploadFile : EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
   ) {
    this.registrationForm = this.fb.group({
      file: [null]
    }) 
   }
   /*##################### Registration Form #####################*/
  
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBUQDhIQEBIPEBYQEBcPFxYQEA8QFREXFhUVFRUYHiggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOAA4AMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAAAwQCBQEGB//EADUQAAIBAgMHBAEDAwMFAAAAAAABAgMRBCExEhNBUWFxgQUUIjLwobHBI2KRBnLhM0JSgtH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cQAAIqur7mTVXV9zIFWH+vkaKw/18jQJ8VwED8VwEANw2vj+Solw2vj+SoBdf6v84khXX+r/OJIB7HVdy4hjqu5cAEM9X3LiGWr7geFdD6r84khXQ+q/OIDCbE6+CkmxOvgBI/C8RA/C8QKBWI+vkaKxH18gSmqeq7mTVPVdwLQAAIt4+bDePmzIAVwgmk2lmj3drkgpaLsbAlrOzssl0Mbx82axH28CwKKHyvtZ9xm7XJC8LxHgIrrZV1lnwE7x82NxdRWtxuRubAphUz+Ty43NSrU1wT7IiACmWIjwiL9xLmxQAN9xLmxkcRHjEmAC2NWm+CXdGZzz+Ly6aEgAU7x82Ooq6zzz4kSqFmEmmrcbgN3a5IXX+NrZdh4jFcAE7x82bott2ea6ihuH+3gB+7XJHk4JJtJKyGGav1fYCTePmw3j5syAFW4j1DcR6jQAllVadlwyPN/LoZq6vuZAohBSV3qa3EeoYf6+Tc5pK7ATUexpx1uIniZPIxXq7T6LQWAAAAAAAAB6otjFhp8gFAN9tPkLcWB4AAAAmAAPhipcR9N7f24aWIRtCtsvo9QLNxHqZnBRV1qOjJNXQvEfXyAnfy6Hsarbs9HkKNU9V3Ao3EeobiPUaAE/uOge46CAAo3O1nfXMPb9RlLRdjYE7qbGWvElrVnJ9DeLneWQgAAAAASuMjSdrvTh1NJAFKkm7MoWGXMXQ+y/OBYAjcWzvpmee46D56PsQgP9x0PdxfO+uZOXR08AIeGXMmrUknlwOic7ETvJ20AUAAAAAANoVnHqilT28tCEfg5fKzAo9v1Dc7Od9Mx5mr9X2AT7joHuOggAG+3fQPbvoVAAlVlHJ3yyM1MSrZXvwFVdX3EVHmBkAAAG0Iq95XFwVxwD5S28lwzzM+3fQMNr4/kqAmjTcc3bLkb9wuTNV/q/wA4kgFLrp5Z55C/bvoLjqu5cBL7d9Bm/SyzyyHHPqys33AZiMTdWjfqSgAACQDt3s66tXAxOFtL9e5gexMlYDwE7AAF0MSrZp9TTrKWSvnkRU2Op6ruBv276B7d9CoAF76PMN9HmSAAypF5vhqSFteVqa62REAAB7FZgUQp5K2b4nu5lyG4Xich+pzji3CT/p7Wz2usv1A6tJbLvLLKw3fR5nK91OWJnTb+MUmlyZ5V9RpRlsykr8bJu3+AOpOakrLNsTuZcv2PMNJNpp3T0a7FoEipSXAfvo8yT1aNbZvRmoqKk5X45cDk+lVK1S05TThdpriwPoJ4iKV7nPk7u5NU9QpXs5cdnjk0aoYqE7qDu468AHASS9SpJ22v0dimNSOzttrZSvfgBThorWXgdVW07xzWhzY+p0Wr7a1toy73dOlDaqSUU3l1yWiA93MuX7GatOyzyfDqMwnqFKrlTkm1wzT/AMM3iuAEAA0AAmVwg1Z2y18EhdSlen4aAZvo8w30eZIAHuy+TDZfJlwARYp/GKJhuJ+z7igA3SRgswGj7gbw+V75dzg1KG8rYiK1spR/3KzR3cVwIaeFjGcqiveet9AOXga7qVak1e7pfqkjXpVKEqE3JJu72m9VlkdX07Awp1JTje8k730zaZ5W9CpSk2tuO1nJRdotgTf6bb3avopO3ax3Npc0IVGNOnsQVklkvIgB+Mmt3LNfSXHocL0SX9K39z/gqx+EjVttX+PJ21EUPToQkpLauubyA5tWK2Kr475fuU0pKFaTtkqKdl2RW8DBqSztOW08+NzccLHacs25R2XysBzae8qU5SSpRgk+GeX8nlS/tI623jTOjH0imsrzs+F/jcseGhSwzjsyqRWbjrJ5gcb1aFNU6exa91a3FW4+TeP2t/TSUXaKcVPKLfG/+BNTDxqOMKFKrF7V5OpfJcuiO56lgoVNlTWcVk1k0BFTwtbfwqyVKFsnsNK67cTsYjO1s+xy8P6bCElK85NabTvY6mF4gSVVZmCrHrTySgBVhn8GvzQlHYbXyBrZfJhsvky4AACHafNhtPmwMYn7PuKKcVH4xZMAFmB0fcjN0nYCvE8BBB6lVjdKdacP7YK8pdegr0jFPf7tSnOEou28VpJpX/gDs4bXx/JUcDDYiVOrVpzk3s/ON/8AxXD9UZ9MqzdOdSc2tpvZu8opcQO7W+r/ADiRTlY4FXEpJuNetKS6PYbOjFyrUk3Jxckm3HoAYWrOUpKcbJP45WvmxWLxzpt3ptxX/domL9KnJympSctlpK/dm/W/+l/7IC2nK6T5pP8AyPhGwnCR+MX/AGr9iDFVabnK9eq3wVON4x6dQOlia2xBytfZV7cyr06vvKUZ2ttXy5ZtHGw2JlUwlXb+Thkm9WstSSnTqqgqkaklsLKK0tcD6H1DGypWcacqis23HSNuYnD4vfRU0tm91bXRsQq7nh3J3u6bv3sb/wBMr+gv98gKB+F4nE9Txm1XdJ1HSpwWbis5Oyf8nnp2Me9dJVHUg03GTyYHYx708kpuq7swADsNr5ElWGj8G/zQCwCHafNhtPmwPAK9zHkG5jyAVWjen2SZEV1JvNXy0JAA9izwAJsRhKm+VanFVLKzi3YZhsJWeJVapGKWy18XfZyaSLadTJWyfH/6a30uYHO9dwFSU1UpW+UXCWdvz/g1LCf0N0svjbzr+50qT2naWatcnxEle0dF+oHEVGtut1sRVuN83ncppxqwpxjCMXJZNN5ItADk4alXpuTUIvbd3d6fly7G4V1abisnr0vyKYRu7HRjQiuAHGwTrZRqRioqNrrUxgsJiKLnGEISVTNSbtb8udzcx5CHVkuIHMwfptWNCrCSW1N/HPUklhMTGnudmNnq75xV72O7vZcx1OCkrvNsDn0sNalu/wC3ZuI9Kp4mithRhKG3m280na52dzHkKqvZdo5K1wOdjsBUjW31GMZ7StKM+drX/Q1RVZyvUp06cUnbZ+zfcs3suf7GKtXKzzfDpzAQ2AAAF1ONqfi5CkVwm20m8tPACwK9zHkG5jyAYBL7h9A9w+gGKur7iKiLVSTzd88zyphk1le/ACEAaAD2LsOEGoyt/AG5VLZLirCgAABICujhsru93yAVSja3c6Al0Es88sxfuH0AqIZ6vuM9w+gxUE8888wJiuh9V+cTPt1zZiVRx+KtZcwKSbE6+Dz3D6GklNXllbLICdipO5qrJXyvbqYAAAIq+SA3TQ6lqu46GGSWrPXSSzV8swHAS+4fQPcPoAoB/tuoe26gNpaLsbEb7ZytpkHuegE+Lj8riC509vPTgTV6Lj1QCgAAAAAB2GheSv8AmR0DnUqtmm+BSsUuQD56PsQlG/vlbXI89v1AQXR08CPb9T3f2ytpkA8jr/Z/nAY8WuRNVrXd1xA9bsYlUbVuBhsAAAAAKMHH5X6GaFByz0X7lChsZ68AKDNX6vsK9x0DfbWVtcgJwH+26h7bqBQArfx6hv49QJ6ur7mRsqTbutHmebiXQB2H+vkZKKasxMJqKs9TW/j1AjxFHZfR6Ci6otv68OYmeFlwAnAGgAAAAPU2bVeXNiwAY68ubFtgAAAAAAAJX0AB2Ho7Tz0X6mo4WXEdT+H248gHpWyQvEfXyG/j1MzmpKy1AnNU9V3NbiXQ9jSad3oswKgFb+PUN/HqBKBrdvkw3b5MCqlouxsXCaSSbWhreR5oCbEfbwLG1k27rNdDG7fJgOwvEeIofG98u43eR5oBOLgmr9SNwLq72lZZ58BG7fJgTNAV04Weay430Nyp03y8OwEIFUsPDhIX7d8n/gBIDvbvkxkcPDjICUEi+NOmuXnMXUhd5LLhbQCdU+ZZhIpLyJ3b5MfRdlZ5Z8QHCMVwG7yPNCq/yts59swJxuH+3gxu3yZuimnd5LqBUYq/V9g3keaPJzTTSazQEgGt2+TDdvkwLQAAIqur7mTVXV9zIFWH+vkaKw/18jQJ8VwED8TwEANw2vj+Solw2vj+SoBdf6v84khXW+r/ADiSAex1XcuIY6ruXABDPV9y4hlq+4HhXQ+q/OJIV0PqvziAwmxOvgpJsTr4ASPwvEQPwvECgViPr5GisR9QJTVPVdzJqnqu4FoAAH//2Q==";
  editFile: boolean = true;
  removeUpload: boolean = false;

  onFileSelected(event) {
    let reader = new FileReader(); 
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
    console.log(this.imageUrl);
    this.onUploadFile.emit(this.imageUrl);
  }
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }
   onSubmit(){
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
        console.log(this.registrationForm.value)
        return true;
    }
  }

  removeImage() {
    this.imageUrl = null;
  }

  editImage() {
    // Trigger the file input click event to open the file dialog
    this.imageUrl.nativeElement.click();
  }
}
