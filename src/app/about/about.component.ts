import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { Course } from "../model/course";

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

firebase.initializeApp(config);
const db = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// db.settings(settings);

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // example of querying doc from firestore
    // db.doc("/courses/MxCj4brrrXQPml6H1M1r")
    //   .get()
    //   .then((snapshot) => console.log(snapshot.data()));

    // example of querying full collection
    db.collection("courses")
      .get()
      .then((snapshots) => {
        let courses: Course[] = [];
        courses = snapshots.docs.map((snapshot) => {
          return <Course>{ id: snapshot.id, ...snapshot.data() };
        });
        console.log(courses);
      });
  }
}
