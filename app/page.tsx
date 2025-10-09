
interface Lesson {
  id: number;
  title: string;
  subject: string;
  grade: string;
  date: string;
}

const mockLessons: Lesson[] = [
  { id: 1, title: "Introduction to Ancient Egypt", subject: "History", grade: "6th", date: "2025-10-07" },
  { id: 2, title: "Basic Algebra Review", subject: "Math", grade: "8th", date: "2025-10-05" },
  { id: 3, title: "Photosynthesis Lab", subject: "Science", grade: "7th", date: "2025-10-02" },
];

export default function Dashboard() {
  return(
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Your Lessons</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockLessons.map((lesson) => (
        <div
          key={lesson.id}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-sky-400">{lesson.title}</h3>
            <p className="text-slate-600">{lesson.subject}</p>
            <p className="text-slate-600">Grade {lesson.grade}</p>
            <p className="text-slate-500 text-sm mt-2">{lesson.date}</p>
        </div>
      ))}
      </div>
    </div>
  );
}