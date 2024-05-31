import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { CORS_PROXY, SEARCH_API } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { cacheSuggestions } from "../utils/searchSlice";
import mikeIcon from "../assets/mike.svg";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchCache = useSelector((store) => store.cache);

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        if (searchCache[searchQuery]) {
          setSuggestions(searchCache[searchQuery]);
        } else {
          getSuggestions();
        }
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchQuery]);

  const getSuggestions = async () => {
    try {
      const response = await fetch(
        CORS_PROXY + SEARCH_API + encodeURIComponent(searchQuery)
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const text = await response.text();

      const json = JSON.parse(text);
      setSuggestions(json[1]);
      console.log(json[1]);
      dispatch(
        cacheSuggestions({
          [searchQuery]: json[1],
        })
      );
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  };

  const handleSuggestion = (event) => {
    setSearchQuery(event.target.innerText);
    setShowSuggestions(false);
    navigate('/results?search_query=' + encodeURI(event.target.innerText));
 }

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="Youtube-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>
      <div className="relative">
        <div className="flex flex-row relative">
          <input
            className="border rounded-l-full w-[572px] h-10 pl-5 outline-none"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border rounded-r-full w-16 h-10 bg-gray-100">
            <img
              alt="search-icon"
              className="h-5 mx-auto"
              src="https://cdn-icons-png.flaticon.com/512/482/482631.png"
            />
          </button>
          <div className="w-10 h-10 hover:rounded-full hover:bg-gray-100 ml-5 cursor-pointer">
            <img className="mt-2 ml-2" alt="mick-icon " src={mikeIcon} />
          </div>
          {searchQuery && <button onClick={() => setSearchQuery("")} className='absolute hover:bg-gray-200 hover:rounded-full w-9 h-9 right-[6.2rem] top-[2px]'>X</button>}
        </div>
        {showSuggestions && suggestions?.length > 0 && (
          <div className="absolute bg-white w-[560px] max-h-[400px] shadow-lg border rounded-lg overflow-y-auto left-3 top-10 z-50 text-left">
            <ul>
              {suggestions?.map((sugg) => (
                <li
                  key={sugg}
                  onMouseDown={(e) => handleSuggestion(e)}
                  className="my-1 p-1 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    className="mr-5 h-4 ml-3 inline-block"
                    alt="search-icon"
                    src="https://cdn-icons-png.flaticon.com/512/482/482631.png"
                  />
                  {sugg}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <img
          className="h-8"
          alt="user-icon"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Head;
