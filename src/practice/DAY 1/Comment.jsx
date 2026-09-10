function Avatar({ username, avatarColor }) {
  // FIX: charAt harus dipanggil dengan (), bukan diakses dengan []
  const initial = username ? username.charAt(0).toUpperCase() : "?";

  return (
    <div
      // FIX: "text white" -> "text-white" (typo class, harus pakai dash)
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white font-bold text-lg ${
        avatarColor || "bg-gray-400"
      }`}
    >
      {initial}
    </div>
  );
}

function Comment({ username, text, date, avatarColor, isVerified }) {
  // FIX: sebelumnya tidak ada 'return', jadi JSX ini tidak pernah di-render
  return (
    <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <Avatar username={username} avatarColor={avatarColor} />

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">{username}</span>
          {isVerified && (
            <span className="inline-flex items-center gap-0.5 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
              <svg className="h-3 w-3 fill-current text-blue-500" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              Verified
            </span>
          )}
          <span className="text-xs text-gray-400">{date}</span>
        </div>

        <p className="mt-1 text-sm text-gray-700">{text}</p>
      </div>
    </div>
  );
}

export default function App() {
  const comments = [
    {
      username: "Budi",
      text: "Artikelnya sangat membantu!",
      date: "2 jam lalu",
      avatarColor: "bg-blue-500",
      isVerified: true,
    },
    {
      username: "Siti",
      text: "Terima kasih infonya",
      date: "5 jam lalu",
      avatarColor: "bg-pink-500",
    },
    {
      username: "Andi",
      text: "Kurang lengkap menurutku",
      date: "1 hari lalu",
      avatarColor: "bg-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans md:p-12">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Komentar ({comments.length})
        </h2>

        <div className="flex flex-col gap-3">
          {comments.map((comment, index) => (
            // Spread syntax: seluruh field object langsung jadi props
            <Comment key={index} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
}