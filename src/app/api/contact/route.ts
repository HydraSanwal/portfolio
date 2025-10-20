import { NextResponse } from 'next/server'

interface ContactRequestBody {
  name: string
  email: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const sgMailModule = await import('@sendgrid/mail')
    const sgMail = sgMailModule.default
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

    const msg = {
      to: 'sanwalinanutshell@gmail.com', // 🔹 Replace with your actual receiving email
      from: 'sanwalinanutshell@gmail.com', // 🔹 Must match a verified sender in SendGrid
      subject: `New message from ${body.name}`,
      text: `
Name: ${body.name}
Email: ${body.email}
Message: ${body.message}
      `,
      html: `
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
    }

    await sgMail.send(msg)

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('SendGrid error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    )
  }
}
