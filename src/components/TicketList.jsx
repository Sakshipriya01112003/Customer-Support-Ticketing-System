import React from "react";
 import TicketItem from "./TicketItem";

const TicketList = ({ tickets, onDelete }) => {
  return (
    <>
    <h1 className="text-center text-4xl font-extrabold m-4">Tickets</h1>
    <div className="overflow-x-auto">
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Priority</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Title</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Description</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Created</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.length === 0 ? (
            <tr>
              <td className="px-4 py-2 text-sm text-gray-500" colSpan={7}>
                No tickets found.
              </td>
            </tr>
          ) : (
            tickets.map(ticket => (
              <TicketItem key={ticket.id} ticket={ticket} onDelete={onDelete} />
            ))
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default TicketList;
