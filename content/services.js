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
  {
    slug: "epfo-pf",
    group: "finance",
    name: "EPFO / PF Services",
    short: "PF KYC, balance, passbook, withdrawal, transfer and UAN assistance.",
    notice:
      "DigiKart Solutions is an independent assistance provider and is not affiliated with EPFO. Claims, transfers and KYC approvals are processed only by EPFO and your employer where required.",
    intro:
      "DigiKart Solutions helps employees with Employees' Provident Fund (EPF) requirements — from UAN activation and KYC updates to PF balance checks, passbook downloads, withdrawal claims and PF transfers. We guide you through the official EPFO member portal and UMANG processes step by step.",
    options: [
      "UAN activation and KYC update assistance",
      "PF balance and passbook assistance",
      "PF withdrawal (claim) assistance",
      "PF transfer assistance",
      "Pension-related assistance",
      "Personal details correction guidance",
    ],
    docs: [
      "UAN (Universal Account Number)",
      "Mobile number registered with UAN",
      "Aadhaar linked with UAN",
      "PAN card",
      "Bank account details and cancelled cheque / passbook",
      "Employer and employment details where applicable",
    ],
    process: [
      "Tell us what you need — KYC, balance, withdrawal, transfer or correction.",
      "We check your UAN status and share the document checklist.",
      "Assistance with the request on the official EPFO portal.",
      "Guidance on tracking your claim or request status.",
    ],
    faqs: [
      ["Is DigiKart part of EPFO?", "No. DigiKart is an independent assistance provider. All PF claims, transfers and KYC approvals are processed only by EPFO and, where required, your employer."],
      ["How long does a PF withdrawal take?", "Processing time depends on EPFO, KYC status and employer approval where needed. We share guidance when you enquire, but timelines are decided by EPFO."],
      ["Do I need to share my OTP?", "OTPs are sent to your UAN-registered mobile and are used only in person during the application at our shop. Never share OTPs or passwords through this website or with anyone you don't trust."],
    ],
  },
  {
    slug: "loan-services",
    group: "finance",
    name: "Loan Services",
    short: "Personal, business, home, vehicle, education and MSME loan application assistance.",
    notice:
      "DigiKart Solutions is not a bank, NBFC or lender. Loan approval, amount, interest rate and terms depend on the lender's eligibility criteria, verification and applicable conditions. Approval is never guaranteed.",
    intro:
      "DigiKart Solutions assists customers with loan enquiries and applications — helping you understand lender requirements, prepare documents and apply. DigiKart is not a bank or lender; loans are sanctioned only by banks and financial institutions after their own eligibility checks and verification.",
    options: [
      "Personal loan assistance",
      "Business loan assistance",
      "Home loan assistance",
      "Mortgage / loan against property assistance",
      "Vehicle loan assistance",
      "Education loan assistance",
      "MSME business loan assistance",
      "Other loan assistance",
    ],
    docs: [
      "Identity proof and address proof",
      "PAN card",
      "Income proof — salary slips, ITR or business financials as applicable",
      "Recent bank statements",
      "Property documents for home loans or loan against property",
      "Business registration documents for business / MSME loans",
      "Exact documents vary by lender and loan type",
    ],
    process: [
      "Share the loan type and amount you are looking for.",
      "We explain typical lender requirements and the document checklist.",
      "Assistance preparing and submitting your application to the lender.",
      "The lender carries out eligibility checks, verification and the final decision.",
    ],
    faqs: [
      ["Does DigiKart give loans?", "No. DigiKart is not a bank, NBFC or lender. We only assist with the application process. Loans are sanctioned by banks and financial institutions."],
      ["Can you guarantee my loan approval?", "No. Loan approval, amount, interest rate and terms depend entirely on the lender's eligibility criteria, credit checks, verification and applicable conditions. No approval is guaranteed."],
      ["What interest rate will I get?", "Interest rates and charges are decided by the lender based on your profile and their policies. Please confirm all terms directly with the lender before accepting any loan."],
    ],
  },
  {
    slug: "banking-services",
    group: "finance",
    name: "Banking Services",
    short: "Assistance with bank account opening and common banking paperwork.",
    intro:
      "DigiKart Solutions helps customers with common banking-related digital work — such as account-opening form support and document preparation. DigiKart is not a bank. Account opening and banking decisions remain with the respective bank.",
    options: ["Bank account opening assistance", "Banking form filling", "Document checklist for KYC"],
    docs: ["Identity and address proof", "PAN card", "Photographs as required by the bank", "Existing account details where applicable"],
    process: [
      "Share the banking task you need help with.",
      "We outline typical documents the bank may ask for.",
      "Assistance with forms and digital steps, then you complete verification with the bank.",
    ],
    faqs: [
      ["Does DigiKart open bank accounts itself?", "No. Banks open accounts after their own KYC and verification. We only assist with forms and document readiness."],
    ],
  },
  {
    slug: "government-schemes",
    group: "forms",
    name: "Government Schemes",
    short: "Assistance applying for government scheme and welfare-related online forms.",
    intro:
      "We help you understand which documents are typically needed and assist with filling applications for government schemes through official portals. Eligibility and approval are decided only by the concerned department.",
    options: ["Scheme application assistance", "Document checklist", "Portal form filling"],
    docs: ["Identity and address proof", "Bank / Aadhaar details as required by the scheme", "Income or category certificates where applicable"],
    process: [
      "Tell us the scheme or benefit you want to apply for.",
      "We share a document checklist based on official requirements.",
      "Assistance with the official application steps.",
    ],
    faqs: [
      ["Can you guarantee scheme approval?", "No. Eligibility, verification and disbursement are decided by the government department. We only assist with the application."],
    ],
  },
  {
    slug: "online-forms",
    group: "forms",
    name: "Online Form Filling",
    short: "Help filling government, university, scholarship and other online application forms.",
    intro:
      "Bring the form requirement and supporting papers — we help you complete online applications carefully so details are entered correctly on official websites.",
    options: ["Government forms", "Scholarship forms", "University / exam forms", "Other online applications"],
    docs: ["Identity documents", "Certificates and marksheets as required", "Photographs and signatures", "Payment details only if you choose to pay on the official site"],
    process: [
      "Share the form name or a screenshot of the requirement.",
      "We confirm documents and the official website.",
      "Assisted filling and submission through the official channel.",
    ],
    faqs: [
      ["Do I pay government fees to DigiKart?", "Official fees are paid only on the official portal or to the concerned authority. DigiKart's assistance charges, if any, are explained separately when you enquire."],
    ],
  },
  {
    slug: "job-forms",
    group: "forms",
    name: "Job & Recruitment Forms",
    short: "Assistance with government job, recruitment and exam application forms.",
    intro:
      "Support filling government job and recruitment applications, including document scanning, photo specifications and portal registration. Recruitment results are decided only by the recruiting body.",
    options: ["Government job form filling", "Recruitment portal registration", "Photo / signature / document formatting"],
    docs: ["Photo and signature as per advertisement", "Educational certificates", "Identity proof", "Category / domicile certificates if required"],
    process: [
      "Share the advertisement or form name.",
      "We check photo, signature and document specifications.",
      "Assisted filling on the official recruitment portal.",
    ],
    faqs: [
      ["Can DigiKart get me selected for a job?", "No. We only help with the application. Selection is entirely with the recruiting organisation."],
    ],
  },
  {
    slug: "legal-documentation",
    group: "identity",
    name: "Legal & Documentation",
    short: "Assistance with rent agreements, affidavits and related documentation paperwork.",
    intro:
      "Help preparing and processing common documentation such as rent agreement drafting support and affidavit-related paperwork through the appropriate local process. DigiKart is not a law firm; legal advice, if needed, should come from a qualified professional.",
    options: ["Rent agreement assistance", "Affidavit-related paperwork", "Notary / stamp guidance as applicable"],
    docs: ["Parties' identity and address proof", "Property / tenancy details for rent agreements", "Draft content or purpose of the affidavit"],
    process: [
      "Explain the document you need.",
      "We list typical papers and next steps.",
      "Assistance preparing the paperwork and directing you to the correct local process.",
    ],
    faqs: [
      ["Are you advocates?", "No. DigiKart provides documentation assistance. For legal advice or court matters, please consult a qualified advocate."],
    ],
  },
  {
    slug: "itr-filing",
    group: "business",
    name: "ITR Filing Assistance",
    short: "Assistance with Income Tax Return documentation and e-filing support.",
    intro:
      "Help organising documents and completing ITR e-filing steps. For complex tax advisory, we may recommend a qualified tax professional. DigiKart does not provide certified tax opinions.",
    options: ["ITR documentation assistance", "E-filing support", "Form selection guidance"],
    docs: ["PAN", "Form 16 / AIS / TIS as applicable", "Bank statements and investment proofs", "Previous ITR if available"],
    process: [
      "Share the assessment year and your income type.",
      "Document checklist and form overview.",
      "Assistance with e-filing on the official Income Tax portal.",
    ],
    faqs: [
      ["Are you a CA firm?", "No. We provide documentation and e-filing assistance. Specialised tax advice should come from a chartered accountant where needed."],
    ],
  },
  {
    slug: "msme-udyam",
    group: "business",
    name: "MSME / Udyam Registration",
    short: "Assistance with MSME / Udyam registration on the official portal.",
    intro:
      "Support for Udyam / MSME registration, including document readiness and official portal assistance. Registration is processed only on the government Udyam portal.",
    options: ["New Udyam registration assistance", "Update / correction guidance"],
    docs: ["Aadhaar of the proprietor / authorised person", "PAN and business details", "Bank account and NIC activity details"],
    process: [
      "Share your business type and owner details.",
      "We confirm the information needed for Udyam.",
      "Assistance completing the official Udyam registration.",
    ],
    faqs: [
      ["Do you issue MSME certificates yourselves?", "No. Udyam registration is generated only through the official government portal. We assist with the application."],
    ],
  },
];

module.exports = SERVICES;
