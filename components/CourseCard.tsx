import Link from "next/link";
import { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string | number) => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article
      className="CourseCard"
      style={{
        border: "2px solid #cccccc",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      }}
    >
      <h2>
        <Link href={`/courses/${course.id}`}>{course.name}</Link>
      </h2>
      <p>รหัสวิชา: {course.code}</p>
      <p>{course.credit} หน่วยกิต</p>
      {course.instructor ? <p>ผู้สอน: {course.instructor}</p> : null}

      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        {onToggleFavorite && (
          <button
            type="button"
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(course.id)}
          >
            {isFavorite ? "อยู่ในรายการโปรด" : "เพิ่มเป็นรายการโปรด"}
          </button>
        )}

        {onEdit ? (
          <button type="button" onClick={onEdit}>
            แก้ไข
          </button>
        ) : null}

        {onDelete ? (
          <button type="button" onClick={onDelete}>
            ลบ
          </button>
        ) : null}
      </div>
    </article>
  );
}