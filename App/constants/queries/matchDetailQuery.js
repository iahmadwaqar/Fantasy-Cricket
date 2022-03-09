export default `query playerHub($matchID: String!) {
    playerHub(matchID: $matchID) {
      matchID
      compType
      awayTeamID
      awayTeamName
      awayTeamShortName
      homeTeamID
      homeTeamName
      homeTeamShortName
      recentForm {
        playerID
        playerSkill
        teamID
        teamShortName
        teamName
        awayTeamID
        awayTeamShortName
        awayTeamName
        fullName
        name
        playerNameHindi
        avgFantasyPoints
        playerCredits
        threatOppPlayerID
        highLowFlag
        threat
        strength {
          stmt1
          stmt2
          stmt3
        }
        weakness {
          stmt1
          stmt2
          stmt3
        }
        strengthInHindi {
          stmt1
          stmt2
          stmt3
        }
        weaknessInHindi {
          stmt1
          stmt2
          stmt3
        }
        threatInHindi
        statsHubPlayerbatting {
          commonBatPosition
          battingAverage
          battingStrikeRate
          battingFoursSixes
          battingRunsInnings
          battingHighestScore
        }
        statsHubPlayerbowling {
          bowlingWickets
          bowlingStrikeRate
          bowlingEconomyRate
          bowlingBestBowlingTotalSpell
        }
        lastFiveMatches {
          oppTeamName
          oppTeamID
          batting_stats
          bowling_stats
          points
          dta_flag
        }
        battingDetails {
          maxAvg
          maxWickets
          maxEconomy
          battingType {
            types
            economyRate
            battingAvg
            wickets
          }
        }
        bowlingDetails {
          maxAvg
          maxDismissals
          maxSR
          bowlingType {
            Dismissals
            bowlingAvg
            bowlingSR
            types
          }
        }
        performanceIndicator {
          overallRPI
          overallWPI
          teamRPI
          teamWPI
          stadiumRPI
          stadiumWPI
          atStadium
          atStadiumHindi
          vsTeam
        }
      }
    }
  }`;
