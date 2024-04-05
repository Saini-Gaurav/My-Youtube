import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utils/constants";
import VedioCard from "./VedioCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [vedios, setVedios] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    setVedios(json.items);
  };
  return (
    <div className="flex flex-wrap">
      {vedios.map((vedio) => (
        <Link key={vedio.id}  to={"/watch?v=" + vedio.id}>
          <VedioCard info={vedio} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
