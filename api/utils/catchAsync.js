export default function (fn) {
  // The fn is an async function, so if is rejected catch the error in .catch(err => next(err))
  return (req, res, next) => {
    fn(req, res, next).catch(next); // shorthand for .catch(err => next(err))
  };
}
