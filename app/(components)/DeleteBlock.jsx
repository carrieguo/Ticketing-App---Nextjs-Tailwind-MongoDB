"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons"
import React from "react";
import { useRouter } from "next/navigation";

const DeleteBlock = ({id}) => {
  const router = useRouter()

  const deleteTicket= async()=>{
    const res = await fetch(`/api/Tickets/${id}`,{
      method:"DELETE",
    })
    if(res.ok){
      router.refresh()
    }
  }

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick = {deleteTicket}
    ></FontAwesomeIcon>
  );
};

export default DeleteBlock;