import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import TitleComponent from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  standalone: true,
  imports: [CommonModule,TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <app-title title="Change Detection"></app-title>
<pre>{{frameworkasSignal() | json }}</pre>
<pre>{{frameworkasProperty | json }}</pre>
  `,
  styleUrl: './change-detection.component.css'
})
export default class ChangeDetectionComponent {
 public frameworkasSignal = signal({
  name: 'Angular',
  release: 2016
 })

 public frameworkasProperty = {
  name: 'Angular',
  release: 2016
 }

 constructor(){
  setTimeout(() => {

    //this.frameworkasProperty.name = 'Reac';
    this.frameworkasSignal.update(value => ({
      ...value,
      name: 'Reac'
    }));

    console.log('Hecho');
    
  }, 3000);
 }
}
