class Api {

    public static readonly  ROOT: string = '/api'
    // auth
    public static readonly AUTH_REGISTER: string = '/register'
    public static readonly AUTH_LOGIN: string = '/login'

    public static readonly AUTH: string = '/auth'
    public static readonly USERS: string = '/users'
    public static readonly AGENCYUSERS: string = '/agencyUsers'
    public static readonly DEMOREQUEST: string = '/demorequest'
    public static readonly SCHEDULE: string = '/schedule'
    public static readonly AGENCY: string = '/agency'
    public static readonly SERVICE_AGREEMENT: string = '/service-agreement'
    public static readonly DOCUMENT: string = '/document'
    public static readonly DISCOUNT: string = '/discount'
    public static readonly SUBSCRIPTION: string = '/subscription'
    public static readonly FEEDBACK: string = '/feedback'
    public static readonly ROLE: string ='/role'
    public static readonly PERMISSION: string = '/permission'
    public static readonly PATIENT_DEMOGRAPHICS: string = '/patient-demoGraphics'
    public static readonly PATIENT_REFERRALDETAILS: string = '/patient-referralDetails'
    public static readonly PATIENT_PCPDETAILS: string = '/patient-PcpDetails'
    public static readonly PATIENT_PROVIDERDETAILS: string = '/patient-ProviderDetails'
    public static readonly PATIENT_CONTACTDETAILS: string = '/patient-ContactDetails'
    public static readonly PATIENT_EMERGENCYDETAILS: string = '/patient-EmergencyDetails'
    public static readonly PATIENT_OTHERDETAILS: string = '/patient-OtherDetails'
    public static readonly PATIENT_PERSONALINFORMATION : string = '/patient-PersonalInformation'
    public static readonly ADD_PROVIDER: string = '/addprovider'
//patient complaintMangement
    public static readonly Complaint_Mangement: string = '/complaintMangement'
    public static  readonly All_PATIENT :string='/all-patient'
    
    public static readonly USER_DELETE: string = '/delete/:id'
    public static readonly USER_GET: string = '/find/:id'
    public static readonly USER_GET_ALL: string = '/'

    //users
    public static readonly USERS_CREATEUSERS: string = '/addusers'

    //agency users
    public static readonly AGENCY_USERS: string = '/agency-users'
    
    //agency
    public static readonly AGENCY_DEMOREQUEST: string = '/agency-demoRequest'

    //upload nda
    public static readonly UPLOAD_NDA: string = '/upload-nda'

    //BAA request
    public static readonly BAA_REQUEST: string = '/baa-request'

    //Upload BAA
    public static readonly UPLOAD_BAA: string = '/upload-baa'

    //upload Service agreement
    public static readonly UPLOAD_SERVICE_AGREEMENT: string = '/upload-serviceAgreement'

    //upload image
    public static readonly UPLOAD_IMAGE: string = '/upload-image'

    //download nda
    public static readonly DOWNLOAD_NDA: string = '/download-nda'

    //download baa
    public static readonly DOWNLOAD_BAA: string = '/download-baa'

    //download service agreement
    public static readonly DOWNLOAD_SERVICEAGREEMENT: string = '/download-serviceAgreement'

    //demo schedule
    public static readonly DEMO_SCHEDULE: String = '/demoschedule'

    //complete registration
    public static readonly COMPLETE_REGISTRATION_DETAILS: string = '/completeRegistration-details'

    //service agreement
    //public static readonly SERVICE_AGREEMENT: string = '/service-agreement'

    //document
    public static readonly NDA_DOCUMENT: string = '/nda-document'

    //discount
    public static readonly DISCOUNT_API: string = '/discount'

    //subscription plan
    public static readonly SUBSCRIPTION_PLAN: string = '/subscription-plan'

    //demo feedback
    public static readonly DEMO_FEEDBACK: string = '/demo-feedback'

     //demo feedback
     public static readonly DEMO_FEEDBACKBYID: string = '/demo-feedback'

    //roles
    public static readonly ROLES_API: string = '/roles'

    //permissions
    public static readonly PERMISSIONS_API: string ='/permissions'

    //patient demo graphics
    public static readonly DEMO_GRAPHICS: string = '/demo-graphics'

    //patient referral details
    public static readonly REFERRAL_DETAILS: string = '/referral-details'

    //patient pcp details
    public static readonly PCP_DETAILS: string = '/pcp-details'

    //patient provider details
    public static readonly PROVIDER_DETAILS: string = '/provider-details'

    //patient contact details
    public static readonly CONTACT_DETAILS: string = '/contact-details'

    //patient emergency contact details
    public static readonly EMERGENCY_DETAILS: string = '/emergency-details'

    //patient other details
    public static readonly OTHER_DETAILS: string = '/other-details'

    //patient personal information
    public static readonly PATIENT_PERSONAL_INFORMATION: string = '/patient-personal-information'

}
export default Api
