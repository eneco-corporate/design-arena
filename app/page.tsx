'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import PromptInput from '@/components/PromptInput'
import ModelCards from '@/components/ModelCards'
import Advertising from '@/components/Advertising'

export default function Home() {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [showAdvertising, setShowAdvertising] = useState(true)

  const handleGenerate = async (inputPrompt: string) => {
    setIsGenerating(true)
    setPrompt(inputPrompt)
    setShowAdvertising(true)
    
    // URLを更新（voteページにリダイレクト
    const encodedPrompt = encodeURIComponent(inputPrompt)
    router.push(`/vote?prompt=${encodedPrompt}&category=Website&autostart=true`)
    
    // TODO: 複数モデルの並行実行を実装
    // ここで複数のAIモデルを呼び出して秋元康風の歌詞を生成
    
    setTimeout(() => {
      setIsGenerating(false)
      // 仮の結果を設定
      setResults([])
    }, 2000)
  }

  useEffect(() => {
    // 生成が完了したら広告を非表示
    if (!isGenerating && prompt) {
      setShowAdvertising(false)
    }
  }, [isGenerating, prompt])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* メインロゴとタグライン */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 border-2 border-gray-800 rounded-full flex items-center justify-center">
              <span className="text-lg">🎵</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">秋元康アリーナ</h1>
          </div>
          <p className="text-gray-600 text-lg">
            どのAI（あるいはどのプロンプト）が、最も「秋元康」を憑依させられたかを競うアリーナ
          </p>
        </div>

        {/* プロンプト入力 */}
        <PromptInput onGenerate={handleGenerate} />

        {/* キーワード表示と広告（生成中のみ表示） */}
        {prompt && showAdvertising && (
          <Advertising keyword={prompt} />
        )}

        {/* モデルカード表示（生成完了後、広告の位置に表示） */}
        {prompt && (
          <ModelCards 
            prompt={prompt}
            isGenerating={isGenerating}
            results={results}
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

