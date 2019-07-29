import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  headers = new HttpHeaders()
    .set("Content-Type", "application/json")

  constructor(private httpclient: HttpClient) { }

  getUserInfo(){
    return new Promise(resolve => {
      this.httpclient.get("http://7ec07f77.ngrok.io/users/getuserInfo").subscribe(response => {
        let res = response

        // console.log(res);
        resolve(res);
      }, err => {
        alert(JSON.stringify(err));
      });
    }).catch(err => {
      console.log(err)
    })
  }

  getInfo(info) {
    let data;
    data = {
      amount: 1
    }
    return new Promise(resolve => {
      this.httpclient.post("http://04984512.ngrok.io/payment/createPayment", info, { headers: this.headers }).subscribe(response => {
        let res = response

        // console.log(res);
        resolve(res);
      }, err => {
        alert(JSON.stringify(err));
      });
    }).catch(err => {
      console.log(err)
    })
  }
}
