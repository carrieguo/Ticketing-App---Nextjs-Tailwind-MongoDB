"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Ticket } from "@/types";
const TicketForm = ({ ticket }: { ticket: Ticket }) => {
  console.log(ticket)
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };
  if (EDITMODE) {
    startingTicketData.title = ticket.title as string;
    startingTicketData.description = ticket.description as string;
    startingTicketData.priority = ticket.priority;
    startingTicketData.progress = ticket.progress;
    startingTicketData.status = ticket.status as string;
    startingTicketData.category = ticket.category as string;
  }
  const [formData, setFormData] = useState(startingTicketData);
  console.log(formData);
  const handlechange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        // "content-type":"application/json",
      });
      if (!res.ok) {
        throw new Error("failed to update ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        // "content-type":"application/json",
      });
      if (!res.ok) {
        throw new Error("failed to create ticket");
      }
    }
    router.refresh();
    router.push("/");
  };
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>
        <label htmlFor="">Title</label>
        <input
          id="title"
          name="title"
          required={true}
          value={formData.title}
          onChange={handlechange}
          type="text"
        />
        <label htmlFor="">Description</label>
        <textarea
          id="description"
          name="description"
          required={true}
          value={formData.description}
          onChange={handlechange}
          rows={5}
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handlechange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            type="radio"
            name="priority"
            id="priority-1"
            value={1}
            checked={formData.priority == 1}
            onChange={handlechange}
          />
          <label>1</label>
        </div>
        <div>
          <input
            type="radio"
            name="priority"
            id="priority-2"
            value={2}
            checked={formData.priority == 2}
            onChange={handlechange}
          />
          <label>2</label>
        </div>
        <div>
          <input
            type="radio"
            name="priority"
            id="priority-3"
            value={3}
            checked={formData.priority == 3}
            onChange={handlechange}
          />
          <label>3</label>
        </div>
        <div>
          <input
            type="radio"
            name="priority"
            id="priority-4"
            value={4}
            checked={formData.priority == 4}
            onChange={handlechange}
          />
          <label>4</label>
        </div>
        <div>
          <input
            type="radio"
            name="priority"
            id="priority-1"
            value={5}
            checked={formData.priority == 5}
            onChange={handlechange}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          name="progress"
          id="progress"
          value={formData.progress}
          min={0}
          max={100}
          onChange={handlechange}
        />
        <label htmlFor="">States</label>
        <select name="status" value={formData.status} onChange={handlechange}>
          <option value="not started">not started</option>
          <option value="started">started</option>
          <option value="done">done</option>
        </select>
        <input
          type="submit"
          className="btn"
          value={EDITMODE ? "update ticket" : "create ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
