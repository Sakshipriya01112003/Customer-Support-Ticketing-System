import React from "react";
import TicketForm from "../components/TicketForm";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
  const navigate = useNavigate();

  const handleSubmit = (ticket) => {
    navigate("/dashboard");
  };

  return (
    <div >
      <TicketForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTicket;
