import models from '../models';

class EntriesController {
    static async deleteDiary(req, res) {
        const { entryId } = req.params;

        if (isNaN(entryId)) return res.status(400).json({ status: 400, error: 'Entry Id must be an Integer' });

        await models.Entries.destroy({
            where: { id: entryId }
        }).then(async (entry) => {
            if (!entry) return res.status(404).json({ status: 404, error: 'Entry not found' });

            await res.status(200).json({ status: 200, message: 'Entry deleted successfully' });
        });
    }
}

export default EntriesController;
