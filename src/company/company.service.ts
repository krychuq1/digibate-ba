import {Inject, Injectable} from '@nestjs/common';
import OpenAI from 'openai';
import * as process from "process";
import {Repository} from "typeorm";
import {Company} from "./entities/company.entity";
import {User} from "../users/entities/user.entity";
import {HttpService} from "@nestjs/axios";
import {Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {BrandIdentity} from "./entities/brand-identity.entity";
import {OpenAiService} from "../open-ai/open-ai.service";
const fs = require('fs')

@Injectable()
export class CompanyService {
    public openai;
    public thread;
    constructor(@Inject('COMPANY_REPOSITORY')
                private companyRepository: Repository<Company>,
                @Inject('USER_REPOSITORY')
                private userRepository: Repository<User>,
                @Inject('BRAND_IDENTITY_REPOSITORY')
                private brandIdentityRepository: Repository<BrandIdentity>,
                private readonly httpService: HttpService,
                private openAiService: OpenAiService
    ) {
        this.openai = new OpenAI({
            apiKey: process.env.OPEN_AI, // defaults to process.env["OPENAI_API_KEY"]
        });
    }
    async addCompany(companyDto: CompanyDto, email: string) {

        const user =await this.userRepository.findOne({where: {email}, relations: ['profile', 'companies']})
        if (user) {
            const brandIdentity = new BrandIdentity();
            brandIdentity.name = companyDto.brandIdentity.name;
            brandIdentity.brandAttributes = companyDto.brandIdentity.brandAttributes || [];
            brandIdentity.toneOfVoice = companyDto.brandIdentity.toneOfVoice || "";
            brandIdentity.mainColors = [];
            brandIdentity.secondaryColors = [];
            brandIdentity.font = '';
            brandIdentity.slogan = companyDto.brandIdentity.slogan || '';
            const brandSaved = await this.brandIdentityRepository.save(brandIdentity);
            const company: Company = new Company();
            company.companyDescription = companyDto.companyDescription;
            company.productDescription = companyDto.productDescription;
            company.fullBusinessName = companyDto.fullBusinessName;
            company.businessName = companyDto.businessName;
            company.industry = companyDto.industry;
            company.email = companyDto.email;
            company.address = companyDto.address;
            company.user = user;
            company.brandIdentity = brandSaved;
            const companySaved: Company = await this.companyRepository.save(company);
        } else {
            // Handle the case when user is not found
            throw new Error('User not found');
        }
    }
    async createThread() {
        if(!this.thread) {
            this.thread = await this.openai.beta.threads.create();
        }
    }
    async scanCompany(url: string) {
        return this.openAiService.scanCompany(url);
        // await this.createThread();
        // const assistantId = 'asst_LxzpcM29a2d7UKGuYMDGfsZt';
        // await this.openai.beta.threads.messages.create(this.thread.id, {
        //     role: "user",
        //     content: url
        // });
        //
        // const run = await this.openai.beta.threads.runs.create(this.thread.id, {
        //     assistant_id: assistantId,
        // });
        //
        // return new Promise((resolve, reject) => {
        //     let isServiceCallInProgress = false;
        //
        //     const intervalId = setInterval(async () => {
        //         let runStatus = await this.openai.beta.threads.runs.retrieve(this.thread.id, run.id);
        //
        //         if (runStatus.status === 'requires_action' && !isServiceCallInProgress) {
        //             isServiceCallInProgress = true;
        //             const toolCall = runStatus.required_action?.submit_tool_outputs?.tool_calls[0];
        //             const args = JSON.parse(toolCall.function.arguments);
        //             console.log('calling research service');
        //             this.scanWebsiteV2(args.url).subscribe({next: async (response:any) => {
        //                     const items = response.data;
        //                     fs.writeFileSync('research_ai.txt', JSON.stringify(items[0].organicResults));
        //                     await this.openai.beta.threads.runs.submitToolOutputs(this.thread.id, run.id, {
        //                         tool_outputs: [
        //                             {
        //                                 tool_call_id: toolCall?.id,
        //                                 output: JSON.stringify(items[0].organicResults),
        //                             },
        //                         ],
        //                     });
        //                 }, error: (e) =>{
        //                     console.log(e);
        //                 }
        //             })
        //         }
        //
        //         if (runStatus.status === "completed") {
        //             console.log('we are here completed!!');
        //             let messages = await this.openai.beta.threads.messages.list(this.thread.id);
        //             const content = messages.data[0].content[0].text.value;
        //             fs.writeFileSync('raw_ai.txt', content);
        //             try{
        //                 const converted = this.__parseMarkdownJson(content);
        //                 resolve(converted);
        //             } catch (e) {
        //              reject(e);
        //             }
        //
        //
        //             isServiceCallInProgress = false;
        //             clearInterval(intervalId);
        //         }
        //     }, 3000);
        // });
    }
    async scanTest(url) {
        const data = fs.readFileSync('raw_ai.txt', {encoding: 'utf8'});
        console.log(data);
        return this.__parseMarkdownJson(data);
    }
    async getCompany(user: User) {
       const userWithCompanies = await this.userRepository.findOne({where: {email: user.email}, relations: ['companies']});
       return userWithCompanies.companies[0];
    }
    scanWebsiteV2(url: string) {
        return this.httpService.post(`https://api.apify.com/v2/acts/apify~google-search-scraper/run-sync-get-dataset-items?token=${process.env.APIFY}`, {
                queries: url,
                maxPagesPerQuery: 1,
                resultsPerPage: 5
        });

    }
    __parseMarkdownJson(markdownJson: string) {
        try {
            // Split the string into lines
            const lines = markdownJson.split('\n');

            // Remove the first and last lines
            lines.pop(); // Remove the last line (backticks)
            lines.shift(); // Remove the first line (backticks and 'json' keyword)
            fs.writeFileSync('raw_ai_for_json.txt', lines.join('\n').replace(/\n/g, ' '));
            // Join the remaining lines back into a single string
            return  JSON.parse(lines.join('\n').replace(/\n/g, ' '));

            // Parse the string as JSON
        } catch (error) {
            console.error("Error parsing JSON from markdown", error);
            return null;
        }
    }

}
