import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Recipe {
  id: number;
  name: string;
  category: string;
  filename: string;
}


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  endPoint = 'http://localhost:8080/api/recipes';
  httpOptions = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: new HttpHeaders ({ 'Content-Type': 'application/json'})
  };


  constructor(private httpClient: HttpClient) { }

  createRecipe(recipe, blob){
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('category', recipe.category);
    formData.append('file', blob);

    return this.httpClient.post(this.endPoint, formData);
  }

  getRecipe(id): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.endPoint + '/' + id );
  }

  getRecipes(): Observable<Recipe[]>{
    return this.httpClient.get<Recipe[]>(this.endPoint);
  }

  deleteRecipe(id): Observable<Recipe[]>  {
    return this.httpClient.delete<Recipe[]>(this.endPoint + '/' + id, this.httpOptions);
  }

  deleteAllRecipes(): Observable<Recipe[]> {
    return this.httpClient.delete<Recipe[]>(this.endPoint);
  }

  updateRecipe(id, recipe, blob) {
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('category', recipe.category);
    formData.append('file', blob);

    return this.httpClient.put(this.endPoint + '/' + id, formData);
  }
}
