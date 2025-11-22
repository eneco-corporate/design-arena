'use client'

interface CategorySelectorProps {
  selected: 'models' | 'prompts'
  onSelect: (category: 'models' | 'prompts') => void
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const categories = [
    { id: 'models' as const, label: 'AIモデル' },
    { id: 'prompts' as const, label: 'プロンプト' },
  ]

  return (
    <div className="flex justify-center gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === category.id
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

