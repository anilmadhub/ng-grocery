import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  newItem : groceryItem;
  items: FirebaseListObservable<any[]>;
  isLoading: Boolean;

  /**
   * constructor method to initialize all variables
   * and to fetch the grocery list from firebase json object
   * Inject AngularFire
   */
  constructor(private af: AngularFire){
    this.isLoading = true;
    this.title ="Grocery App";
    this.items = af.database.list('/items');
    this.items.subscribe(x => this.isLoading = false );
    this.newItem = {
      product: '',
      quantity: 1,
      inBasket: false
    };
  }

  /**
   * Function to add items to the grocery list
   */
  addItemToList() {

    let isProductValid: boolean;
    let isQtyValid: boolean;

    isProductValid  = (typeof this.newItem.product !='undefined' && this.newItem.product )? true : false;
    isQtyValid = (typeof this.newItem.quantity !='undefined' && this.newItem.quantity )? true : false;

    if(isProductValid && isQtyValid ){
      let product = this.newItem.product;
      let inBasket = this.newItem.inBasket;
      let quantity = this.newItem.quantity;
      this.af.database.object(`/items/${product}`).set({ inBasket : inBasket, quantity : quantity });
    }

  }

  /**
   * Update status of item when it is placed in basket
   */
  updateItem(product, inBasket) {
    inBasket = (inBasket)? false :true;
    this.af.database.object(`/items/${product}`).update({ inBasket : inBasket });
  }

  /**
   * Function to delete item from the list
   */
  removeItem(product){
    this.af.database.object(`/items/${product}`).remove();
  }

  clearInputProduct(){
    this.newItem.product = "";
  }

}

interface groceryItem {
  product: string;
  quantity: number;
  inBasket: Boolean;
}
