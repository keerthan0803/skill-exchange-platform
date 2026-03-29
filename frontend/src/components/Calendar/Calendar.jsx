import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const Calendar = () => {
  const today = new Date();
  const [activeMonth, setActiveMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
  const [events, setEvents] = useState([
    { id: 1, date: '2024-03-15', title: 'Learn Python with Alice', time: '10:00 AM', type: 'learning' },
    { id: 2, date: '2024-03-20', title: 'Teach React to Bob', time: '2:00 PM', type: 'teaching' },
  ]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '', type: 'learning' });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);
    return days;
  };

  const handleAddEvent = () => {
    if (newEvent.title) {
      setEvents([...events, {
        id: Math.random(),
        date: selectedDate,
        ...newEvent
      }]);
      setNewEvent({ title: '', time: '', type: 'learning' });
      setShowAddEvent(false);
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const prevMonth = () => {
    setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1));
  };

  const selectedDateEvents = events.filter(e => e.date === selectedDate);
  const days = getDaysInMonth(activeMonth);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="section-title">Your Schedule</h1>
          <p className="section-subtitle">Manage your learning and teaching sessions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 card">
            <div className="space-y-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{getMonthName(activeMonth)}</h2>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-gray-600 font-medium text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (day) {
                        const dateStr = new Date(activeMonth.getFullYear(), activeMonth.getMonth(), day)
                          .toISOString().split('T')[0];
                        setSelectedDate(dateStr);
                      }
                    }}
                    className={`p-2 rounded-lg text-sm font-medium transition-all ${
                      day === null
                        ? 'text-gray-300'
                        : selectedDate === `${activeMonth.getFullYear()}-${String(activeMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                        ? 'bg-blue-600 text-white'
                        : events.some(e => e.date === `${activeMonth.getFullYear()}-${String(activeMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Date Events */}
          <div className="card">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </h3>
              </div>

              <div className="space-y-2">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map(event => (
                    <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{event.time}</p>
                          <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                            event.type === 'learning' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {event.type === 'learning' ? '📚 Learning' : '👨‍🏫 Teaching'}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No events scheduled</p>
                )}
              </div>

              <button
                onClick={() => setShowAddEvent(!showAddEvent)}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Event
              </button>

              {showAddEvent && (
                <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Event title"
                    className="input-field text-sm"
                  />
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="input-field text-sm"
                  />
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    className="input-field text-sm"
                  >
                    <option value="learning">Learning</option>
                    <option value="teaching">Teaching</option>
                  </select>
                  <div className="flex gap-2">
                    <button onClick={handleAddEvent} className="flex-1 btn-primary text-sm">Save</button>
                    <button onClick={() => setShowAddEvent(false)} className="flex-1 btn-secondary text-sm">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;