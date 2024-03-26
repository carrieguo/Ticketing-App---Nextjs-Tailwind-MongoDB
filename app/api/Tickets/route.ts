import Ticket from "@/app/(models)/Ticket"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
    
        const tickets = await Ticket.find()
        return NextResponse.json({tickets},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Error",error},{status:500})
    }
}
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const ticketData = body.formData
        await Ticket.create(ticketData)
        return NextResponse.json({message:"Ticket created successfully"},{status:201})
    } catch (error) {
        return NextResponse.json({message:"Error",error},{status:500})
    }
}