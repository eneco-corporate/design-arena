'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import ModelCards from '@/components/ModelCards'
import Advertising from '@/components/Advertising'

function VoteContent() {
  const searchParams = useSearchParams()
  const [prompt, setPrompt] = useState('')
  const [category, setCategory] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [showAdvertising, setShowAdvertising] = useState(true)

  useEffect(() => {
    // URLパラメータから値を取得
    const promptParam = searchParams.get('prompt')
    const categoryParam = searchParams.get('category')
    const autostart = searchParams.get('autostart') === 'true'

    if (promptParam) {
      const decodedPrompt = decodeURIComponent(promptParam)
      setPrompt(decodedPrompt)
    }
    if (categoryParam) {
      setCategory(categoryParam)
    }

    // autostartがtrueの場合、自動的に生成を開始
    if (autostart && promptParam) {
      setIsGenerating(true)
      setShowAdvertising(true)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* キーワード表示と広告（生成中のみ表示） */}
        {prompt && showAdvertising && (
          <div className="mb-8">
            <Advertising keyword={prompt} />
          </div>
        )}

        {/* モデルカード表示（生成完了後、広告の位置に表示） */}
        {prompt && (
          <ModelCards 
            prompt={prompt}
            isGenerating={isGenerating}
            results={results}
            onGenerationComplete={() => {
              setShowAdvertising(false)
            }}
          />
        )}
      </main>

      {/* フッター背景 */}
      <div className="mt-20 py-8 bg-gray-100">
        <div className="text-center text-gray-400 text-sm">
          秋元康風の歌詞を生成するAIを競うプラットフォーム
        </div>
      </div>
    </div>
  )
}

export default function VotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <VoteContent />
    </Suspense>
  )
}

