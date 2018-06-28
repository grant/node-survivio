import axios from 'axios';
import queryString from 'query-string';
import {
  LeaderboardType,
  Interval,
  TeamMode,
  UserStats,
  Leaderboard,
  MatchData,
  MatchHistory,
} from './types';

/**
 * Builds a query string with lowercase keys.
 */
function query(o:any) {
  Object.keys(o).map((k:string) => {
    o[k] = o[k].toLowerCase();
  })
  return queryString.stringify(o);
}

/**
 * Overall leaderboard.
 * @param {string} maxCount Doesn't matter. API doesn't use this.
 * @see http://surviv.io/api/leaderboard?type=most_kills&interval=daily&teamMode=solo&maxCount=100
 */
interface LeaderboardOptions {
  type: LeaderboardType,
  interval: Interval,
  teamMode: TeamMode,
}
export async function leaderboard(options: LeaderboardOptions): Promise<Leaderboard[]> {
  let { data } = await axios(`http://surviv.io/api/leaderboard?${query(options)}`);
  return new Promise<Leaderboard[]>((res, rej) => {
    res(data as Leaderboard[]);
  });
};

/**
 * Gets the user's overall stats.
 * @see http://surviv.io/api/user_stats?slug=grant&interval=all
 */
interface UserStatsOptions {
  slug: string,
  interval?: Interval,
}
export async function user_stats(options: UserStatsOptions): Promise<UserStats> {
  options = { interval: Interval.ALL, ...options };
  if (!options.slug) throw new Error('slug is required!');
  let { data } = await axios(`http://surviv.io/api/user_stats?${query(options)}`);
  return new Promise<UserStats>((res, rej) => {
    res(data as UserStats);
  });
}

/**
 * Get the user's match history.
 * @see http://surviv.io/api/match_history?slug=a.m.ghost&offset=0&count=10&modeFilter=7
 */
interface MatchHistoryOptions {
  slug: string,
  offset?: number,
  count?: number,
}
export async function match_history(options: MatchHistoryOptions): Promise<MatchHistory[]> {
  if (!options.slug) throw new Error('slug is required!');
  let url = `http://surviv.io/api/match_history?${query(options)}`;
  let { data } = await axios(url);
  return new Promise<MatchHistory[]>((res, rej) => {
    res(data as MatchHistory[]);
  });
}

/**
 * Gets match data.
 * @see http://surviv.io/api/match_data?gameId=3f3d7979-89fd-fa1d-f0fd-da14c2a3e032
 */
interface MatchDataOptions {
  gameId: string,
}
export async function match_data(options: MatchDataOptions): Promise<MatchData[]> {
  if (!options.gameId) throw new Error('gameId is required!');
  let url = `http://surviv.io/api/match_data?${query(options)}`;
  let { data } = await axios(url);
  return new Promise<MatchData[]>((res, rej) => {
    res(data as MatchData[]);
  });
}
