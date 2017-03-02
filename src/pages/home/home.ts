import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DragulaService } from "../../../node_modules/ng2-dragula/ng2-dragula"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DragulaService]
})
export class HomePage {
  q1 = [];
  q2 = [];
  q3 = ["stuff"];
  q4 = ["other Stuff"];
  status: any = "Look Here!!!";
 
  constructor(private navCtrl: NavController, private dragulaService: DragulaService) {
    for (var i = 0; i < 5; i++) {
      this.q1.push("Task: " + i );
      this.q2.push("Task: " + (i+5));
    }
    dragulaService.drag.subscribe((value:any) => {
       console.log(`drag: ${value[0]}`); // value[0] will always be bag name
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value:any) => {
       console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value:any) => {
       console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value:any) => {
       console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  private hasClass(el:any, name:string):any {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el:any, name:string):void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el:any, name:string):void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args:any):void {
    let [e] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args:any):void {
    let [e] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args:any):void {
    let [el] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args:any):void {
    let [el] = args;
    this.removeClass(el, 'ex-over');
  }
}


