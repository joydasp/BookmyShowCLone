// 1. CHECK IMPORTS
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, Showtime } from '../../services/movie.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-showtime-selection',
  standalone: true,
  // 2. CHECK IMPORTS ARRAY
  imports: [CommonModule, RouterModule],
  templateUrl: './showtime-selection.html',
  styleUrls: ['./showtime-selection.scss']
})
export class ShowtimeSelectionComponent implements OnInit {
  // 3. CHECK THIS @Input DECORATOR AND PROPERTY
  @Input() movieId!: number;

  showtimes: Showtime[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
  // ADD THIS LINE TO DEBUG
  console.log('CHILD (ShowtimeSelection) - Received Movie ID:', this.movieId);

  if (this.movieId) {
    this.movieService.getShowtimes(this.movieId).subscribe(data => {
      this.showtimes = data;
    });
  }
}
}