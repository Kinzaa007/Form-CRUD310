import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses } from "@/data/courses";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = courses.find((item) => String(item.id) === id);
  const displayName = course ? (course.name ?? course.title ?? "") : "ไม่พบรายวิชา";

  return {
    title: displayName,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = courses.find((item) => String(item.id) === id);

  if (!course) {
    notFound();
  }

  return (
    <article style={{ padding: "20px" }}>
      <h1>{course.name ?? course.title}</h1>
      <p>รหัสวิชา: {course.code}</p>
      <p>หน่วยกิต: {course.credit ?? course.credits}</p>
      {course.instructor ? <p>ผู้สอน: {course.instructor}</p> : null}
    </article>
  );
}