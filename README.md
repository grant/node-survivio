# node-survivio

An Node CLI for surviv.io. You can:

- Read global stats
- Read user stats

## Global stat types

- Most kills
  - today/week/all
  - solo/duo/squad

## User stats

- Games today
- Kills today
- Kills last match
- Total games
- Total kills

# Output

```
┌────────────────────────────────┐
|          Global Stats          │
└────────────────────────────────┘
## SOLO ##
┌───────────────────────────────┬────────────────────────────────────────┬─────────────────────────────────┐
│ Field                         │ Value                                  │ Link                            │
├───────────────────────────────┼────────────────────────────────────────┼─────────────────────────────────┤
│ Today's most kills (SOLO)     │ momo10 (751 kills, 6.2 kills/game)     │ http://surviv.io/stats/momo10   │
├───────────────────────────────┼────────────────────────────────────────┼─────────────────────────────────┤
│ This week's most kills (SOLO) │ sasa2 (5341 kills, 10.1 kills/game)    │ http://surviv.io/stats/sasa2    │
├───────────────────────────────┼────────────────────────────────────────┼─────────────────────────────────┤
│ All time most kills (SOLO)    │ overmind (12475 kills, 8.1 kills/game) │ http://surviv.io/stats/overmind │
└───────────────────────────────┴────────────────────────────────────────┴─────────────────────────────────┘
## DUO ##
┌──────────────────────────────┬──────────────────────────────────────┬────────────────────────────────┐
│ Field                        │ Value                                │ Link                           │
├──────────────────────────────┼──────────────────────────────────────┼────────────────────────────────┤
│ Today's most kills (DUO)     │ noxor (483 kills, 2.5 kills/game)    │ http://surviv.io/stats/noxor   │
├──────────────────────────────┼──────────────────────────────────────┼────────────────────────────────┤
│ This week's most kills (DUO) │ td-klol (2158 kills, 9.7 kills/game) │ http://surviv.io/stats/td-klol │
├──────────────────────────────┼──────────────────────────────────────┼────────────────────────────────┤
│ All time most kills (DUO)    │ bubba3 (4762 kills, 4.5 kills/game)  │ http://surviv.io/stats/bubba3  │
└──────────────────────────────┴──────────────────────────────────────┴────────────────────────────────┘
## SQUAD ##
┌────────────────────────────────┬─────────────────────────────────────────────┬──────────────────────────────────────┐
│ Field                          │ Value                                       │ Link                                 │
├────────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────┤
│ Today's most kills (SQUAD)     │ offdutyninja2 (612 kills, 6.4 kills/game)   │ http://surviv.io/stats/offdutyninja2 │
├────────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────┤
│ This week's most kills (SQUAD) │ killedbyboar (3518 kills, 3.0 kills/game)   │ http://surviv.io/stats/killedbyboar  │
├────────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────┤
│ All time most kills (SQUAD)    │ offdutyninja2 (11303 kills, 5.9 kills/game) │ http://surviv.io/stats/offdutyninja2 │
└────────────────────────────────┴─────────────────────────────────────────────┴──────────────────────────────────────┘
```

## User stats

`node . grant`

Outputs:

```
┌─────────────────────────────────┐
|          grant's Stats          │
└─────────────────────────────────┘
http://surviv.io/stats/grant

## Today
┌───────────────────┬─────────────────────┐
│ Field             │ Value               │
├───────────────────┼─────────────────────┤
│ Total games today │ 3                   │
├───────────────────┼─────────────────────┤
│ Kills today       │ 17 (5.7 kills/game) │
├───────────────────┼─────────────────────┤
│ Kills last match  │ 2                   │
└───────────────────┴─────────────────────┘

## All Time
┌─────────────┬───────────────────────┐
│ Field       │ Value                 │
├─────────────┼───────────────────────┤
│ Total games │ 530                   │
├─────────────┼───────────────────────┤
│ Total kills │ 1932 (3.6 kills/game) │
└─────────────┴───────────────────────┘
```

## Build and Test

```sh
tsc && node .
# or
tsc && node . grant
```

## Publish

```sh
git commit
npm version patch
git push origin --tags
npm publish
```
