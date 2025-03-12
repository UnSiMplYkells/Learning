import { useMoveBack } from "../Hooks/useMoveBack";

function NotLoggedIn() {
  const moveBack = useMoveBack();

  return (
    <div> 
      <h1>
          You have to be Logged in to have access
      </h1>
      <button onClick={moveBack}>
        &larr; Go back
      </button>
    </div>
  );
}

export default NotLoggedIn
