import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  recipes: any = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    public alertController: AlertController) {}

  ngOnInit() {
    this.getAllRecipes();
  }

  ionViewDidEnter(){
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.recipeService.getRecipes().subscribe(response => {
      this.recipes = response;
    });
  }

  async deleteRecipe(id) {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      subHeader: 'La Receta con id:' + id + ' será eliminada',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.recipeService.deleteRecipe(id).subscribe(() => {
              console.log('Receta con id:' + id + ' borrada');
              this.ionViewDidEnter();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  updateRecipe(id) {
    this.ionViewDidEnter();
    this.router.navigateByUrl(`/update-recipe/${id}`);
  }

   addRecipe(){
    this.ionViewDidEnter();
    this.router.navigateByUrl('/tabs/tab2');
  }

}
