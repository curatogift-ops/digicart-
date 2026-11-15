/* Service content — edit descriptions, options, documents and FAQs here, then run: node build-site.js */
const SERVICES = [
  {
    slug: "aadhaar",
    group: "identity",
    name: "Aadhaar Services",
    short: "Update, correction and print assistance for Aadhaar-related needs.",
    intro:
      "DigiKart Solutions provides guided assistance for Aadhaar update, correction and print-related requirements. We help you understand the process, prepare documents and complete applications through official channels.",
    options: ["Aadhaar update assistance", "Aadhaar correction guidance", "Aadhaar print assistance"],
    docs: ["Existing Aadhaar number / enrolment details", "Valid proof of identity / address / DOB as applicable", "Registered mobile number for OTP where required"],
    process: [
      "Share your requirement and current Aadhaar status.",
      "We guide you on eligible updates and required documents.",
      "Assistance with form filling and submission via official portals / centres.",
      "Follow-up guidance until acknowledgement is received.",
    ],
    faqs: [
      ["Do you issue Aadhaar cards yourselves?", "No. DigiKart is an assistance provider. Official enrolment, update and issuance are handled only through UIDAI-authorised channels."],
      ["Can you guarantee approval of my update?", "No. Approvals depend on UIDAI rules, document validity and verification. We help you prepare and apply correctly."],
    ],
  },
  {
    slug: "pan-card",
    group: "identity",
    name: "PAN Card Services",
    short: "New PAN, correction and e-PAN application assistance.",
    intro:
      "Get help with new PAN applications, PAN corrections and e-PAN related assistance. We guide you through the official application process with clear document checklists.",
    options: ["New PAN application assistance", "PAN correction assistance", "e-PAN assistance"],
    docs: ["Proof of identity", "Proof of address", "Proof of date of birth", "Photograph and signature as required"],
    process: [
      "Choose new PAN, correction or e-PAN support.",
      "Document checklist and form guidance.",
      "Assistance with online application through official portals.",
      "Acknowledgement and tracking guidance.",
    ],
    faqs: [
      ["Is DigiKart a PAN issuing authority?", "No. PAN is issued by the Income Tax Department / NSDL or UTIITSL as applicable. We only assist with applications."],
      ["How long does a PAN application take?", "Timelines vary based on the official processing authority and application type. We share expected guidance at the time of enquiry."],
    ],
  },
  {
    slug: "voter-id",
    group: "identity",
    name: "Voter ID Services",
    short: "New voter ID and correction assistance support.",
    intro:
      "Assistance for new voter ID applications and correction requests. We help you understand eligibility, documents and the official application flow.",
    options: ["New voter ID application assistance", "Voter ID correction assistance"],
    docs: ["Proof of age and identity", "Proof of address", "Photograph as required", "Existing EPIC details for corrections"],
    process: [
      "Confirm whether you need a new registration or correction.",
      "Prepare documents as per Election Commission guidelines.",
      "Assistance with online / form-based application.",
      "Guidance on tracking application status.",
    ],
    faqs: [
      ["Can DigiKart issue a Voter ID?", "No. Voter ID cards are issued by the Election Commission of India. DigiKart provides application assistance only."],
    ],
  },
  {
    slug: "driving-licence",
    group: "travel",
    name: "Driving Licence Services",
    short: "New DL, renewal and duplicate licence application guidance.",
    intro:
      "Support for new driving licence applications, renewals and duplicate licence assistance through official RTO / Parivahan processes.",
    options: ["New driving licence application assistance", "Licence renewal guidance", "Duplicate licence assistance"],
    docs: ["Proof of age and address", "Learner licence details where applicable", "Medical certificate if required", "Existing DL details for renewal / duplicate"],
    process: [
      "Identify whether you need new, renewal or duplicate support.",
      "Document readiness and slot / application guidance.",
      "Assistance with Parivahan / RTO application steps.",
      "Follow-up guidance for tests, fees and collection where applicable.",
    ],
    faqs: [
      ["Do you conduct driving tests?", "No. Driving tests and licence issuance are handled by the authorised RTO. We assist with the application process."],
    ],
  },
  {
    slug: "passport",
    group: "travel",
    name: "Passport Services",
    short: "New passport, renewal and Tatkal process guidance.",
    intro:
      "Assistance for new passport applications, renewals and Tatkal-related process guidance through the official Passport Seva system.",
    options: ["New passport application assistance", "Passport renewal assistance", "Tatkal process guidance"],
    docs: ["Proof of identity and address", "Date of birth proof", "Existing passport for renewal", "Additional annexures as applicable"],
    process: [
      "Share travel / renewal requirement and preferred timeline.",
      "Form filling and document checklist support.",
      "Guidance for Passport Seva registration and appointment.",
      "Pre-appointment readiness support.",
    ],
    faqs: [
      ["Can DigiKart guarantee Tatkal approval?", "No. Tatkal eligibility and processing depend on Passport Seva rules and verification. We provide process guidance only."],
      ["Are you affiliated with the Passport Office?", "No. DigiKart is an independent assistance provider and is not a government passport office."],
    ],
  },
  {
    slug: "rto",
    group: "travel",
    name: "RTO Services",
    short: "Vehicle registration, RC transfer, challan and NOC assistance.",
    intro:
      "Guidance and application assistance for common RTO-related vehicle services including registration support, RC transfer, challan and NOC related help.",
    options: ["Vehicle registration assistance", "RC transfer assistance", "Challan assistance", "NOC assistance"],
    docs: ["Vehicle documents (invoice / RC / insurance as applicable)", "Owner identity and address proof", "Sale / transfer papers where required", "Form references as guided"],
    process: [
      "Explain your vehicle service requirement.",
      "Checklist of forms and supporting papers.",
      "Assistance with official portal / RTO submission steps.",
      "Status follow-up guidance.",
    ],
    faqs: [
      ["Can you waive or cancel challans?", "No. Challans are managed by traffic / RTO authorities. We assist with information and payment / application guidance where applicable."],
    ],
  },
  {
    slug: "document-services",
    group: "identity",
    name: "Document Services",
    short: "Support for digital documentation and related online paperwork.",
    intro:
      "Assistance with digital documentation needs, form preparation and related online paperwork so your applications are organised and ready for submission.",
    options: ["Document preparation guidance", "Form filling assistance", "Digital document organisation support"],
    docs: ["Documents relevant to your specific application", "Soft copies / scans where available"],
    process: [
      "Tell us which document or application you need help with.",
      "We outline the required papers and format.",
      "Assistance with preparation and digital readiness.",
      "Guidance for next official submission steps.",
    ],
    faqs: [
      ["Do you create forged documents?", "Absolutely not. DigiKart only assists with legitimate documentation and official application processes."],
    ],
  },
  {
    slug: "printing-scanning",
    group: "identity",
    name: "Printing & Scanning",
    short: "Convenient printing and scanning support for your paperwork.",
    intro:
      "Practical printing and scanning support for forms, IDs, application receipts and everyday documentation needs at our Greater Noida West location.",
    options: ["Document printing", "Scanning support", "Application paperwork printouts"],
    docs: ["Files on phone / email / USB as convenient"],
    process: [
      "Bring or share the files you need printed or scanned.",
      "We process the request at our counter.",
      "Collect printed / digital copies as required.",
    ],
    faqs: [
      ["Do you offer colour printing?", "Please call or WhatsApp us for current print options and pricing at the shop."],
    ],
  },
  {
    slug: "ticket-booking",
    group: "travel",
    name: "Ticket Booking",
    short: "Assistance with online ticket booking needs.",
    intro:
      "Help with online ticket booking requirements. Share your travel details and we assist with the booking process through official platforms.",
    options: ["Online ticket booking assistance"],
    docs: ["Passenger details and ID as required by the booking platform", "Preferred date, time and destination"],
    process: [
      "Share travel details and passenger information.",
      "We assist with searching and booking on official platforms.",
      "Share confirmation details after successful booking.",
    ],
    faqs: [
      ["Which tickets can you help book?", "Share your requirement on WhatsApp or phone and we will confirm what we can assist with."],
    ],
  },
  {
    slug: "insurance",
    group: "business",
    name: "Insurance Services",
    short: "Guidance and assistance related to insurance service needs.",
    intro:
      "Assistance related to insurance service enquiries. We help you understand options and support application / documentation steps where applicable.",
    options: ["Insurance-related enquiry assistance", "Documentation support for insurance processes"],
    docs: ["Policy / proposal details as applicable", "Identity and relevant supporting papers"],
    process: [
      "Share your insurance-related requirement.",
      "We guide you on next steps and paperwork.",
      "Assistance with forms and follow-up as applicable.",
    ],
    faqs: [
      ["Do you underwrite insurance policies?", "No. DigiKart provides assistance and guidance. Policy issuance depends on the respective insurer."],
    ],
  },
  {
    slug: "gst-tax",
    group: "business",
    name: "GST & Tax Services",
    short: "Support for GST and tax-related documentation assistance.",
    intro:
      "Assistance with GST and tax-related documentation and application guidance for individuals and small businesses seeking organised support.",
    options: ["GST-related assistance", "Tax documentation guidance"],
    docs: ["Business / identity documents as applicable", "Existing GST / tax references if any"],
    process: [
      "Discuss your GST or tax-related need.",
      "Document checklist and process overview.",
      "Assistance with relevant online filings / applications as applicable.",
    ],
    faqs: [
      ["Are you a chartered accountant firm?", "DigiKart provides digital and documentation assistance. For specialised advisory, we may recommend consulting a qualified professional."],
    ],
  },
  {
    slug: "business-services",
    group: "business",
    name: "Business Services",
    short: "Digital support for common small-business online service needs.",
    intro:
      "Practical digital assistance for common business service needs — from documentation support to online application guidance for entrepreneurs and local businesses.",
    options: ["Business documentation assistance", "Online application guidance for business needs"],
    docs: ["Business owner ID and address proof", "Business-related papers as applicable"],
    process: [
      "Share your business service requirement.",
      "We outline the process and required papers.",
      "Assistance through the relevant digital steps.",
    ],
    faqs: [
      ["Can you register any type of company?", "Share your exact requirement. We assist with available digital processes and guide you clearly where specialised professional help is needed."],
    ],
  },
  {
    slug: "dsc-trademark",
    group: "business",
    name: "DSC & Trademark",
    short: "Assistance with Digital Signature Certificate and trademark-related needs.",
    intro:
      "Guidance and application assistance related to Digital Signature Certificate (DSC) and trademark service enquiries.",
    options: ["DSC-related assistance", "Trademark enquiry / application guidance"],
    docs: ["Identity and address proof", "Business / applicant details as required", "Supporting papers for trademark filings if applicable"],
    process: [
      "Confirm whether you need DSC or trademark support.",
      "Checklist of required details and documents.",
      "Assistance with application steps through authorised channels.",
    ],
    faqs: [
      ["Do you manufacture DSCs in-house?", "DSC issuance follows authorised certifying authority processes. DigiKart assists with the application journey."],
    ],
  },
  {
    slug: "fssai",
    group: "business",
    name: "FSSAI Services",
    short: "Assistance with FSSAI-related registration and documentation needs.",
    intro:
      "Support for FSSAI-related registration and documentation assistance for food business operators seeking guided digital help.",
    options: ["FSSAI registration / licensing assistance", "Documentation guidance for FSSAI applications"],
    docs: ["Business and owner identity documents", "Address / premises details", "Food business category information"],
    process: [
      "Share your food business type and requirement.",
      "We guide eligibility and document readiness.",
      "Assistance with official FSSAI application steps.",
    ],
    faqs: [
      ["Can DigiKart guarantee FSSAI approval?", "No. Approvals depend on FSSAI rules and verification. We help you apply correctly through official processes."],
    ],
  },
];

module.exports = SERVICES;
