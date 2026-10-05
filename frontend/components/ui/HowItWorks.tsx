export default function HowItWorks() {
  return (
    <section className="px-8 py-24">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center">
          How LecturePilot Works
        </h2>

        <p className="text-center text-gray-400 mt-4 mb-16">
          Three simple steps to transform your learning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="text-center">
            <div className="text-6xl">📤</div>

            <h3 className="text-2xl font-semibold mt-6">
              Upload
            </h3>

            <p className="mt-4 text-gray-400">
              Upload your lecture video, PDF or notes.
            </p>
          </div>

          <div className="text-center">
            <div className="text-6xl">🌸</div>

            <h3 className="text-2xl font-semibold mt-6">
              Bloom Understands
            </h3>

            <p className="mt-4 text-gray-400">
              AI analyzes your lecture and creates study material.
            </p>
          </div>

          <div className="text-center">
            <div className="text-6xl">🎓</div>

            <h3 className="text-2xl font-semibold mt-6">
              Study Smarter
            </h3>

            <p className="mt-4 text-gray-400">
              Learn with notes, quizzes, flashcards and AI chat.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}