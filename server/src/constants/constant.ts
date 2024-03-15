class Constant {
  public static readonly YYYY_MM_DD_HH_MM_SS_MS: string =
    'YYYY-MM-DD HH:mm:ss:ms'

  public static readonly LOGS_ALL: string = 'logs/all.log';

  public static readonly LOGS_ERROR: string = 'logs/error.log';

  public static readonly USER_MODEL: string = 'user'
  public static readonly AGENCY_USER_MODEL: string = 'agency-user'
  public static readonly DEMOREQUEST_MODEL: string = 'demo-request'
  public static readonly DEMOSCHEDULE_MODEL: string = 'demo-schedule'
  public static readonly AGENCY_MODEL: string = 'agency'
  public static readonly SERVICE_AGREEMENT_MODEL: string = 'service-agreement'
  public static readonly DOCUMENT_MODEL: string = 'hiq-document'
  public static readonly DISCOUNT_MODEL: string = 'discount'
  public static readonly SUBSCRIPTIONPLAN_MODEL: string = 'subscription-plan'
  public static readonly DEMOFEEDBACK_MODEL: string = 'demo-feedback'
  public static readonly ROLES_MODEL: string = 'roles'
  public static readonly ROLEDEPARTMENT_MODEL: string = 'role-department'
  public static readonly PERMISSIONS_MODEL: string = 'permissions'
  public static readonly NEWPERMISSIONS_MODEL: string = 'newPermissions'
  public static readonly PATIENTDEMOGRAPHICS_MODEL: string = 'patient-demographics'
  public static readonly PATIENTREFERRALDETAILS_MODEL: string = 'patient-referral-details'
  public static readonly PATIENTPCPDETAILS_MODEL: string = 'patient-pcp-details'
  public static readonly PATIENTCAREPROVIDERDETAILS_MODEL: string = 'patient-care-provider-details'
  public static readonly PATIENTREPCONTACTDETAILS_MODEL: string = 'patient-rep-contact-details'
  public static readonly PATIENTEMERGENCYCONTACTDETAILS_MODEL: string = 'patient-emergency-contact-details'
  public static readonly PATIENTOTHERDETAILS_MODEL: string = 'patient-other-details'
  public static readonly PATIENTPERSONALINFORMATION_MODEL: string = 'patient-personal-information'
  public static readonly PATIENTEPISODE_MODEL: string = 'patient-episode'
  public static readonly EPISODETASKDETAILS_MODEL: string = 'episodeTaskDetails'
  public static readonly EPISODEVISITFREQUENCYTASK_MODEL: string = 'EpisodeVisitFrequencyTask'
  public static readonly ADDPROVIDER_MODEL: string = 'add-provider'
  public static readonly PATIENTBILLINGDETAILS_MODEL: string = 'patient-billing-details'
  public static readonly FACILITYDIRECTORY_MODEL: string = 'facility-directory'
  public static readonly LOGMANAGEMENT_MODEL: string = 'log-management'
  public static readonly LOOKUPMASTER_MODEL: string = 'lookup-master'
  public static readonly LEAVE_MODEL: string = 'leave-type'
  public static readonly HOLIDAY_MODEL: string = 'holiday'
  public static readonly LOOKUPCATEGORIES_MODEL: string = 'lookup-categories'
  public static readonly MESSAGEINBOX_MODEL: string = 'message-inbox'
  public static readonly MANAGEUSER_MODEL: string = 'manage-user'

  public static readonly USERNAME_MIN_LENGTH: number = 3
  public static readonly USERNAME_MAX_LENGTH: number = 20
  public static readonly NAME_MIN_LENGTH: number = 3
  public static readonly NAME_MAX_LENGTH: number = 80
  public static readonly EMAIL_MAX_LENGTH: number = 30
  public static readonly PASSWORD_MIN_LENGTH: number = 4
  
  public static readonly ADDRESS_MIN_LENGTH: number = 10
  public static readonly ADDRESS_MAX_LENGTH: number = 200
};
export default Constant


