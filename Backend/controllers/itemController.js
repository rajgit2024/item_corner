const { addItem, getAllItems } = require("../models/itemModel")

const addItems = async (req, res) => {
  try {
    console.log(" Add item request received")
    console.log("Request body:", req.body)
    console.log(" Request files:", req.files)

    if (!req.files || !req.files["coverImage"]) {
      console.log(" No cover image provided")
      return res.status(400).json({ message: "Cover image is required" })
    }

    const { name, type, description } = req.body
    const coverImagePath = `/uploads/${req.files["coverImage"][0].filename}`
    const additionalImagesPaths = req.files["additionalImages"]
      ? req.files["additionalImages"].map((file) => `/uploads/${file.filename}`)
      : []

    console.log(" Image paths:", { coverImagePath, additionalImagesPaths })

    const newItem = await addItem({
      name,
      type,
      description,
      coverImage: coverImagePath, // Fixed field name
      additionalImages: additionalImagesPaths, // Fixed field name
    })

    console.log(" Item added successfully:", newItem)

    return res.status(201).json({
      message: "Item successfully added",
      item: newItem,
    })
  } catch (error) {
    console.error(" Error in addItems controller:", error)
    return res.status(500).json({ error: "Server error", details: error.message })
  }
}

const getItems = async (req, res) => {
  try {
    console.log("Get items request received")

    const items = await getAllItems()

    console.log("Fetched items from database:", items)
    console.log(" Number of items:", items.length)

    if (items.length > 0) {
      console.log(" First item structure:", items[0])
    }

    return res.status(200).json(items) // Added status code for clarity
  } catch (error) {
    console.error("Error in getItems controller:", error)
    return res.status(500).json({ error: "Server error", details: error.message })
  }
}

module.exports = { addItems, getItems }
