import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  firstName: string;
  games: any;

 constructor( private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.router.navigate(['search', form.value.search]);
  }
  
  // Search(){
  //   if(this.firstName == ''){
  //     this.ngOnInit()
  //   } else {
  //     this.games = this.games.filter(res => {
  //       return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase())
  //     })
  //   }
  // }
}