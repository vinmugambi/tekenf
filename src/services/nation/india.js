module.exports = {
  steps: [9, 8, 7, 6, 1, 2, 3, 4, 5],
  1: {
    showing: [0, 1, 2, 3],
    title: "Personal information",
    description:
      "The information in this section is used for identification. The optional fields will be picked from your passport if not filled",
    id: 0,
    questions: {
      surname: {
        index: 0,
        label: "Surname / Family name",
        component: "text",
        validation: "",
      },
      name: {
        index: 1,
        label: "Given name(s)",
        component: "text",
        validation: "",
      },
      gender: {
        index: 2,
        label: "Gender/ sex",
        component: "select",
        attrs: { placeholder: "Select your gender" },
        choices: [
          { text: "Male", value: "male" },
          { text: "Female", value: "female" },
          { text: "Others", value: "others" },
        ],
      },
      educationLevel: {
        index: 3,
        label: "Education level",
        help: "Highest level of formal education you completed",
        component: "select",
        choices: [
          { text: "No education", value: "no" },
          { text: "Primary education", value: "one" },
          { text: "Secondary education", value: "two" },
          { text: "College/University", value: "three" },
          { text: "Postgraduate", value: "four" },
        ],
      },
    },
  },
  2: {
    title: "Contact information",
    id: 1,
    showing: [0, 1, 2],
    questions: {
      phone: {
        index: 0,
        label: "Phone / Mobile number",
        component: "text",
        validation: "required",
      },
      address: {
        index: 1,
        label: "Residential address",
        component: "text",
        validation: "required",
      },
      country: {
        index: 2,
        label: "Country of residence",
        component: "select",
        choices: [],
        attrs: { placeholder: "Select country where you currently live" },
        validation: "required",
      },
    },
  },
  3: {
    title: "Family information",
    showing: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    id: 2,
    questions: {
      marital: {
        index: 0,
        label: "Marital status",
        component: "radio",
        choices: [
          { text: "Single", value: "single" },
          { text: "Married", value: "married" },
        ],
        validation: "required",
      },
      spouse: {
        index: 1,
        label: "Spouse name",
        component: "text",
        validation: "required",
      },
      spouseNationality: {
        index: 2,
        label: "Nationality of spouse",
        component: "select",
        choices: [],
        attrs: { placeholder: "Select the nationality of your spouse" },
        validation: "required",
      },
      spousePob: {
        index: 3,
        label: "Spouse's place of birth",
        component: "text",
        attrs: { placeholder: "Where was your spouse born" },
        validation: "required",
      },
      spouseCob: {
        index: 4,
        label: "Spouse's nationality",
        component: "select",
        choices: [],
        attrs: {
          placeholder: "Select the country where your spouse was born",
        },
        validation: "required",
      },
      father: {
        index: 5,
        label: "Father name",
        component: "text",
        validation: "required",
      },
      fatherNationality: {
        index: 6,
        label: "Nationality of father",
        component: "select",
        choices: [],
        attrs: { placeholder: "Select the nationality of your father" },
        validation: "required",
      },
      fatherPob: {
        index: 7,
        label: "Father's place of birth",
        component: "text",
        attrs: { placeholder: "Where was your father born" },
        validation: "required",
      },
      fatherCob: {
        index: 8,
        label: "Fathers's nationality",
        component: "select",
        choices: [],
        attrs: {
          placeholder: "Select the country where your father was born",
        },
        validation: "required",
      },
      mother: {
        index: 9,
        label: "Mother's name",
        component: "text",
        validation: "required",
      },
      motherNationality: {
        index: 10,
        label: "Nationality of mother",
        component: "select",
        choices: [],
        attrs: { placeholder: "Select the nationality of your mother" },
        validation: "required",
      },
      motherPob: {
        index: 11,
        label: "Mother's place of birth",
        component: "text",
        attrs: { placeholder: "Where was your mother born" },
        validation: "required",
      },
      motherCob: {
        index: 12,
        label: "Mothers's nationality",
        component: "select",
        choices: [],
        attrs: {
          placeholder: "Select the country where your mother was born",
        },
        validation: "required",
      },
    },
  },
  4: {
    title: "Work information",
    id: 3,
    showing: [0, 1, 2, 3],
    questions: {
      occupation: {
        index: 0,
        label: "Occupation",
        component: "text",
        validation: "required",
      },
      employer: {
        index: 1,
        label: "Employer name",
        help: "Name of the organization/person who has employed you",
        component: "text",
        validation: "required",
      },
      employerAddress: {
        index: 2,
        label: "Employer address",
        help: "Physical location of work place",
        component: "text",
        validation: "required",
      },
      employerCountry: {
        index: 3,
        label: "Country of employment",
        component: "select",
        choices: [],
        attrs: { placeholder: "Select country where you work" },
        validation: "required",
      },
    },
  },
  5: {
    title: "Travel information",
    id: 4,
    showing: [0, 1, 2],
    questions: {
      inviter: {
        index: 0,
        //Generate label based on type of visa
        label: "Name of inviting person or organisation",
        component: "text",
        validation: "required",
      },
      inviterAddress: {
        index: 1,
        label: "Physical address of inviting person/organization",
        component: "text",
        validation: "required",
      },
      inviterPhone: {
        index: 2,
        label: "Phone number of inviter",
        component: "text",
        validation: "required",
      },
    },
  },
  6: {
    title: "References",
    showing: [0, 1, 2],
    description:
      "Information about people or organisations who know you and are aware of your travel to India",
    questions: {
      local: {
        index: 0,
        label: "Local reference",
        //Automatically fill country of residence
        help: "Reference from the country which you a citizen",
        component: "text",
        validation: "required",
      },
      localReferenceAddress: {
        index: 1,
        label: "Physical address of local reference",
        component: "text",
        validation: "required",
      },
      localPhone: {
        index: 2,
        label: "Phone number of local reference",
        component: "text",
        validation: "required",
      },
    },
  },
  7: {
    title: "Passport image",
    showing: [1],
    media: true,
    description:
      "Upload an image showing your the front of your face and shoulders against a one colour background (eg a wall)",
    questions: {
      passportImage: {
        index: 1,
        component: "file",
        validation: "required",
      },
    },
  },
  8: {
    title: "Passport/travelling document",
    showing: [1],
    media: true,
    description:
      "Upload an image/scan of the page containing your registration information such as name, date of birth, photograph, date of issue",
    questions: {
      passportCopy: {
        index: 1,
        component: "file",
        validation: "required",
      },
    },
  },
  9: {
    title: "Invitation Letter",
    showing: [1],
    media: true,
    description:
      "Upload a clear scan of an invitation letter from the person/organisation hosting you in india",
    questions: {
      supportLetter: {
        index: 1,
        component: "file",
        validation: "required",
      },
    },
  },
};
