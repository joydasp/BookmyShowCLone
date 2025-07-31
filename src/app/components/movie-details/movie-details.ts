import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { ShowtimeSelectionComponent } from '../showtime-selection/showtime-selection';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule,ShowtimeSelectionComponent],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieId!: number;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
  this.movieId = Number(this.route.snapshot.paramMap.get('id'));

  // ADD THIS LINE TO DEBUG
  console.log('PARENT (MovieDetails) - Movie ID is:', this.movieId);

  if (this.movieId) {
    this.movieService.getMovieById(this.movieId).subscribe(data => {
      this.movie = data;
    });
  }
}
}