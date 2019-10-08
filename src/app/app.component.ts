import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

export interface Cards {
  id: number, 
  hypothesis: string, 
  date: number,
  actions: any[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements OnInit {
  title = 'likecenter';
  id: number;
  data: any;
  date: Date;
  dataFormat: string;
  change: number;
  animationState: string = 'out';
  cards: Cards[];
  form: FormGroup;

  constructor(private fb: FormBuilder, private datePipe: DatePipe){
    this.date = new Date();
    this.cards = [
    {
      id: 1,
      hypothesis: '',
      date: this.date.setDate( this.date.getDate()),
      actions: []
    },
    {
      id: 2,
      hypothesis: '',
      date: this.date.setDate( this.date.getDate() + 1 ),
      actions: []
    },
    {
      id: 3,
      hypothesis: '',
      date: this.date.setDate( this.date.getDate() + 1),
      actions: []
    },
    {
      id:4,
      hypothesis: '',
      date: this.date.setDate( this.date.getDate() + 1),
      actions: []
    },
    {
      id: 5,
      hypothesis: '',
      date: this.date.setDate( this.date.getDate() + 1),
      actions: []
    },
    {
      id: 6,
      hypothesis: '',
      date: this.date.setDate( this.date.getDate() + 1),
      actions: []
    },
    {
      id: 7,
      hypothesis: '',
      date: this.date.setDate( this.date.getDate() + 1),
      actions: []
    },
    {
      id: 8,
      hypothesis: '',
      date:this.date.setDate( this.date.getDate() + 1),
      actions: []
    },
    {
      id: 9,
      hypothesis: '',
      date:this.date.setDate( this.date.getDate() + 1),
      actions: []
    },
    {
      id: 10,
      hypothesis: '',
      date: this.date.setDate( this.date.getDate() + 1),
      actions: []
    },
    {
      id: 11,
      hypothesis: '',
      date: this.date.setDate( this.date.getDate() + 1),
      actions: []
    },
    {
      id: 12,
      hypothesis: '',
      date: this.date.setDate( this.date.getDate() + 1),
      actions: []
    }
  ];

  }

  ngOnInit() {
    this.createForm()
  } 

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      hypothesis: new FormControl(''),
      actions: this.fb.array([])
    });
    this.addFormArray();
  }

  openPanel(data: any) {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    this.id = data.id;
    this.data = data.date;
    this.dataFormat = this.datePipe.transform(data.date,"dd.MM.yyyy");
    this.createForm();
    if(data.actions.length) {
        this.form.patchValue(data);
        this.form.controls['actions'] = this.fb.array(data.actions.map(i => this.fb.group(i)));
    }
  }

  changeValue(data: any){
    if (data) {
      data.target.style.height = data.target.scrollHeight + "px";
      let count = data.target.dataset.count;
      
      if (data.target.dataset.count == 0) {
        console.log(count++);
        data.target.dataset.count = count;
        this.addFormArray();
      }
    }
  }

  addFormArray() {
    return (<FormArray>this.form.get('actions')).push(
      this.fb.group({
        checkbox: [false],
        action: []
      })
    )
  }


  save(id:number, date: any){
    this.form.value.id = id;
    this.form.value.date = date;
    for (let card in this.cards) {
      if (this.cards[card].id == id) {
          this.cards[card] = this.form.value
      }
    }
    this.form.reset();
    this.form.value.actions.splice(0, (<FormArray>this.form.get('actions')).length);
    this.animationState =  'out';
  }
}
