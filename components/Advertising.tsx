'use client'

interface AdvertisingProps {
  keyword: string
}

export default function Advertising({ keyword }: AdvertisingProps) {
  // キーワードに関連する広告画像のプレースホルダー
  // 実際の実装では、キーワードに基づいて広告を動的に取得
  
  return (
    <div className="max-w-4xl mx-auto mb-8">
      {/* 入力したキーワード表示 */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">入力したキーワード:</p>
        <p className="text-lg font-medium text-gray-900">{keyword}</p>
      </div>

      {/* 広告エリア */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">Advertisement</p>
        <div className="flex flex-col md:flex-row gap-4">
          {/* 広告画像1 */}
          <div className="flex-1">
            <a 
              href="#" 
              className="block rounded-lg overflow-hidden aspect-video bg-white hover:opacity-90 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Advertisement+1" 
                alt={`${keyword} 関連広告 1`}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          
          {/* 広告画像2 */}
          <div className="flex-1">
            <a 
              href="#" 
              className="block rounded-lg overflow-hidden aspect-video bg-white hover:opacity-90 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://via.placeholder.com/600x400/10B981/FFFFFF?text=Advertisement+2" 
                alt={`${keyword} 関連広告 2`}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

