import { Injectable } from '@nestjs/common';
import {OpenAiService} from "../open-ai/open-ai.service";
import {CompanyService} from "../company/company.service";
import {User} from "../users/entities/user.entity";
import {Company} from "../company/entities/company.entity";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class ContentService {
    constructor(private openAiService: OpenAiService,
                private readonly httpService: HttpService,
                private companyService: CompanyService) {
    }

    async createContent(user: User, postTitle: string, postDescription: string) {
        const company: Company = await this.companyService.getCompany(user);
        return await this.openAiService.createContent(company, postTitle, postDescription);
    }
     mailContent(content: string, user: User) {
       return this.httpService.post(process.env.EMAIL_SERVER + 'content-created',
            {content, email: user.email, name: user.profile.name})

    }
}
