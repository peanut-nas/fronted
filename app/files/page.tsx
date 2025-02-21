import FileManager from "./FileManager";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">文件管理</h1>
        <FileManager />
      </div>
    </main>
  );
}
