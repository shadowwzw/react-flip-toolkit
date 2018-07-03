import { Tweenable } from "shifty"

// animejs' influence
Tweenable.formulas.easeOutElastic = function(t) {
  var p = 0.99
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
}

Tweenable.formulas.easeOutElasticBig = function(t) {
  var p = 0.6
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
}

export const getEasingName = easeToApply => {
  if (!Tweenable.formulas[easeToApply]) {
    const defaultEase = "easeOutExpo"
    console.error(
      `${easeToApply} was not recognized as a valid easing option, falling back to ${defaultEase}`
    )
    easeToApply = defaultEase
  }
  return easeToApply
}

export default function tweenUpdate({
  fromVals,
  toVals,
  duration,
  easing,
  element,
  onUpdate,
  onAnimationEnd
}) {
  const tweenable = new Tweenable()
  const stop = tweenable.stop.bind(tweenable)

  tweenable.setConfig({
    from: fromVals,
    to: toVals,
    duration,
    easing: {
      opacity: "linear",
      matrix: getEasingName(easing)
    },
    delay: parseFloat(element.dataset.flipDelay),
    step: onUpdate(stop)
  })

  tweenable
    .tween()
    .then(onAnimationEnd)
    .catch(e => {
      // hmm
    })

  return stop
}