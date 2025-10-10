"use client";
import { useState } from "react";
import Modal from "./components/Modal";

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
// Track whether the modal is open or closed (default: closed)
const [isModalOpen, setIsModalOpen] = useState(false);

  return(
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Your Lessons</h2>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
      >
        + New Lesson
      </button>

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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Add New Lesson</h2>
        <p className="text-slate-600">Form content will go here...</p>
      </Modal>
    </div>
  );
}