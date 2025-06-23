"use client"

import { useState } from "react"
import axios from "axios"

function AddItemForm({ onItemAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    cover_image: null, // store as File
    additional_images: [], // store as Files[]
  })

  // Add preview URLs for images
  const [previewUrls, setPreviewUrls] = useState({
    cover_image: null,
    additional_images: [],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const itemTypes = ["Shirt", "Pant", "Shoes", "Sports Gear", "Electronics", "Books", "Other"]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (type, files) => {
    const fileArray = Array.from(files)

    if (type === "cover") {
      const file = fileArray[0]
      setFormData((prev) => ({
        ...prev,
        cover_image: file,
      }))

      // Create preview URL
      if (file) {
        const previewUrl = URL.createObjectURL(file)
        setPreviewUrls((prev) => ({
          ...prev,
          cover_image: previewUrl,
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        additional_images: [...prev.additional_images, ...fileArray],
      }))

      // Create preview URLs for additional images
      const newPreviewUrls = fileArray.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prev) => ({
        ...prev,
        additional_images: [...prev.additional_images, ...newPreviewUrls],
      }))
    }
  }

  const removeAdditionalImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index),
    }))

    // Remove preview URL
    setPreviewUrls((prev) => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index),
    }))
  }

  const removeCoverImage = () => {
    setFormData((prev) => ({
      ...prev,
      cover_image: null,
    }))
    setPreviewUrls((prev) => ({
      ...prev,
      cover_image: null,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = new FormData()
      data.append("name", formData.name)
      data.append("type", formData.type)
      data.append("description", formData.description)

      if (formData.cover_image) {
        data.append("coverImage", formData.cover_image)
      }

      formData.additional_images.forEach((img) => {
        data.append("additionalImages", img)
      })

      console.log("Submitting form data:", {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        cover_image: formData.cover_image?.name,
        additional_images: formData.additional_images.map((img) => img.name),
      })

      const res = await axios.post("https://item-corner.onrender.com/api/items/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Response:", res.data)

      if (res.status === 201) {
        onItemAdded()
        // Reset form
        setFormData({
          name: "",
          type: "",
          description: "",
          cover_image: null,
          additional_images: [],
        })
        setPreviewUrls({
          cover_image: null,
          additional_images: [],
        })
        document.getElementById("itemForm").reset()
      }
    } catch (error) {
      console.error("Error uploading item:", error)
      console.error("Upload error:", error.response?.data || error.message)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
      <form id="itemForm" onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {/* Item Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Item Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter item name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>

        {/* Item Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Item Type *
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            <option value="">Select item type</option>
            {itemTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Item Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your item in detail"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
            {previewUrls.cover_image ? (
              <div className="relative inline-block">
                <img
                  src={previewUrls.cover_image || "/placeholder.svg"}
                  alt="Cover Preview"
                  className="max-w-48 max-h-48 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={removeCoverImage}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">📷 Click to upload cover image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload("cover", e.target.files)}
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
            <div className="relative">
              <div className="text-gray-400 mb-2">
                <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="text-gray-600">📷 Click to upload additional images</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileUpload("additional", e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {previewUrls.additional_images.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {previewUrls.additional_images.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Additional Preview ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding Item...
            </div>
          ) : (
            "Add Item"
          )}
        </button>
      </form>
    </div>
  )
}

export default AddItemForm
