interface TickctProps {
  params: { id: String };
}
import TicketForm from "@/app/(components)/TicketForm";
import { Ticket } from "@/types";
import React from "react";

const getTicketById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to get ticket");
    }
    return res.json();
  } catch (error) {}
};

const TicketPage = async ({ params }: TickctProps) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTicketData = {};
  if (EDITMODE) {
    const data = await getTicketById(params.id as string);
    updateTicketData = data.foundTicket
    
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <TicketForm ticket={updateTicketData as Ticket}></TicketForm>;
};

export default TicketPage;
