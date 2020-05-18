import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, first } from "rxjs/operators";
import { Course } from "../model/course";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  loadAllCourses(): Observable<Course[]> {
    return this.db
      .collection("courses")
      .snapshotChanges()
      .pipe(
        map((snaps) => {
          return snaps.map((snap) => {
            const courseData: Object = snap.payload.doc.data();
            return <Course>{
              id: snap.payload.doc.id,
              ...courseData,
            };
          });
        }),
        // first is going to make sure that the value is emitted only for the first time, if there is any change in the database after the courses are loaded this operator will prevent in emitting the new data
        first()
      );
  }
}
