import React, { useReducer } from 'react';

// 1. Pure function di luar komponen
function isValidEmail(email) {
  return email.includes('@');
}

// State awal form
const initialFormState = {
  name: "",
  email: "",
  agreeTerms: false,
  status: "idle" // "idle", "error", "success"
};

// 2. formReducer dengan berbagai action & aturan bisnis
function formReducer(state, action) {
  switch (action.type) {
    case "name_changed":
      return {
        ...state,
        name: action.payload,
        status: "idle"
      };
    
    case "email_changed":
      return {
        ...state,
        email: action.payload,
        status: "idle"
      };
    
    case "terms_toggled":
      return {
        ...state,
        agreeTerms: !state.agreeTerms,
        status: "idle"
      };
    
    case "submitted":
      const isNameInvalid = state.name.trim() === "";
      const isEmailInvalid = !isValidEmail(state.email);
      const isTermsInvalid = !state.agreeTerms;

      if (isNameInvalid || isEmailInvalid || isTermsInvalid) {
        return {
          ...state,
          status: "error"
        };
      }
      return {
        ...state,
        status: "success"
      };
    
    case "reset":
      return initialFormState;
    
    default:
      throw new Error(`Action type tidak dikenal: ${action.type}`);
  }
}

// 4. Component RegistrationForm dengan Tailwind CSS
function RegistrationForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "submitted" });
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch({ type: "reset" });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-xl font-semibold text-slate-100 mb-6 tracking-wide">
          Form Registrasi Akun
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Nama
            </label>
            <input
              type="text"
              value={state.name}
              onChange={(e) => dispatch({ type: "name_changed", payload: e.target.value })}
              placeholder="Masukkan nama..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Email
            </label>
            <input
              type="text"
              value={state.email}
              onChange={(e) => dispatch({ type: "email_changed", payload: e.target.value })}
              placeholder="nama@email.com"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div className="flex items-center pt-1">
            <label className="flex items-center cursor-pointer text-sm text-slate-300 select-none">
              <input
                type="checkbox"
                checked={state.agreeTerms}
                onChange={() => dispatch({ type: "terms_toggled" })}
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
              />
              <span className="ml-2">Saya setuju syarat & ketentuan</span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button 
              type="submit" 
              className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
            >
              Daftar
            </button>
            
            <button 
              type="button" 
              onClick={handleReset} 
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Tampilan pesan berdasarkan status */}
        <div className="mt-5">
          {state.status === "error" && (
            <div className="p-3 bg-red-950/50 border border-red-900/50 rounded-lg text-red-400 text-sm">
              Data belum valid. Periksa nama, email, dan persetujuan.
            </div>
          )}
          {state.status === "success" && (
            <div className="p-3 bg-emerald-950/50 border border-emerald-900/50 rounded-lg text-emerald-400 text-sm">
              Pendaftaran berhasil, selamat datang {state.name}!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 5. Render RegistrationForm di App
export default function App() {
  return <RegistrationForm />;
}