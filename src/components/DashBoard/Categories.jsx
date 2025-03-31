import React from 'react'
import { categories } from "../../constants/Categories"
const Categories = ({ selectedCategory, setSelectedCategory}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Categories