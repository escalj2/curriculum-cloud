export default function Navbar(){
    return(
        <nav className="flex items-center justify-between bg-slate-800 text-white px-6 py-4 shadow-md">
            <h1 className="text-2xl font-bold tracking-wide">Curriculum Cloud</h1>
            <div className="space-x-4">
                <button className="bg-blue-600 hover:bg=blue-700 px-4 py-2 rounded-lg font-medium">
                    + New Lesson
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg font-medium">
                    Log In
                </button>
            </div>
        </nav>
    );
}