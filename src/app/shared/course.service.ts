import { Injectable } from '@angular/core';

@Injectable()
export class CourseService {

  constructor() { }

}

export class Course {
  constructor(public course_id: string,
              public place_id1: string,
              public place_name: string,
              public course_name: string,
              public course_score: string,
              public course_time: string,
              public course_single_double: string,
              public course_day:string,
              public class_scope:string,
              public course_towho:string,
              public class_weekscope:string) {

  }
}
