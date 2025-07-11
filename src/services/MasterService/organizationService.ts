import type { FetchResult } from "vite";
import type { Address, ContactPerson, OrganizationType } from "../../types/organization.type";
import { FetchData, type FetchDataResponse } from "../FetchData";

export type SourceType = {
    sourceId : number;
    name : string;
    description : string;
}

export type CompanyType = {
    id : number;
    companyType : string;
}

export type IndustryType = {
    industryId : number;
    name : string;
    description : string;
}

export type OrganizationSearchType = {
    id : number;
    name : string;
    contactPersons : {
        name : string;
    };
}

export type OrganizationList = {
    organizationId: number;
    name: string;
    industry: string;
    companyType: string;
    source: string;
    phone: string;
    email: string;
    address: string;
    country: string;
}

export const getSources = async () : Promise<FetchDataResponse<SourceType[]>> => {
    const result = await FetchData<SourceType[]>({
        url: "master/source",
    });

    return result;
}

export const getCompanyTypes = async () : Promise<FetchDataResponse<CompanyType[]>> => {
    const result = await FetchData<CompanyType[]>({
        url: "master/company-types",
    });

    return result;
}

export const getIndustries = async () : Promise<FetchDataResponse<IndustryType[]>> => {
    const result = await FetchData<IndustryType[]>({
        url: "master/industries",
    });

    return result;
}

export const searchOrganizations = async (value: string): Promise<FetchDataResponse<OrganizationSearchType[]>> => {
    const result = await FetchData<OrganizationSearchType[]>({
        url: `master/organizations/search?query=${value}`,
    });

    return result;
}

export type CountryType = {
    id: number,
    isoCode: string,
    name: string,
    flag: string,
    currency: string
}

export type StateType = {
    id: number,
    name: string,
    isoCode: string,
}

export type CityType = {
    id: number;
    name: string;
}

export const searchCountries = async (query: string): Promise<FetchDataResponse<CountryType[]>> => {
    const result = await FetchData<CountryType[]>({
        url: `master/country/search?query=${encodeURIComponent(query)}`,
    });
    return result;
};

export const searchStates = async (countryId: number, query: string): Promise<FetchDataResponse<StateType[]>> => {
    const result = await FetchData<StateType[]>({
        url: `master/state/search?countryId=${countryId}&search=${encodeURIComponent(query)}`,
    });
    return result;
};

export const searchCities = async (stateId: number, query: string): Promise<FetchDataResponse<CityType[]>> => {
    const result = await FetchData<CityType[]>({
        url: `master/city/search?stateId=${stateId}&search=${encodeURIComponent(query)}`,
    });
    return result;
};

const convertUndefinedToNull = (obj: any): any => {
  if (obj === undefined) return null;
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => convertUndefinedToNull(item));
  }
  
  const newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = convertUndefinedToNull(obj[key]);
    }
  }
  return newObj;
};

export const createOrganization = async(data: OrganizationType) : Promise<FetchDataResponse<OrganizationType>> => {
    // const sanitizedData = convertUndefinedToNull(data);
    
    const result = await FetchData<OrganizationType>({
        url: "master/organizations",
        method: "POST",
        data: data,
    });

    return result;
}

export const addContactPerson = async(data: ContactPerson) : Promise<FetchDataResponse<ContactPerson>> => {
    const result = await FetchData<ContactPerson>({
        url: "master/persons",
        method: "POST",
        data: data,
    });

    return result;
}

export const addAddress = async(data: Address) : Promise<FetchDataResponse<Address>> => {
    const result = await FetchData<Address>({
        url: "master/addresses",
        method: "POST",
        data: data,
    });

    return result;
}