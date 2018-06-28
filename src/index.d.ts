declare module survivio {
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
  }
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
  export interface MatchData {
    slug: string;
    username: string;
    player_id: number;
    team_id: number;
    time_alive: number;
    rank: number;
    died: boolean;
    kills: number;
    damage_dealt: number;
    damage_taken: number;
    killer_id: number;
    killed_ids: number[];
  }
}
export = survivio;
