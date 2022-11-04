import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private recipeService: RecipeService,
    public alertController: AlertController) {}

  async deleteAllRecipes() {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      subHeader: 'Todos las Recetas serán eliminadas',
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
            this.recipeService.deleteAllRecipes().subscribe(() => {
              console.log('Todos las recetas borradas');
            });
          },
        },
      ],
    });
    await alert.present();
  }


}
