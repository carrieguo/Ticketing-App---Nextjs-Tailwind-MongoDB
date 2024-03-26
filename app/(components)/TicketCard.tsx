import React from "react";
import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressDisplay from "./ProgressDisplay";
import StatusDisplay from "./StatusDisplay";
import { Ticket } from "@/types";
import Link from "next/link";
const TicketCard = ({ t }: { t: Ticket }) => {
  const formatTimestamp = (timestamp: string) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    } as const;
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={t.priority}></PriorityDisplay>

        <div className="ml-auto">
          <DeleteBlock id={t._id}></DeleteBlock>
        </div>
      </div>
      <Link href={`/TicketPage/${t._id}`} style={{display:"contents"}}>
      <h4>{t.title}</h4>
      <hr className="h-px border-0 bg-page mb-2" />
      <p className="whitespace-pre-wrap">{t.description}</p>
      <div className="flex-grow"></div>
      <div className="flex mt-2">
        <div className="flex flex-col">
          <p className="text-xs my-1">{formatTimestamp(t.createdAt)}</p>
          <ProgressDisplay progress={t.progress}></ProgressDisplay>
        </div>
        <div className="ml-auto flex items-end">
          <StatusDisplay status={t.status}></StatusDisplay>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default TicketCard;
