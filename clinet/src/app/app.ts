import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
 //import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('clinet');

  protected http = inject(HttpClient);
  protected members= signal<any>([]);
  // ngOnInit() {
  //   this.http.get('https://localhost:5001/api/Members/').subscribe({
  //     next: (data) => {
  //       this.members.set(data);
  //       console.log('Data fetched successfully');
  //       this.title.set('clinet - Data Loaded');
  //       console.log('Title updated to:', this.title());
  //     },
  //     error: (error) => {
  //       console.error('Error fetching data:', error);
  //       this.title.set('clinet - Error Loading Data');
  //       console.log('Title updated to:', this.title());
  //     }
  //   });

 async ngOnInit() {
 this.members.set(await this.getmembers());
}



 async getmembers() {
  try {
     return await lastValueFrom(this.http.get('https://localhost:5001/api/Members/'));
    // const response = await this.http.get('https://localhost:5001/api/Members/').toPromise();
    // this.members.set(response);
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
}
}
