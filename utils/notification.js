const Notification = require('../models/notification_model')

class Notification{

    constructor() {
        if (!Notification.instance) {
            Notification.instance = this
        }
        return Notification.instance
    }

    async saveNotification(message,profile) {
        const notification = await Notification.create({ message, profile, path })
        if (!notification) {
            return false
        }
        return true
    }

    async deleteNotification(id) {
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return false
        }
        return true
    }

    async sendPushNotification() {
        
    }
}