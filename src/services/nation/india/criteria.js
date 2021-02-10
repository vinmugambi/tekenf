const { nations, eligibleNationalities } = require("./countries.js");

const visaTypes = [
  { text: "Tourist", value: "tourist" },
  { text: "Business", value: "business" },
  { text: "Medical", value: "medical" },
  { text: "Conference", value: "conference" },
];
const visaPurposes = {
  tourist: [
    { text: "Visit family or friend", value: "visit" },
    { text: "General tour/ Sight seeing", value: "tour" },
  ],
  business: [
    { text: "Business/technical meetings or training", value: "meeting" },
    { text: "Trade fair", value: "fair" },
    { text: "Purchase or trade", value: "trade" },
    { text: "Other", value: "other" },
  ],
  medical: [
    { text: "Treatment - for patients", value: "patient" },
    { text: "Attendant - accompanying a patient", value: "attendant" },
    { text: "Visiting a patient", value: "visitor" },
  ],
};

const allVisaPurposes = () => {
  let all = [];
  Object.keys(visaPurposes).forEach((purpose) => {
    visaPurposes[purpose].forEach((item) => all.push(item.value));
  });
  return all;
};

const durations = [
  {
    text: "1 month - single entry",
    value: "one",
    tourist: "electronic",
    conference: "electronic",
    extendable: false,
  },
  {
    text: "2 months - double entry",
    value: "two",
    medical: "electronic",
    extendable: true,
  },
  {
    text: "1 year - multiple entry",
    value: "twelve",
    tourist: ["electronic", "regular"],
    business: ["regular", "electronic"],
  },
  { text: "5 years - multiple entry", value: "sixty", tourist: "electronic" },
];

const SCHEMA = {
  required: ["passport"],
  passport: {
    label: "Passport type",
    qualified: true,
    component: "radio",
    visible: true,
    options: [
      { text: "Ordinary", value: "ordinary" },
      { text: "Diplomatic", value: "diplomatic" },
      { text: "Service", value: "service" },
      { text: "Refugee", value: "refugee" },
      { text: "Other type not listed", value: "other" },
    ],
    validation: {
      type: "string",
      get enum() {
        return this.options.map((choice) => choice.value);
      },
    },
    help:
      "Type of the passport you are travelling with. If not sure, enter ordinary",
  },
  nationality: {
    label: "Nationality",
    component: "select",
    choices: nations,
    attrs: { placeholder: "Select your nationality" },
    validation: { type: "string", enum: nations.map((nation) => nation.value) },
    visible: false,
    visibleIf: { passport: { $exists: true, $eq: "ordinary" } },
  },
  notQualified: {
    component: "NotQualified",
    visibleIf: {
      $or: [
        { passport: { $exists: true, $ne: "ordinary" } },
        { nationality: { $exists: true, $nin: eligibleNationalities } },
        { qualified: { $exists: true, $eq: false } },
      ],
    },
  },
  visaType: {
    label: "Visa type",
    component: "radio",
    options: visaTypes,
    validation: {
      type: "string",
      get enum() {
        return this.options.map((visa) => visa.value);
      },
    },
    visible: false,
    visibleIf: {
      $or: [
        { qualified: { $exists: true, $eq: true } },
        { nationality: { $exists: true, $in: eligibleNationalities } },
      ],
    },
  },
  visaPurpose: {
    label: "Purpose of travel",
    component: "radio",
    visible: false,
    options: [],
    optionSwitch: [
      {
        options: visaPurposes.tourist,
        condition: { visaType: { $exists: true, $eq: "tourist" } },
      },
      {
        options: visaPurposes.business,
        condition: { visaType: { $exists: true, $eq: "business" } },
      },
      {
        options: visaPurposes.medical,
        condition: { visaType: { $exists: true, $eq: "medical" } },
      },
    ],
    validation: { enum: allVisaPurposes() },
    visibleIf: {
      visaType: { $exists: true, $in: visaTypes.map((visa) => visa.value) },
    },
  },
  duration: {
    label: "Duration of visa",
    component: "radio",
    visible: false,
    validation: { enum: ["one", "two", "twelve", "sixty"] },
    visibleIf: {
      visaPurpose: { $exists: true, $in: allVisaPurposes },
    },
    options: [],
    optionSwitch: [
      {
        options: durations.filter((duration) => {
          if (Object.keys(duration).includes("tourist")) {
            return true;
          }
        }),
        condition: { visaType: { $exists: true, $eq: "tourist" } },
      },
      {
        options: durations.filter((duration) => {
          if (Object.keys(duration).includes("medical")) {
            return true;
          }
        }),
        condition: { visaType: { $exists: true, $eq: "medical" } },
      },
      {
        options: durations.filter((duration) => {
          if (Object.keys(duration).includes("business")) {
            return true;
          }
        }),
        condition: { visaType: { $exists: true, $eq: "business" } },
      },
    ],
    attrs: {
      placeholder: "How long are you going to stay in India",
      type: "number",
      min: "1",
    },
  },
  price: {
    component: "PriceList",
    visibleIf: {
      duration: { $exists: true, $in: ["one", "two", "twelve", "sixty"] },
    },
  },
};

// const evisaPrices = [
//   {
//     price: 25,
//     tourist: "one",
//     nationality: { except: ["ARGENTINA", "SOUTH AFRICA"], is: [] },
//   },
//   {
//     price: 40,
//     tourist: "twelve",
//     nationality: { except: ["ARGENTINA", "SOUTH AFRICA"], is: [] },
//   },
//   {
//     price: 80,
//     conference: "one",
//     medical: "two",
//     business: "twelve",
//     tourist: "sixty",
//     nationality: {
//       except: [
//         "ARGENTINA",
//         "SOUTH AFRICA",
//         "UNITED STATES OF AMERICA",
//         "UNITED KINGDOM",
//       ],
//       is: [],
//     },
//   },
//   {
//     price: 100,
//     medical: "two",
//     business: "twelve",
//     nationality: {
//       is: ["UNITED STATES OF AMERICA", "UNITED KINGDOM"],
//       except: [],
//     },
//   },
//   {
//     price: 80,
//     tourist: "sixty",
//     nationality: {
//       is: ["UNITED STATES OF AMERICA", "UNITED KINGDOM"],
//       except: [],
//     },
//   },
// ];

// const getPrice = (nationality, visaType, duration) => {
//   let price = evisaPrices.filter((price) => {
//     if (Object.keys(price).includes(visaType) && price[visaType] === duration) {
//       if (
//         price.nationality.is.includes(nationality) ||
//         !price.nationality.except.includes(nationality)
//       ) {
//         return true;
//       }
//     }
//   });

//   if (price.length > 0) {
//     return price[0].price;
//   } else {
//     return 0;
//   }
// };



// const getDurations = (visaType) => {
//   let visaDurations = durations.filter((duration) => {
//     if (Object.keys(duration).includes(visaType)) {
//       return true;
//     }
//   });
//   let durationValues = visaDurations.map((duration) => {
//     return { text: duration.text, value: duration.value };
//   });
//   return durationValues;
// };

// const getDurationLabel = (durationValue) => {
//   let label = durations.filter((duration) => duration.value === durationValue);
//   return label[0].text;
// };

module.exports = SCHEMA;
