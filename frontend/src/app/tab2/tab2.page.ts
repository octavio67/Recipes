import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  recipeForm: FormGroup;
  isSubmitted = false;
  capturedPhoto = '';

  constructor(
    public formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.recipeForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = '';
  }

  ngOnInit() {
    this.recipeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get errorControl() {
    return this.recipeForm.controls;
  }

  takePhoto() {

    this.photoService.takePhoto().then(data => {
      try{
      this.capturedPhoto = data.webPath;
    } catch (e)
    {
      console.log('Imagen descartada al tomar foto');
      this.capturedPhoto = null;
    }
    });

  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.recipeForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto !== '') {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.recipeService.createRecipe(this.recipeForm.value, blob).subscribe(data => {
        console.log('¡Photo sent!');
        this.router.navigateByUrl('tabs//tab1');
      });
    }
  }

}
