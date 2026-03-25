import React from 'react'

interface ComponentCardProps {
  title: string
  description: string
  icon: React.ReactNode
  link: string | undefined
  status: string
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  description,
  icon,
  link,
  status,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="w-16 h-16 rounded-lg bg-gray flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
        <p className="text-blue mb-4">{description}</p>
        {status === 'development' ? (
          <span className="inline-block px-3 py-1 bg-gray text-blue text-sm font-medium rounded-full">
            В разработке
          </span>
        ) : (
          <a
            href={link}
            target="_blank"
            className="inline-block px-3 py-1 bg-green text-white text-sm font-medium rounded-full"
          >
            Активно
          </a>
        )}
      </div>
    </div>
  )
}

export default ComponentCard
