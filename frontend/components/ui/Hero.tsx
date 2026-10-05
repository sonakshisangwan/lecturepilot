export default function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-center text-center px-8">

      <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full mb-6">
        🚀 AI Powered Learning Assistant
      </span>

      <h1 className="text-7xl font-extrabold leading-tight max-w-5xl">

        Learn Faster.

        <br />

        Not Harder.

      </h1>

      <p className="text-gray-400 text-xl max-w-3xl mt-8">

        Upload lecture videos, PDFs and notes.

        Chat with your lectures.

        Generate quizzes, summaries and flashcards instantly using AI.

      </p>

      <div className="flex gap-5 mt-12">

        <button className="bg-blue-600 hover:bg-blue-700 transition px-7 py-4 rounded-xl text-lg font-semibold">

          Get Started

        </button>

        <button className="border border-gray-700 hover:bg-gray-900 transition px-7 py-4 rounded-xl text-lg">

          Watch Demo

        </button>

      </div>

    </section>
  );
}