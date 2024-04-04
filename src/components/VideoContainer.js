import React, { useEffect, useState } from 'react'
import { YOUTUBE_API } from '../utils/constants'
import VedioCard from './VedioCard';

const VideoContainer = () => {

  const [vedios, setVedios] = useState([]);

  useEffect(()=>{
    getVideos();

  }, [])

  const getVideos = async ()=>{
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    setVedios(json.items);
  }
  return (
    <div className="flex flex-wrap">
      {vedios.map((vedio) => <VedioCard key={vedio.id} info={vedio}/>)}
    </div>
  )
}

export default VideoContainer
