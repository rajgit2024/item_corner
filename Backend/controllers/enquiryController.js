const nodemailer = require("nodemailer")

const sendEnquiry = async (req, res) => {
  const { name, email, message, itemId } = req.body

  if (!name || !email || !message || !itemId) {
    return res.status(400).json({ error: "All fields are required." })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rajdu7679@gmail.com",
        pass: "raj2004",
      },
    })

    const mailOptions = {
      from: email,
      to: "rajdu7679@gmail.com", //(admin)
      subject: `New enquiry for Item ID: ${itemId}`,
      html: `
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <p><strong>Item ID:</strong> ${itemId}</p>
      `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
    });
    res.status(200).json({ message: "Enquiry sent successfully." })
  } catch (err) {
    console.error("Nodemailer Error:", err)
    res.status(500).json({ error: "Failed to send enquiry." })
  }
}

module.exports = { sendEnquiry }
