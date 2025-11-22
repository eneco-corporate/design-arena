'use client'

import { useEffect, useState } from 'react'

interface FireworksProps {
  trigger: boolean
  position?: { x: number; y: number }
}

export default function Fireworks({ trigger, position }: FireworksProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    color: string
    angle: number
    distance: number
  }>>([])

  useEffect(() => {
    if (trigger) {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#FFD93D', '#6BCF7F']
      const newParticles: Array<{
        id: number
        x: number
        y: number
        color: string
        angle: number
        distance: number
      }> = []

      const centerX = position?.x || (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
      const centerY = position?.y || (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

      // 60個のパーティクルを生成
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 * i) / 60
        const distance = 50 + Math.random() * 100
        newParticles.push({
          id: i,
          x: centerX,
          y: centerY,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle,
          distance
        })
      }

      setParticles(newParticles)

      // アニメーション終了後にパーティクルをクリア
      setTimeout(() => {
        setParticles([])
      }, 1500)
    }
  }, [trigger, position])

  if (particles.length === 0) return null

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map((particle) => {
          const endX = Math.cos(particle.angle) * particle.distance
          const endY = Math.sin(particle.angle) * particle.distance
          const animationName = `firework-${particle.id}`
          
          return (
            <div key={particle.id}>
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${particle.x}px`,
                  top: `${particle.y}px`,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 8px ${particle.color}, 0 0 12px ${particle.color}`,
                  animation: `${animationName} 1.5s ease-out forwards`,
                }}
              />
              <style jsx>{`
                @keyframes ${animationName} {
                  0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                  }
                  100% {
                    transform: translate(${endX}px, ${endY}px) scale(0);
                    opacity: 0;
                  }
                }
              `}</style>
            </div>
          )
        })}
      </div>
    </>
  )
}

