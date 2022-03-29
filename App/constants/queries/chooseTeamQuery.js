export default `query getfrcTeam(
    $matchID: String!
    $playerIds: [String]
    $leagueType: String!
    $selectCriteria: String!
    $token: String!
  ) {
    getFrcTeam(
      matchID: $matchID
      playerIds: $playerIds
      leagueType: $leagueType
      selectCriteria: $selectCriteria
      token: $token
    ) {
      totalPoints
      batsman {
        playerName
        player_role
        playerId
        selectionPercent
        credits
        teamID
        isMyPick
        projectedPoints
        playing_xi
        captain
        teamName
        vice_captain
        playerCredits
      }
      bowler {
        playerName
        player_role
        playerId
        selectionPercent
        credits
        teamID
        projectedPoints
        isMyPick
        playing_xi
        captain
        teamName
        vice_captain
        playerCredits
      }
      keeper {
        playerName
        player_role
        playerId
        selectionPercent
        credits
        teamID
        projectedPoints
        playing_xi
        isMyPick
        captain
        teamName
        vice_captain
        playerCredits
      }
      all_rounder {
        playerName
        player_role
        playerId
        selectionPercent
        credits
        isMyPick
        teamID
        projectedPoints
        playing_xi
        captain
        teamName
        vice_captain
        playerCredits
      }
    }
  }
  `;
