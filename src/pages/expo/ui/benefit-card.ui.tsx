import React from 'react'

interface BenefitCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="bg-gray rounded-xl p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start">
        <div className="mr-4 p-3 bg-blue text-white rounded-lg">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
          <p className="text-blue">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default BenefitCard
