import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../shared/item';
import {ItemFactory} from '../../shared/Item-factory';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../item.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'av-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  public registerForm!: FormGroup;
  public id!: string;
  public error!: HttpErrorResponse;
  public item = ItemFactory.empty();

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private is: ItemService, private router: Router) { }

  // TODO validators
  // TODO async validator for ID
  // TODO einverkauf in html ändern

  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        this.id = params.id;


        if (this.id === 'new') {


          const imageGroup = this.fb.group({
            url: [this.item.images[0].url],
            title: [this.item.images[0].title]
          });

          this.registerForm = this.fb.group({
            id: [this.item.id, Validators.required],
            description: [this.item.description, Validators.required],
            number: [this.item.number],
            purchasingPrice: [this.item.purchasingPrice],
            retailPrice: [this.item.retailPrice],
            launchDate: [this.item.launchDate],
            images: this.fb.array([imageGroup])
          });

        } else {

          this.is.getItem(this.id).subscribe(
            value1 => {
              this.item = value1;
              const imageGroup = this.fb.group({
                url: [this.item.images[0].url],
                title: [this.item.images[0].title]
              });

              this.registerForm = this.fb.group({
                id: [this.item.id, Validators.required],
                description: [this.item.description, Validators.required],
                number: [this.item.number],
                purchasingPrice: [this.item.purchasingPrice],
                retailPrice: [this.item.retailPrice],
                launchDate: [this.item.launchDate],
                images: this.fb.array([imageGroup])
              });

            }
          );

        }
      }
    );

  }

  get images(): FormArray {
    return this.registerForm.get('images') as FormArray;
  }

  addImageControl(): void {
    const imageGroup = this.fb.group({
      url: [''],
      title: ['']
    });
    this.images.push(imageGroup);
  }

  removeImageControl(i: number): void {
    this.images.removeAt(i);
  }

  get ItemForm(): Item {
   return this.registerForm.value;
  }

  itemAendern(): void {

  }

  itemLoeschen(): void {
    this.is.deleteItem(this.ItemForm.id).subscribe(
      value => {this.router.navigate(['/']); },
      error => this.error = error
    );
  }

  createItem(): void {
    this.is.createItem(this.ItemForm).subscribe(
      value => {
        this.router.navigate(['/']);
      },
      error1 => this.error = error1
    );
  }
}
