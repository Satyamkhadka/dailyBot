import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/_service/firestore.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private fireService: FirestoreService) { }

  dailyData = [];
  dailyForm: FormGroup;
  dailyEdit = {};
  dailyView = {
    name: ' ',
    price: ' ',
    discount: ' ',
    shortDescription: ' ',
    keyword: ' ',
    description: ' ',
    category: ' ',
    subCategory: ' ',
    downloadURL: ' ',
    meta: ' '
  };
  viewId: number;
  ngOnInit() {
    this.dailyForm = this.formBuilder.group({
      id: [''],
      title: [''],
      tag: [''],
      description: [''],
    });
    this.getDaily();
  }
  getDaily() {
    this.fireService.getDaily().subscribe(data => {
      if (data[0]) {
        this.dailyData = [];
        for (let i = 0; i < data.length; i++) {
          this.dailyData.push(data[i].payload.doc.data());
          // tslint:disable-next-line: no-string-literal
          this.dailyData[i]['id'] = data[i].payload.doc.id;
        }
      }
      console.log(this.dailyData);
    });
  }



  setEdit(i) {
    this.dailyEdit = this.dailyData[i];

    this.dailyForm.setControl('id', new FormControl(this.dailyEdit['id']));
    this.dailyForm.setControl('title', new FormControl(this.dailyEdit['title']));
    this.dailyForm.setControl('tag', new FormControl(this.dailyEdit['tag']));
    this.dailyForm.setControl('description', new FormControl(this.dailyEdit['description']));
  }

  onEdit(data) {
    swal.fire({
      title: 'Are you sure?',
      text: 'Update Info?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, keep as it is'
    }).then((result) => {
      if (result.value) {
        this.fireService.updateDaily(data);
        swal.fire(
          'updated!',
          'updated successfully',
          'success'
        );
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'update cancelled :)',
          'success'
        );
      }
    });
  }


  setView(i) {
    console.log(i);
    this.dailyView = this.dailyData[i];
    this.viewId = i;
  }


  onDelete(id) {
    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.fireService.deleteDaily(id);
        swal.fire(
          'Deleted!',
          'deleted successfully',
          'success'
        );

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Deletion Cancelled :)',
          'error'
        );
      }
    });
  }
}
