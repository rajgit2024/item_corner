import { useState } from "react"
import EnquiryForm from "./EnquiryForm"
import {X} from "lucide-react"
function ItemModal({ item, onClose, onEnquire }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)

  // Get all images (cover + additional) with proper backend URLs
  const getAllImages = () => {
    const images = []
    if (item.cover_image) {
      images.push(`https://item-corner.onrender.com${item.cover_image}`)
    }
    if (item.additional_images && Array.isArray(item.additional_images)) {
      const additionalImages = item.additional_images.map((img) => `https://item-corner.onrender.com${img}`)
      images.push(...additionalImages)
    }
    return images
  }

  const allImages = getAllImages()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleEnquirySuccess = (successData) => {
    onEnquire(successData)
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 transition-all duration-200"
          >
            < X className="font-18"/>
          </button>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image Section */}
            <div className="relative">
              {allImages.length > 0 ? (
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                  <img
                    src={allImages[currentImageIndex] || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error("Image failed to load:", allImages[currentImageIndex])
                      e.target.src = "/placeholder.svg"
                    }}
                  />

                  {/* Navigation buttons */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center text-gray-800 transition-all duration-200 shadow-md"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center text-gray-800 transition-all duration-200 shadow-md"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image indicators */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-2">No image available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Item Details Section */}
            <div className="flex flex-col justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-500">ID: #{item.id}</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">{item.name}</h2>

                {item.description && <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>}

                {/* Enquiry suggestions */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border border-blue-100">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <span className="mr-2">💡</span>
                    What you can ask about:
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-blue-800">
                      <span className="mr-2">📦</span>
                      Availability
                    </div>
                    <div className="flex items-center text-blue-800">
                      <span className="mr-2">📷</span>
                      More photos
                    </div>
                    <div className="flex items-center text-blue-800">
                      <span className="mr-2">💰</span>
                      Pricing
                    </div>
                    <div className="flex items-center text-blue-800">
                      <span className="mr-2">🚚</span>
                      Delivery
                    </div>
                  </div>
                </div>
              </div>

              {/* Enquire Button */}
              <button
                onClick={() => setShowEnquiryForm(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <EnquiryForm item={item} onClose={() => setShowEnquiryForm(false)} onSuccess={handleEnquirySuccess} />
      )}
    </>
  )
}

export default ItemModal
