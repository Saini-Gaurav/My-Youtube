import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { formatCompactNumber } from '../utils/helper';

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [video, setVideo] = useState({});
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const vedioId = searchParams.get("v");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  return (
    <div
      className={`${
        !isMenuOpen ? "px-20 " : "px-3 backdrop-blur-sm bg-white"
      } col-span-10 pt-6 flex w-full mt-[10px] `}
    >
      <div className="flex-grow-6">
        <iframe
          width="1000"
          height="450"
          src={"https://www.youtube.com/embed/" + vedioId}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="p-2 m-2">
          <div>
            <div className="font-medium text-[18px]">
              {video?.snippet?.title}
            </div>
            <div className="mt-2 flex justify-between">
              <div className="flex">
                <div className="flex">
                  <img
                    className="rounded-full w-10 h-10"
                    alt="thumbnail"
                    src={video?.snippet?.thumbnails?.medium?.url}
                  />
                  <div className="flex flex-col justify-center ml-2">
                    <div className="font-bold text-[16px]">
                      {video?.snippet?.channelTitle}
                    </div>
                    <div className="text-gray-500 text-[12px]">
                      {formatCompactNumber(video?.statistics?.viewCount)}
                      Subscriber
                    </div>
                  </div>
                </div>
                <button className="bg-black rounded-full px-4 ml-2 text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
