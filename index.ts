import axios from 'axios';
// API interfaces
// http://json2ts.com/

// http://surviv.io/api/leaderboard?type=most_kills&interval=daily&teamMode=squad&maxCount=100
export enum LeaderboardURLType {
  MOST_KILLS,
  MOST_DAMAGE_DEALT,
  KPG,
  KILLS,
  WINS,
}
// Used for UserStats, Leaderboard
export enum Interval {
  DAILY,
  WEEKLY,
  ALL,
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
 */
export async function leaderboard():Promise<Leaderboard[]> {
  let {data} = await axios('http://surviv.io/api/leaderboard');
  let leaderboard = data as Leaderboard[];
  return new Promise<Leaderboard[]>((res, rej) => {
    res(leaderboard);
  });
};

/**
 * Gets the user's stats.
 */
export async function user_stats(slug: string, interval: Interval): Promise<UserStats> {
  let url = 'http://surviv.io/api/user_stats?' + [`slug=${slug}`, `interval=${interval}`].join('&');
  let { data } = await axios(url);
  let stats = data as UserStats;
  return new Promise<UserStats>((res, rej) => {
    res(stats);
  });
}

// temp test
async function test() {
  let status = await user_stats('grant', Interval.DAILY);
  console.log(status.kills);
  let lead = await leaderboard();
  console.log(lead[0].slug);
}

test();
