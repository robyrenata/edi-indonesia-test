import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { IonInput } from "@ionic/angular";
import { CacheService } from "src/app/shared/services/cache.service";
import { GlobalService } from "src/app/shared/services/global.service";
import { Router } from "@angular/router";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
  selector: "app-boarding",
  templateUrl: "./boarding.page.html",
  styleUrls: ["./boarding.page.scss"],
})
export class BoardingPage implements OnInit {
  fg: FormGroup;
  submitted = false;
  @ViewChild("focus") el: IonInput;
  constructor(
    private fb: FormBuilder,
    private cache: CacheService,
    private gs: GlobalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initFormUser();
  }

  initFormUser() {
    this.gs.validatorErrorMessage();
    this.fg = this.fb.group({
      name: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
    });
    setTimeout(() => {
      this.el.setFocus();
    }, 200);
  }

  submitUser() {
    this.submitted = true;
    if (this.fg.invalid) {
      return;
    } else {
      const obj = {
        user: this.fg.value,
        data: {
          employees: [],
        },
      };
      this.gs.log("obj?", JSON.stringify(obj));
      this.cache.setStorage("edi-user", obj);
      this.router.navigate(["/home"]);
    }
  }
}
