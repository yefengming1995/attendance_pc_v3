import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {URLSearchParams,Http} from "@angular/http";

@Injectable()
export class KeyService {

  constructor(private http:Http) { }
  private keys: Key[] = [

    new Key(10,'信息管理','test/welcome', 'fa fa-archive', [
        {
          id:100,
          name:'院系管理',
          router:'department',
          icon:'fa fa-university',
          children:[],
          flag:false,
          father:10
        },
        {
          id:101,
          name:'教师管理',
          router:'teacher',
          icon:'fa fa-graduation-cap',
          children:[],
          flag:false,
          father:10
        },
        {
          id:102,
          name:'学生管理',
          router:'student',
          icon:'fa fa-user-plus',
          children:[],
          flag:false,
          father:10

        },
        {
          id:103,
          name:'课程管理',
          router:'course',
          icon:'fa fa-calculator',
          children:[],
          flag:false,
          father:10
        },
        {
          id:104,
          name:'授课安排',
          router:'teachingarrange',
          icon:'fa fa-calendar-times-o',
          children:[],
          flag:false,
          father:10
        }
      ],false,1),
    new Key(11,'考勤管理','test/welcome', 'fa fa-users',[
      {
        id:110,
        name:'历史记录',
        router:'historyrecord',
        icon:'fa fa-sitemap',
        children:[],
        flag:false,
        father:11

      },
      {
        id:111,
        name:'考勤排行榜',
        router:'rankinglist',
        icon:'fa fa-bar-chart',
        children:[],
        flag:false,
        father:11
      },
      {
        id:112,
        name:'考勤参数设置',
        router:'parameter',
        icon:'fa fa-pencil',
        children:[],
        flag:false,
        father:11
      }
    ],false,1),
    new Key(12,'成绩管理','test/welcome', 'fa fa-trophy',[
      {
        id:120,
        name:'统计成绩',
        router:'test1',
        icon:'fa fa-tasks',
        children:[],
        flag:false,
        father:12
      }
    ],false,1),
    new Key(13,'系统管理','test/welcome', 'fa fa-gear',[
      {
        id:130,
        name:'角色管理',
        router:'role',
        icon:'fa fa-user',
        children:[],
        flag:false,
        father:13
      },
      {
        id:131,
        name:'用户管理',
        router:'user',
        icon:'fa fa-github-alt',
        children:[],
        flag:false,
        father:13

      },
      {
        id:132,
        name:'权限管理',
        router:'permission',
        icon:'fa fa-plus-square-o',
        children:[],
        flag:false,
        father:13
      }
      ],false,1),
    new Key(14,'消息管理','test/welcome', 'fa fa-commenting-o',[
      {
        id:140,
        name:'请假管理',
        router:'askforleave',
        icon:'fa  fa-hand-paper-o',
        children:[],
        flag:false,
        father:14
      }
    ],false,1),
  ];

  getKeyCode(username,password):Observable<Object[]>{
    let d1 = new URLSearchParams();
    d1.append('username', username);
    d1.append('password', password);
    return this.http.post('/login/LoginJudge', d1)
      .map(res => res.json());
}

  getKeys(): Key[] {
    return this.keys;
  }
  getKey(id: number): Key {
    var key =this.keys.find(key => key.id ==id);
    if(!key){
      key =new Key(-1, '', '', '',[],false,-1);
    }
    return key;
  }
  getChildrenKey(id:number):Key{
    var p:number=0;
    for(p=0;p<this.keys.length;p++)
    {
      if(key)
      {
        break;
      }
      var key =this.keys[p].children.find(key => key.id ==id);
    }
    //console.log(key);
    if(!key){
      key =new Key(-1, '', '', '',[],false,-1);
    }
    return key;
  }

  getFatherKey(id:number):number{
    var p:number=0;
    for(p=0;p<this.keys.length;p++)
    {
      if(key)
      {
        break;
      }
      var key =this.keys[p].children.find(key => key.id ==id);
    }
    //console.log(key.father);
    return key.father;
  }
}

export class Key {
  constructor(public id: number,
              public name: string,
              public router: string,
              public icon: string,
              public children:Array<Key>,
              public flag:boolean,
              public father:number)
  {

  }
}


