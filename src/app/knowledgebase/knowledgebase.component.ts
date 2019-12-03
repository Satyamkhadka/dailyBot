import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/_service/firestore.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-knowledgebase',
  templateUrl: './knowledgebase.component.html',
  styleUrls: ['./knowledgebase.component.css']
})
export class KnowledgebaseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private fireService: FirestoreService) { }

  knowledgebaseData = [];
  knowledgebaseForm: FormGroup;
  knowledgebaseEdit = {};
  knowledgebaseView = {
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
    this.knowledgebaseForm = this.formBuilder.group({
      id: [''],
      title: [''],
      tag: [''],
      description: [''],
      moreDescription: [''],

    });
    this.getKnowledgebase();
  }
  getKnowledgebase() {
    this.fireService.getKnowledgebase().subscribe(data => {
      if (data[0]) {
        this.knowledgebaseData = [];
        for (let i = 0; i < data.length; i++) {
          this.knowledgebaseData.push(data[i].payload.doc.data());
          // tslint:disable-next-line: no-string-literal
          this.knowledgebaseData[i]['id'] = data[i].payload.doc.id;
        }
      }
      console.log(this.knowledgebaseData);
    });
  }



  setEdit(i) {
    this.knowledgebaseEdit = this.knowledgebaseData[i];

    this.knowledgebaseForm.setControl('id', new FormControl(this.knowledgebaseEdit['id']));
    this.knowledgebaseForm.setControl('title', new FormControl(this.knowledgebaseEdit['title']));
    this.knowledgebaseForm.setControl('tag', new FormControl(this.knowledgebaseEdit['tag']));
    this.knowledgebaseForm.setControl('description', new FormControl(this.knowledgebaseEdit['description']));
    this.knowledgebaseForm.setControl('moreDescription', new FormControl(this.knowledgebaseEdit['moreDescription']));

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
        this.fireService.updateKnowledgebase(data);
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
    this.knowledgebaseView = this.knowledgebaseData[i];
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
        this.fireService.deleteKnowledgebase(id);
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
