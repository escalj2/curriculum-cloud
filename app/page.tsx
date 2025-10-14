"use client";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";

// Define the Lesson data structure
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

// State Variables

// List of lessons that show on the dashboard
const [lessons, setLessons] = useState<Lesson[]>([]);

// Track whether the modal is open or closed (default: closed)
const [isModalOpen, setIsModalOpen] = useState(false);

// Form input fields
const [newLesson, setNewLesson] = useState({
  title: "",
  subject: "",
  grade: "",
  date: "",
});

 // Local Storage Loguc

 // Load saved lessons from localStorage when the page first loads
 useEffect(() => {
  const StoredLessons = localStorage.getItem("lessons");
  if (StoredLessons){
    setLessons(JSON.parse(StoredLessons));
  } else {
    setLessons(mockLessons);
  }
 }, []);

  // Save lessons to localStorage whenever lessons list changes
  useEffect(() => {
    localStorage.setItem("lessons", JSON.stringify(lessons));
  }, [lessons]);

  // Event Handlers

  // Update form input as the user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLesson({
      ...newLesson,
      [e.target.name]: e.target.value,
    });
  };

  // Handle when user clicks "Save Lesson"
  const handleSaveLesson = () => {
    // Simple validation - make sure all fields are filled
    if (!newLesson.title || !newLesson.subject || !newLesson.grade || !newLesson.date){
      alert("Please fill out all fields before saving.");
      return;
    }

    // Create a new lesson object with a unique ID
    const lessonToAdd: Lesson = {
      id: Date.now(), //generates unique number based on current time
      ...newLesson,
    };

    // Add it to the list and reset form
    setLessons([...lessons, lessonToAdd]);
    setNewLesson({title: "", subject: "", grade: "", date: ""});
    setIsModalOpen(false); // close the modal
  };

  // Render UI

  return(
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-3xl font-bold">Your Lessons</h2>
      
      {/* Button that opens the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
      >
        + New Lesson
      </button>

    {/* Lesson Cards Grid*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {lessons.map((lesson) => (
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

      {/* Modal with Form*/}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Add New Lesson</h2>
        {/* Input Fields*/}
        <div className="flex flex-col space-y-3">
          <input
            name="title"
            value={newLesson.title}
            onChange={handleInputChange}
            placeholder="Lesson Title"
            className="border p-2 rounded-md"
          />
          <input
            name="subject"
            value={newLesson.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            className="border p-2 rounded-md"
          />
          <input
            name="grade"
            value={newLesson.grade}
            onChange={handleInputChange}
            placeholder="Grade"
            className="border p-2 rounded-md"
          />
          <input
            name="date"
            type="date"
            value={newLesson.date}
            onChange={handleInputChange}
            className="border p-2 rounded-md"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveLesson}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
        >
          Save Lesson
        </button>
      </Modal>
    </div>
  );
}