import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  paymentRes: any;

  constructor(
    public payServ: PaymentService,
    public iab: InAppBrowser,

  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getData(amt)
  }

  redirectPaypal(link) {
    this.iab.create(`` + link, `_blank`)
  }

  getData(amt: NgForm) {
    console.log(amt.value)
    if (amt.value == "") {
      alert("Please input amount");
    } else {

      Promise.resolve(this.payServ.getInfo(amt.value)).then(data => {
        console.log(data)
        this.paymentRes = data
        console.log(this.paymentRes.links[1])

        if (this.paymentRes.state = "created") {
          this.redirectPaypal(this.paymentRes.links[1].href)
        } else {

        }
      }).catch(e => {
        console.log(e);
      });

    }
  }

}
