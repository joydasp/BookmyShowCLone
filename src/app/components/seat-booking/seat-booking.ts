// src/app/components/seat-booking/seat-booking.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Seat } from '../../services/movie.service';

@Component({
  selector: 'app-seat-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-booking.html',
  styleUrls: ['./seat-booking.scss']
})
export class SeatBookingComponent implements OnInit {
  seatLayout: Seat[][] = [];
  selectedSeats: Seat[] = [];
  ticketPrice = 150; // Example price
  isLoading = true; // 1. Add a loading flag and set it to true initially

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // 1. Get the showtime ID from the URL
    const showtimeId = Number(this.route.snapshot.paramMap.get('showtimeId'));

    // 2. Fetch the seat layout from the service
    if (showtimeId) {
       // The service call is about to happen, so we are loading.
      this.isLoading = true;
      this.movieService.getSeatLayout(showtimeId).subscribe(layout => {
        this.seatLayout = layout;
        this.isLoading = false; // 2. Data has arrived, set loading to false
      });
    }
  }

  // 3. Handle a user clicking on a seat
  toggleSeat(seat: Seat): void {
    if (seat.status === 'booked') {
       // THE FIX: Instead of just returning, show an alert.
      alert('This seat is already booked and cannot be selected.');
      return; // Can't select a booked seat
    }
    // Toggle between 'selected' and 'available'
    seat.status = (seat.status === 'selected') ? 'available' : 'selected';
    this.updateSelectedSeats();
  }

  // 4. Update the summary of selected seats
  updateSelectedSeats(): void {
    this.selectedSeats = this.seatLayout.flat().filter(seat => seat.status === 'selected');
  }

  // 5. Calculate the total price based on selected seats
  get totalPrice(): number {
    return this.selectedSeats.length * this.ticketPrice;
  }
}