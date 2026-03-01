import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, number, email, message, requirement } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "New Website Inquiry 🚀",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Requirement:</strong> ${requirement || "Not Selected"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ message: "Message sent successfully ✅" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Email failed ❌" });
  }
}