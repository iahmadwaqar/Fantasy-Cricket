export default `
query getFRCHomePage {
  getFRCHomePage {
    upcomingmatches {
      matchID
      matchName
      matchStatus
      statusMessage
      isLiveCriclyticsAvailable
      homeTeamID
      awayTeamID
      homeTeamShortName
      awayTeamShortName
      matchNumber
      toss
      matchDateTimeGMT
      tourName
      matchType
      city
      matchScore {
        teamShortName
        teamID
        teamFullName
      }
    }
  }
}
`;
