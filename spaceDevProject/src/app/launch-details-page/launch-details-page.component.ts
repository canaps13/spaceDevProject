import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';   
import { HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-launch-details-page',
  templateUrl: './launch-details-page.component.html',
  styleUrls: ['./launch-details-page.component.css']
})
export class LaunchDetailsPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router:Router) { }

  launchId:any;
  launchInfos : any;

  location:any;
  agency:any;
  launcher:any;

  //get launch info with a specific id
  async getLaunchInfosById() {

    return new Promise(resolve => {

      this.http.get("https://ll.thespacedevs.com/2.2.0/launch/upcoming/"+this.launchId).subscribe({
          next: (val:any) => { 
            resolve(val) },
          error: (err) => { resolve(err) },
          complete: () => {}     
      });
    });
  } 

  //get location info with a specific id
  async getLocationInfosById(rocketId:any) {

    return new Promise(resolve => {

      this.http.get("https://ll.thespacedevs.com/2.2.0/location/"+rocketId).subscribe({
          next: (val:any) => { 
            resolve(val) },
          error: (err) => { resolve(err) },
          complete: () => {}     
      });
    });
  } 

  //get agency info with a specific id
  async getAgencyInfosById(agencyId:any) {

    return new Promise(resolve => {

      this.http.get("https://ll.thespacedevs.com/2.2.0/config/agencytype/"+agencyId).subscribe({
          next: (val:any) => { 
            resolve(val) },
          error: (err) => { resolve(err) },
          complete: () => {}     
      });
    });
  } 
  

  async ngOnInit(): Promise<void> {
    this.launchId = this.route.snapshot.paramMap.get('id');
    this.launchInfos = await this.getLaunchInfosById();
    if (this.launchInfos.status === 404){
      this.router.navigate(['404/']);
    }
    if (this.launchInfos.status === 429){
      this.router.navigate(['429/']);
    }

    this.location = await this.getLocationInfosById(this.launchInfos.pad.location.id);
    console.log(this.location)
  }

}
