"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ItemCard from "../components/ItemCard"
import ItemModal from "../components/ItemModal"
import axios from "axios"

function ViewItem() {
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [enquirySuccess, setEnquirySuccess] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load items when component mounts
  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log(" Starting API call to fetch items...")
      const res = await axios.get("https://item-corner.onrender.com/api/items/get")

      console.log("API Response:", res.data)

      let itemsData = []
      if (Array.isArray(res.data)) {
        itemsData = res.data
      } else if (res.data && Array.isArray(res.data.items)) {
        itemsData = res.data.items
      }

      console.log(" Final processed items:", itemsData)
      setItems(itemsData)
    } catch (error) {
      console.error("API Error:", error)
      setError(`Failed to load items: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleItemClick = (item) => {
    console.log("Item clicked:", item)
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
  }

  const handleEnquirySuccess = (successData) => {
    console.log("📧 Enquiry success:", successData)
    setEnquirySuccess(successData)
    setSelectedItem(null)

    // Hide success message after 5 seconds
    setTimeout(() => {
      setEnquirySuccess(null)
    }, 5000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading items...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={loadItems} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-blue-600">Item Management System</h1>
            <div className="flex space-x-4">
              <Link
                to="/add"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Add Item
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Success Message */}
      {enquirySuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">✅</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-green-800 font-semibold">Enquiry Sent Successfully!</h3>
                <p className="text-green-700 text-sm mt-1">{enquirySuccess.message}</p>
                {enquirySuccess.itemName && (
                  <p className="text-green-600 text-xs mt-2">
                    Item: <span className="font-medium">{enquirySuccess.itemName}</span>
                  </p>
                )}
              </div>
              <button onClick={() => setEnquirySuccess(null)} className="text-green-600 hover:text-green-800 text-xl">
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">View Items</h2>
          <p className="text-gray-600">Browse all items in your inventory</p>
          <p className="text-sm text-gray-500 mt-2">Total items: {items.length}</p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
            </div>
            <p className="text-lg text-gray-500 mb-4">No items found in your inventory</p>
            <Link
              to="/add"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Add Your First Item
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <ItemCard key={item.id || item._id || index} item={item} onClick={() => handleItemClick(item)} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && <ItemModal item={selectedItem} onClose={handleCloseModal} onEnquire={handleEnquirySuccess} />}
    </div>
  )
}

export default ViewItem
