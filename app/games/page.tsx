import { games } from "@/data/games";
import GameExplorer from "@/components/GameExplorer";

export const metadata = {
  title: "Game Backlog - รายการเกมทั้งหมด",
};

export default function GamesPage() {
  return (
    <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🎮 Game Backlog</h1>
      <GameExplorer initialGames={games} />
    </main>
  );
}