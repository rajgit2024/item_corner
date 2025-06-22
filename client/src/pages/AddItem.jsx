"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AddItemForm from "../components/AddItemForm"

function AddItem() {
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const handleItemAdded = () => {
    setShowSuccess(true)

    setTimeout(() => {
      setShowSuccess(false)
      // Redirect to view items page after successful addition
      navigate("/")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-blue-600">Item Management System</h1>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              View Items
            </Link>
          </div>
        </div>
      </nav>

      {/* Success Message */}
      {showSuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              Item successfully added! Redirecting to view items...
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h2>
          <p className="text-gray-600">Fill in the details below to add a new item to your inventory</p>
        </div>

        <AddItemForm onItemAdded={handleItemAdded} />
      </div>
    </div>
  )
}

export default AddItem;