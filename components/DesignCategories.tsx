'use client'

interface DesignCategoriesProps {
  selected: string
  onSelect: (type: string) => void
}

const designCategories = [
  { id: 'website', label: 'Website', icon: '< />' },
  { id: 'gamedev', label: 'Game Dev', icon: '🎮' },
  { id: '3d', label: '3D Design', icon: '🎲' },
  { id: 'image', label: 'Image', icon: '🖼️' },
  { id: 'video', label: 'Video', icon: '▶️' },
  { id: 'video-to-video', label: 'Video to Video', icon: '⏯️' },
  { id: 'graphic', label: 'Graphic Design', icon: '⚙️' },
  { id: 'logo', label: 'Logo', icon: '✨' },
  { id: 'dataviz', label: 'Data Viz', icon: '📊' },
  { id: 'conversation', label: 'Conversation', icon: '💬' },
  { id: 'speech-to-text', label: 'Speech-to-Text', icon: '🎤' },
  { id: 'ui-component', label: 'UI Component', icon: '📱' },
  { id: 'slides', label: 'Slides', icon: '📄' },
  { id: 'text-to-speech', label: 'Text-to-Speech', icon: '🔊' },
]

export default function DesignCategories({ selected, onSelect }: DesignCategoriesProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <h2 className="text-center text-gray-700 mb-4 text-lg font-medium">
        What are we designing today?
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {designCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              selected === category.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
        <button className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2">
          <span>+</span>
          <span>Show less</span>
        </button>
      </div>
    </div>
  )
}

