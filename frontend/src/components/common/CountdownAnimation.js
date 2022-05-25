import { useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { SettingsContext } from "./SettingsContext";
import { handleEnd } from "../promodoro";
const CountdownAnimation = ({ key, timer, animate, onstop, children }) => {
  const { stopAimate } = useContext(SettingsContext);

  return (
    <CountdownCircleTimer
      key={key}
      isPlaying={animate}
      duration={timer * 60}
      colors={[
        ["#eefaff", 0.33],
        ["#eefaff", 0.33],
        ["#eefaff", 0.33],
      ]}
      strokeWidth={6}
      size={220}
      trailColor="#4061a6"
      onComplete={onstop}
    >
      {children}
    </CountdownCircleTimer>
  );
};

export default CountdownAnimation;
