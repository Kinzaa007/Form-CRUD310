"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import type { Game, GameStatus } from "@/types/game";

export type GameDraft = {
  title: string;
  platform: string;
  hours: string;
  status: GameStatus;
};

const emptyDraft: GameDraft = {
  title: "",
  platform: "",
  hours: "",
  status: "ยังไม่เริ่ม",
};

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;

function validate(value: GameDraft): FormErrors {
  const errors: FormErrors = {};
  if (value.title.trim() === "") errors.title = "กรุณาระบุชื่อเกม";
  if (value.platform.trim() === "") errors.platform = "กรุณาเลือกหรือระบุแพลตฟอร์ม";
  const hoursNum = Number(value.hours);
  if (!Number.isInteger(hoursNum) || hoursNum <= 0) errors.hours = "ต้องเป็นจำนวนเต็มบวก";
  return errors;
}

function toDraft(game?: Game): GameDraft {
  if (!game) return emptyDraft;
  return {
    title: game.title,
    platform: game.platform,
    hours: String(game.hours),
    status: game.status,
  };
}

export default function GameForm({ initialGame, onSave, onCancel }: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "0.95rem",
    marginTop: "4px",
    boxSizing: "border-box" as const,
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "28px",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ margin: "0 0 16px 0", color: "#0f172a", fontSize: "1.2rem" }}>
        {initialGame ? "✏️ แก้ไขรายการเกม" : "➕ เพิ่มเกมใหม่เข้า Backlog"}
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div>
          <label htmlFor="title" style={{ fontWeight: "600", fontSize: "0.9rem", color: "#475569" }}>ชื่อเกม</label>
          <input id="title" name="title" type="text" placeholder="เช่น Elden Ring" value={draft.title} onChange={handleChange} style={inputStyle} />
          {errors.title && <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "4px" }}>{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="platform" style={{ fontWeight: "600", fontSize: "0.9rem", color: "#475569" }}>แพลตฟอร์ม</label>
          <select id="platform" name="platform" value={draft.platform} onChange={handleChange} style={inputStyle}>
            <option value="">-- เลือกแพลตฟอร์ม --</option>
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Xbox">Xbox</option>
          </select>
          {errors.platform && <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "4px" }}>{errors.platform}</p>}
        </div>

        <div>
          <label htmlFor="hours" style={{ fontWeight: "600", fontSize: "0.9rem", color: "#475569" }}>ชั่วโมงที่คาดว่าจะเล่น</label>
          <input id="hours" name="hours" type="number" placeholder="เช่น 50" value={draft.hours} onChange={handleChange} style={inputStyle} />
          {errors.hours && <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "4px" }}>{errors.hours}</p>}
        </div>

        <div>
          <label htmlFor="status" style={{ fontWeight: "600", fontSize: "0.9rem", color: "#475569" }}>สถานะ</label>
          <select id="status" name="status" value={draft.status} onChange={handleChange} style={inputStyle}>
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {initialGame ? "อัปเดตข้อมูล" : "บันทึกเกม"}
        </button>
        {initialGame && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              backgroundColor: "#64748b",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}