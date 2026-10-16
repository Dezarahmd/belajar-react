import React, { useState } from "react";
import { useImmerReducer } from "use-immer";

// --- 1. State Awal ---
const initialProject = {
  name: "Website Redesign",
  owner: { name: "Sarah", role: "Project Manager" },
  tasks: [
    { id: 1, title: "Bikin wireframe", done: false, assignee: { name: "Budi" } },
    { id: 2, title: "Review desain", done: true, assignee: { name: "Siti" } },
  ],
};

// --- 2. Reducer dengan Immer ---
function projectReducer(draft, action) {
  switch (action.type) {
    case "project_renamed":
      draft.name = action.payload;
      break;

    case "owner_role_changed":
      draft.owner.role = action.payload;
      break;

    case "task_added":
      draft.tasks.push(action.payload);
      break;

    case "task_toggled": {
      const task = draft.tasks.find((t) => t.id === action.payload);
      if (task) task.done = !task.done;
      break;
    }

    case "assignee_changed": {
      const task = draft.tasks.find((t) => t.id === action.payload.id);
      if (task) task.assignee.name = action.payload.name;
      break;
    }

    case "task_deleted":
      draft.tasks = draft.tasks.filter((t) => t.id !== action.payload);
      break;

    default:
      throw new Error(`Action type ${action.type} tidak dikenal`);
  }
}

// --- 3. Component ProjectManager ---
export function ProjectManager() {
  const [project, dispatch] = useImmerReducer(projectReducer, initialProject);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const completedTasks = project.tasks.filter((t) => t.done).length;
  const totalTasks = project.tasks.length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    dispatch({
      type: "task_added",
      payload: {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        assignee: { name: "Unassigned" },
      },
    });
    setNewTaskTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Header Section dengan Gradient */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">Project Manager</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-100 text-sm font-medium mb-1">Nama Proyek</label>
              <input
                className="w-full bg-white/20 border border-white/30 text-white placeholder-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                value={project.name}
                onChange={(e) => dispatch({ type: "project_renamed", payload: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-blue-100 text-sm font-medium mb-1">Role Owner ({project.owner.name})</label>
              <input
                className="w-full bg-white/20 border border-white/30 text-white placeholder-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                value={project.owner.role}
                onChange={(e) => dispatch({ type: "owner_role_changed", payload: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-8">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-semibold text-gray-600">Progress Task</span>
              <span className="text-sm font-bold text-indigo-600">{completedTasks} / {totalTasks} ({progressPercentage}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Form Tambah Task */}
          <form onSubmit={handleAddTask} className="flex gap-3 mb-6">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Apa yang perlu dikerjakan selanjutnya?"
            />
            <button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg active:scale-95"
            >
              Tambah Task
            </button>
          </form>

          {/* Daftar Task */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {project.tasks.length === 0 ? (
                <li className="p-6 text-center text-gray-500 italic">Belum ada task. Mulai tambahkan di atas!</li>
              ) : (
                project.tasks.map((task) => (
                  <li 
                    key={task.id} 
                    className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 transition-colors hover:bg-gray-100 ${task.done ? 'bg-gray-100/50' : 'bg-white'}`}
                  >
                    {/* Checkbox & Judul */}
                    <div className="flex items-center gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => dispatch({ type: "task_toggled", payload: task.id })}
                        className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer transition-all"
                      />
                      <span className={`font-medium text-lg transition-all ${task.done ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {task.title}
                      </span>
                    </div>
                    
                    {/* Actions (Assignee & Hapus) */}
                    <div className="flex items-center gap-3 ml-9 sm:ml-0">
                      <div className="relative group">
                        <span className="absolute -top-3 left-2 text-[10px] bg-white px-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Assignee</span>
                        <input
                          className={`border px-3 py-1.5 rounded-md text-sm w-32 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all ${task.done ? 'bg-transparent border-transparent text-gray-500' : 'bg-white border-gray-300 focus:border-indigo-400'}`}
                          value={task.assignee.name}
                          onChange={(e) =>
                            dispatch({
                              type: "assignee_changed",
                              payload: { id: task.id, name: e.target.value },
                            })
                          }
                          placeholder="Assignee"
                          disabled={task.done}
                        />
                      </div>
                      
                      <button
                        onClick={() => dispatch({ type: "task_deleted", payload: task.id })}
                        className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-red-200"
                        title="Hapus Task"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}



/* 
========================================================================
JAWABAN PERTANYAAN (KOMENTAR WAJIB):
========================================================================

1. Kenapa task.done = !task.done aman dipakai di Immer reducer?
   Jawab: Karena objek "draft" yang kita modifikasi di dalam reducer Immer bukanlah
   state asli yang sebenarnya, melainkan sebuah "Proxy" yang dibuat oleh Immer. 
   Saat kita melakukan mutasi (seperti task.done = !task.done), Proxy tersebut 
   hanya mencatat perubahannya. Setelah fungsi selesai berjalan, Immer akan mengambil 
   catatan perubahan tersebut dan secara otomatis menghasilkan (return) objek state 
   baru yang utuh tanpa menyentuh (mutate) objek aslinya. Alhasil, aturan immutability React tetap terjaga.

2. Apa yang terjadi kalau Anda lupa break di salah satu case Immer reducer?
   Jawab: Akan terjadi "fall-through" khas statement switch di JavaScript.
   Misalnya kita lupa menaruh break di case "task_added", maka eksekusi kode 
   akan "jatuh" (melanjutkan) ke case berikutnya (misalnya "task_toggled") meskipun 
   action.type-nya tidak cocok. Ini sangat berbahaya karena bisa memicu error 
   (seperti mencari ID yang undefiend) atau memutasi draft dengan data yang salah.

3. Bandingkan case "assignee_changed" versi Immer dengan versi spread manual!
   Jawab: 
   Versi Spread Manual:
   
   case "assignee_changed":
     return {
       ...state,
       tasks: state.tasks.map((task) => {
         if (task.id === action.payload.id) {
           return {
             ...task,
             assignee: {
               ...task.assignee,
               name: action.payload.name
             }
           };
         }
         return task;
       })
     };

   - Berapa level spread yang dibutuhkan? 
     Diperlukan 3 level penyebaran (spread) beruntun untuk memodifikasi name:
     1. Spread level Project (`...state`)
     2. Spread level Task di dalam map (`...task`)
     3. Spread level Assignee (`...task.assignee`)
     
   Dengan Immer, kita cukup menulisnya seperti mutasi objek biasa tanpa perlu 
   satu pun spread operator!
========================================================================
*/