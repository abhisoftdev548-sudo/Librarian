class ErrorHandler extends Error {
    statusCode: number; // Pehle yahan define karein
    
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode; // Phir yahan assign karein
        
        
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;