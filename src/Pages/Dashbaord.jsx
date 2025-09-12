import React, { useState, useEffect } from "react";
import TicketList from "../components/TicketList";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Search, Menu, X, Plus, LogOut, Ticket, Filter, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:3000/Tickets');
        setTickets(response.data);
        setFilteredTickets(response.data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
        setError('Failed to load tickets. Please try again.');
        setTickets([]);
        setFilteredTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    let filtered = [...tickets];

    if (search.trim()) {
      filtered = filtered.filter(ticket =>
        ticket.title?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.description?.toLowerCase().includes(search.toLowerCase()) ||
        ticket.id?.toString().includes(search.trim())
      );
    }

  
    if (status !== 'all') {
      filtered = filtered.filter(ticket => 
        ticket.status?.toLowerCase() === status.toLowerCase()
      );
    }

 
    if (priority !== 'all') {
      filtered = filtered.filter(ticket => 
        ticket.priority?.toLowerCase() === priority.toLowerCase()
      );
    }

    setFilteredTickets(filtered);
  }, [search, status, priority, tickets]); 

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setPriority("all");
  };
  
  const handleLogOut = () => {
    navigate('/login')
  }
  
  const refreshTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:3000/Tickets');
      setTickets(response.data);
    } catch (err) {
      console.error('Error refreshing tickets:', err);
      setError('Failed to refresh tickets.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 container mx-auto">
      <nav className="w-full bg-white/90 shadow-lg border-b border-slate-200/50 sticky top-0 z-50 container mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
    
           {/* icon */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Customer Support
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Ticketing System
                </p>
              </div>
            </div>

            
            {/* hamburger */}
            <button className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

              {/* Main*/}
            <div className="hidden md:flex items-center gap-4">
              {/* Search functionality */}
              <div className="flex items-center gap-3">
                <div className="relative group ">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4 group-focus-within:text-blue-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tickets..."
                    className="pl-10 pr-4 py-2.5 w-64 border border-slate-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
                  />
                </div>

                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="appearance-none px-4 py-2.5 pr-8 border border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm font-medium"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

 
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="appearance-none px-4 py-2.5 pr-8 border border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm font-medium"
                  >
                    <option value="all">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

            {/* Buttons */}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
                  {(search || status !== 'all' || priority !== 'all') && (
                  <button
                   onClick={clearFilters} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"> 
                  <Filter className="w-4 h-4" /> Clear 
                  </button>
                   )}

                <button
                  onClick={refreshTickets}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200 disabled:opacity-50">
                  <RefreshCw className={`w-4 h-4 `} />
                  Refresh
                </button>

                <button
                  onClick={() => navigate("/create")}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transform hover:scale-105 transition-all duration-200 shadow-lg">
                  <Plus className="w-4 h-4" />
                  New Ticket
                </button>

        
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

        
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
           isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0" }`}>
            <div className="space-y-4 pt-4 border-t border-slate-200">
               <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search tickets..." className="pl-10 pr-4 py-2.5 w-full border border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"/>
               </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select value={status} onChange={(e) => setStatus(e.target.value)}className="appearance-none px-4 py-2.5 border border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm font-medium">
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select value={priority} onChange={(e) => setPriority(e.target.value)}
                  className="appearance-none px-4 py-2.5 border border-slate-200 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm font-medium">
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(search || status !== 'all' || priority !== 'all') && (
                  <button onClick={clearFilters} className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all duration-200">
                    <Filter className="w-4 h-4" />
                    Clear
                  </button>
                )}
                
                <button onClick={refreshTickets} disabled={loading} className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all duration-200 disabled:opacity-50">
                <RefreshCw className={`w-4 h-4`} />
                  Refresh
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/create")}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg">
                  <Plus className="w-4 h-4" />
                  New Ticket
                </button>

                <button className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-lg transition-all duration-200" onClick={handleLogOut}>
                  <LogOut className="w-4 h-4"  />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* TicketSection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-20 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="text-sm text-slate-600">
                <span className="font-medium text-slate-900">{filteredTickets.length}</span> tickets found
              </div>
            </div>
          </div>
        </div>

        {loading ? ( <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-slate-600">Loading tickets...</span>
          </div>) : (
          <TicketList tickets={filteredTickets}  onDelete={(id) => {
            setTickets(prev => prev.filter(t => t.id !== id));
          }} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;