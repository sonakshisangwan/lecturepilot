export default function Features() {
  return (
    <section className="px-8 py-24">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center">
          Why students love LecturePilot
        </h2>

        <p className="text-center text-gray-400 mt-4 mb-14">
          Everything you need to study smarter in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="rounded-3xl border p-8 text-center">
            <h3 className="text-2xl font-semibold">📄 Upload Once</h3>
            <p className="mt-3 text-gray-400">
              Upload your lecture video, PDF, or notes in seconds.
            </p>
          </div>

          <div className="rounded-3xl border p-8 text-center">
            <h3 className="text-2xl font-semibold">📝 Smart Notes</h3>
            <p className="mt-3 text-gray-400">
              Bloom creates clean and easy-to-read notes instantly.
            </p>
          </div>

          <div className="rounded-3xl border p-8 text-center">
            <h3 className="text-2xl font-semibold">💬 AI Chat</h3>
            <p className="mt-3 text-gray-400">
              Ask questions about your lecture anytime.
            </p>
          </div>

          <div className="rounded-3xl border p-8 text-center">
            <h3 className="text-2xl font-semibold">🧠 Flashcards</h3>
            <p className="mt-3 text-gray-400">
              Revise important concepts with AI-generated flashcards.
            </p>
          </div>

          <div className="rounded-3xl border p-8 text-center">
            <h3 className="text-2xl font-semibold">❓ Quiz Generator</h3>
            <p className="mt-3 text-gray-400">
              Test yourself with personalized quizzes.
            </p>
          </div>

         <div className="rounded-3xl border p-8 text-center">
            <h3 className="text-2xl font-semibold">📈 Progress Tracking</h3>
            <p className="mt-3 text-gray-400">
              Track your study journey and improve over time.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}