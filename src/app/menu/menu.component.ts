import { Component,OnChanges, OnInit,ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import {Key,KeyService} from "../shared/key.service";
import {RoleService} from "../shared/role.service";
import {Role} from "../shared/role.service";
import {LocalstorageService} from "../services/localstorage.service";
import { ActivatedRoute, Params} from '@angular/router';
import {Http,RequestOptions,Headers,URLSearchParams,HttpModule  } from "@angular/http";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus: Array<Menu>;
  mainMenus:Array<Key>=[];
  childMenus:Array<Key>=[];
  home: Menu;
  role:Role;
  public filter:number=0;
  rolename:Array<string>=['系统管理员','教师','学生'];
  rolekeys:Array<number>=[];
  public i:number;
  public j:number;
  currentMenuId: number;
  currentSmallMenuId: number;
  public roleId:number;
  public father:number=-1;
  public flag:boolean=true;
  public keyarray:string;
  public ss:Array<Object>;
  constructor(public changeDetectorRef:ChangeDetectorRef,public  router: Router,private keyService:KeyService,private roleService:RoleService,private storage:LocalstorageService
  ,private routerInfo:ActivatedRoute,public http:Http) {
  }

  ngOnInit() {

    this.keyarray=this.storage.getItem('data').keys;
    var aa=this.keyarray.split(',');
    for(var n=0;n<aa.length;n++)
    {
      this.rolekeys.push(parseInt(aa[n]));
    }
    console.log(this.rolekeys);

    this.mainMenus = this.keyService.getKeys();
    for (this.i = 0; this.i < this.rolekeys.length; this.i++)
    {
      var temp: number = Number(this.rolekeys[this.i]);
      if (temp == 1) {

        var p:number=0;
        var q:number=0;
        for(p=0;p<this.mainMenus.length;p++)
        {
          this.mainMenus[p].flag=true;
          for(q=0;q<this.mainMenus[p].children.length;q++)
          {
            this.mainMenus[p].children[q].flag=true;
          }
        }
      }
      else if (temp < 100)//temp例子:11,12...
      {
        console.log(temp);
        var key1 =this.mainMenus.find(key => key.id ==temp);
        console.log(key1);
        key1.flag=true;
        var q:number=0;
        for(q=0;q<key1.children.length;q++)
        {
          var key2 =key1.children[q];
          key2.flag=true;
          console.log(key2);
        }
      }
      else if(temp > 99)//100,101,120,131
      {
        console.log(temp);
        var p:number=this.keyService.getFatherKey(temp);//父节点
        var key3 =this.mainMenus.find(key => key.id ==p);
        key3.flag=true;
        var q:number=0;
        for(q=0;q<key3.children.length;q++) {
          if(key3.children[q].id==temp)
          {
            var key4=key3.children[q];
            break;
          }
        }
        key4.flag=true;
        //console.log(key4);
      }
    }
    console.log(this.mainMenus);

    /*var a=this.storage.getItem('data').name;
    var b=this.storage.getItem('data').password;
     this.keyService.getKeyCode(a,b).subscribe(data =>{
        this.ss=data;
        console.log(this.ss);
         this.keyarray=this.ss['data'][0].keys;
         console.log(this.keyarray);
         var aa=this.keyarray.split(',');
         for(var n=0;n<aa.length;n++)
         {
           this.rolekeys.push(parseInt(aa[n]));
         }
         console.log(this.rolekeys);

         this.mainMenus = this.keyService.getKeys();
         for (this.i = 0; this.i < this.rolekeys.length; this.i++)
         {
           var temp: number = Number(this.rolekeys[this.i]);
           if (temp == 1) {

             var p:number=0;
             var q:number=0;
             for(p=0;p<this.mainMenus.length;p++)
             {
               this.mainMenus[p].flag=true;
               for(q=0;q<this.mainMenus[p].children.length;q++)
               {
                 this.mainMenus[p].children[q].flag=true;
               }
             }
           }
           else if (temp < 100)//temp例子:11,12...
           {
             console.log(temp);
             var key1 =this.mainMenus.find(key => key.id ==temp);
             console.log(key1);
             key1.flag=true;
             var q:number=0;
             for(q=0;q<key1.children.length;q++)
             {
               var key2 =key1.children[q];
               key2.flag=true;
               console.log(key2);
             }
           }
           else if(temp > 99)//100,101,120,131
           {
             console.log(temp);
             var p:number=this.keyService.getFatherKey(temp);//父节点
             var key3 =this.mainMenus.find(key => key.id ==p);
             key3.flag=true;
             var q:number=0;
             for(q=0;q<key3.children.length;q++) {
               if(key3.children[q].id==temp)
               {
                 var key4=key3.children[q];
                 break;
               }
             }
             key4.flag=true;
             //console.log(key4);
           }
         }
         console.log(this.mainMenus);
     }
     );*/

  }

  getchildrenkey(item:Key):Array<Key>
  {
    //console.log(item.children);
    return item.children;
  }

  tofresh(){
    location.reload();
  }


}

export class Menu {
  constructor(public id: number,
              public name: string,
              public link: string,
              public icon: string) {
  }
}

