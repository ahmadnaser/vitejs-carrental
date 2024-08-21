import React from 'react';

const SingleCard = ({ item }) => {
  const cardBackgrounds = {
    "ri-police-car-line": "bg-gradient-to-r from-orange-500 to-red-500",
    "ri-steering-2-line": "bg-gradient-to-r from-green-500 to-green-300",
    "ri-user-line": "bg-purple-600",
    "ri-car-washing-line": "bg-blue-600"
  };

  return (
    <div className={`p-5 flex items-center justify-between rounded-md cursor-pointer ${cardBackgrounds[item.icon]}`}>
      <div>
        <h4 className="text-heading-color text-base font-normal">{item.title}</h4>
        <span className="text-heading-color text-2xl">{item.totalNumber}</span>
      </div>
      <div>
        <i className={`text-2xl font-normal text-white ${item.icon}`}></i>
      </div>
    </div>
  );
};

export default SingleCard;
