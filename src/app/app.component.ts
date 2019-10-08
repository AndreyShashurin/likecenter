import { Component, OnInit } from '@angular/core';
import { trigger, state, group,  transition, animate, style } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface Cards {
  id: number, 
  hypothesis: string, 
  date: any,
  deadline: any,
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
  date: any;
  change: number;
  animationState: string = 'out';
  cards: Cards[] = [
    {
      id: 1,
      hypothesis: '',
      date: '1 июня',
      deadline: '',
      actions: []
    },
    {
      id: 2,
      hypothesis: '',
      date: '2 июня',
      deadline: '',
      actions: []
    },
    {
      id: 3,
      hypothesis: '',
      date: '3 июня',
      deadline: '',
      actions: []
    },
    {
      id:4,
      hypothesis: '',
      date: '4 июня',
      deadline: '',
      actions: []
    },
    {
      id: 5,
      hypothesis: '',
      date: '5 июня',
      deadline: '',
      actions: []
    },
    {
      id: 6,
      hypothesis: '',
      date: '6 июня',
      deadline: '',
      actions: []
    },
    {
      id: 7,
      hypothesis: '',
      date: '7 июня',
      deadline: '',
      actions: []
    },
    {
      id: 8,
      hypothesis: '',
      date: '8 июня',
      deadline: '',
      actions: []
    },
    {
      id: 9,
      hypothesis: '',
      date: '9 июня',
      deadline: '',
      actions: []
    },
    {
      id: 10,
      hypothesis: '',
      date: '10 июня',
      deadline: '',
      actions: []
    },
    {
      id: 11,
      hypothesis: '',
      date: '11 июня',
      deadline: '',
      actions: []
    },
    {
      id: 12,
      hypothesis: '',
      date: '12 июня',
      deadline: '',
      actions: []
    }
  ];
  form: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.createForm()
  } 

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      hypothesis: new FormControl(''),
      deadline: new FormControl(''), 
      actions: this.fb.array([])
    });
    this.addFormArray();
  }

  openPanel(data: any) {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    this.id = data.id;
    this.date = data.date;
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


  save(id:number, date:any){
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
