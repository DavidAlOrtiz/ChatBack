const { Schema, model } = require("mongoose");

const MensajeSchema = Schema({
  de: {
    type: Schema.Types.ObjectId,
    refs: "Usuario",
    required: true,
  },
  para: {
    type: Schema.Types.ObjectId,
    refs: "Usuario",
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  }
},{
    timestamps: true
});

MensajeSchema.method("toJSON", function () {
  const { __v, _id,  ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Mensaje", MensajeSchema);
