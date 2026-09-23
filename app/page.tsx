export default function HomePage() {
  const siteName: string = "Student Course Hub";
  const description: string = "ศูนย์รวมข้อมูลรายวิชาและแผนการเรียนสำหรับนักศึกษา";

  return (
    <main className="page">
      <h1>{siteName}</h1>
      <p>{description}</p>
      <section>
        <h2>เว็บไซต์นี้เหมาะสำหรับใคร?</h2>
        <p>เหมาะสำหรับนักศึกษาที่ต้องการค้นหารายวิชา ค้นหาคำอธิบายรายวิชา และตรวจสอบจำนวนหน่วยกิต</p>
      </section>
    </main>
  );
}