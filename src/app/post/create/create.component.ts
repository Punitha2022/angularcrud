import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
 form:FormGroup = new FormGroup({
  title: new FormControl(''),
      body: new FormControl('')

 })
 submitted=false;
  constructor(public postService: PostService,
    private router: Router,
    private formBuilder:FormBuilder) {
     }
    get f(){
      return this.form.controls;
    }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    }); 
  }
  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res:any) => {
         console.log('Post created successfully!');
         this.router.navigateByUrl('post/index');
    })
  }
}
