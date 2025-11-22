'use client'

import { useEffect, useState, useRef } from 'react'
import Fireworks from './Fireworks'
import Ranking from './Ranking'

interface ModelResult {
  id: string
  name: string
  icon: string
  color: string
  result?: string
  isLoading: boolean
  error?: string
}

interface ComparisonPair {
  left: ModelResult
  right: ModelResult
  leftId: string
  rightId: string
}

interface ModelCardsProps {
  prompt: string
  isGenerating: boolean
  results: any[]
  onGenerationComplete?: () => void
}

// モデル定義
const models: Omit<ModelResult, 'result' | 'isLoading' | 'error'>[] = [
  { id: 'gemini-pro', name: 'Gemini Pro Preview', icon: '💎', color: 'bg-cyan-100' },
  { id: 'claude-sonnet-4.5-thinking', name: 'Claude Sonnet 4.5 (Thinking)', icon: '⭐', color: 'bg-green-100' },
  { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', icon: '⭐', color: 'bg-amber-100' },
  { id: 'claude-opus-4', name: 'Claude Opus 4', icon: '⭐', color: 'bg-teal-100' },
  { id: 'gpt-5-minimal', name: 'GPT-5 (Minimal)', icon: '🌀', color: 'bg-cyan-100' },
  { id: 'claude-opus-4.1-thinking', name: 'Claude Opus 4.1 (Thinking)', icon: '⭐', color: 'bg-green-100' },
  { id: 'gpt-5.1-none', name: 'GPT-5.1 (None)', icon: '🌀', color: 'bg-amber-100' },
  { id: 'gpt-5.1-high', name: 'GPT-5.1 (High)', icon: '🌀', color: 'bg-teal-100' },
  { id: 'gpt-5.1-medium', name: 'GPT-5.1 (Medium)', icon: '🌀', color: 'bg-cyan-100' },
  { id: 'gpt-5-high', name: 'GPT-5 (High)', icon: '🌀', color: 'bg-green-100' },
]

export default function ModelCards({ prompt, isGenerating, results, onGenerationComplete }: ModelCardsProps) {
  const [modelStates, setModelStates] = useState<ModelResult[]>(
    models.map(model => ({ 
      ...model, 
      isLoading: false
    }))
  )
  
  const [currentPair, setCurrentPair] = useState<ComparisonPair | null>(null)
  const [usedPairs, setUsedPairs] = useState<Set<string>>(new Set())
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null)
  
  // 選択回数とランキング管理
  const [selectionCount, setSelectionCount] = useState(0)
  const [modelStats, setModelStats] = useState<Record<string, { wins: number; total: number }>>({})
  const [showFireworks, setShowFireworks] = useState(false)
  const [fireworksPosition, setFireworksPosition] = useState<{ x: number; y: number } | undefined>()
  const [showRanking, setShowRanking] = useState(false)
  const selectedCardRef = useRef<HTMLDivElement>(null)
  
  const MAX_SELECTIONS = 10 // 10セット = 20個の比較

  useEffect(() => {
    if (isGenerating) {
      // 全てのモデルをローディング状態に
      setModelStates(models.map(model => ({ ...model, isLoading: true })))
      setCurrentPair(null)
      setSelectedSide(null)
      setUsedPairs(new Set())
      setSelectionCount(0)
      setModelStats({})
      setShowRanking(false)
      
      // 各モデルを並行実行（シミュレーション）
      const promises = models.map((model, index) => 
        simulateModelGeneration(model.id, index * 500)
      )

      Promise.all(promises).then((generatedResults) => {
        const newStates = models.map((model, index) => ({
          ...model,
          isLoading: false,
          result: generatedResults[index],
        }))
        setModelStates(newStates)
        
        // 最初のペアを設定
        selectNextPair(newStates)
        
        // 生成完了を通知
        if (onGenerationComplete) {
          onGenerationComplete()
        }
      })
    }
  }, [isGenerating, prompt])

  const selectNextPair = (states: ModelResult[]) => {
    const completed = states.filter(m => m.result && !m.isLoading)
    if (completed.length < 2) return

    setUsedPairs(prevUsedPairs => {
      // ランダムに2つ選ぶ
      const available = completed.filter(m => {
        return !Array.from(prevUsedPairs).some(used => used.includes(m.id))
      })

      if (available.length < 2) {
        // 全てのペアを使い切った場合、リセット
        const shuffled = [...completed].sort(() => Math.random() - 0.5)
        if (shuffled.length >= 2) {
          setCurrentPair({
            left: shuffled[0],
            right: shuffled[1],
            leftId: shuffled[0].id,
            rightId: shuffled[1].id
          })
        }
        setSelectedSide(null)
        return new Set()
      }

      const shuffled = [...available].sort(() => Math.random() - 0.5)
      const left = shuffled[0]
      const right = shuffled[1]
      
      const pairKey = `${left.id}-${right.id}`
      const newUsedPairs = new Set(prevUsedPairs)
      newUsedPairs.add(pairKey)
      
      setCurrentPair({
        left,
        right,
        leftId: left.id,
        rightId: right.id
      })
      setSelectedSide(null)
      
      return newUsedPairs
    })
  }

  const simulateModelGeneration = async (modelId: string, delay: number): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 秋元康風の歌詞のサンプル（実際にはAI APIから取得）
        // 各モデルで異なる歌詞を生成するようにバリエーションを追加
        const lyricsVariations = [
          `朝の光が窓から差し込んで
目を覚ましたら あなたのことを思い出す
こんな気持ち 言葉にできないけど
伝えたい 伝えたい この想い

歩き出す 新しい一日
あなたと一緒なら どんな未来も
輝いて見える そう信じている
今日もまた 前を向いて進もう`,
          `雨上がりの空に 虹がかかって
君の笑顔が 今も心に残ってる
あの日の約束 忘れないよ
ずっと ずっと 大切にしてる

時が経っても 変わらないもの
それは君との かけがえのない時間
これからも 一緒に歩いていこう
手を繋いで 未来へと`,
          `夜明け前の静けさの中
一人きりで 考えてた
夢を追いかけて 走り続けて
諦めない その気持ち

誰もが それぞれの道を
選んで 歩いてく
迷った時は 空を見上げて
答えは きっと見つかる`,
          `風に揺れる 桜の花びら
春の訪れを 感じながら
新しい出会い 新しい始まり
胸を躍らせて 今日を迎える

君と過ごした あの季節
今でも 鮮明に覚えてる
また会える日を 信じて
前を向いて 歩き続ける`,
          `星が輝く 夜空を見上げて
願い事を 一つ 心に秘めて
叶うかどうか 分からないけど
それでも 信じてみたい

夢は いつか 現実になる
そう信じて 今日も頑張る
君がいるから 強くなれる
一緒に 未来を 創っていこう`
        ]
        const index = models.findIndex(m => m.id === modelId)
        resolve(lyricsVariations[index % lyricsVariations.length])
      }, 1000 + delay)
    })
  }

  const handleSelect = (side: 'left' | 'right', event: React.MouseEvent) => {
    if (!currentPair) return
    
    setSelectedSide(side)
    
    const selectedModelId = side === 'left' ? currentPair.leftId : currentPair.rightId
    const unselectedModelId = side === 'left' ? currentPair.rightId : currentPair.leftId
    
    // 選択を記録
    setModelStats(prev => {
      const newStats = { ...prev }
      if (!newStats[selectedModelId]) {
        newStats[selectedModelId] = { wins: 0, total: 0 }
      }
      if (!newStats[unselectedModelId]) {
        newStats[unselectedModelId] = { wins: 0, total: 0 }
      }
      
      newStats[selectedModelId].wins += 1
      newStats[selectedModelId].total += 1
      newStats[unselectedModelId].total += 1
      
      return newStats
    })
    
    // 花火アニメーションの位置を取得
    const rect = event.currentTarget.getBoundingClientRect()
    setFireworksPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    })
    setShowFireworks(true)
    
    // 選択回数をカウント
    const newCount = selectionCount + 1
    setSelectionCount(newCount)
    
    // 10セット終了したらランキングを表示
    if (newCount >= MAX_SELECTIONS) {
      setTimeout(() => {
        setShowRanking(true)
      }, 1500)
    }
    
    // 少し待ってから次のペアを表示
    setTimeout(() => {
      setShowFireworks(false)
      setModelStates(prevStates => {
        selectNextPair(prevStates)
        return prevStates
      })
    }, 1000)
  }

  const hasResults = modelStates.some(m => m.result && !m.isLoading)
  const allCompleted = modelStates.filter(m => m.result && !m.isLoading).length >= 2

  // ランキングデータを準備
  const rankingData = Object.entries(modelStats).map(([modelId, stats]) => {
    const model = models.find(m => m.id === modelId)
    return {
      modelId,
      modelName: model?.name || modelId,
      wins: stats.wins,
      total: stats.total,
      winRate: stats.total > 0 ? (stats.wins / stats.total) * 100 : 0
    }
  })

  return (
    <div className="max-w-4xl mx-auto">
      {/* 花火アニメーション */}
      <Fireworks trigger={showFireworks} position={fireworksPosition} />
      
      {/* ランキング表示 */}
      {showRanking && (
        <Ranking 
          rankings={rankingData}
          onClose={() => setShowRanking(false)}
        />
      )}
      
      {/* 進捗表示 */}
      {allCompleted && currentPair && selectionCount < MAX_SELECTIONS && (
        <div className="mb-4 text-center text-sm text-gray-500">
          {selectionCount} / {MAX_SELECTIONS} セット完了
        </div>
      )}
      {hasResults && allCompleted && currentPair && (
        <div className="mb-6 text-center text-sm text-gray-600">
          左右の歌詞を読んで、より「秋元康」らしい方を選択してください
        </div>
      )}

      {/* ローディング中 */}
      {isGenerating && !allCompleted && (
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-6">
            <div className="flex-1 bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      )}

      {/* 比較表示 */}
      {allCompleted && currentPair && (
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* 左側の歌詞 */}
            <div 
              className={`flex-1 bg-white rounded-lg p-6 cursor-pointer transition-all ${
                selectedSide === 'right' ? 'opacity-50' : ''
              }`}
              style={{
                border: selectedSide === 'left' 
                  ? '2px solid rgba(173, 208, 238, 0.75)' 
                  : '2px solid rgba(173, 208, 238, 0.25)',
                boxShadow: selectedSide === 'left'
                  ? 'rgba(173, 208, 238, 0.5) 0px 4px 16px 0px'
                  : 'rgba(173, 208, 238, 0.3) 0px 4px 16px 0px',
                transition: 'border-color 0.3s, box-shadow 0.3s'
              }}
              onClick={(e) => !selectedSide && handleSelect('left', e)}
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {prompt}
                </h3>
              </div>
              
              <div className="min-h-[300px] mb-4">
                <div className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {currentPair.left.result}
                </div>
              </div>

              {!selectedSide && (
                <button 
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm font-medium transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelect('left', e)
                  }}
                >
                  選択
                </button>
              )}

              {selectedSide === 'left' && (
                <div className="text-center text-sm text-gray-600 py-2">
                  ✓ 選択されました
                </div>
              )}
            </div>

            {/* 右側の歌詞 */}
            <div 
              className={`flex-1 bg-white rounded-lg p-6 cursor-pointer transition-all ${
                selectedSide === 'left' ? 'opacity-50' : ''
              }`}
              style={{
                border: selectedSide === 'right' 
                  ? '2px solid rgba(173, 208, 238, 0.75)' 
                  : '2px solid rgba(173, 208, 238, 0.25)',
                boxShadow: selectedSide === 'right'
                  ? 'rgba(173, 208, 238, 0.5) 0px 4px 16px 0px'
                  : 'rgba(173, 208, 238, 0.3) 0px 4px 16px 0px',
                transition: 'border-color 0.3s, box-shadow 0.3s'
              }}
              onClick={(e) => !selectedSide && handleSelect('right', e)}
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {prompt}
                </h3>
              </div>
              
              <div className="min-h-[300px] mb-4">
                <div className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {currentPair.right.result}
                </div>
              </div>

              {!selectedSide && (
                <button 
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm font-medium transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelect('right', e)
                  }}
                >
                  選択
                </button>
              )}

              {selectedSide === 'right' && (
                <div className="text-center text-sm text-gray-600 py-2">
                  ✓ 選択されました
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 全てのペアを比較し終えた場合 */}
      {allCompleted && !currentPair && (
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            全ての比較が完了しました
          </h3>
          <p className="text-gray-600">
            ご協力ありがとうございました
          </p>
        </div>
      )}
    </div>
  )
}

