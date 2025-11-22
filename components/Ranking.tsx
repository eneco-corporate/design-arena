'use client'

interface RankingItem {
  modelId: string
  modelName: string
  wins: number
  total: number
  winRate: number
}

interface RankingProps {
  rankings: RankingItem[]
  onClose?: () => void
}

export default function Ranking({ rankings, onClose }: RankingProps) {
  const sortedRankings = [...rankings].sort((a, b) => {
    if (b.winRate !== a.winRate) {
      return b.winRate - a.winRate
    }
    return b.wins - a.wins
  })

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return `${index + 1}位`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            評価結果
          </h2>
          <p className="text-gray-600 text-center">
            10セット（20個）の比較が完了しました
          </p>
        </div>

        <div className="space-y-4">
          {sortedRankings.map((item, index) => (
            <div
              key={item.modelId}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                index === 0
                  ? 'bg-yellow-50 border-yellow-200'
                  : index === 1
                  ? 'bg-gray-50 border-gray-200'
                  : index === 2
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl font-bold">
                {getRankIcon(index)}
              </div>
              
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  {item.modelName}
                </div>
                <div className="text-sm text-gray-600">
                  勝率: {item.winRate.toFixed(1)}% ({item.wins}勝 / {item.total}戦)
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${item.winRate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {onClose && (
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-colors"
            >
              閉じる
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

