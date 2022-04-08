import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  public sort: string;
  public games: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;
  tit: any;
  data: Game[];
  select: any;
  isDesc: boolean;

  constructor(    
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
        if (params['game-search']) {
          this.searchGames('title', params['game-search']);
        } else {
          this.searchGames('title');
        }
      });
    }


    searchGames(sort: string, search?: string): void {
      if ( this.games && search) {
        this.games = this.games.filter(game => {
          return game.title.toLocaleLowerCase().match(search.toLocaleLowerCase())
        })
      } else {
        this.httpService
        .getGameList(sort, search)
        .subscribe((gameList: any) => {
          this.games = gameList;
          console.log(gameList);
        });
      }
     
    }
  
  openGameDetails(id: number  ): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
   sortData(){
     if(this.select) {
       let newSelect= this.games.sort((a, b) => a.id - b.id);
       this.games= newSelect
     }
     else {
       let newSelect = this.games.sort((a,b)=> b.id- a.id);
       this.games= newSelect
     }
     this.select = !this.select;
     console.log(this.games);
   }

   sortTitle(property){
     this.isDesc = !this.isDesc;
     let direction = this.isDesc ? 1: -1;
     this.games.sort(function(a,b){
       if(a[property]< b[property]){
         return -1 * direction;
       }
       else if (a[property] > b[property]){
         return 1* direction;
       }
       else {
         return 0;
       }
      });
     
     
   }

}


// import { Component, OnInit } from '@angular/core';
// import { HttpService } from 'src/app/services/http.service';


// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent implements OnInit {
//   public sort: string;
//   public games: Array<Game>;

//   constructor(
//     private httpService: HttpService,
//     private activatedRoute: ActivatedRoute
//   ) {

//   }

//   ngOnInit(): void {
//     this.games = [
//       {
//         id: 1,
//         background_image: "uuuu",
//         name: "ioana",
//         parent_platforms: [
//           {
//             platform: {
//               slug: "tttt"
//             }
//           }
//         ]
//       }
//     ]

//   }


  

//   openGameDetails(gameId) {
//     console.log(gameId)
//   }

// }
// function gameId(gameId: any) {
//   throw new Error('Function not implemented.');
// }

