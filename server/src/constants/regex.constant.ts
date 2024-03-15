class Regex {
    public static readonly USERNAME = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,32}$/
    public static readonly EMAIL =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    public static readonly PASSWORD =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    public static readonly NAME = /^[a-zA-Z ]{2,35}$/
    public static readonly PHONE =
      /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
    public static readonly ADDRESS = /^[a-zA-Z0-9\s,'-]{10,200}$/
    public static readonly FIRSTNAME = /^[A-Za-z]{2,30}$/
    public static readonly LASTNAME = /^[A-Za-z]{2,30}$/
    public static readonly JOBTITLE = /^[A-Za-z\s]{2,100}$/
    public static readonly STATE = /^[A-Z]{2}$/
    public static readonly POSTALCODE = /^[A-Za-z0-9\s-]{3,10}$/
    public static readonly WEBSITE = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-_./?%&=]*)?$/
    public static readonly TIMEZONE = /^(America\/[A-Za-z_]+|Europe\/[A-Za-z_]+|Asia\/[A-Za-z_]+)$/;
    public static readonly SSN = /^\d{3}-\d{2}-\d{4}$/;
    public static readonly IMAGEURL = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/
    public static readonly PIN = /^\d{4}$/
    public static readonly CREATEDBY = /^[\w-]{1,30}$/
    public static readonly CREATEDDATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
    public static readonly MEETINGURL = /^https?:\/\/\S+$/
    public static readonly DEMOREQUESTID = /^[a-zA-Z0-9-_]{1,30}$/
    public static readonly LEGALNAME = /^[A-Za-z0-9\s.'&,()-]{2,100}$/
    public static readonly TAXID = /^[A-Za-z0-9]{5,20}$/
    public static readonly OFFICEPHONE = /^[0-9()\s-]+$/
    public static readonly STATECODE = /^[A-Za-z]{2}$/
    public static readonly LICENSENO = /^[A-Za-z0-9]{6}$/
    public static readonly SHORTCODE = /^[A-Z0-9]{5}$/
    public static readonly ENVELOPEID = /^[A-Z0-9-]{10,20}$/
    public static readonly DISCOUNTID = /^[A-Za-z0-9]+$/
    public static readonly BASE64STRING = /^[a-zA-Z0-9+/]+={0,2}$/
    public static readonly PERCENTAGE = /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)%$/
    public static readonly MONTHLY_COST = /^\d+(\.\d{1,2})?$/
    public static readonly DEMOGRAPHICSID = /^[A-Za-z0-9_-]+$/
    public static readonly REFERRALID = /^\d{5}$/
  }
  
  export default Regex