import React, { useState } from "react";
import "./index";

const initialAttendance = [
  {
    id: 100,
    name: "Daniel",
    entryPin: "dan002",
    phone: "+234 9009898",
    date: "7/3/2023",
    timeIn: "9:00:00",
    exitPin: "dan002",
    image: "https://i.pravatar.cc/48?u=499476",
  },
  {
    id: 1001,
    name: "Hamzat",
    entryPin: "8696",
    phone: "+234 9009856",
    date: "7/3/2023",
    timeIn: "07:50:21",
    exitPin: "8696",
    image: "https://i.pravatar.cc/48?u=48677",
  },
  {
    id: 1002,
    name: "Henry",
    entryPin: "h485",
    date: "7/3/2023",
    timeIn: "10:12:20",
    phone: "+234 8789898",
    exitPin: "h485",
    image: "https://i.pravatar.cc/48?u=4977899",
  },
];
//Time formated to AM or PM
function formatTimeWithAMPM(date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid input. Please provide a valid Date object.");
  }

  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
// Example usage:
const currentDate = new Date();
const cunrrentTime = formatTimeWithAMPM(currentDate);
console.log(cunrrentTime);

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [members, setMembers] = useState(initialAttendance);
  const [showSignIn, setShowSignIn] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  function handleAddMember(member) {
    setMembers((members) => [...members, member]);
  }

  const handleShowSignIn = () => {
    setShowSignIn(!showSignIn);
    setSelectedMember(null); //to close Signout form
  };

  function handleSelection(member) {
    //setSelectedMember(member);
    setSelectedMember((cur) => (cur?.id === member.id ? null : member));
    setShowSignIn(false); //to close sign fomrm
  }

  return (
    <div className="App">
      <h3>ATTENDANCE TAKER</h3>
      <Timer />

      <div className="choose">
        <SelectSignIn show={handleShowSignIn} open={showSignIn} />
      </div>

      <div className="sign">
        {showSignIn && (
          <SignIn onAddMember={handleAddMember} hideForm={handleShowSignIn} />
        )}
        {selectedMember && (
          <SignOut
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
          />
        )}
      </div>

      <MembersList
        members={members}
        onSelection={handleSelection}
        selectedMember={selectedMember}
      />
    </div>
  );
}

function MembersList({ members, onSelection, selectedMember }) {
  return (
    <div className="members">
      {members.map((member) => (
        <Member
          member={member}
          key={member.id}
          onSelection={onSelection}
          selectedMember={selectedMember}
        />
      ))}
    </div>
  );
}

function Member({ member, onSelection, selectedMember }) {
  const isSelected = selectedMember?.id === member.id;
  const [openHour, setOpenHour] = useState(0);
  const [totalTimeIn, setTotalTimeIn] = useState();

  const timeStringTotalTimeIn = `${member.timeIn}`;
  React.useEffect(() => {
    const [hours, minutes, seconds] = timeStringTotalTimeIn
      .split(":")
      .map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTotalTimeIn(totalSeconds);
  }, []);
  console.log(totalTimeIn);

  const timeStringOpenHour = "9:00:00";
  React.useEffect(() => {
    const [hours, minutes, seconds] = timeStringOpenHour.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setOpenHour(totalSeconds);
  }, []);
  console.log(openHour);
  console.log(9 * 3600 + 0 * 60 + 0);

  return (
    <div>
      <ul>
        <li className={isSelected ? "selected" : ""}>
          <label>
            <img src={member.image} alt={member.name} width="50px" />
          </label>

          <label>Name: {member.name}</label>
          <label>Phone: {member.phone}</label>

          <label>Entry Pin: {member.entryPin}</label>
          <label>Date: {member.date}</label>

          <label style={{ fontWeight: "bold" }}>Time In: {member.timeIn}</label>
          <label>
            Remark:
            {totalTimeIn < openHour && (
              <span className="green">You came early🤝 keep it up! </span>
            )}
            {totalTimeIn > openHour && (
              <span className="red">You came late 👎 make amend! </span>
            )}
            {totalTimeIn === openHour && (
              <span>You came exactly the time👌 thanks! </span>
            )}
          </label>
          <Button onClick={() => onSelection(member)}>
            {isSelected ? "Close" : "Select to Sign Out"}
          </Button>
        </li>
      </ul>
    </div>
  );
}

function Timer() {
  return (
    <div className="timer">
      <label>Openning Hour: 9:00AM</label>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <label>Closing Hour: 5:00PM</label>
    </div>
  );
}

function SelectSignIn({ show, open }) {
  return (
    <div>
      <Button onClick={show}>{open ? "Close" : "Sign In"}</Button>
    </div>
  );
}

function SignIn({ onAddMember, hideForm }) {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

  const [name, setName] = useState("");
  const [imageId, setImageId] = useState("");
  const [timeIn, setTimeIn] = useState(time);
  const [phone, setPhone] = useState("");
  const [entryPin, setEntryPin] = useState("");
  const [signDate, setSignDate] = useState(date);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(imageId);

    //if (!name || !phone || !imageId || !entryPin) return;
    if (!name || !phone || !imageId || !entryPin)
      return alert("Fill in the details");

    const id = crypto.randomUUID();
    const newMember = {
      id: id,
      image: `${"https://i.pravatar.cc/48?u=4"}?=${id}`,
      name,
      date,
      timeIn: time,
      entryPin,
      phone,
    };
    onAddMember(newMember);

    setName("");
    setImageId("");
    setPhone("");
    setSignDate("");
    setEntryPin("");
    setTimeIn("");
    hideForm(); //close form after submit sign in details
  };
  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <p>Enter Your Details To Sign In</p>
        <p>
          Photo ID:
          <input
            type="number"
            value={imageId}
            onChange={(e) => setImageId(e.target.value)}
          />
        </p>
        <p>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <p>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </p>
        <p>
          Entery Pin:
          <input
            type="text"
            value={entryPin}
            onChange={(e) => setEntryPin(e.target.value)}
          />
        </p>
        <p>
          Date:
          <input
            disabled
            type="text"
            value={signDate}
            onChange={(e) => setSignDate(e.target.value)}
          />
        </p>
        <p>
          Time In:
          <input
            style={{ fontWeight: "bold" }}
            type="text"
            value={timeIn}
            onChange={(e) => setTimeIn(e.target.value)}
            disabled
          />
        </p>
        <p>
          <Button>Submit</Button>
        </p>
      </form>
    </div>
  );
}

function SignOut({ selectedMember, setSelectedMember }) {
  const [closeHour, setCloseHour] = useState(0);
  const [totalTimeOut, setTotalTimeOut] = useState(0);
  const [exitPin, setExitPin] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(true);

  var today = new Date();
  var timeOut =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // const totalTime =
  //   today.getHours * 3600 + today.getMinutes * 60 + today.getSeconds;
  //   setTotalTimeOut(totalTime);

  const timeStringTimeOut = `${timeOut}`;
  React.useEffect(() => {
    const [hours, minutes, seconds] = timeStringTimeOut.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTotalTimeOut(totalSeconds);
  }, []);

  const timeStringCloseHour = "17:00:00";
  React.useEffect(() => {
    const [hours, minutes, seconds] = timeStringCloseHour
      .split(":")
      .map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setCloseHour(totalSeconds);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedMember.entryPin !== exitPin) {
      alert("Incorrect Pin");
    } else {
      alert("Thanks for today, Goodbye!!!");
      setIsFormOpen(false);
      setSelectedMember(null);
    }
  }

  return (
    <div className="signout">
      {isFormOpen ? (
        <form onSubmit={handleSubmit}>
          <img src={selectedMember.image} alt={selectedMember.id} />

          <p style={{ fontWeight: "bold" }}>
            Well Done{" "}
            <span
              style={{
                color: "navy",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {selectedMember.name}
            </span>{" "}
            !
          </p>
          <span>
            You came by{" "}
            <span style={{ fontWeight: "bold" }}> {selectedMember.timeIn}</span>
          </span>
          <p>Enter Your Exit Pin To Sign Out</p>
          <p>
            Exit Pin:
            <input
              required
              type="text"
              value={exitPin}
              onChange={(e) => setExitPin(e.target.value)}
            />
          </p>
          <p>
            Name:
            <input disabled type="text" value={selectedMember.name} />
          </p>
          <p>
            Phone:
            <input disabled type="text" value={selectedMember.phone} />
          </p>
          <p>
            Date:
            <input disabled type="text" value={selectedMember.date} />
          </p>
          <p style={{ fontWeight: "bold" }}>
            Time Out:
            <input
              style={{ fontWeight: "bold" }}
              type="text"
              value={timeOut}
              disabled
            />
          </p>
          <p>
            {" "}
            Remark:
            {totalTimeOut > closeHour && (
              <span className="green">
                Kudos💪 {selectedMember.name}, You are closing after the time!
              </span>
            )}
            {totalTimeOut < closeHour && (
              <span className="red">
                Mind You {selectedMember.name}, You are closing before the
                time!👎
              </span>
            )}
            {totalTimeOut === closeHour && (
              <span>
                Thank You {selectedMember.name}, You are closing exactly at the
                time👌
              </span>
            )}
          </p>
          <p>
            <Button>Submit</Button>
          </p>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
