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

export type OrganizationType = {
    id : number;
    name : string;
    contactPersons : {
        name : string;
    };
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

export const searchOrganizations = async (value: string): Promise<FetchDataResponse<OrganizationType[]>> => {
    const result = await FetchData<OrganizationType[]>({
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