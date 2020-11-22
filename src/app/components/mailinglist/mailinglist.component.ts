import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailingListService } from './services/mailing-list.service';

@Component({
  selector: 'app-mailinglist',
  templateUrl: './mailinglist.component.html',
  styleUrls: ['./mailinglist.component.scss']
})
export class MailinglistComponent implements OnInit {

  submitted: boolean = false;
  success: boolean = false;
  mailingListForm: FormGroup;

  constructor(private fb: FormBuilder,
              private mailingListService: MailingListService) {
    this.createForm();
  }

  get f() {
    return this.mailingListForm.controls;
  }

  createForm() {
    this.mailingListForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onClickSubmit() {
    this.submitted = true;

    if (this.mailingListForm.invalid) {
      return;
    }

    this.success = true;

    // here we will save the info to the database
    console.log(`saving name: ${this.f.name.value}`);
    console.log(`saving email: ${this.f.email.value}`);

    const entry = {
      name: this.f.name.value,
      email: this.f.email.value
    };

    this.mailingListService.getMailingListEntryByEmail(entry.email)
      .subscribe((existingEmails: any[]) => {
        console.log(`email found: ${JSON.stringify(existingEmails)}`);
        if (existingEmails.length === 0) {
          this.mailingListService.addMailingListEntry(entry).subscribe(
            (result) => {
              console.log(`mailinglist entry saved successfully: ${JSON.stringify(result)}`);
            });
        } else {
          console.log(`email was already in database`);
        }
      });

    this.mailingListForm.reset();
    this.submitted = false;
  }

  ngOnInit() {
  }

}
