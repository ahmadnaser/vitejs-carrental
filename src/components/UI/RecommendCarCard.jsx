import React from "react";

const RecommendCarCard = (props) => {
  const { carName, retweet, imgUrl, rentPrice, percentage } = props.item;
  return (
    <div className={`text-black p-5 rounded-md cursor-pointer flex flex-col bg-white`}>
      <div className="flex justify-between items-center mb-4">
        <h5 className="flex items-center gap-2 text-body-bg">
          <span>
            <i className="ri-refresh-line"></i>
          </span>
          {percentage}% Recommended
        </h5>
      </div>

      <div className="mb-4">
        <img src={imgUrl} alt={carName} className="w-full rounded-md" />
      </div>
      <div className="text-center">
        <h4 className="text-xl font-semibold mb-4">{carName}</h4>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2">
              <i className="ri-repeat-line"></i>
              {retweet}k
            </p>
            <p>
              <i className="ri-settings-2-line"></i>
            </p>
            <p>
              <i className="ri-timer-flash-line"></i>
            </p>
          </div>
          <span className="text-lg font-medium">${rentPrice}/h</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendCarCard;
