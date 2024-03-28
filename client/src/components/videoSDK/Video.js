
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from '../../API';
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { setMeeting, setMeetingNull } from "../../actions/interview";


function JoinScreen({ getMeetingAndToken, auth, interview }) {
  const [meetingId, setMeetingId] = useState(null);
  useEffect(() => {
    if (auth.isAuthenticated) {
      console.log(interview.meetingId)
      setMeetingId(interview.meetingId);
    }
  }, [auth.isAuthenticated, interview.meetingId]);
  
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div className="grid grid-cols-3 justify-items-center">
      <div className=" bg-gray-200"></div>
      <div className=" flex flex-col justify-items-center text-center ">
        {auth.isCompanyAuthenticated && <button className="btn btn-primary w-96" onClick={onClick}>Create Meeting</button>}
        {auth.isAuthenticated && 
        <>
          <input
          className="text-base h-12 px-4 py-1 rounded-lg w-96 text-center border-2 focus:outline-none border-gray-400"
          type="text"
          placeholder="Enter Meeting Id"
          value={meetingId}
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
          />
          <button className="btn btn-primary w-96 mt-4" onClick={onClick}>Join</button>
        </>}
        {!auth.isAuthenticated && !auth.isCompanyAuthenticated && 
        <>
        <button className="btn btn-primary w-96" onClick={onClick}>Create Meeting</button>
        <p>or</p>
        <input
          className="text-base h-12 px-4 py-1 rounded-lg w-96 text-center border-2 focus:outline-none border-gray-400"
          type="text"
          placeholder="Enter Meeting Id"
          value={meetingId}
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
          />
          <button className="btn btn-primary w-96 mt-4" onClick={onClick}>Join</button>
        </>
        }
        
      </div>
    </div>
    
  );
}

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="mt-16" key={props.participantId}>
      
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"400px"}
          width={"620px"}
          style={{ borderRadius: "5px" }}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const [webcamOn, setWebcamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const handleWebcamToggle = () => {
    toggleWebcam();
    setWebcamOn(!webcamOn);
  };
  const handleMicToggle = () => {
    toggleMic()
    setMicOn(!micOn);
  };
  return (
    <div className="flex items-center ">
      {micOn ? (
        <button className="btn bg-gray-700 h-12 w-16" onClick={handleMicToggle}>
          <i className="fa fa-microphone" aria-hidden="true"></i>
        </button>
      ) : (
        <button className="btn bg-gray-700 h-12 w-16" onClick={handleMicToggle}>
          <i className="fa fa-microphone-slash" aria-hidden="true"></i>
        </button>
      )}
      {webcamOn ? (
        <button className="btn bg-gray-700 h-12 w-16" onClick={handleWebcamToggle}>
          <i className="fa fa-camera" aria-hidden="true"></i>
        </button>
      ) : (
        <button className="btn bg-gray-700 h-12 w-16" onClick={handleWebcamToggle}>
          <svg  fill="#444" width="27px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 20h11.879l-3.083-3.083A4.774 4.774 0 0 1 12 17c-2.71 0-5-2.29-5-5 0-.271.039-.535.083-.796L2.144 6.265C2.054 6.493 2 6.74 2 7v11c0 1.103.897 2 2 2zM20 5h-2.586l-2.707-2.707A.996.996 0 0 0 14 2h-4a.996.996 0 0 0-.707.293L6.586 5h-.172L3.707 2.293 2.293 3.707l18 18 1.414-1.414-.626-.626A1.98 1.98 0 0 0 22 18V7c0-1.103-.897-2-2-2zm-5.312 8.274A2.86 2.86 0 0 0 15 12c0-1.626-1.374-3-3-3-.456 0-.884.12-1.274.312l-1.46-1.46A4.88 4.88 0 0 1 12 7c2.71 0 5 2.29 5 5a4.88 4.88 0 0 1-.852 2.734l-1.46-1.46z"/></svg>
        </button>
      )}
      <button className="text-white rounded-lg hover:opacity-80 duration-300 py-1 px-4 h-12 text-base font-semibold bg-red-500" onClick={() => leave()}>Leave</button>

    </div>
  );
}

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();
  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="bg-[#444654] shadow-lg p-6 rounded-xl ">
      <h3 className="text-end text-gray-100">Meeting Id: {props.meetingId}</h3>
      {joined && joined == "JOINED" ? (
        <>
        <div className={` grid grid-cols-2 gap-4 relative h-[550px] `}>
          
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
              auth={props.auth}
            />
          ))}
        </div>
        <div className="flex justify-center">
            <div><Controls /></div>
        </div>
        </>
        
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button className="btn btn-primary" onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}

function Video ({auth, setMeeting,setMeetingNull, interview:{interview}})  {
    const [meetingId, setMeetingId] = useState(null);

    //Getting the meeting id by calling the api we just wrote
    const getMeetingAndToken = async (id) => {
      const meetingId =
        id == null ? await createMeeting({ token: authToken }) : id;
      setMeetingId(meetingId);
      const data ={userId:interview.userId, companyId: auth.company._id, meetingId: meetingId}
      await setMeeting(data)
    };

    //This will set Meeting Id to null when meeting is left or ended
    const onMeetingLeave = async () => {
      {auth.isCompanyAuthenticated && (async () => {
        const data = { userId: interview.userId, companyId: auth.company._id };
        await setMeetingNull(data);
      })()}
        
        setMeetingId(null);
    };


  return (
    <div className="video">
      <div className="video-container  relative">
      <div className="ml-10 mt-40">
        { authToken && meetingId ? (
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: true,
              webcamEnabled: true,
              name: "C.V. Raman",
            }}
            token={authToken}
          >
            <MeetingConsumer>
              {() => (
                <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} auth={auth} />
              )}
            </MeetingConsumer>
          </MeetingProvider>
        ) : (
          <JoinScreen getMeetingAndToken={getMeetingAndToken} auth={auth} interview={interview} />
        )
        }
      </div>
    </div>
    </div>
  );
}
 
const mapStateToProps = (state) => ({
  auth: state.auth,
  interview: state.interview
});

export default connect(mapStateToProps,{ setMeeting, setMeetingNull })(Video);