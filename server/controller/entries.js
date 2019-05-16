import models from "../models";
import response from '../utilities/response';
import entryValidator from '../validations/entries';

class EntriesController {
  static async createDiary(req, res) {
    let {
      story
    } = req.body;

    const ownerid = req.decoded.userId;

    const error = entryValidator.createEntry(req.body);
    if (error) return response.errorResponse(res, 400, error);

    try {
      const createEntry = await models.Entries.create({
        ownerid,
        story
      });
      if (createEntry) {
        return response.successResponse(res, 201, createEntry);
      }
    } catch (error) {
      return response.errorResponse(res, 400, error);
    }
  }

  static async updateDiary(req, res) {
    let {
      story
    } = req.body;
    const {
      entryId
    } = req.params;

    const error = entryValidator.createEntry(req.body);
    if (error) return response.errorResponse(res, 400, error);

    return models.Entries.findByPk(entryId)
      .then(entry => {
        // Check if the person that is trying to update the diary is the owner of the diary
        if (entry.dataValues.ownerid != req.decoded.userId) {
          return response.errorResponse(res, 401, "You do not have permission to update this diary");
        } else {
          entry
            .update({
              story
            })
            .then(updatedEntry => {
              return response.successResponse(res, 200, updatedEntry);
            })
            .catch(error => response.errorResponse(res, 400, error));
        }
      })
      .catch(() => response.errorResponse(res, 404, 'Diary does not exist'));
  }
}
export default EntriesController;