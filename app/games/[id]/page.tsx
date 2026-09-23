import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { games } from "@/data/games";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((g) => g.id === id);
  return {
    title: game ? `${game.title} - รายละเอียดเกม` : "ไม่พบรายการเกม",
  };
}

export default async function GameDetailPage({ params }: GamePageProps) {
  const { id } = await params;
  const game = games.find((g) => g.id === id);

  if (!game) {
    notFound();
  }

  return (
    <main style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>{game.title}</h1>
      <hr />
      <p><strong>แพลตฟอร์ม:</strong> {game.platform}</p>
      <p><strong>จำนวนชั่วโมงที่คาดว่าจะใช้:</strong> {game.hours} ชั่วโมง</p>
      <p><strong>สถานะปัจจุบัน:</strong> {game.status}</p>
    </main>
  );
}