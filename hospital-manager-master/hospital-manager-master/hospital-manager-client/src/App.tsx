import "./App.css";
import CoronaVaccines from "./CoronaDisplay";
import WorkerSearch from "./WorkerSearch";
import WorkersDisplay from "./WorkersDisplay";

function App() {
  return (
    <div>
      <WorkersDisplay />
      <CoronaVaccines />
      <WorkerSearch />
    </div>
  );
}

export default App;
