"use client";

import { useState, ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import CourseForm from "@/components/CourseForm";
import type { CourseDraft } from "@/components/CourseForm";

type CourseExplorerProps = {
  courses: Course[];
};

export default function CourseExplorer({ courses: initialCourses = [] }: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<(number | string)[]>([]);
  const [editingId, setEditingId] = useState<number | string | null>(null);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: number | string) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim() || "อาจารย์ผู้สอนรายวิชา",
    };
    setCourses((prev) => [...prev, newCourse]);
  }

  function handleDelete(id: number | string) {
    setCourses((prev) => prev.filter((course) => String(course.id) !== String(id)));
    setFavoriteIds((prev) => prev.filter((favId) => String(favId) !== String(id)));
  }

  function handleUpdate(id: number | string, draft: CourseDraft) {
    setCourses((prev) =>
      prev.map((course) =>
        String(course.id) === String(id)
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim() || "อาจารย์ผู้สอนรายวิชา",
            }
          : course
      )
    );
    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }
    handleUpdate(editingId, draft);
  }

  const searchText = keyword.trim().toLowerCase();
  const visibleCourses = courses.filter((course) => {
    const courseName = (course.name ?? "").toLowerCase();
    const courseCode = (course.code ?? "").toLowerCase();
    return courseName.includes(searchText) || courseCode.includes(searchText);
  });

  const editingCourse = courses.find((course) => String(course.id) === String(editingId));

  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="search"
          aria-label="ค้นหารายวิชา"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
        />
        <p>รายการโปรดทั้งหมด: {favoriteIds.length} รายการ</p>
      </div>

      <CourseForm
        key={editingId ? String(editingId) : "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {visibleCourses.length === 0 ? (
        <p>ไม่พบรายวิชาที่ตรงเงื่อนไข</p>
      ) : (
        <section className="courseGrid">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
              onEdit={() => setEditingId(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </section>
      )}
    </>
  );
}