import { Injectable } from '@angular/core';
import skygear from 'skygear';

@Injectable()
export class SkygearService {
  isConfigurated = false;
  getSkygear() {
    if (this.isConfigurated) {
      return Promise.resolve(skygear);
    }
    let promise = skygear.config({
      'endPoint': 'https://searcheng.skygeario.com/',
      'apiKey': '5053d9652cee4030a425a3f08d90ac8c',
    });
    promise.then(()=> this.isConfigurated = true);
    return promise;
  }
}
