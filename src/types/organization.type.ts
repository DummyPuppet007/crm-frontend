export type AddressType = 'Work' | 'HeadOffice' | 'Branch' | 'Factory' | 'Other';

export type PhoneType = 'Landline' | 'Mobile' | 'Fax' | 'Whatsapp' | 'Other';

export type EmailType = 'Work' | 'Personal' | 'Other';
  

export interface EmailAddress{
    email: string;
    emailType: EmailType;
    isPrimary: boolean;
}

export interface PhoneNumber{
    phone: string;
    phoneType: PhoneType;
    isPrimary: boolean;
}

export interface Address{
    streetAddress: string;
    cityId: number;
    stateId: number;
    countryId: number;
    pincode: string;
    addressType: AddressType;
    isPrimary: boolean;  
}

export interface ContactPerson{
    name: string;
    description?: string;
    isPrimary: boolean;
    phoneNumbers?: PhoneNumber[];
    emailAddresses?: EmailAddress[];
}

export interface OrganizationType{
    name: string;
    description?: string;
    companyTypeId: number;
    parentOrganizationId: number | null;
    gstinNumber? : string;
    sourceId: number;
    industryId: number;
    phoneNumbers?: PhoneNumber[];
    emailAddresses?: EmailAddress[];
    contactPersons?: ContactPerson[];
    addresses?: Address[];
}