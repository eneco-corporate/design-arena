'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 border-2 border-gray-800 rounded-full flex items-center justify-center">
              <span className="text-sm">🎵</span>
            </div>
            <span className="text-xl font-bold text-gray-900">秋元康アリーナ</span>
          </Link>
          
          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm transition-colors">
              ランキング
            </Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm transition-colors">
              評価
            </Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm transition-colors">
              ブログ
            </Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm transition-colors">
              方法論
            </Link>
            
            <div className="flex items-center gap-3 ml-4">
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-gray-300 transition-colors">
                B
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </nav>

          {/* ハンバーガーメニューボタン（モバイル） */}
          <button
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開く"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-all ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-all ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-900 transition-all ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* モバイルメニュー */}
        <nav
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-gray-200">
            <Link
              href="#"
              className="text-gray-700 hover:text-gray-900 text-sm py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ランキング
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-gray-900 text-sm py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              評価
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-gray-900 text-sm py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ブログ
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-gray-900 text-sm py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              方法論
            </Link>
            
            <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-gray-300 transition-colors">
                B
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

