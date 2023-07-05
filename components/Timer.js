import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Timer = ({ dbDate }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = moment();
      const duration = moment.duration(currentTime.diff(dbDate));

      if (duration.asSeconds() < 60) {
        setTimeAgo('Just now');
      } else if (duration.asMinutes() < 60) {
        const minutes = Math.floor(duration.asMinutes());
        const seconds = Math.floor(duration.asSeconds() % 60);
        setTimeAgo(`${minutes} minutes, ${seconds} seconds ago`);
      } else {
        const hours = Math.floor(duration.asHours());
        const minutes = Math.floor(duration.asMinutes() % 60);
        const seconds = Math.floor(duration.asSeconds() % 60);
        setTimeAgo(`${hours} hours, ${minutes} minutes, ${seconds} seconds ago`);
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, [dbDate]);

  return <p>{timeAgo}</p>;
};

export default Timer;
