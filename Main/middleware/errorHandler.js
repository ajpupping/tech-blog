function errorHandler(err, req, res, next) {
    console.error(err.stack);

    // Set the response status code
    const statusCode = err.statusCode || 500; 

    // Send an error message
    res.status(statusCode).json({
        message: err.message || 'An unexpected error occurred on the server.',
    });
}
