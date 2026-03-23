import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import OAuth2RedirectHandler from '../components/Auth/OAuth2RedirectHandler';
import Dashboard from '../components/Dashboard/Dashboard';
import Profile from '../components/Profile/Profile';
import Followers from '../components/Followers/Followers';
import Settings from '../components/Settings/Settings';
import ExchangeSkill from '../components/ExchangeSkill/ExchangeSkill';
import Calendar from '../components/Calendar/Calendar';
import Search from '../components/Search/Search';
import GetMatched from '../components/GetMatched/GetMatched';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/followers" element={<Followers />} />
      <Route path="/exchange-skill" element={<ExchangeSkill />} />
      <Route path="/search" element={<Search />} />
      <Route path="/get-matched" element={<GetMatched />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;