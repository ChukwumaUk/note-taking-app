export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Simple Note Taking App
      </h1>

      <p className="text-gray-600 max-w-xl mb-6">
        Capture your ideas quickly and stay organized. Create, edit, and manage
        your notes seamlessly in one place.
      </p>

      <a
        href="/dashboard"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
      >
        Go to Dashboard
      </a>

    </div>
  );
}
