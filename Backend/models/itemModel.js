const pool = require("./db")

const addItem = async ({ name, type, description, coverImage, additionalImages }) => {
  try {
    console.log("Adding item to database:", { name, type, description, coverImage, additionalImages })

    const result = await pool.query(
      "INSERT INTO items (name, type, description, cover_image, additional_images) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, type, description, coverImage, additionalImages],
    )

    console.log("Item added successfully:", result.rows[0])
    return result.rows[0]
  } catch (error) {
    console.error("Database error in addItem:", error)
    throw error
  }
}

const getAllItems = async () => {
  try {
    console.log("Fetching all items from database...")

    const result = await pool.query("SELECT * FROM items ORDER BY id DESC")

    console.log("Database query result:", result)
    console.log("Number of items found:", result.rows.length)
    console.log("Items data:", result.rows)

    return result.rows // Return ALL rows, not just the first one
  } catch (error) {
    console.error("Database error in getAllItems:", error)
    throw error
  }
}

module.exports = {
  addItem,
  getAllItems,
}
