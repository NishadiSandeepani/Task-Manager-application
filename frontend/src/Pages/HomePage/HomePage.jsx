import React, { useState } from "react";

const Home = () => {
  const [description, setDescription] = useState(
    "Welcome to our Task Master app, designed to help you stay organized and productive! Whether you're managing personal tasks, work projects, or daily reminders, our app offers an intuitive interface that makes task management simple and efficient. Add, edit, mark as completed, or delete tasks with ease, and keep track of your progress. With features like task status filters and real-time updates, staying on top of your to-do list has never been easier. Stay focused, stay organized, and accomplish your goals with our user-friendly platform!"
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      
      <div className="mb-6">
        <img
          src="https://media.istockphoto.com/id/497489557/vector/to-do-list-businessman.jpg?s=612x612&w=0&k=20&c=-46Eor0Pn1FgtmCALPCYf0BfB1BooA0p8P53DPM1W8w=" // Replace with your image URL
          alt="Website Banner"
          className="rounded-lg shadow-lg w-132"  
        />
      </div>

      <div className="text-center max-w-6xl">
        <p className="text-gray-700 text-2xl leading-relaxed">  
          {description}
        </p>
      </div>
    </div>
  );
};

export default Home;
