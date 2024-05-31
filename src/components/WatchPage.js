import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { Link, useSearchParams } from "react-router-dom";
import { formatCompactNumber } from "../utils/helper";
import { YOUTUBE_API, YOUTUBE_VIDEO_WATCH_API } from "../utils/constants";
import likeIcon from '../assets/like.svg';
import disLikeIcon from '../assets/dislike.svg';
import shareIcon from '../assets/share.svg';
import downloadIcon from '../assets/download.svg';
import moreIcon from '../assets/more.svg';
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [video, setVideo] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const vedioId = searchParams.get("v");

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(closeMenu());
    getVideoDetails();
  }, [vedioId]);

  const getVideoDetails = async () => {
    const data = await Promise.all([
      fetch(YOUTUBE_VIDEO_WATCH_API + vedioId),
      fetch(YOUTUBE_API),
    ]);
    const watchVideoJson = await data[0].json();
    const relVideoJson = await data[1].json();
    // console.log(watchVideoJson);
    setVideo(watchVideoJson?.items[0]);
    setRelatedVideos(relVideoJson?.items);
    // console.log(relVideoJson);
  };

  return (
    <div
      className={`${
        !isMenuOpen ?"px-3 backdrop-blur-sm bg-white" : "ml-[210px]"
      } col-span-10 pt-6 flex w-full mt-[10px] `}
    >
      <div className="flex-grow-6">
        <iframe
          width="900"
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
                      {formatCompactNumber(video?.statistics?.viewCount) + " "}
                      Subscriber
                    </div>
                  </div>
                </div>
                <button className="bg-black rounded-full px-4 ml-2 text-white">
                  Subscribe
                </button>
              </div>
              <div className="flex">
                <button className="bg-gray-100 rounded-l-full px-2 hover:bg-gray-200">
                  <img alt="likeBtn" className="inline-block" src={likeIcon} />
                  {formatCompactNumber(video?.statistics?.likeCount)}
                </button>
                <button className="bg-gray-100 rounded-r-full px-4 border-l-2 border-gray-300 hover:bg-gray-200">
                  <img
                    alt="dislikeBtn"
                    className="inline-block"
                    src={disLikeIcon}
                  />
                </button>
                <button className="bg-gray-100 rounded-full px-4 ml-2 hover:bg-gray-200">
                  <img
                    alt="shareBtn"
                    className="inline-block"
                    src={shareIcon}
                  />
                  Share
                </button>
                <button className="bg-gray-100 rounded-full px-4 ml-2 hover:bg-gray-200">
                  <img
                    alt="downloadBtn"
                    className="inline-block"
                    src={downloadIcon}
                  />
                  Download
                </button>
                <button className="bg-gray-100 rounded-full w-10 h-10 ml-2 hover:bg-gray-200">
                  <img alt="moreBtn" className="inline-block" src={moreIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='p-1 m-1'>
          <CommentsContainer />
        </div>
      </div>
      <div className='flex-grow-3'>
                <div className='flex flex-col w-full'>
                    <div className='px-3 m-1 flex  w-full '>
                       <LiveChat />
                    </div>
                    <div className="mt-[150px]">
                    {relatedVideos?.map(video =>
                        <Link key={video?.id} to={'/watch?v=' + video?.id} onClick={() => window.scroll(0,0)}>
                            <div className='px-3 m-2 mt-[20px] flex'>
                                <img className='rounded-xl w-[168px] h-[94px] ' alt='thumbnail' src={video?.snippet?.thumbnails?.medium?.url} />
                                <ul className='flex flex-col justify-start ml-2 w-60'>
                                    <li className='font-medium py-2 text-[14px] line-clamp-2 max-h-[50px] leading-5'>{video?.snippet?.title}</li>
                                    <li className='text-gray-500 text-[12px]'>{video?.snippet?.channelTitle}</li>
                                    <li className='text-gray-500 text-[12px]'>{formatCompactNumber(video?.statistics?.viewCount)} -  {(Math.abs(new Date(video?.snippet?.publishedAt) - new Date()) / (60 * 60 * 24 * 1000)).toFixed(1)} days ago</li>
                                </ul>
                            </div>
                         </Link>
                    )}
                    </div>
                </div>
            </div>
        </div>
  );
};

export default WatchPage;
