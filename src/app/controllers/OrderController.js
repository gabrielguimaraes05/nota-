import * as Yup from 'yup';
import Order from '../models/Order';

class OrderController {
    async store(req, res) {
        const schema = Yup.object().shape({
            subject: Yup.string().required(),
            description: Yup.string().required(),
            educationLevel: Yup.number().required(),
            studyArea: Yup.number().required(),
            dueDate: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Data validation failed' });

        const { userId } = req;

        const { subject, description, educationLevel, studyArea, dueDate } = req.body;        

        if (!isValidDate(dueDate))
            return res.status(400).json({ error: 'Due date is invalid' });

        const due_date = Date.parse(dueDate);

        const order = await Order.create({
            subject,
            description,
            education_level: educationLevel,
            study_area: studyArea,
            due_date,
            user_id: userId
        });

        return res.json(order);
    }
}

export default new OrderController();


function isValidDate(dateString) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;  // Invalid format
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}
