export const errorHandler = (err, _, res) => {
    if( err instanceof Error ) {
        return res.status(500).json({error: 'Internal server error'});
    }else{
        return res.status(err.statusCode).json({error: err.message});
    }
};
