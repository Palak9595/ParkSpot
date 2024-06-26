import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  vehicles$ : Vehicle[];
  form = new FormGroup({
    vehicle_type : new FormControl('', Validators.required),
    cost : new FormControl('', Validators.required)
  })
  constructor(private vehicleservice : VehicleService) { }
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
  ngOnInit(): void {
    this.loadVehicle();
  }

  loadVehicle(){
    this.vehicleservice.getVehicles()
    .subscribe(data => this.vehicles$ = data) 
  }

  onSubmit(){
    this.vehicleservice.addVehicle(JSON.stringify(this.form.value))
    .subscribe(data => console.log(data))
    this.displayToast('Vehicle Added',"success")
    location.reload();
  }
}
