import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/_service/firestore.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private fireService: FirestoreService) { }

  todoData = [];
  todoForm: FormGroup;
  todoEdit = {};
  todoView = {
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
    this.todoForm = this.formBuilder.group({
      id: [''],
      title: [''],
      tag: [''],
      description: [''],
    });
    this.getTodo();
  }
  getTodo() {
    this.fireService.getTodo().subscribe(data => {
      if (data[0]) {
        this.todoData = [];
        for (let i = 0; i < data.length; i++) {
          this.todoData.push(data[i].payload.doc.data());
          // tslint:disable-next-line: no-string-literal
          this.todoData[i]['id'] = data[i].payload.doc.id;
        }
      }
      console.log(this.todoData);
    });
  }



  setEdit(i) {
    this.todoEdit = this.todoData[i];

    this.todoForm.setControl('id', new FormControl(this.todoEdit['id']));
    this.todoForm.setControl('title', new FormControl(this.todoEdit['title']));
    this.todoForm.setControl('tag', new FormControl(this.todoEdit['tag']));
    this.todoForm.setControl('description', new FormControl(this.todoEdit['description']));
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
        this.fireService.updateTodo(data);
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
    this.todoView = this.todoData[i];
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
        this.fireService.deleteTodo(id);
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
