import Joi from "joi";

export default {
  createEntry(details) {
    // Validate the fields
    const schema = {
      story: Joi.string()
        .required()
        .label("Please enter a content to save")
    };

    const { error } = Joi.validate(details, schema);
    if (error) return error.details[0].context.label;
    return null;
  }
};
