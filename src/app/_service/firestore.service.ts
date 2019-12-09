import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }


  addDaily(data) {
    const storeData = {
      createdDate: data[0],
      title: data[1],
      tag: data[3],
      description: data[2]
    };
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('dailyEvent')
        .add(storeData)
        .then(res => {
          resolve();
        }, err => reject(err));
    });
  }

  getDaily() {
    return this.firestore.collection('dailyEvent').snapshotChanges();
  }
  updateDaily(data) {
    const id = data.id;
    delete data.id;
    return this.firestore
      .collection('dailyEvent')
      .doc(id)
      .set(data, { merge: true });
  }
  deleteDaily(id) {
    return this.firestore.collection('dailyEvent').doc(id).delete();
  }

  addKnowledgebase(data) {
    const storeData = {
      createdDate: data[0],
      title: data[1],
      tag: data[4],
      description: data[2],
      moreDescription: data[3]
    };
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('resource')
        .add(storeData)
        .then(res => {
          resolve();
        }, err => reject(err));
    });
  }
  getKnowledgebase() {
    return this.firestore.collection('resource').snapshotChanges();
  }
  updateKnowledgebase(data) {
    const id = data.id;
    delete data.id;
    return this.firestore
      .collection('resource')
      .doc(id)
      .set(data, { merge: true });
  }
  deleteKnowledgebase(id) {
    return this.firestore.collection('resource').doc(id).delete();
  }

  addTodo(data) {
    const storeData = {
      createdDate: data[0],
      title: data[1],
      tag: data[3],
      description: data[2],
      completed: false,
      archive: false
    };
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('todo')
        .add(storeData)
        .then(res => {
          resolve();
        }, err => reject(err));
    });
  }
  getTodo() {
    return this.firestore.collection('todo').snapshotChanges();
  }
  getDashTodo() {
    return this.firestore.collection('todo').ref.limit(5).orderBy('createdDate', 'desc').get()
  }

  updateTodo(data) {
    const id = data.id;
    delete data.id;
    return this.firestore
      .collection('todo')
      .doc(id)
      .set(data, { merge: true });
  }
  deleteTodo(id) {
    return this.firestore.collection('todo').doc(id).delete();
  }

  addLink(data) {
    const storeData = {
      createdDate: data[0],
      title: data[1],
      tag: data[3],
      description: data[2],
    };
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('link')
        .add(storeData)
        .then(res => {
          resolve();
        }, err => reject(err));
    });
  }




  getLink() {
    return this.firestore.collection('link').ref.orderBy('createdDate', 'desc').get();
  }

  getDashLink() {
    return this.firestore.collection('link').ref.limit(5).orderBy('createdDate', 'desc').get();

  }
  updateLink(data) {
    const id = data.id;
    delete data.id;
    return this.firestore
      .collection('link')
      .doc(id)
      .set(data, { merge: true });
  }
  deleteLink(id) {
    return this.firestore.collection('link').doc(id).delete();
  }

  createDailyKeymapping(data, mode) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('key_mappings')
        .doc(mode)
        .set(data, { merge: true })
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }
  getKeymapping(mode) {
    return this.firestore.collection('key_mappings').doc(mode).snapshotChanges();
  }
  deleteKeymapping(mode) {
    return this.firestore.collection('key_mappings').doc('daily')
      .set({ [mode]: firebase.firestore.FieldValue.delete() }, { merge: true });
  }











  createIntro(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('intro_data')
        .add(data)
        .then(res => {
        }, err => reject(err));
    });
  }

  getIntro() {
    return this.firestore.collection('intro_data').snapshotChanges();
  }
  updateIntro(data) {
    const id = data.id;
    delete data.id;
    return this.firestore
      .collection('intro_data')
      .doc(id)
      .set(data, { merge: true });
  }

  createDetail(data) {
    delete data.id;
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('detail_data')
        .add(data)
        .then(res => {
        }, err => reject(err));
    });
  }

  getDetail() {
    return this.firestore.collection('detail_data').snapshotChanges();
  }


  createOffering(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('offering_data')
        .add(data)
        .then(res => {
        }, err => reject(err));
    });
  }

  getOffering() {
    return this.firestore.collection('offering_data').snapshotChanges();
  }
  updateOffering(data) {
    const id = data.id;
    delete data.id;
    return this.firestore
      .collection('offering_data')
      .doc(id)
      .set(data, { merge: true });
  }

  createWhyus(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('whyus_data')
        .add(data)
        .then(res => {
        }, err => reject(err));
    });
  }

  getWhyus() {
    return this.firestore.collection('whyus_data').snapshotChanges();
  }
  updateWhyus(data) {
    const id = data.id;
    delete data.id;
    return this.firestore
      .collection('whyus_data')
      .doc(id)
      .set(data, { merge: true });
  }

}
