import React from "react";
import TicketItem from "./TicketItem";

const TicketList = ({ tickets , onDelete }) => {
  return (
    <div className="flex gap-2.5 flex-wrap">
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} onDelete={onDelete} />)
      )}
    </div>
  );
};

export default TicketList;
