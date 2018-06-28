import chalk from 'chalk';
var Box = require("cli-box");
import {
  user_stats,
  leaderboard,
  match_history,
} from './api';
import {
  Interval,
  LeaderboardType,
  TeamMode,
  Leaderboard,
} from './types';
import printTable from './table';

async function box(text: string) {
  console.log(
    Box(`${text.length+4}x1`, {text}).toString()
  );
}

// temp test
async function test(slug: string) {
  // Gets the solo kill leader of the specified interval
  async function getLeaderStats(interval: Interval, teamMode: TeamMode): Promise<Leaderboard[]> {
    let lead = await leaderboard({
      type: LeaderboardType.KILLS,
      interval,
      teamMode,
    });
    return lead;
  }

  // Personal stats
  if (slug) {
    let statusToday = await user_stats({ slug, interval: Interval.DAILY, });
    let statusAll = await user_stats({ slug, interval: Interval.ALL, });
    let history = await match_history({ slug });

    box(`${chalk.bold.underline(slug)}'s Stats`);
    console.log(`http://surviv.io/stats/${slug}`);
    console.log();

    console.log(`## Today`);
    printTable([
      ['Total games today', statusToday.games],
      ['Kills today', `${statusToday.kills} (${statusToday.kpg} kills/game)`],
      ['Kills last match', history[0].kills],
    ]);
    console.log();

    console.log(`## All Time`);
    printTable([
      ['Total games', statusAll.games],
      ['Total kills', `${statusAll.kills} (${statusAll.kpg} kills/game)`],
    ]);
    console.log();
  }

  // Global stats
  box(`${chalk.bold.underline('Global')} Stats`);
  async function printLeaderboard(mode: TeamMode) {
    let leadDaily = await getLeaderStats(Interval.DAILY, mode);
    let leadWeekly = await getLeaderStats(Interval.WEEKLY, mode);
    let leadAll = await getLeaderStats(Interval.ALL, mode);

    let leaderDaily = await user_stats({ slug: leadDaily[0].slug, interval: Interval.DAILY });
    let leaderWeekly = await user_stats({ slug: leadWeekly[0].slug, interval: Interval.WEEKLY });
    let leaderAll = await user_stats({ slug: leadAll[0].slug, interval: Interval.ALL });
    console.log(`## ${chalk.bold.underline(mode)} ##`);
    printTable([
      [`Today's most kills (${mode})`, `${leadDaily[0].slug} (${leaderDaily.kills} kills, ${leaderDaily.kpg} kills/game)`, `http://surviv.io/stats/${leadDaily[0].slug}`],
      [`This week's most kills (${mode})`, `${leadWeekly[0].slug} (${leaderWeekly.kills} kills, ${leaderWeekly.kpg} kills/game)`, `http://surviv.io/stats/${leadWeekly[0].slug}`],
      [`All time most kills (${mode})`, `${leadAll[0].slug} (${leaderAll.kills} kills, ${leaderAll.kpg} kills/game)`, `http://surviv.io/stats/${leadAll[0].slug}`],
    ]);
  }
  await printLeaderboard(TeamMode.SOLO);
  await printLeaderboard(TeamMode.DUO);
  await printLeaderboard(TeamMode.SQUAD);
}

test(process.argv[2]);
