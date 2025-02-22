class OrderController {
    constructor(orderService) {
    this.orderService = orderService;   
    }

    createOrder = async (req, res) => {
        try {
            const result = await this.orderService.createOrder(req, req.body);
            res.json(result);
        } catch (error) {
            res.status(422).json({ message: error.message });
        }
    };

    getOrdersByUserID = async (req, res) => {
        try {
            const result = await this.orderService.getOrdersByUserID(req);
            res.json(result);
        } catch (error) {
            res.status(422).json({ message: error.message });
        }
    };

    getOrderById = async (req, res) => {
        try {
            const result = await this.orderService.getOrderById(req, req.params.orderId);
            res.json(result);
        } catch (error) {
            res.status(422).json({ message: error.message });
        }
    };

}

export default OrderController;