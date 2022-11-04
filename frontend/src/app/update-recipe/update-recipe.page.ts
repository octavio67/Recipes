/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.page.html',
  styleUrls: ['./update-recipe.page.scss'],
})
export class UpdateRecipePage implements OnInit {
  updateRecipeForm: FormGroup;
  id: any;
  capturedPhoto = '';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  imageSaved: string = '';

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private photoService: PhotoService )
    {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
     }

   ngOnInit() {
    this.findRecipe(this.id);
    this.updateRecipeForm = this.formBuilder.group({
      name: [''],
      category: [''],
      filename: ['']
    });
  }

 /* ionViewDidEnter(){
    this.findRecipe(this.id);
    this.updateRecipeForm = this.formBuilder.group({
      name: [''],
      category: [''],
      filename: ['']
    });
  }*/

  async findRecipe(id){
      this.recipeService.getRecipe(this.id).subscribe((data) => {
      this.imageSaved = data['filename'];
      this.updateRecipeForm.setValue({
        name: data['name'],
        category: data['category'],
        filename: data['filename']
      });
    });
  }

  async onSubmit() {
    if (!this.updateRecipeForm.valid) {
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto !== '') {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }
      this.recipeService
      .updateRecipe(this.id, this.updateRecipeForm.value, blob)
      .subscribe(() => {
        this.updateRecipeForm.reset();
        this.router.navigate(['/tabs/tab1']);
      });
    }
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


}
