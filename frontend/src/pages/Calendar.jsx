import React, { useEffect, useMemo, useState } from 'react';
import NavigationBar from '../components/Dashboard/NavigationBar';
import './Calendar.css';

const STORAGE_KEY = 'calendarTasks';

const buildMonthDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < startOffset; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    days.push(date.toISOString().split('T')[0]);
  }

  return days;
};

const Calendar = () => {
  const today = new Date();
  const [activeMonth, setActiveMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskTime, setTaskTime] = useState('09:00');
  const [tasksByDate, setTasksByDate] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        setTasksByDate(parsed);
      }
    } catch (error) {
      console.error('Invalid calendar data:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksByDate));
  }, [tasksByDate]);

  const days = useMemo(() => {
    return buildMonthDays(activeMonth.getFullYear(), activeMonth.getMonth());
  }, [activeMonth]);

  const selectedTasks = useMemo(() => {
    const tasks = tasksByDate[selectedDate] || [];
    return [...tasks].sort((a, b) => a.time.localeCompare(b.time));
  }, [selectedDate, tasksByDate]);

  const monthLabel = activeMonth.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric'
  });

  const addTask = (event) => {
    event.preventDefault();

    if (!taskTitle.trim()) {
      return;
    }

    const newTask = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: taskTitle.trim(),
      time: taskTime || '09:00'
    };

    setTasksByDate((prev) => {
      const current = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: [...current, newTask]
      };
    });

    setTaskTitle('');
  };

  const deleteTask = (dateKey, taskId) => {
    setTasksByDate((prev) => {
      const updated = (prev[dateKey] || []).filter((task) => task.id !== taskId);
      if (updated.length === 0) {
        const next = { ...prev };
        delete next[dateKey];
        return next;
      }

      return {
        ...prev,
        [dateKey]: updated
      };
    });
  };

  const moveMonth = (direction) => {
    const next = new Date(activeMonth);
    next.setMonth(activeMonth.getMonth() + direction);
    setActiveMonth(next);
  };

  return (
    <div className="calendar-page">
      <NavigationBar />

      <main className="calendar-content">
        <header className="calendar-header">
          <h1>Calendar</h1>
          <p>Plan your skill sessions with simple time-based tasks for each day.</p>
        </header>

        <section className="calendar-layout">
          <article className="calendar-board card-surface">
            <div className="calendar-toolbar">
              <button type="button" className="month-btn" onClick={() => moveMonth(-1)}>
                Previous
              </button>
              <h2>{monthLabel}</h2>
              <button type="button" className="month-btn" onClick={() => moveMonth(1)}>
                Next
              </button>
            </div>

            <div className="weekdays">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="month-grid">
              {days.map((dateKey, index) => {
                if (!dateKey) {
                  return <div key={`empty-${index}`} className="day-cell empty" />;
                }

                const dateObj = new Date(`${dateKey}T00:00:00`);
                const dayNumber = dateObj.getDate();
                const isSelected = dateKey === selectedDate;
                const isToday = dateKey === today.toISOString().split('T')[0];
                const taskCount = (tasksByDate[dateKey] || []).length;

                return (
                  <button
                    type="button"
                    key={dateKey}
                    className={`day-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => setSelectedDate(dateKey)}
                  >
                    <span>{dayNumber}</span>
                    {taskCount > 0 && <small>{taskCount} task{taskCount > 1 ? 's' : ''}</small>}
                  </button>
                );
              })}
            </div>
          </article>

          <article className="day-plan card-surface">
            <h3>Schedule for {selectedDate}</h3>

            <form className="task-form" onSubmit={addTask}>
              <label htmlFor="task-title">Task</label>
              <input
                id="task-title"
                type="text"
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
                placeholder="Ex: React mentoring session"
              />

              <label htmlFor="task-time">Time</label>
              <input
                id="task-time"
                type="time"
                value={taskTime}
                onChange={(event) => setTaskTime(event.target.value)}
              />

              <button type="submit" className="add-btn">
                Add Task
              </button>
            </form>

            <div className="task-list">
              {selectedTasks.length === 0 ? (
                <p className="empty-text">No tasks yet for this day.</p>
              ) : (
                selectedTasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <div>
                      <strong>{task.time}</strong>
                      <p>{task.title}</p>
                    </div>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteTask(selectedDate, task.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Calendar;
