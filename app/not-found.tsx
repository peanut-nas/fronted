import { Button } from "./components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-6 text-center">
        {/* 动态数字容器 */}
        <div className="relative inline-block">
          <div className="text-[120px] font-bold text-blue-600 relative">
            <span className="animate-pulse">4</span>
            <span className="animate-bounce">0</span>
            <span className="animate-pulse">4</span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            页面神秘失踪
          </h1>
          
          <p className="text-gray-500 px-4">
            您寻找的页面可能已被转移或暂时不可用
          </p>
        </div>

        {/* 交互式按钮 */}
        <div className="pt-6">
          <Button
            asChild
            className="w-full max-w-xs mx-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-3 font-medium transition-all transform hover:scale-[1.02]"
          >
            <Link href="/">
              返回安全区域
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
