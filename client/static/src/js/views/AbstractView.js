import { goTo, updateNav } from "../helpers/managmentFunctions.js";

export default class {
  constructor(){
    this.countriesListHtml = "";
  }

  setWindowDetails(title, bodyViewAttribute){
    document.title = title;
    window.document.body.setAttribute('view', bodyViewAttribute);
  }


  async getCountryList(){

    const response = await fetch('https://restcountries.com/v2/all');
    const data = await response.json();
    const countryList = data.map(country => country.name);
    const countriesInOrder = countryList.sort((a, b) => a.localeCompare(b));
    countriesInOrder.map(country => {
      this.countriesListHtml += `<option class="countryOptions" value="${country}">${country}</option>`;
    });

    document.getElementById('country').innerHTML = this.countriesListHtml;

  }


  async getHtml(){
   return ""; 
  }

}