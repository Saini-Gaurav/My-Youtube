import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  const vedioId = searchParams.get("v");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  return (
    <div className={`${!isMenuOpen ? 'px-20 ' : 'px-3 backdrop-blur-sm bg-white'} col-span-10 pt-6 flex w-full mt-[10px] `}>
    <div className='flex-grow-6'>
      <iframe
        width="1000"
        height="450"
        src={"https://www.youtube.com/embed/" + vedioId}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
    </div>
  );
};

export default WatchPage;
