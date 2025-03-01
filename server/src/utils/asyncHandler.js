export const asyncHandler = (loadFunction) => {
    return (req, res, next) => {
        return Promise.resolve(loadFunction(req, res, next)).catch(err => next(err));
    }
}