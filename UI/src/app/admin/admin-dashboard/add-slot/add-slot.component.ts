import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SlotsService } from 'src/app/services/slots.service';
import { Slots } from 'src/app/models/slots.model';
import { LocationsService } from 'src/app/services/locations.service';
import { Locations } from 'src/app/models/locations.model';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {
  
  slots$: Slots[];
  locations$: Locations[];
  form = new FormGroup({
    locationid : new FormControl('', Validators.required),
    slotno : new FormControl('', Validators.required)
  })
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

  constructor(private slotService: SlotsService, private locationService : LocationsService) { }

  ngOnInit(): void {
    this.getAllSlots();
    this.loadLocations();
  }
  onSubmit(){
    this.slotService.addSlot(JSON.stringify(this.form.value))
    .subscribe((data => {
      if(data == true){
        this.displayToast('Slot Added',"success");
      }
      else{
        this.displayToast('Something went wrong',"error")
      }
    }))
  }

  getAllSlots(){
    this.slotService.getAllSlots()
    .subscribe(data => this.slots$ = data)
  }

  loadLocations(){
    return this.locationService.getLocations()
    .subscribe(data => this.locations$ = data)
  }
}
