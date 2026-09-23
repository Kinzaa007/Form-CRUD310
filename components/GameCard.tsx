import Link from "next/link";
import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
};

export default function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  // สีกระป๋องสถานะ (Badge)
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "กำลังเล่น":
        return { bg: "#e0f2fe", color: "#0369a1", label: "🎮 กำลังเล่น" };
      case "เล่นจบแล้ว":
        return { bg: "#dcfce7", color: "#15803d", label: "✅ เล่นจบแล้ว" };
      default:
        return { bg: "#f3f4f6", color: "#4b5563", label: "⏳ ยังไม่เริ่ม" };
    }
  };

  const badge = getStatusBadge(game.status);

  return (
    <article
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "16px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        border: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      <div style={{ flex: "1 1 300px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <h3 style={{ margin: 0, fontSize: "1.25rem" }}>
            <Link
              href={`/games/${game.id}`}
              style={{ color: "#1e293b", textDecoration: "none", fontWeight: "700" }}
            >
              {game.title}
            </Link>
          </h3>
          <span
            style={{
              backgroundColor: badge.bg,
              color: badge.color,
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "600",
            }}
          >
            {badge.label}
          </span>
        </div>

        <div style={{ display: "flex", gap: "16px", color: "#64748b", fontSize: "0.95rem" }}>
          <span>💻 <strong>แพลตฟอร์ม:</strong> {game.platform}</span>
          <span>⏱️ <strong>คาดว่าจะใช้:</strong> {game.hours} ชม.</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={onEdit}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f1f5f9",
            color: "#334155",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ✏️ แก้ไข
        </button>
        <button
          type="button"
          onClick={onDelete}
          style={{
            padding: "8px 16px",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          🗑️ ลบ
        </button>
      </div>
    </article>
  );
}