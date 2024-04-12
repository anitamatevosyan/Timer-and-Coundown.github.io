import Countdown from "./components/Timer/Countdown";
import Timer from "./components/Timer/Timer.jsx";
import "./App.css";

function App() {
  return (
    <div className="main-block">
      <Timer />
      <Countdown />
    </div>
  );
}
// App.propTypes = {
//   test: PropTypes.string,
// };
export default App;
