import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../_service/firestore.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  selectedTab = 'daily';
  keymappings = {
    daily: [],
    todo: [],
    link: [],
    knowledge: []
  };
  keymappingForm: FormGroup;
  constructor(private fireService: FirestoreService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setSelected('daily');
    this.keymappingForm = this.formBuilder.group({
      key: '',
    });
  }

  onKeywordCreate(data) {
    console.log(data);
    const toSend = {
      [data]: this.selectedTab
    };
    this.fireService.createDailyKeymapping(toSend, this.selectedTab)
      .then(res => {
        this.setSelected(this.selectedTab);
        swal.fire('Yeaa..', 'Key Mapping added Successfully', 'success');
      });
  }
  setSelected(mode) {

    this.selectedTab = mode;
    this.getKeys(mode);

  }
  getKeys(mode) {
    this.fireService.getKeymapping(mode).subscribe(data => {
      if (data) {
        console.log(Object.keys(data.payload.data()));
        this.keymappings[mode] = Object.keys(data.payload.data());
      }

    });
  }

  deleteKeyMapping(selected) {

  }

}
