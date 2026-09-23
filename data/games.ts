import type { Game } from "@/types/game";

export const games: Game[] = [
  { id: "G01", title: "Elden Ring", platform: "PC", hours: 100, status: "ยังไม่เริ่ม" },
  { id: "G02", title: "Zelda: Tears of the Kingdom", platform: "Nintendo Switch", hours: 80, status: "กำลังเล่น" },
  { id: "G03", title: "God of War Ragnarok", platform: "PS5", hours: 40, status: "เล่นจบแล้ว" },
  { id: "G04", title: "Cyberpunk 2077", platform: "PC", hours: 60, status: "ยังไม่เริ่ม" },
  { id: "G05", title: "Persona 5 Royal", platform: "PS5", hours: 100, status: "กำลังเล่น" },
];