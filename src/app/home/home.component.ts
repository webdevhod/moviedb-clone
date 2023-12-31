import { Component } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { lastValueFrom } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { DiscoverMovie } from '../interfaces/discover-movie.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  mostPopularMovies: DiscoverMovie | undefined;
  topMoviesMaxListSize: number = 20;
  topMovies: Movie[] = [];
  genresTagColor: string[] = ['blue', 'yell', 'orange'];

  constructor(public tmdb: TmdbService) {}

  async ngOnInit() {
    this.mostPopularMovies = await lastValueFrom(
      this.tmdb.getMostPopularMoviesList()
    );
    for (let index = 0; index < this.topMoviesMaxListSize; index++) {
      this.topMovies?.push(
        await lastValueFrom(
          this.tmdb.getMovieFromId(this.mostPopularMovies.results[index]?.id)
        )
      );
    }
  }
}
