import models from "../models";
import response from "../utilities/response";
import entryValidator from "../validations/entries";

class EntriesController {
  static async createDiary(req, res) {
    let { story } = req.body;

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
    let { story } = req.body;
    const { entryId } = req.params;

    const error = entryValidator.createEntry(req.body);
    if (error) return response.errorResponse(res, 400, error);

    // Check if the parameter is a number
    if (isNaN(entryId)) {
      return response.errorResponse(res, 400, "Diary ID should be a number");
    }

    try {
      const entry = await models.Entries.findByPk(entryId);
      if (entry) {
        if (entry.dataValues.ownerid != req.decoded.userId) {
          return response.errorResponse(
            res,
            401,
            "You do not have permission to update this diary"
          );
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
        return response.errorResponse(res, 404, "Diary does not exist");
      }
    } catch (error) {
      return response.errorResponse(res, 500, "Internal Server Error");
    }
  }
}
export default EntriesController;
