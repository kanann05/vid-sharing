import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
export default function Player(props) {
  const [play, setPlay] = useState(false);
  const location = useLocation(); 
 
  const { src } = location.state;

  return (
    <div
      className="player-div"
      style={{
        
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="info"
        style={{
          visibility: play ? "hidden" : "visible",
          position: "absolute",
          marginLeft: "-60vw",
          marginTop: "0vh",
          color: "white",
          maxWidth: "30vw",
        }}
      >
        <h1>Show name</h1>
        <h2>Episode no</h2>
        <h3>
          Mary had a little lamb, lamb grew up and had a family of his own. Will
          the lamb raise the kids better than Mary?
        </h3>
      </div>
      
      <ReactPlayer
        playing={play}
        controls={true}
        onPlay={() => setPlay(true)} 
        onPause={() => setPlay(false)} 
        className="player"
        width="100%"
        height="100%"
        url={src}
    //     config={{
    //       file: {
    //         tracks: [
    //           {
    //             kind: "subtitles",
    //             src: sub,
    //             srcLang: "en",
    //             default: true
    //           }
    //         ]
    //       }
    //     }
    //   }
      />
    </div>
    
  );
  
}