import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/_service/firestore.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private fireService: FirestoreService) { }

  linkData = [];
  linkForm: FormGroup;
  linkEdit = {};
  linkView = {
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
    this.linkForm = this.formBuilder.group({
      id: [''],
      title: [''],
      tag: [''],
      description: [''],
    });
    this.getLink();
  }
  getLink() {
    this.fireService.getLink().then(data => {
      console.log(data.docs[0].data());
      if (data.docs[0]) {
        this.linkData = [];
        for (let i = 0; i < data.docs.length; i++) {
          this.linkData.push(data.docs[i].data());
          // tslint:disable-next-line: no-string-literal
          this.linkData[i]['id'] = data.docs[i].id;
        }
      }
    });
  }



  setEdit(i) {
    this.linkEdit = this.linkData[i];

    this.linkForm.setControl('id', new FormControl(this.linkEdit['id']));
    this.linkForm.setControl('title', new FormControl(this.linkEdit['title']));
    this.linkForm.setControl('tag', new FormControl(this.linkEdit['tag']));
    this.linkForm.setControl('description', new FormControl(this.linkEdit['description']));
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
        this.fireService.updateLink(data);
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
    this.linkView = this.linkData[i];
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
        this.fireService.deleteLink(id);
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
