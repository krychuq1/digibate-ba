class CompanyDto {
    companyDescription: string;
    productDescription: string;
    fullBusinessName: string;
    businessName: string;
    industry: string;
    email: string;
    address: string;
    brandIdentity: {
        name: string;
        toneOfVoice: string;
        brandAttributes: string[];
        slogan: string;
    }
}
