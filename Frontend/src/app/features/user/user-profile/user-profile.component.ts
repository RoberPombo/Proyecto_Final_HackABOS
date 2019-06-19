import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() public userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userServ: UserService,
  ) { }

  ngOnInit() {
    if (this.userServ.userProfile) {
      console.log(this.userServ.userProfile);
    } else {
      this.userServ.getUserProfile().subscribe(
        () => console.log(this.userServ.userProfile),
      );
    }
    this.userForm = this.fb.group({
    });
  }

  onSubmit(formValue) {
    console.log(formValue);
  }

}
