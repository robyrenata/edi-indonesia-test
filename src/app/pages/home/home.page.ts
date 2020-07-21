import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/shared/services/global.service";
import { ModalController } from "@ionic/angular";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { CacheService } from "src/app/shared/services/cache.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  employeeList = [];
  selectMode = false;

  constructor(private gs: GlobalService, private modalCtrl: ModalController) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeList = this.gs.userEdi.value.data.employees;

    if (this.employeeList.length) {
      this.employeeList.forEach((element) => {
        element.selected = false;
      });
    }

    this.gs.log("employee list?", this.employeeList);
  }

  async openModal(employeeData) {
    const modal = await this.modalCtrl.create({
      component: EmployeeFormComponent,
      componentProps: {
        employeeData,
      },
    });

    modal.onDidDismiss().then((_) => {
      this.getEmployeeList();
    });

    return await modal.present();
  }

  deleteEmployee() {
    const filteredData = this.employeeList.filter(
      (data) => data.selected === false
    );
    const tempData = this.gs.userEdi.value;
    tempData.data.employees = filteredData;
    this.gs.userEdi.next(tempData);
    this.getEmployeeList();
    this.selectMode = false;
  }

  action(idx) {
    this.gs.log("data selected?", idx);
    if (this.selectMode) {
      !this.employeeList[idx].selected
        ? (this.employeeList[idx].selected = true)
        : (this.employeeList[idx].selected = false);
      this.gs.log("new inclist", this.employeeList);
    } else {
      this.gs.log("data pas?", this.employeeList[idx]);
      const dataPass = {
        obj: this.employeeList[idx],
        index: idx,
      };
      this.openModal(dataPass);
    }
  }

  onToggle(event) {
    this.selectMode = event;
    this.employeeList.forEach((element) => {
      element.selected = false;
    });
  }
}
