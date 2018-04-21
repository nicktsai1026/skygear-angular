import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import skygear from 'skygear';
import { SkygearService } from './skygear.service';
// import { skygearCloud } from 'skygear/cloud';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  infoDatas: any;
  inputValue: any;
  title = 'Loading...';
  skygear = null;
  
  constructor(private skygearService: SkygearService) {
  }
  
  ngOnInit(): void {
    this.skygearService.getSkygear()
    .then((skygear) => {
      this.skygear = skygear;
      this.title = "Configurated";
    })
    .then(() => {
      return this.skygear.auth.signupAnonymously();
    })
    .then((user) => {
      return this.title = "Signed up anonymous user: " + user.id;
    })
    .catch((error) => {
      this.title = "Cannot configure skygear";
    });
  }
  
  checkRecord() {
    console.log(this.inputValue)
    this.skygearService.getSkygear()
    .then((skygear) => {
      this.skygear = skygear;
      const stealJob = skygear.Record.extend('stealjobs');
      const stealJobQuery = new skygear.Query(stealJob);
      stealJobQuery.equalTo('category', this.inputValue);
      return this.skygear.publicDB.query(stealJobQuery);
    })
    .then((record)=> {
      // this.title = "Saved record: " + record.id;
      console.log(record)
      this.infoDatas = record;
    });
  }
}
