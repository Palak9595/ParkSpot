import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationsService } from 'src/app/services/locations.service';
import { Locations } from 'src/app/models/locations.model';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  showToast = false;
  toastMessage = 'This is a toast notification';
  toastType: 'success' | 'error' = 'success';

  displayToast(message: string, type: 'success' | 'error', duration: number = 3000) {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, duration);
  }
  form = new FormGroup({
    location_name : new FormControl('', Validators.required),
    area : new FormControl('', Validators.required)
  })

  
  constructor(private locationService: LocationsService) { }

  locations$ : Locations[];

  ngOnInit(): void {
    this.loadLocations();
  }

   onSubmit(){
    this.locationService.addLocation(JSON.stringify(this.form.value))
    .subscribe((data => {
      if(data == true){
        this.displayToast("Location Added","success")
      }
      else{
        this.displayToast('Something went wrong',"error")
      }
    }))
   }

   loadLocations(){
    return this.locationService.getLocations()
    .subscribe(data => this.locations$ = data)
  }
}
