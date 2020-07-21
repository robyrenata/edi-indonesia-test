import { Injectable, isDevMode } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CacheService } from "./cache.service";
import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  userEdi = new BehaviorSubject<any>(null);
  constructor(private cache: CacheService) {
    this.userEdi.subscribe((data) => {
      if (data) {
        this.cache.setStorage("edi-user", data);
        console.log("set to storage?", this.cache.getStorage("edi-user"));
      }
    });
  }

  log(message: string, data: any = null, type: string = "log") {
    if (isDevMode()) {
      if (type === "log") {
        if (data) {
          console.log(message, data);
        } else {
          console.log(message);
        }
      } else if (type === "error") {
        console.error(message, data);
      }
    }
  }

  validatorErrorMessage() {
    return ReactiveFormConfig.set({
      validationMessage: {
        required: "This field is required",
        alpha: "Only alphabet are allowed",
        alphaNumeric: "Only alphanumeric are allowed",
        numeric: "Only numeric are allowed",
        url: "Only URL are allowed (www.example.com)",
        email: "Please input correct email format (ex: someone@example.com)",
        phonenumber:
          "Please input correct phone number format (ex: 08123456789)",
        minLength: "Minimum 9 character",
        maxLength: "Maximum 13 character",
      },
    });
  }
}
