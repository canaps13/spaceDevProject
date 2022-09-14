import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  result: any;
  
  constructor(
    private http: HttpClient,
    private router:Router) {}

  //get launches infos
  async getLaunchesInfos() {

    return new Promise(resolve => {

      this.http.get("https://ll.thespacedevs.com/2.2.0/launch/upcoming?mode=list").subscribe({
          next: (val:any) => { 
            resolve(val.results) },
          error: (err) => { resolve(err) },
          complete: () => {}     
      });
    });
  } 

  launchDetails(id:any){
    this.router.navigate(['launchDetails/'+id]);
  }

  async ngOnInit(): Promise<void> {
    this.result = await this.getLaunchesInfos();
    if (this.result.status === 404){
      this.router.navigate(['404/']);
    }
    if (this.result.status === 429){
      this.router.navigate(['429/']);
    }

    console.log( this.result)

  }

}
