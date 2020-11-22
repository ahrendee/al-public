import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  submitted: boolean = false;
  success: boolean = false;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder,
              private contactService: ContactService) {
    this.createForm();
  }

  get f() {
    return this.contactForm.controls;
  }

  ngOnInit() {
  }

  createForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: [],
      message: []
    });
  }

  onClickSubmit() {
    console.log('submit');
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.success = true;

    // here we will save the info to the database
    console.log(`name: ${this.f.name.value}`);
    console.log(`email: ${this.f.email.value}`);
    console.log(`subject: ${this.f.subject.value}`);
    console.log(`message: ${this.f.message.value}`);

    const entry = {
      name: this.f.name.value,
      email: this.f.email.value,
      subject: this.f.subject.value,
      message: this.f.message.value
    };

    console.log(`sending contact form`);
    this.contactService.send(entry).subscribe(
      (result) => {
        console.log(`contact message entry sent successfully: ${JSON.stringify(result)}`);
      });

    this.contactForm.reset();
    this.submitted = false;
  }
}
