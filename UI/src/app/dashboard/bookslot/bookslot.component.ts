import { Component, OnInit, Input } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/vehicle.model';
import { SlotsService } from 'src/app/services/slots.service';
import { Slots } from 'src/app/models/slots.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bookslot',
  templateUrl: './bookslot.component.html',
  styleUrls: ['./bookslot.component.css'],
  providers: [DatePipe]
})


export class BookslotComponent implements OnInit {

  
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
    load : boolean;
    vehicles$: Vehicle[];
    slots$: Slots[];
    locationid = this.actRoute.snapshot.params['locationid'];
    currentDate = new Date();
    date = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');

  @Input() bookingdetails = {
    'email':'',
    'locationid':'',
    'vehicle_type':'',
    'duration':0,
    'time':'',
    'slotid':'',
    'date': this.date,
    'vehicle_no':''
  }
  constructor(
    private bookings:BookingsService, 
    private slotsService: SlotsService, 
    private vehicleService: VehicleService, 
    public actRoute :ActivatedRoute, 
    public router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.load = false;
    this.getVehicles();
    this.getSlotById();
  }

  getVehicles(){
    return this.vehicleService.getVehicles()
    .subscribe(data => this.vehicles$ = data)
    
  }
  getSlotById(){
    return this.slotsService.getSlotById(this.locationid)
    .subscribe(data => this.slots$ = data)
  }

  addBooking(){

    if(this.bookingdetails.vehicle_no == '' || this.bookingdetails.vehicle_type == '' || this.bookingdetails.slotid == '' || this.bookingdetails.duration == 0, this.bookingdetails.time == ''){
      this.displayToast('Kindly fill all the data',"error")
      return
    } 

    this.load = true;
    this.bookings.addBooking(this.locationid, this.bookingdetails)
    .subscribe((data:{}) => {
      this.displayToast('Slot Booked',"success");
      this.router.navigate(['/dashboard/bookings'])
    })
  }

}
