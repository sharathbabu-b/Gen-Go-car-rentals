import Subscription from "../models/subscriptionModels.js"

const subscriptionCtrl = {};

subscriptionCtrl.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    try {
        const subscription = new Subscription(body);
        await subscription.save();
        res.status(201).json(subscription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create subscription", error });
    }
};

subscriptionCtrl.listAll= async (req, res) => {
    try {
        const subscriptions = await Subscription.find()
            .populate("userId", "name email");
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve subscriptions" });
    }
};

subscriptionCtrl.getById = async (req, res) => {
    const id = req.params.id;
    try {
        const subscription = await Subscription.findById(id).populate("userId", "name email");
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.status(200).json(subscription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving subscription" });
    }
};

subscriptionCtrl.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const updated = await Subscription.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating subscription" });
    }
};

subscriptionCtrl.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const deleted = await Subscription.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.status(200).json({ message: "Subscription deleted successfully", deleted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting subscription" });
    }
};

export default subscriptionCtrl;
