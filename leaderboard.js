const leaderboardData = document.getElementById("leaderboardData");
let APIurl="https://evs-wordle.onrender.com/getscores"
let players = [] 

async function getPlayers() {
  try {
    const response = await fetch("https://evs-wordle.onrender.com/getscores");
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

function compareScores(a, b) {
   console.log("I");
    return b.score - a.score;
  }

players.sort(compareScores);

async function displayLeaderboard() {
  try {
    const players = await getPlayers();  
    console.log("Players:", players);
  } catch (error) {
    console.error(error);
  }
  console.log("Ran!")
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
}

// Display the leaderboard data
displayLeaderboard();
