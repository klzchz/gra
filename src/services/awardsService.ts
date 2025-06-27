import { findMovies } from "../repositories/movieRepository";
import { MovieAttributes } from "../models/Movie";

interface AwardInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

interface AwardResult {
  min: AwardInterval[];
  max: AwardInterval[];
}

export const getAwardIntervals = async (): Promise<AwardResult> => {
  const winners = (await findMovies()).filter((movie) => movie.winner);
  const producerWins = getProducerWinsMap(winners);
  const intervals = calculateIntervals(producerWins);

  if (intervals.length === 0) {
    return { min: [], max: [] };
  }

  const minInterval = Math.min(...intervals.map((i) => i.interval));
  const maxInterval = Math.max(...intervals.map((i) => i.interval));

  return {
    min: intervals.filter((i) => i.interval === minInterval),
    max: intervals.filter((i) => i.interval === maxInterval),
  };
};

const getProducerWinsMap = (
  winners: MovieAttributes[]
): Map<string, number[]> => {
  const producerWins = new Map<string, number[]>();

  winners.forEach((movie) => {
    const producers = movie.producers
      .split(/,| and /)
      .map((p) => p.trim())
      .filter(Boolean);

    producers.forEach((producer) => {
      const wins = producerWins.get(producer) || [];
      wins.push(movie.year);
      producerWins.set(producer, wins);
    });
  });

  return producerWins;
};

const calculateIntervals = (
  producerWins: Map<string, number[]>
): AwardInterval[] => {
  const intervals: AwardInterval[] = [];

  producerWins.forEach((years, producer) => {
    if (years.length > 1) {
      const sortedYears = years.sort((a, b) => a - b);
      for (let i = 0; i < sortedYears.length - 1; i++) {
        const previousWin = sortedYears[i];
        const followingWin = sortedYears[i + 1];
        intervals.push({
          producer,
          interval: followingWin - previousWin,
          previousWin,
          followingWin,
        });
      }
    }
  });

  return intervals;
};