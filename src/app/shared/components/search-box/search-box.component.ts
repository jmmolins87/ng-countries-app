import { 
  Component, 
  ElementRef, 
  EventEmitter, 
  Input, 
  OnDestroy, 
  OnInit, 
  Output, 
  ViewChild 
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input() 
  public placeholder: string = '';
  @Input()
  public customTitle: string = '';
  @Input()
  public initialValue: string = '';
  
  @Output()
  public onValue = new EventEmitter();
  @Output()
  public onDebounce = new EventEmitter();

  @ViewChild('textSearchInput')
  textSearchInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
    this.debouncer
      .pipe( debounceTime( 300 )
      )
      .subscribe( value => {
        console.log( 'debouncer', value );
      })
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  emitValue( value: string ) {
    this.onValue.emit( value );
    this.textSearchInput.nativeElement.value = '';
  }

  onKeyPress( searchTerm: string ) {
    this.onDebounce.emit( searchTerm );
  }

}

