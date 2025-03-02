import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const doctors = [
  { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", photo: "https://via.placeholder.com/150" },
  { id: 2, name: "Dr. Jane Smith", specialty: "Dermatologist", photo: "https://via.placeholder.com/150" },
  { id: 3, name: "Dr. Michael Brown", specialty: "Neurologist", photo: "https://via.placeholder.com/150" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ name: email.split("@")[0] });
      setEmail("");
      setPassword("");
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMeetingLink(null);
    setSelectedDoctor(null);
    setTimeSlot("");
  };

  const generateMeetingLink = () => {
    if (!timeSlot) {
      alert("Please select a time slot");
      return;
    }
    const meetingId = uuidv4();
    const link = `https://meet.jit.si/${meetingId}`;
    setMeetingLink(link);
  };

  const handleLinkClick = () => {
    if (meetingLink) {
      window.location.href = meetingLink; // Navigate immediately on click
    }
  };

  const formatDateTime = (date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      {!user ? (
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 transform transition-all hover:scale-105 duration-300">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            {isLoginView ? "Welcome Back" : "Join Us"}
          </h2>
          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all shadow-md"
            >
              {isLoginView ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="mt-3 text-center text-sm text-gray-600">
            {isLoginView ? "Need an account?" : "Already have an account?"}{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline font-medium"
              onClick={() => setIsLoginView(!isLoginView)}
            >
              {isLoginView ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-8 transform transition-all hover:shadow-3xl duration-300">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Telemedicine Hub
            </h1>
            <button
              onClick={handleLogout}
              className="py-2 px-5 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:from-red-600 hover:to-red-800 transition-all shadow-md"
            >
              Logout
            </button>
          </div>

          <div className="mb-8 text-center bg-gray-50 py-4 rounded-lg shadow-inner">
            <p className="text-xl font-semibold text-gray-800">Hello, {user.name}</p>
            <p className="text-sm text-gray-600">{formatDateTime(currentTime)}</p>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Our Expert Doctors</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className={`p-5 border rounded-xl cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg ${
                  selectedDoctor?.id === doc.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedDoctor(doc)}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.specialty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedDoctor && (
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-inner">
              <h3 className="font-semibold text-gray-800 text-xl mb-4">
                Schedule with {selectedDoctor.name}
              </h3>
              <input
                type="datetime-local"
                className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
              <button
                onClick={generateMeetingLink}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition-all shadow-md"
              >
                Generate Meeting Link
              </button>

              {meetingLink && (
                <div className="mt-6 p-4 bg-green-100 rounded-lg shadow-md transition-all">
                  <p className="text-sm font-medium text-gray-700">Your Meeting Link:</p>
                  <p
                    onClick={handleLinkClick}
                    className="text-blue-600 cursor-pointer hover:underline font-medium break-all"
                  >
                    {meetingLink}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Scheduled for: {new Date(timeSlot).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}