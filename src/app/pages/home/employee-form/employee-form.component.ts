import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { GlobalService } from "src/app/shared/services/global.service";
import { ModalController } from "@ionic/angular";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html",
  styleUrls: ["./employee-form.component.scss"],
})
export class EmployeeFormComponent implements OnInit {
  fg: FormGroup;
  submitted = false;
  currDate = new Date();
  @Input() employeeData: any;

  constructor(
    private fb: FormBuilder,
    private gs: GlobalService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.gs.log("DATTTT", this.employeeData);
    this.initFormEmployee(this.employeeData);
  }

  initFormEmployee(data) {
    this.gs.log("data??", data);
    this.gs.validatorErrorMessage();
    this.fg = this.fb.group({
      name: [
        data ? data.obj.name : null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      nik: [
        data ? data.obj.nik : null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required(), RxwebValidators.numeric()],
        }),
      ],
      gender: [
        data ? data.obj.gender : null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      birthdate: [
        data ? data.obj.birthdate : null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
    });
  }

  submitData() {
    this.submitted = true;
    if (this.fg.invalid) {
      return;
    } else {
      const tempData = this.gs.userEdi.value;
      this.gs.log("tempdata?/?", tempData);
      if (!this.employeeData) {
        tempData.data.employees.push(this.fg.value);
        this.gs.userEdi.next(tempData);
        this.dismissModal();
      } else {
        tempData.data.employees[this.employeeData.index] = this.fg.value;
        this.gs.userEdi.next(tempData);
        this.dismissModal();
      }
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
