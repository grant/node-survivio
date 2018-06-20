import axios from 'axios';
const queryString = require('query-string');

// API interfaces
// http://json2ts.com/

// http://surviv.io/api/leaderboard?type=most_kills&interval=daily&teamMode=squad&maxCount=100
export enum LeaderboardType {
  MOST_KILLS = 'MOST_KILLS',
  MOST_DAMAGE_DEALT = 'MOST_DAMAGE_DEALT',
  KPG = 'KPG',
  KILLS = 'KILLS',
  WINS = 'WINS',
}
export enum TeamMode {
  SOLO = 'SOLO',
  DUO = 'DUO',
  SQUAD = 'SQUAD',
};
// Used for UserStats, Leaderboard
export enum Interval {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  ALL = 'ALL',
}

// Interfaces
export interface Leaderboard {
  slug: string;
  username: string;
  avatar: number;
  region: string;
  games: number;
  val: number;
}

export interface Mode {
  teamMode: number;
  games: number;
  wins: number;
  kills: number;
  winPct: number;
  mostKills: number;
  mostDamage: number;
  kpg: number;
  avgDamage: number;
  avgTimeAlive: number;
}

export interface UserStats {
  slug: string;
  username: string;
  avatar: number;
  wins: number;
  kills: number;
  games: number;
  modes: Mode[];
  kpg: string;
}

export interface MatchHistory {
  guid: string;
  region: string;
  team_mode: number;
  team_count: number;
  team_total: number;
  end_time: Date;
  time_alive: number;
  rank: number;
  kills: number;
  team_kills: number;
  damage_dealt: number;
  damage_taken: number;
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
export async function leaderboard(options: LeaderboardOptions):Promise<Leaderboard[]> {
  let { data } = await axios(`http://surviv.io/api/leaderboard?${queryString.stringify(options)}`);
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
  options = { ...options, interval: Interval.ALL};
  if (!options.slug) throw new Error('slug is required!');
  let { data } = await axios(`http://surviv.io/api/user_stats?${queryString.stringify(options)}`);
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
  let url = `http://surviv.io/api/match_history?${queryString.stringify(options)}`;
  let { data } = await axios(url);
  return new Promise<MatchHistory[]>((res, rej) => {
    res(data as MatchHistory[]);
  });
}

// temp test
async function test() {
  let status = await user_stats({
    slug: 'grant',
    interval: Interval.DAILY,
  });
  console.log(status.kills);
  let lead = await leaderboard({
    type: LeaderboardType.MOST_KILLS,
    interval: Interval.ALL,
    teamMode: TeamMode.SOLO,
  });
  console.log(lead[0].slug);
  let history = await match_history({
    slug: 'grant',
  });
  console.log(history[0].kills);
}

test();
