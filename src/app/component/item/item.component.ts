import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

import { config } from './../../../environments/common';

import { AirtrafficService } from './../../service/airtraffic.service';
import { LoaderService } from '../../service/loader.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{
  uomPanelState : boolean;
  itemPanelState : boolean = false;
  breakpoint: number;
  companies : any[];
  dimUOM : any[];
  weightUOM : any[];
  itemUOM : any[];
  currency : any[];
  itemForm : FormGroup;
  itemUOMArray : FormArray;
  deletedItemUOMArray : FormArray;
  barcodeArray : FormArray;
  deletedBarcodeArray : FormArray;

  constructor(private form : FormBuilder,   private service : AirtrafficService,
    private loader : LoaderService,    private msgservice : MessageService) { }

  ngOnInit() {
      this.itemPanelState = true;
      this.uomPanelState = true;
      this.itemForm = this.form.group({
        itemNo : ['', Validators.required],
        itemDesc : [''],
        company : ['',Validators.required],
        currency : [''],
        price : [''],
        storage : ['*Default'],
        itemUOMs : this.form.array([ this.createItemUOM()]),
        delItemUOMs : this.form.array([])
      });

      this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;

      /* initialise dropdown */
      this.companies = config.companies;
      this.dimUOM = config.dimUOM;
      this.weightUOM = config.weightUOM;
      this.itemUOM  = config.itemUOM;
      this.currency = config.currency;
  }

  /* EVENTS */
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }

  private createItemUOM() : FormGroup {
    return this.form.group({
      action : ['SAVE', Validators.required],
      UOM : ['',Validators.required],
      quantity : ['',Validators.required],
      dimUOM : [{ value: config.defaultDimUOM , disabled: true},Validators.required],
      length : ['',Validators.required],
      width : ['',Validators.required],
      height : ['',Validators.required],
      weight : ['',Validators.required],
      weightUOM : [{value : config.defaultWgUOM ,disabled: true},Validators.required],
      barcodes : this.form.array([this.createBarcode()]),
      delBarcodes : this.form.array([])
    });
  }

  addItemUOM() : void {
    this.itemUOMArray = this.itemForm.get('itemUOMs') as FormArray;
    this.itemUOMArray.push(this.createItemUOM());
  }

  deleteItemUOM(index : number) : void {
    this.deletedItemUOMArray = this.itemForm.get('delItemUOMs') as FormArray;

    /* set action to delete, push to deleted array */
    this.itemUOMArray.controls[index].get('action').setValue('DELETE');
    this.deletedItemUOMArray.push(this.itemUOMArray.controls[index]);
    this.deletedItemUOMArray.disable();

    /* remove from form display */
    this.itemUOMArray.removeAt(index);
  }

  createBarcode() : FormGroup{
    return this.form.group({
        action : ['SAVE', Validators.required],
        barcode : ['',Validators.required]
    });
  }

  addBarcode(index : number) : void {
    this.itemUOMArray = this.itemForm.get('itemUOMs') as FormArray;
    this.barcodeArray = this.itemUOMArray.controls[index].get('barcodes') as FormArray;
    this.barcodeArray.push(this.createBarcode());
  }

  deleteBarcode(index : number, bIndex : number) :void {
    this.itemUOMArray = this.itemForm.get('itemUOMs') as FormArray;
    this.barcodeArray = this.itemUOMArray.controls[index].get('barcodes') as FormArray;

    this.deletedBarcodeArray = this.itemUOMArray.controls[index].get('delBarcodes') as FormArray;

     /* set action to delete, push to deleted array */
    this.barcodeArray.controls[bIndex].get('action').setValue('DELETE');
    this.deletedBarcodeArray.push(this.barcodeArray.controls[bIndex]);

    /* remove from form display */
    this.barcodeArray.removeAt(bIndex);
  }

  getItem() {
    let company : string = this.itemForm.get('company').value;
    let item : string = this.itemForm.get('itemNo').value;

    this.clear();

    /* reset mandatory fields */
    this.itemForm.get('company').setValue(company);
    this.itemForm.get('itemNo').setValue(item);

    this.msgservice.clear();
    this.loader.show();

    if (company != '') {
        this.service.getItem(company,item).subscribe((resp) => {
        if (resp.status) {
          this.itemForm.reset();
          this.msgservice.add('warning','Item not found');
        } else {
          //set form values console.log(resp);
          this.itemForm.get('itemDesc').setValue(resp[0].description);

          //get uom
          this.service.getItemUOM(company,item).subscribe((resp) => {
            this.itemUOMArray = this.itemForm.get('itemUOMs') as FormArray;
            resp.forEach((uom, index) => {
              if (!this.itemUOMArray.controls[index]) {
                this.itemUOMArray.push(this.createItemUOM());
              }
              this.itemUOMArray.controls[index].get('UOM').setValue(uom.quantityUM);
              this.itemUOMArray.controls[index].get('quantity').setValue(uom.conversionQty);
              this.itemUOMArray.controls[index].get('length').setValue(uom.length);
              this.itemUOMArray.controls[index].get('width').setValue(uom.width);
              this.itemUOMArray.controls[index].get('height').setValue(uom.height);
              this.itemUOMArray.controls[index].get('weight').setValue(uom.weight);

              //this.itemUOMArray.controls[index].get('dimUOM').setValue(uom.dimensionUM);
              //this.itemUOMArray.controls[index].get('weightUOM').setValue(uom.weightUM);

            });
          });

          // get cross reference
          this.service.getItemCrossRef(company,item).subscribe((itemRef) => {
            this.itemUOMArray.controls.forEach((uom) => {
              let count : number = 0;
              itemRef.forEach((ref) => {
                if (ref.quantityUM == uom.get('UOM').value) {
                  this.barcodeArray = uom.get('barcodes') as FormArray;
                  if (!this.barcodeArray.controls[count]) {
                    this.barcodeArray.push(this.createBarcode());
                  }
                  this.barcodeArray.controls[count].get('barcode').setValue(ref.xRefItem);
                  count++;
                }
              });
            });
          });

          this.itemForm.markAsDirty();
        }
      });

    } else {
      this.msgservice.add('warning','Specify company');
    }
   this.loader.hide();
  }

  addNew() {
    if (this.itemForm.dirty){
      if (confirm("Are you sure to leave changes unsaved?")) {
        this.clear();
      }
    }
  }

  resetDeletedArrays() {
    this.deletedItemUOMArray = this.itemForm.get('delItemUOMs') as FormArray;
    while (this.deletedItemUOMArray.length !== 0) {
      this.deletedItemUOMArray.removeAt(0)
    }
    this.itemUOMArray = this.itemForm.get('itemUOMs') as FormArray;
    this.itemUOMArray.controls.forEach((uom, index) => {
      this.deletedBarcodeArray = uom.get('delBarcodes') as FormArray;
      while (this.deletedBarcodeArray.length !== 0) {
        this.deletedBarcodeArray.removeAt(0)
      }
    });

  }

  clear() {
    this.itemUOMArray = this.itemForm.get('itemUOMs') as FormArray;
    while (this.itemUOMArray.length !== 0) {
      this.itemUOMArray.removeAt(0)
    }
    this.itemForm.reset();
    this.itemUOMArray.push(this.createItemUOM());
    this.msgservice.clear();
  }

  save() {
     this.loader.show();
     //console.log(this.itemForm);
     if (this.itemForm.valid) {
        let formValues : any = this.itemForm.getRawValue();

        /* merge data */
        formValues.itemUOMs.forEach((itemUom : any) => {
          itemUom.delBarcodes.forEach((delBarcode : any) => {
            itemUom.barcodes.push(delBarcode);
          });
          /* remove from object */
          itemUom.delBarcodes = null;
        });
        formValues.delItemUOMs.forEach((delItemUom : any, index) =>{
          formValues.itemUOMs.push(delItemUom);
        });
        formValues.delItemUOMs = null;

        let json = JSON.stringify(formValues);
        json = "{\"root\":" + json + "}";

       //console.log(json);
       let company : string = this.itemForm.get('company').value;

       this.service.sendItems(company, json).subscribe((resp) => {
          if (resp.status == "Ok") {
            if (resp.rejectedTransactions == null) {
              this.msgservice.add('success','Item saved.');
              this.resetDeletedArrays();
            } else {
              this.msgservice.add('danger','Saving failed.');
              console.log(resp);
            }
          } else {
            this.msgservice.add('danger','Saving failed, contact system administrator.');
            console.log(resp);
          }
          this.loader.hide();
        });
      } else {
        this.msgservice.add('danger','Complete required details before submitting.');
        this.loader.hide();
      }
  }

}
