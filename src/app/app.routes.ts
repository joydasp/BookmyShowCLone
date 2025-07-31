import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list';
import { MovieDetailsComponent } from './components/movie-details/movie-details';
import { SeatBookingComponent } from './components/seat-booking/seat-booking';
export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'book/:showtimeId', component: SeatBookingComponent},
  { path: '**', redirectTo: '/movies' }
];