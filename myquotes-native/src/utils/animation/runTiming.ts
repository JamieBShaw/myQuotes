// import {
//   Value,
//   Easing,
//   block,
//   cond,
//   clockRunning,
//   stopClock,
//   debug,
//   timing,
//   startClock,
//   set,
//   Clock,
// } from "react-native-reanimated";

// export function runTiming(clock: Clock, value: number, dest: number) {
//   const state = {
//     finished: new Value(0),
//     position: new Value(0),
//     time: new Value(0),
//     frameTime: new Value(0),
//   };

//   const config = {
//     duration: 2000, //milliseconds
//     toValue: new Value(0),
//     easing: Easing.inOut(Easing.ease),
//   };

//   return block([
//     cond(clockRunning(clock), 0, [
//       set(state.finished, 0),
//       set(state.time, 0),
//       set(state.position, value),
//       set(state.frameTime, 0),
//       set(config.toValue, dest),
//       startClock(clock),
//     ]),
//     timing(clock, state, config),
//     cond(state.finished, debug("stop clock", stopClock(clock))),
//     state.position,
//   ]);
// }

// const [show, setShow] = useState(false);
//   const { clock, animatedValue } = useMemo(
//     () => ({
//       clock: new Clock(),
//       animatedValue: new Value(0),
//     }),
//     []
//   );

//   useCode(
//     () =>
//       block([
//         show
//           ? set(animatedValue, runTiming(clock, 0, 1))
//           : set(animatedValue, runTiming(clock, 1, 0)),
//       ]),
//     [show]
//   );

//   const opacity = interpolate(animatedValue, {
//     inputRange: [0, 1],
//     outputRange: [0, 1],
//   });

//   const translateY = interpolate(animatedValue, {
//     inputRange: [0, 1],
//     outputRange: [20, 0],
//   });

// import Animated, { Easing, useCode, Clock } from "react-native-reanimated";
// const {
//   Value,
//   set,
//   cond,
//   startClock,
//   clockRunning,
//   timing,
//   debug,
//   stopClock,
//   block,
//   interpolate,
// } = Animated;

// function runTiming(clock: Clock, from: number, to: number) {
//   const state = {
//     finished: new Value(0),
//     position: new Value(from),
//     time: new Value(0),
//     frameTime: new Value(0),
//   };

//   const config = {
//     duration: 200,
//     toValue: new Value(to),
//     easing: Easing.inOut(Easing.ease),
//   };

//   return block([
//     cond(clockRunning(clock), [], startClock(clock)),
//     timing(clock, state, config),
//     cond(state.finished, stopClock(clock)),
//     state.position,
//   ]);
// }
