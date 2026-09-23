import type { Metadata } from "next";
import CourseExplorer from "@/components/CourseExplorer";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

/* 
==================================================
 [โค้ดเดิมก่อนแยก Data และ Component]
==================================================
type Course = {
  id: number;
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

const coursesOld: Course[] = [
  { id: 1, code: "10301231", title: "Web Technology", credits: 3, isOpen: true },
  { id: 2, code: "10301232", title: "Database Systems", credits: 3, isOpen: false },
  { id: 3, code: "10301233", title: "Software Engineering", credits: 3, isOpen: true },
  { id: 4, code: "10301234", title: "Computer Networks", credits: 3, isOpen: true },
  { id: 5, code: "10301235", title: "Mobile App Development", credits: 3, isOpen: false },
];
*/

export default function CoursesPage() {
  return (
    <main className="page">
      <h1>รายวิชาทั้งหมด</h1>
      
      {/* โค้ดใหม่ตามข้อ 3.3 */}
      <CourseExplorer courses={courses} />

      {/* 
      ==================================================
       [โค้ดเดิมส่วน JSX ที่เคยแสดงผลหน้าจอตรงๆ]
      ==================================================
      <CounterDemo />

      <section className="courseGrid">
        {coursesOld.map((course) => (
          <article key={course.id} className="courseCard">
            <h2>{course.title}</h2>
            <p>รหัสวิชา: {course.code}</p>
            <p>{course.credits} หน่วยกิต</p>
            <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
          </article>
        ))}
      </section> 
      */}
    </main>
  );
}