import React from "react";
import { useEffect} from "react";
import { useWorkoutsContext } from "../hooks/newWorkoutContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
function Home() {
  // const [workouts, setWorkout] = useState(null);
  const {filteredWorkout,dispatch} = useWorkoutsContext()
console.log({filteredWorkout})
  // This hook helps to connect to the API for getting all books to be rendered on this component on pageload
  useEffect(() => {
    fetchAllWorkout();
  }, []);

  const fetchAllWorkout = async () => {
    const response = await fetch("http://localhost:4000/api/workouts");
    const json = await response.json();
    // console.log({ json });
    if (response.ok) {
      dispatch({type: "SET_WORKOUTS",payload:json})
    }
  };

  return (
    <div className="container p-4 md:p-8 flex md:flex-row flex-col-reverse  justify-between  gap-4 m-auto mt-32">
      <div className=" md:w-1/2 grid grid-cols-1 gap-4">
      {filteredWorkout &&
        filteredWorkout.map((workout) => (
          <div className=' shadow-lg space-y-4'key={workout._id}>
            <WorkoutDetails  workout ={workout} />
          </div>
        ))}
      </div>
        <div className=" md:p-4 md:w-1/2 ">
        <WorkoutForm/>
        </div>
    </div>
  );
}

export default Home;
