import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface Showtime {
  id: number;
  time: string;
  screen: string;
  availableSeats: number;
}
// ... near your other interfaces ...
export interface Seat {
  seatNumber: string;
  status: 'available' | 'selected' | 'booked';
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // src/app/services/movie.service.ts

// ... inside the MovieService class ...

private movies = [
  {
    id: 1,
    title: 'The Movie Title 1',
    genre: 'Action',
    // THE FIX IS HERE: Changed the domain to a working one.
    posterUrl: 'https://placehold.co/300x450',
    rating: 8.5
  },
  {
    id: 2,
    title: 'The Movie Title 2',
    genre: 'Comedy',
    // AND HERE
    posterUrl: 'https://placehold.co/300x450',
    rating: 7.9
  },
  {
    id: 3,
    title: 'The Movie Title 3',
    genre: 'Sci-Fi',
    // AND HERE
    posterUrl: 'https://placehold.co/300x450',
    rating: 9.1
  },
  {
    id: 4,
    title: 'The Movie Title 4',
    genre: 'Horror',
    // AND HERE
    posterUrl: 'https://placehold.co/300x450',
    rating: 6.8
  }
];

// ... the rest of your service code is correct ...

    // ADD THIS MOCK SHOWTIME DATA
  private showtimes: { [key: number]: Showtime[] } = {
    // Movie ID 1
    1: [
      { id: 101, time: '11:00 AM', screen: 'Screen 1', availableSeats: 50 },
      { id: 102, time: '02:30 PM', screen: 'Screen 2', availableSeats: 25 },
      { id: 103, time: '06:00 PM', screen: 'Screen 1', availableSeats: 0 }, // Sold out
      { id: 104, time: '09:30 PM', screen: 'Screen 3', availableSeats: 100 },
    ],
    // Movie ID 2
    2: [
      { id: 201, time: '10:00 AM', screen: 'Screen 4', availableSeats: 80 },
      { id: 202, time: '01:30 PM', screen: 'Screen 4', availableSeats: 10 },
    ],
    // Movie ID 3
    3: [
      { id: 301, time: '12:00 PM', screen: 'Screen 2', availableSeats: 40 },
    ]
  };

  constructor() { }

  getMovies() {
    return of(this.movies);
  }

  getMovieById(id: number) {
    return of(this.movies.find(movie => movie.id === id));
  }

  // ADD THIS NEW METHOD TO GET SHOWTIMES
  getShowtimes(movieId: number): Observable<Showtime[]> {
    // Return the showtimes for the given movie ID, or an empty array if none exist
    return of(this.showtimes[movieId] || []);
  }

   // ADD THIS METHOD TO GENERATE AND GET A SEAT LAYOUT
  getSeatLayout(showtimeId: number): Observable<Seat[][]> {
    const layout = this.generateSeats(8, 12); // Generate an 8x12 grid
    return of(layout);
  }

  // A HELPER FUNCTION TO CREATE THE MOCK LAYOUT
  private generateSeats(rows: number, cols: number): Seat[][] {
    const layout: Seat[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: Seat[] = [];
      for (let j = 0; j < cols; j++) {
        // Let's make some seats randomly booked already
        const status = Math.random() > 0.7 ? 'booked' : 'available';
        row.push({
          seatNumber: String.fromCharCode(65 + i) + (j + 1), // e.g., A1, A2
          status: status
        });
      }
      layout.push(row);
    }
    return layout;
  }
}