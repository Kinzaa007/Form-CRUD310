import BandExplorer from "@/components/BandExplorer";
import { mockBands } from "@/data/bands";

export default function BandsPage() {
  return (
    <main className="page" style={{ padding: "20px" }}>
      <h1>วงดนตรีที่ชื่นชอบ (Favorite Bands)</h1>
      {/* ใช้ BandExplorer เพื่อให้ฟีเจอร์ Search, Follow, Like และ Sort ทำงาน */}
      <BandExplorer bands={mockBands} />
    </main>
  );
}