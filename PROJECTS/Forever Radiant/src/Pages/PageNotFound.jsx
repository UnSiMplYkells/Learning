import { useMoveBack } from "../Hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div> 
      <h1>
        The page you are looking for could not be found 😢
      </h1>
      <button onClick={moveBack}>
        &larr; Go back
      </button>
    </div>
  );
}

export default PageNotFound;