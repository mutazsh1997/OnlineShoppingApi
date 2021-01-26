import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from '../models/categories';
import { AuthenticatonService } from '../services/authenticaton.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { hasRoleDirective } from '../shared/hasRole.directive';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],

})
export class NavBarComponent implements OnInit {

  @ViewChild("LanguageDropList", { static: false }) LanguageDropList: ElementRef;
  @ViewChild("LanguageArrowIcon", { static: false }) LanguageArrowIcon: ElementRef;

  @ViewChild("accountDrop", { static: false }) accountDrop: ElementRef;
  @ViewChild("AccountArrowIcon", { static: false }) AccountArrowIcon: ElementRef;

  languages: string[] = ["English", "Arabic"];
  categories: Categories[];

  selectedLanguage: string;
  authentications: boolean = false;
  openSearch: boolean = false;

  authMode: string = "login";
  searchQuery: boolean = false;

  constructor(public cartService: CartService,
    public auth: AuthenticatonService,
    private route: Router,
    private activatedRouter: ActivatedRoute,
    private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.selectedLanguage = this.languages[0];
    if (localStorage.getItem('user')) {
      this.auth.userName = this.auth.decodedToken.unique_name
    }
    this.categoryService.getCategories().subscribe((res: Categories[]) => {
      this.categories = res;
      
    })
  }
  dropLangaugeList() {
    if (!this.LanguageDropList.nativeElement.classList.contains("drop-list-show")) {
      this.LanguageArrowIcon.nativeElement.classList.add("rotateArrow")
      this.LanguageDropList.nativeElement.classList.add("drop-list-show")
    } else {
      this.LanguageArrowIcon.nativeElement.classList.remove("rotateArrow")
      this.LanguageDropList.nativeElement.classList.remove("drop-list-show")

    }
  }

  filterCategory(categoryName) {

    this.route.navigate(['/productList'],
      { relativeTo: this.activatedRouter, queryParams: { categoryName: categoryName }, queryParamsHandling: 'merge' });

  }

  dropAccount() {

    if (!this.accountDrop.nativeElement.classList.contains("drop-list-show")) {
      this.AccountArrowIcon.nativeElement.classList.add("rotateArrow")
      this.accountDrop.nativeElement.classList.add("drop-list-show")
    } else {
      this.AccountArrowIcon.nativeElement.classList.remove("rotateArrow")
      this.accountDrop.nativeElement.classList.remove("drop-list-show")

    }
  }
  logout() {

    if (localStorage.getItem('token')) {
      localStorage.removeItem("token");
      localStorage.removeItem("cartKey");
      localStorage.removeItem("user");
      this.auth.decodedToken = null;
      this.auth.currentUser = null;
      this.auth.userName = null;
      this.cartService.getItemsInCart();
      this.route.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }
  openAuthPopup(value) {
    this.authentications = true;
    this.authMode = value;
  }

  checkIflogedIn() {
    return this.auth.loggedIn()
  }
  changeLangauge(language) {
    this.selectedLanguage = language;
    this.LanguageArrowIcon.nativeElement.classList.remove("rotateArrow")
    this.LanguageDropList.nativeElement.classList.remove("drop-list-show")
  }
  SearchPorduct(searchProduct: NgForm) {
    if (searchProduct.value.length > 0)
      this.route.navigate(['productQuery'], { queryParams: { queryValue: searchProduct.value } })
  }
  displaySubmit(searchProduct) {
    if (searchProduct.value.length >= 1) {
      this.searchQuery = true
    }
    else this.searchQuery = false
  }
  openSearchBar() {
    if (window.innerWidth <= 750)
      this.openSearch = !this.openSearch
  }
}

