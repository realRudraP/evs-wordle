const leaderboardData = document.getElementById("leaderboardData");
let APIurl = "https://evs-wordle.onrender.com/getscores";
let players = [];

async function getPlayers() {
  try {
    const response = await fetch(APIurl);
    if (!response.ok) {
      throw new Error(`Error fetching players: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

function compareScores(a, b) {
  return b.score - a.score;
}

async function displayLeaderboard() {
  try {
    players = await getPlayers();
    console.log("Players:", players);
    
    players.sort(compareScores);

    leaderboardData.innerHTML = ''; // Clear existing data

    let rank = 1;
    for (const player of players) {
      const tableRow = document.createElement("tr");
      const rankCell = document.createElement("td");
      const nameCell = document.createElement("td");
      const scoreCell = document.createElement("td");

      rankCell.textContent = rank;
      nameCell.textContent = player.playerName;
      scoreCell.textContent = player.score;

      tableRow.appendChild(rankCell);
      tableRow.appendChild(nameCell);
      tableRow.appendChild(scoreCell);

      leaderboardData.appendChild(tableRow);

      rank++;
    }
  } catch (error) {
    console.error("Error displaying leaderboard:", error);
  }
}

// Display the leaderboard data
displayLeaderboard();