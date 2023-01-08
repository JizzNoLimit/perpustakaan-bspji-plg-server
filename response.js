exports.response = (statusCode, data, message, res) => {
    res.status(statusCode).json([
        {
            data,
            message
        }
    ])
}

exports.responseMeta  = (statusCode, data, message, res) => {
    res.status(statusCode).json([
        {
            data,
            message,
            metadata: {
                prev: "",
                next: "",
                current: ""
            }
        }
    ])
}