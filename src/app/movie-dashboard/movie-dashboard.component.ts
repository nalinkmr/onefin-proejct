import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDashboardService } from './movie-dashboard.service';

declare var $: any;

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit {
  public loading = false;
  public reload :boolean = false;
  public movieArray : any;
  public movieArrayList : any;
  public description :any;
  public genres :any;
  public title :any;
  public searchKey: any;
  constructor(private movieDashboardService : MovieDashboardService, private router : Router) { }

  ngOnInit(): void {
    this.getMovie();
  }

  public getMovie(){
    this.loading = true;
    this.movieDashboardService.getMovie().subscribe(
      (response) => {
        if (response.results.length > 0) {
          this.movieArray = response.results;
          console.log(this.movieArray)
          this.loading = false;
          this.reload = false;
        }
      },
      (error) => {
        console.log('Error while geting rooms' + error);
        this.loading = false;
        this.reload = true;
      },
      () => {
        this.loading = false;
        // Put here message
      });
  }

  public editCustomerInfo(customer: any) {
    $('#componentmodal').modal('show');
    // this.custid = customer.custid;
    this.description = customer.description;
    this.genres = customer.genres;
    this.title =customer.title;
    
  }
  // reload page for getting movies
  public reloadPageContent(){
    this.getMovie();
  }

  // clear the searched item
  clearSearch() {
    this.searchKey = null;
  }

  // logout
  public logout() {
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

}
