const leaderboardData = document.getElementById("leaderboardData");
let APIurl="127.0.0.1:8000/getscores"
let players = []
const url = "http://127.0.0.1:8000/getscores"; 

async function getPlayers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching players: ${response.status}`);
    }
    const data = await response.json();
    players = data; 
    console.log(players);
  } catch (error) {
    console.error("Error:", error);
  }
}

getPlayers(); // Call the function to fetch the data
function compareScores(a, b) {
    return b.score - a.score;
  }

players.sort(compareScores);

function displayLeaderboard(playerData) {
  let rank = 1;
  for (const player of playerData) {
    const tableRow = document.createElement("tr");
    const rankCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    rankCell.textContent = rank;
    nameCell.textContent = player.name;
    scoreCell.textContent = player.score;

    tableRow.appendChild(rankCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(scoreCell);

    leaderboardData.appendChild(tableRow);

    rank++;
  }
}

// Display the leaderboard data
displayLeaderboard(players);
