import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, error: 'Authentication required' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        const { id } = payload;
        
        if (id) {
            req.body = { ...req.body, userId: id };
        }
        else {
            return res.json({ success: false, error: 'Invalid token' });
        }

        next();
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

export default userAuth;