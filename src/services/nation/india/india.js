// const nations = require("./countries").nations;
const rules = require("./india.json");
const mingo = require("mingo");

let input = { visa: "EB", employed: "yes" };

for (let id of rules.s_condition) {
  let available = new mingo.Query(rules[id].availableIf).test(input);
  if (!available) delete rules[id];
  else delete rules[id].availableIf;
}
// for (let id of rules.c_condition) {
//   if (rules[id].labelSwitch) {
//     for (let i of rules[id].labelSwitch) {
//       let passed = rules[id].questions[i].labelSwitch.filter((cond) => {
//         return new mingo.Query(cond.condition).test(input) === true;
//       });
//       rules[id].questions[i].label = passed[0].label;
//       delete rules[id].questions[i].labelSwitch;
//     }
//   }
// }

module.exports = rules;

// var Ajv = require("ajv").default
// var ajv = new Ajv({allErrors: true})
// require("ajv-errors")(ajv)

// const schema = {
//   type: "object",
//   required: ["foo"],
//   properties: {
//     foo: {type: "integer"},
//   },
//   additionalProperties: false,
//   errorMessage: {
//     type: "should be an object", // will not replace internal "type" error for the property "foo"
//     required: "should have property foo",
//     additionalProperties: "should not have properties other than foo",
//   },
//   }

// const validate = ajv.compile(schema)
// console.log(validate({foo: "3", bar: "4"})) // false
// console.log(validate.errors) // processed errors

// {
//   "$id": "https://example.com/arrays.schema.json",
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "description": "A representation of a person, company, organization, or place",
//   "type": "object",
//   "properties": {
//     "fruits": {
//       "type": "array",
//       "items": {
//         "type": "string"
//       }
//     },
//     "vegetables": {
//       "type": "array",
//       "items": { "$ref": "#/definitions/veggie" }
//     }
//   },
//   "definitions": {
//     "veggie": {
//       "type": "object",
//       "required": [ "veggieName", "veggieLike" ],
//       "properties": {
//         "veggieName": {
//           "type": "string",
//           "description": "The name of the vegetable."
//         },
//         "veggieLike": {
//           "type": "boolean",
//           "description": "Do I like this vegetable?"
//         }
//       }
//     }
//   }
// }


