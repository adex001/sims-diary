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

    const entry = await models.Entries.findByPk(entryId);
    if (entry) {
      if (entry.dataValues.ownerid != req.decoded.userId) {
        return response.errorResponse(res, 401, "You do not have permission to update this diary");
      } else {
        const updatedEntry = await entry.update({
          story
        });

        if (updatedEntry) {
          return response.successResponse(res, 200, updatedEntry);
        } else {
          return response.errorResponse(res, 400, error);
        }
      }
    } else {
      return response.errorResponse(res, 404, 'Diary does not exist');
    }
  }

  static async getEntries(req, res) {
    const userId = req.decoded.userId;

    try {
      await models.Entries.findAll()
        .then((entry) => {
          // Check if the person that is trying to update the diary is the owner of the diary
          if (entry[0].dataValues.ownerid !== userId) {
            return response.errorResponse(res, 401, "You have not made any diary entry, Please make an entry and try again");
          }
          return response.successResponse(res, 200, entry);
        });
    } catch {
      return response.errorResponse(res, 500, "Internal server error");
    }
  }
}
export default EntriesController;