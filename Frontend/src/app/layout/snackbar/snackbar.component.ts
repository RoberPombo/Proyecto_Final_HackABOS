import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('state', [
      transition(':enter', [
        style({ bottom: '-100px', transform: 'translate(-50%, 0%) scale(0.3)' }),
        animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({
          transform: 'translate(-50%, 0%) scale(1)', opacity: 1, bottom: '0.2rem'
        })),
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0.0, 1, 1)', style({
          transform: 'translate(-50%, 0%) scale(0.3)', opacity: 0, bottom: '-100px'
        }))
      ])
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  public show: boolean;
  private message: string;
  private type: string;
  private snackbarSubscription: Subscription;


  constructor(private snackService: SnackbarService) { }

  ngOnInit() {
    this.snackbarSubscription = this.snackService.snackbarState
      .subscribe(
        state => {
          if (state.type) {
            this.type = state.type
          } else {
            this.type = 'success';
          }
          this.message = `snackbar.${state.message}`;
          this.show = state.show;
          setTimeout(() => {
            this.show = false;
          }, 2500);
        }
      )
  }

  ngOnDestroy() {
    this.snackbarSubscription.unsubscribe();
  }
}
