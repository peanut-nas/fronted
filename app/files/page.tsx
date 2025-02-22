import FileManager from "./FileManager";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl bg-white rounded-2xl shadow-lg p-6">
        <FileManager />
      </div>
    </main>
  );
}
