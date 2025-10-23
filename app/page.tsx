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
  updatedAt?: string; 
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

// Track which lesson is being edited (null means addin a new one)
const [editingLessonID, setEditingLessonID] = useState<number | null>(null);

// Form input fields
const [newLesson, setNewLesson] = useState({
  title: "",
  subject: "",
  grade: "",
  date: "",
});

 // Local Storage Logic

 // Load saved lessons from localStorage when the page first loads
 useEffect(() => {
  const storedLessons = localStorage.getItem("lessons");
  if (storedLessons){
    setLessons(JSON.parse(storedLessons));
  } else {
    setLessons(mockLessons);
  }
 }, []);

  // Save lessons to localStorage whenever lessons list changes
  useEffect(() => {

    // If no lessons exist, reset to mock data for testing
    if (lessons.length === 0){
      setLessons(mockLessons);
      return
    }
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

  //  Delete a lesson by its ID
const handleDeleteLesson = (id: number) => {
  const updatedLessons = lessons.filter((lesson) => lesson.id !== id);
  setLessons(updatedLessons);
};

  // When user clicks Edit, open modal with existing lesson info
  const handleEditLesson = (lesson: Lesson) => {
    setNewLesson({
      title: lesson.title,
      subject: lesson.subject,
      grade: lesson.grade,
      date: lesson.date,
    });
    setEditingLessonID(lesson.id) // Mark which one is being edited
    setIsModalOpen(true); // open modal
  }


  // Handle when user clicks "Save Lesson"
  const handleSaveLesson = () => {

    
    // Simple validation - make sure all fields are filled
    if (!newLesson.title || !newLesson.subject || !newLesson.grade || !newLesson.date){
      alert("Please fill out all fields before saving.");
      return;
    }

    const now = new Date().toLocaleDateString();


    // We're editing an existing lesson
    if (editingLessonID != null){
      const updatedLessons = lessons.map((lesson) =>
      lesson.id === editingLessonID ? {...lesson, ...newLesson, updatedAt: now } : lesson
    );

    setLessons(updatedLessons);
    setEditingLessonID(null); // reset edit mode

    } else {
      //We're adding a new lesson
    const lessonToAdd: Lesson = {
      id: Date.now(), //generates unique number based on current time
      ...newLesson,
      updatedAt: now,
    };

    // Add it to the list and reset form
    setLessons([...lessons, lessonToAdd]);
  }
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
        onClick={() => {
          setEditingLessonID(null); // reset edit mode
          setNewLesson({ title: "", subject: "", grade: "", date: "" }) // clear form
          setIsModalOpen(true)
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
      >
        + New Lesson
      </button>

    {/* Lesson Cards Grid*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className=" relative bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-sky-400">{lesson.title}</h3>
            <p className="text-slate-600">{lesson.subject}</p>
            <p className="text-slate-600">Grade {lesson.grade}</p>
            <p className="text-slate-500 text-sm mt-2">{lesson.date}</p>
            <p className="text-slate-400 text-sm mt-1 italic">Last updated: {lesson.updatedAt || "Just added"}</p>
            {/* Edit Button */}
            <button
            onClick={() => handleEditLesson(lesson)}
            className="absolute top-2 left-3 text-blue-500 hover:text-blue-700 font-bold text-lg"
            title="Edit Lesson"
            >
              ✏️
            </button>

            {/* Delete Button */}
          <button
            onClick={() => handleDeleteLesson(lesson.id)} // call delete function
            className="absolute top-2 right-3 text-red-500 hover:text-red-700 font-bold text-lg"
            title="Delete Lesson"
          >
            X
          </button>
        </div>
      ))}
      </div>


      {/* Modal with Form*/}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">
          {editingLessonID ? "Edit Lesson" : "Add New Lesson"}
        </h2>
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
          className="mt-4 w-full bg-black hover:bg-gray-900 text-white py-2 rounded-md font-medium transition duration-200"
        >
          Save Lesson
        </button>
      </Modal>
    </div>
  );
}