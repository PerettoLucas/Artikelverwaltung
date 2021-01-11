import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../shared/item';
import {ItemFactory} from '../../shared/Item-factory';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../item.service';

@Component({
  selector: 'av-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  public registerForm!: FormGroup;
  private id!: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private is: ItemService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        this.id = params.id;

        if (this.id === 'new') {
          const item = ItemFactory.empty();

          this.registerForm = this.fb.group({
            id: [item.id, Validators.required],
            beschreibung: [item.description, Validators.required],
            anzahl: [item.number],
            einverkaufspreis: this.fb.group({
              einkaufspreis: [item.purchasingPrice],
              verkaufspreis: [item.retailPrice]
            }),
            einfuehrungsdatum: [item.launchDate],
            bilderliste: this.fb.array([
              [item.images[0]],
              [item.images[1]]
            ]),
          });

        } else {

          this.is.getItem(this.id).subscribe(
            value1 => {
              const item = value1;

              this.registerForm = this.fb.group({
                id: [item.id, Validators.required],
                beschreibung: [item.description, Validators.required],
                anzahl: [item.number],
                einverkaufspreis: this.fb.group({
                  einkaufspreis: [item.purchasingPrice],
                  verkaufspreis: [item.retailPrice]
                }),
                einfuehrungsdatum: [item.launchDate],
                bilderliste: this.fb.array([
                  [item.images[0]]
                ]),
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
    this.images.push(this.fb.control(''));
  }

  register(): void {
    alert(this.images);
  }
}
