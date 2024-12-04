

const promiseWrap = (fn) => (req, res, next) => {

   return Promise
   .resolve(
      fn(req, res, next).catch(err => next(err))
   )
   .catch((err) => next(err))
}

export {
   promiseWrap
}