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
  private id!: string;
  private error!: HttpErrorResponse;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private is: ItemService, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        this.id = params.id;


        if (this.id === 'new') {
          const item = ItemFactory.empty();

          const imageGroup = this.fb.group({
            url: [item.images[0].url],
            title: [item.images[0].title]
          });

          this.registerForm = this.fb.group({
            id: [item.id, Validators.required],
            beschreibung: [item.description, Validators.required],
            anzahl: [item.number],
            einverkaufspreis: this.fb.group({
              einkaufspreis: [item.purchasingPrice],
              verkaufspreis: [item.retailPrice]
            }),
            einfuehrungsdatum: [item.launchDate],
            bilderliste: this.fb.array([imageGroup])
          });

        } else {

          this.is.getItem(this.id).subscribe(
            value1 => {
              const item = value1;
              const imageGroup = this.fb.group({
                url: [item.images[0].url],
                title: [item.images[0].title]
              });

              this.registerForm = this.fb.group({
                id: [item.id, Validators.required],
                beschreibung: [item.description, Validators.required],
                anzahl: [item.number],
                einverkaufspreis: this.fb.group({
                  einkaufspreis: [item.purchasingPrice],
                  verkaufspreis: [item.retailPrice]
                }),
                einfuehrungsdatum: [item.launchDate],
                bilderliste: this.fb.array([imageGroup])
              });

            }
          );

        }
      }
    );

  }

  get images(): FormArray {
    return this.registerForm.get('bilderliste') as FormArray;
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

  register(): void {

  }

  itemAendern(): void {

  }

  itemLoeschen(): void {
    this.is.deleteItem(this.ItemForm.id).subscribe(
      value => {this.router.navigate(['/']); },
      error => this.error = error
    );
  }
}
