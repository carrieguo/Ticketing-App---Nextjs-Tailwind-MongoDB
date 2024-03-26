
interface cate {
  category: string;
}
interface cates {
  uniqueCategory: String;
  categoryIndex: Number;
}
import { Ticket } from "@/types";
import React from "react";
import TicketCard from "./(components)/TicketCard";
const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    console.log("filed", error);
  }
};

const Dashboard = async () => {
  console.log("重新渲染了首页")
  const { tickets } = await getTickets();
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }: cate) => category)),
  ];
  
  return (
    <div className="p-5">
      <div className="lg:grid grid-cols-2 xl:grid-cols-4">
        <div>
          {tickets &&
            uniqueCategories?.map((uniqueCategory, index) => {
              const value = uniqueCategory as string;
              return (
                <div key={index} className="mb-4">
                  <h2>{value}</h2>
                  <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {tickets
                      .filter(({ category }: cate) => category === value)
                      .map((ticket: Ticket, index: string) => {
                       return<TicketCard t={ticket} key={index} />;
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
