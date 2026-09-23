"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "@/types/band";
import BandCard from "@/components/BandCard";

type BandExplorerProps = {
  bands?: Band[];
};

export default function BandExplorer({ bands = [] }: BandExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [followedIds, setFollowedIds] = useState<number[]>([]);
  const [likesMap, setLikesMap] = useState<Record<number, number>>({});
  const [sortBy, setSortBy] = useState<"none" | "name" | "year">("none");

  function handleKeywordChange(e: ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  function handleToggleFollow(id: number) {
    setFollowedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((followedId) => followedId !== id)
        : [...prevIds, id]
    );
  }

  function handleLike(id: number) {
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }

  function handleReset() {
    setKeyword("");
    setSortBy("none");
  }

  const searchText = keyword.trim().toLowerCase();

  const filteredBands = bands.filter(
    (band) =>
      band.name.toLowerCase().includes(searchText) ||
      band.genre.toLowerCase().includes(searchText)
  );

  const visibleBands = [...filteredBands].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "year") {
      const yearA = (a as any).formedYear || a.id;
      const yearB = (b as any).formedYear || b.id;
      return yearA - yearB;
    }
    return 0;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      {/* แถบเครื่องมือ Search & Filter */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          border: "1px solid #f0f0f0",
        }}
      >
        <input
          type="search"
          aria-label="ค้นหาวงดนตรี"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="🔍 ค้นหาชื่อวงหรือแนวเพลง..."
          style={{
            flex: "1 1 240px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            outline: "none",
          }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "none" | "name" | "year")}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            backgroundColor: "#ffffff",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <option value="none">เรียงลำดับปกติ</option>
          <option value="name">เรียงตามชื่อวง (A-Z)</option>
          <option value="year">เรียงตามปีที่ก่อตั้ง</option>
        </select>

        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            backgroundColor: "#f9fafb",
            color: "#374151",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          ล้างเงื่อนไข
        </button>
      </div>

      {/* แถบสรุปการติดตาม */}
      <div style={{ marginBottom: "24px", fontSize: "14px", color: "#4b5563" }}>
        กำลังติดตามอยู่: <strong style={{ color: "#2563eb" }}>{followedIds.length}</strong> วง
      </div>

      {/* แสดงรายการวงดนตรี */}
      {visibleBands.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 16px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            color: "#6b7280",
          }}
        >
          ไม่พบวงดนตรีที่ตรงตามเงื่อนไข
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowed={followedIds.includes(band.id)}
              onToggleFollow={handleToggleFollow}
              likes={likesMap[band.id] || 0}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}