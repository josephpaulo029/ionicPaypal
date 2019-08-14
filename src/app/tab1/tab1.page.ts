import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  paymentRes: any;
  paymentAmount: string = '3.33';
  currency: string = 'PHP';
  currencyIcon: string = '';

  constructor(
    public payServ: PaymentService,
    public iab: InAppBrowser,
    public payPal: PayPal,
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

  payWithPaypal(amt: NgForm) {
    console.log(amt.value)
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AbkXxCQUa1ZGqzyPjSV8GBh4_REYRyEO-br_XBDEXwjZ2fFO-E3zxVKAmQ-WON3BKnBh0LMh0XqUnpql'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(amt.value.amount, this.currency, 'Carga Delivery Fee', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

}
