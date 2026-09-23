"use client";

import { useState, ChangeEvent } from "react";
import type { Game } from "@/types/game";
import GameCard from "@/components/GameCard";
import GameForm, { GameDraft } from "@/components/GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");

  const pendingHours = games
    .filter((g) => g.status === "ยังไม่เริ่ม")
    .reduce((sum, g) => sum + g.hours, 0);

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      const newGame: Game = {
        id: crypto.randomUUID(),
        title: draft.title.trim(),
        platform: draft.platform,
        hours: Number(draft.hours),
        status: draft.status,
      };
      setGames([...games, newGame]);
    } else {
      setGames(
        games.map((g) =>
          g.id === editingId
            ? {
                ...g,
                title: draft.title.trim(),
                platform: draft.platform,
                hours: Number(draft.hours),
                status: draft.status,
              }
            : g
        )
      );
      setEditingId(null);
    }
  }

  function handleDelete(id: string) {
    setGames(games.filter((g) => g.id !== id));
  }

  const editingGame = games.find((g) => g.id === editingId);
  const visibleGames = games.filter((g) =>
    g.title.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <div>
      {/* ส่วนสถิติ & ช่องค้นหา */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
          backgroundColor: "#f8fafc",
          padding: "16px 20px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ flex: "1 1 250px" }}>
          <input
            id="search"
            type="text"
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            placeholder="🔍 ค้นหาชื่อเกม..."
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "0.95rem",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          style={{
            backgroundColor: "#fef3c7",
            color: "#92400e",
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "0.95rem",
            border: "1px solid #fde68a",
          }}
        >
          ⏳ ชั่วโมงรวมเกมที่ยังไม่ได้เล่น: <strong>{pendingHours}</strong> ชั่วโมง
        </div>
      </div>

      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ margin: 0, fontSize: "1.3rem", color: "#1e293b" }}>
          รายการเกมทั้งหมด ({visibleGames.length})
        </h2>
      </div>

      {visibleGames.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
          ไม่พบรายการเกมที่คุณค้นหา
        </div>
      ) : (
        visibleGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onEdit={() => setEditingId(game.id)}
            onDelete={() => handleDelete(game.id)}
          />
        ))
      )}
    </div>
  );
}