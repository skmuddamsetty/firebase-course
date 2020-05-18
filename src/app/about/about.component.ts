import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { Course } from "../model/course";
import { AngularFirestore } from "@angular/fire/firestore";

const config = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId",
};

// firebase.initializeApp(config);
// const db = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// db.settings(settings);

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    // // example of querying doc from firestore
    // db.doc("/courses/MxCj4brrrXQPml6H1M1r")
    //   .get()
    //   .then((snapshot) => console.log(snapshot.data()));
    // ******************************************************
    // // example of querying full collection
    // db.collection("courses")
    //   .get()
    //   .then((snapshots) => {
    //     let courses: Course[] = [];
    //     courses = snapshots.docs.map((snapshot) => {
    //       return <Course>{ id: snapshot.id, ...snapshot.data() };
    //     });
    //     console.log(courses);
    //   });
    // *********************** USING ANGULAR FIRE*********************************
    // *********************** USING Value Changes*********************************
    this.db
      .collection("courses")
      .valueChanges()
      .subscribe((val) => console.log(val));
    // ******************** USING SnapShot changes*********************************
    this.db
      .collection("courses")
      .snapshotChanges()
      .subscribe((snaps) => {
        const courses: Course[] = snaps.map((snap) => {
          const courseData: Object = snap.payload.doc.data();
          return <Course>{
            id: snap.payload.doc.id,
            ...courseData,
          };
        });
        console.log(courses);
      });
    // ********************* USING State Changes*********************************
    // state changes returns the total collection at first, but after that only changed documents are retrieved again unlike snapshot and value changes
    this.db
      .collection("courses")
      .stateChanges()
      .subscribe((snaps) => {
        const courses: Course[] = snaps.map((snap) => {
          const courseData: Object = snap.payload.doc.data();
          return <Course>{
            id: snap.payload.doc.id,
            ...courseData,
          };
        });
        console.log(courses);
      });
  }
}
