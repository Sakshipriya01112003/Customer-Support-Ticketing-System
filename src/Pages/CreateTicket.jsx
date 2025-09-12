import React from "react";
import TicketForm from "../components/TicketForm";
import { useNavigate } from "react-router-dom";

const CreateTicket = ({ addTicket }) => {
  const navigate = useNavigate();

  const handleSubmit = (ticket) => {
    addTicket(ticket);
    navigate("/dashbaord");
  };

  return (
    <div >
      <TicketForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTicket;
