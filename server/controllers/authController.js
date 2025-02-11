class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    login = async (req, res) => {
        try {
            const result = await this.authService.login(req.body);
            res.json(result);
        } catch (error) {
            res.status(422).json({ message: error.message });
        }
    };

    register = async (req, res) => {
        try {
            const result = await this.authService.register(req.body);
            res.json(result);
        } catch (error) {
            res.status(422).json({ message: error.message });
        }
    };
}

export default AuthController;