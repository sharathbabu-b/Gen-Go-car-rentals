import React, { useState } from 'react';
import { CalendarDays, MapPin, Car, Bike } from 'lucide-react';
import { DateRangePicker } from 'react-date-range';
import { useDispatch } from 'react-redux';
import { createSubscription } from '../slices/subscriptionSlice';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const durations = [
  { label: '01 Month', value: 1 },
  { label: '03 Months', value: 3 },
  { label: '06 Months', value: 6 },
  { label: '12 Months', value: 12 },
  { label: '24 Months', value: 24 },
];

const SubscribeSection = () => {
  const dispatch = useDispatch();
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSubmit = () => {
    const payload = {
      userId: 'USER_ID_HERE', // Replace with actual userId from auth context or Redux
      UpgradePlan: selectedDuration <= 3 ? 'Basic' : selectedDuration <= 12 ? 'Premium' : 'Platinum',
      price: selectedDuration * 1000, // You can dynamically calculate price here
      start_date: dateRange[0].startDate,
      end_date: dateRange[0].endDate,
      isActive: true,
      location,
    };

    dispatch(createSubscription(payload));
  };

  return (
    <section
      className="relative bg-cover bg-center h-[90vh] text-white"
      style={{ backgroundImage: "url('/images/road-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold mb-6">Subscribe a car</h1>
          <p className="text-lg leading-relaxed text-gray-200">
            GEN-GO is your go-to platform for car rentals and subscriptions. Choose flexible durations and vehicle types, and drive stress-free!
          </p>
        </div>

        <div className="bg-white text-black rounded-2xl shadow-xl p-6 w-full md:w-[420px] mt-10 md:mt-0">
          <div className="flex justify-center gap-4 mb-4">
            <Car className="w-8 h-8 text-lime-600" />
            <Bike className="w-8 h-8 text-gray-400" />
          </div>

          <div className="flex items-center border rounded-lg px-4 py-2 mb-3">
            <MapPin className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Your location"
              className="w-full outline-none text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex items-center border rounded-lg px-4 py-2 mb-3">
            <CalendarDays className="text-gray-500 mr-2" />
            <input
              type="text"
              readOnly
              onClick={() => setShowDatePicker(!showDatePicker)}
              value={`${dateRange[0].startDate.toLocaleDateString()} – ${dateRange[0].endDate.toLocaleDateString()}`}
              className="w-full cursor-pointer text-sm outline-none"
            />
          </div>

          {showDatePicker && (
            <div className="z-50 relative">
              <DateRangePicker
                ranges={dateRange}
                onChange={(ranges) => setDateRange([ranges.selection])}
              />
            </div>
          )}

          <p className="text-sm font-medium mb-2">Choose your duration</p>
          <div className="grid grid-cols-3 gap-2">
            {durations.map(d => (
              <button
                key={d.value}
                onClick={() => setSelectedDuration(d.value)}
                className={`py-2 px-3 rounded-lg border text-sm font-medium ${
                  selectedDuration === d.value
                    ? 'bg-lime-600 text-white'
                    : 'border-lime-500 text-lime-600'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-lime-600 hover:bg-lime-700 text-white w-full mt-5 py-2 rounded-lg font-semibold transition"
          >
            Go
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
