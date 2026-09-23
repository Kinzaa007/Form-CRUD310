import type { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
  isFollowed?: boolean;
  onToggleFollow?: (id: number) => void;
  likes?: number;
  onLike?: (id: number) => void;
};

export default function BandCard({
  band,
  isFollowed = false,
  onToggleFollow,
  likes = 0,
  onLike,
}: BandCardProps) {
  const memberCount = band.members ? band.members.length : 0;

  return (
    <article
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
        border: "1px solid #f0f0f0",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* รูปภาพปกวงดนตรี */}
      <div style={{ position: "relative", width: "100%", height: "220px", backgroundColor: "#f3f4f6" }}>
        <img
          src={band.image}
          alt={band.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <span
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#ffffff",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {band.genre}
        </span>
      </div>

      {/* เนื้อหาการ์ด */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        
        {/* ส่วนหัวข้อและปุ่มกด */}
        <div style={{ height: "110px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", margin: "0 0 4px 0" }}>
              {band.name}
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
              สมาชิกในวง {memberCount} คน
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {onToggleFollow && (
              <button
                type="button"
                aria-pressed={isFollowed}
                onClick={() => onToggleFollow(band.id)}
                style={{
                  flex: 1,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: isFollowed ? "1px solid #d1d5db" : "none",
                  backgroundColor: isFollowed ? "#f3f4f6" : "#2563eb",
                  color: isFollowed ? "#374151" : "#ffffff",
                  cursor: "pointer",
                }}
              >
                {isFollowed ? "กำลังติดตาม" : "ติดตาม"}
              </button>
            )}

            {onLike && (
              <button
                type="button"
                onClick={() => onLike(band.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "1px solid #fecaca",
                  backgroundColor: "#fef2f2",
                  color: "#dc2626",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                👍 <span>{likes}</span>
              </button>
            )}
          </div>
        </div>

        {/* ส่วนแสดงสมาชิกที่ปรับขยายรูปและตัวหนังสือให้ชัดเจนขึ้น */}
        <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "16px", marginTop: "16px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#374151", margin: "0 0 16px 0" }}>
            สมาชิกในวง:
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px 12px",
              textAlign: "center",
            }}
          >
            {band.members?.map((member) => (
              <div
                key={member.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* ขยายรูปเป็น 70px พร้อมเงาและขอบขาวให้ดูเด่นสวยงาม */}
                <div
                  style={{
                    width: "85px",
                    height: "85px",
                    borderRadius: "50%",
                    padding: "2px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    marginBottom: "8px",
                  }}
                >
                  <img
                    src={member.image || "https://via.placeholder.com/80"}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* ชื่อสมาชิกปรับเป็น 14px สไตล์ตัวหนา อ่านง่าย */}
                <strong
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#111827",
                    lineHeight: "1.3",
                  }}
                >
                  {member.name}
                </strong>

                {/* ตำแหน่งปรับเป็น 12px ชัดเจนพอดีตา */}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "2px",
                  }}
                >
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}